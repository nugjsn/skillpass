import { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, AlertTriangle, MessageSquare, Award, Loader2 } from 'lucide-react';
import { KRSSubmission, LevelSkill } from '../types';
import { supabase, isMockMode } from '../lib/supabase';
import mockData from '../mocks/mockData';
import { groupCriteria } from '../lib/criteriaHelper';

export interface GradedCriterionResult {
    item: string;
    score: number;
    result: 'Lulus' | 'Tidak Lulus';
}

interface GradingModalProps {
    submission: KRSSubmission;
    onClose: () => void;
    // Each criterion gets its own score and its own Lulus/Tidak Lulus verdict - they are
    // NEVER averaged together, so one failing criterion can't be masked by a passing one
    // (and vice versa). `remainingItems` holds criteria deferred to a later session.
    onConfirm: (gradedResults: GradedCriterionResult[], earnedXP: number, notes: string, examinerName: string, remainingItems: string[]) => void;
    initialScore?: number;
    defaultExaminerName?: string;
}

export function GradingModal({ submission, onClose, onConfirm, initialScore = 0, defaultExaminerName = '' }: GradingModalProps) {
    const [scores, setScores] = useState<Record<number, number>>({});
    const [included, setIncluded] = useState<Record<number, boolean>>({});
    const [notes, setNotes] = useState('');
    const [examinerName, setExaminerName] = useState(defaultExaminerName);
    const [isSaving, setIsSaving] = useState(false);
    const [levelRange, setLevelRange] = useState<number>(25); // default range
    const [loadingLevel, setLoadingLevel] = useState(true);
    const [numTotalLevelCriteria, setNumTotalLevelCriteria] = useState<number>(1);

    // Get the main criteria items to grade (ignoring sub-items for grading logic)
    const criteriaGroups = useMemo(() => {
        return groupCriteria(submission.items || []);
    }, [submission.items]);

    const numTestedCriteria = criteriaGroups.length || 1;
    const isIncluded = (idx: number) => included[idx] !== false;
    const includedCount = criteriaGroups.reduce((acc, _, idx) => acc + (isIncluded(idx) ? 1 : 0), 0);
    const canDeferItems = criteriaGroups.length > 1;

    useEffect(() => {
        const fetchLevel = async () => {
            setLoadingLevel(true);
            try {
                let currentLevel: LevelSkill | null = null;
                if (isMockMode) {
                    currentLevel = mockData.mockLevels.find(l => initialScore >= l.min_skor && initialScore <= l.max_skor) || mockData.mockLevels[0];
                } else {
                    const [levelsResult, overridesResult] = await Promise.all([
                        supabase.from('level_skill').select('*').order('urutan', { ascending: true }),
                        supabase.from('level_skill_jurusan').select('*').eq('jurusan_id', submission.jurusan_id)
                    ]);
                    
                    const levelsData = levelsResult.data || [];
                    const overrides = overridesResult.data || [];
                    const levels = levelsData.map((l: any) => {
                        const ov = overrides.find((o: any) => o.level_id === l.id);
                        const finalHasilBelajar = ov?.hasil_belajar || l.hasil_belajar;
                        
                        let criteria: string[] = [];
                        try {
                            if (finalHasilBelajar && finalHasilBelajar.trim().startsWith('[')) {
                                criteria = JSON.parse(finalHasilBelajar);
                            } else if (finalHasilBelajar) {
                                criteria = [finalHasilBelajar];
                            }
                        } catch (e) {
                            criteria = [finalHasilBelajar];
                        }
                        return { ...l, criteria };
                    });

                    if (levels && levels.length > 0) {
                        currentLevel = levels.find(l => initialScore >= l.min_skor && initialScore <= l.max_skor) || levels[0];
                    }
                }

                if (currentLevel) {
                    // Range = max_skor - (min_skor-1) except for first level which might be max-min
                    let min = currentLevel.min_skor;
                    if (currentLevel.urutan > 1) min -= 1; // e.g. 26 to 50 is a range of 25 (50-25)
                    const range = Math.max(0, currentLevel.max_skor - min);
                    setLevelRange(range);

                    let totalLvlCriteria = Math.max(1, numTestedCriteria);
                    if (Array.isArray(currentLevel.criteria) && currentLevel.criteria.length > 0) {
                        const levelGroups = groupCriteria(currentLevel.criteria);
                        // Prevent the total from being less than what is submitted, just in case the data is out of sync
                        totalLvlCriteria = Math.max(levelGroups.length, numTestedCriteria);
                    }
                    setNumTotalLevelCriteria(totalLvlCriteria);
                }
            } catch (err) {
                console.error("Error fetching level for grading", err);
            } finally {
                setLoadingLevel(false);
            }
        };

        fetchLevel();
    }, [initialScore]);

    const handleScoreChange = (index: number, val: string) => {
        const num = parseInt(val, 10);
        setScores(prev => ({
            ...prev,
            [index]: isNaN(num) ? 0 : Math.min(100, Math.max(0, num))
        }));
    };

    // Calculations - only over criteria included in THIS grading pass; deferred ones
    // are excluded entirely and stay pending for a later session.
    const maxXPPerCriterion = levelRange / numTotalLevelCriteria;

    let totalXP = 0;

    criteriaGroups.forEach((_, idx) => {
        if (!isIncluded(idx)) return;
        const s = scores[idx] || 0;
        if (s >= 75) {
            totalXP += maxXPPerCriterion;
        }
    });

    // The actual saved verdicts are always per-criterion (see gradedResults in
    // handleConfirm below), never averaged into one combined Lulus/Tidak Lulus.
    const passCount = criteriaGroups.reduce((acc, _, idx) => acc + (isIncluded(idx) && (scores[idx] || 0) >= 75 ? 1 : 0), 0);
    const failCount = includedCount - passCount;

    const handleConfirm = async () => {
        if (includedCount === 0) {
            alert("Pilih minimal satu kriteria untuk dinilai sekarang!");
            return;
        }

        // Validate all INCLUDED criteria are filled
        for (let i = 0; i < numTestedCriteria; i++) {
            if (isIncluded(i) && (scores[i] === undefined || scores[i] === null)) {
                alert("Harap isi nilai untuk setiap kriteria yang dinilai sekarang!");
                return;
            }
        }

        if (!examinerName.trim()) {
            alert("Harap isi nama penguji!");
            return;
        }

        try {
            setIsSaving(true);
            // Round totalXP to 2 decimal places to avoid floating point precision issues, then floor it to whole number or keep decimal?
            // DB skill_siswa.skor is integer usually, we should round it.
            const roundedXP = Math.round(totalXP);
            // Each included criterion is judged and recorded on ITS OWN score - never averaged
            // with the others - so a failing criterion can't be dragged to "Lulus" by a passing one.
            const gradedResults: GradedCriterionResult[] = criteriaGroups
                .map((g, idx) => ({ g, idx }))
                .filter(({ idx }) => isIncluded(idx))
                .map(({ g, idx }) => {
                    const s = scores[idx] || 0;
                    return {
                        item: [g.main, ...g.subs].join(', '),
                        score: s,
                        result: (s >= 75 ? 'Lulus' : 'Tidak Lulus') as 'Lulus' | 'Tidak Lulus'
                    };
                });
            const remainingItems = criteriaGroups.flatMap((g, idx) => isIncluded(idx) ? [] : [g.main, ...g.subs]);
            await onConfirm(gradedResults, roundedXP, notes, examinerName, remainingItems);
        } finally {
            setIsSaving(false);
        }
    };

    const getGradeDisplay = (s: number) => {
        if (!s) return { grade: '-', color: 'text-slate-500' };
        if (s >= 90) return { grade: 'A+', color: 'text-emerald-500' };
        if (s >= 80) return { grade: 'A', color: 'text-emerald-400' };
        if (s >= 75) return { grade: 'B', color: 'text-indigo-400' };
        return { grade: 'Gagal', color: 'text-red-500' };
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-slate-900 [.theme-clear_&]:bg-slate-50 border border-slate-800 [.theme-clear_&]:border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-800 [.theme-clear_&]:border-slate-200 flex justify-between items-center bg-slate-900/50 [.theme-clear_&]:bg-slate-100/50">
                    <div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight [.theme-clear_&]:text-indigo-950">Input Nilai Kriteria</h2>
                        <p className="text-xs text-slate-400 [.theme-clear_&]:text-slate-500">{submission.siswa_nama} — {submission.kelas}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 [.theme-clear_&]:text-slate-600 [.theme-clear_&]:hover:bg-slate-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {loadingLevel ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                            <p>Menyiapkan data rentang XP...</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-4 text-sm text-indigo-200">
                                <Award className="w-8 h-8 text-indigo-400 shrink-0" />
                                <div>
                                    <p>Total Max XP Level Ini: <strong>{levelRange} XP</strong>. Dibagi ke {numTotalLevelCriteria} kriteria = <strong>{maxXPPerCriterion.toFixed(1)} XP</strong> per kriteria lulus.</p>
                                    <p className="text-xs mt-1 opacity-70">Minimal nilai 75 untuk mendapatkan XP dari kriteria tersebut.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {criteriaGroups.map((group, idx) => {
                                    const currentVal = scores[idx];
                                    const { grade, color } = getGradeDisplay(currentVal);
                                    const rowIncluded = isIncluded(idx);
                                    return (
                                        <div key={idx} className={`bg-slate-950/50 border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center [.theme-clear_&]:bg-white transition-opacity ${rowIncluded ? 'border-slate-800 [.theme-clear_&]:border-slate-200' : 'border-slate-800/50 opacity-50 [.theme-clear_&]:border-slate-200'}`}>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-white [.theme-clear_&]:text-slate-800">{group.main}</div>
                                                {group.subs.length > 0 && (
                                                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                                                        Mencakup {group.subs.length} sub-kriteria
                                                    </div>
                                                )}
                                                {!rowIncluded && (
                                                    <div className="text-[10px] text-amber-500 mt-1 font-bold uppercase tracking-wider">
                                                        Ditunda — dinilai di sesi berikutnya
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                {canDeferItems && (
                                                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400 cursor-pointer select-none">
                                                        <input
                                                            type="checkbox"
                                                            checked={rowIncluded}
                                                            onChange={(e) => setIncluded(prev => ({ ...prev, [idx]: e.target.checked }))}
                                                            className="w-4 h-4 accent-indigo-500 cursor-pointer"
                                                        />
                                                        Nilai sekarang
                                                    </label>
                                                )}
                                                <div className={`text-xs font-black w-10 text-right uppercase ${color}`}>
                                                    {grade}
                                                </div>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="0-100"
                                                    disabled={!rowIncluded}
                                                    value={scores[idx] === undefined ? '' : scores[idx]}
                                                    onChange={(e) => handleScoreChange(idx, e.target.value)}
                                                    className="w-20 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-center text-white focus:border-indigo-500 outline-none disabled:opacity-40 disabled:cursor-not-allowed [.theme-clear_&]:bg-slate-50 [.theme-clear_&]:border-slate-300 [.theme-clear_&]:text-slate-900"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-4 mt-6 border-t border-slate-800 pt-6 [.theme-clear_&]:border-slate-200">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 [.theme-clear_&]:text-slate-600">
                                        <Award className="w-4 h-4 text-indigo-400" /> Nama Penguji
                                    </label>
                                    <input
                                        type="text"
                                        value={examinerName}
                                        onChange={(e) => setExaminerName(e.target.value)}
                                        placeholder="Ketik nama penguji..."
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-indigo-500 transition-all outline-none text-sm [.theme-clear_&]:bg-white [.theme-clear_&]:border-slate-300 [.theme-clear_&]:text-slate-900"
                                    />
                                    <p className="text-[10px] text-slate-500">Isi nama asli penguji (bukan nama akun), agar tercatat dengan benar di sertifikat siswa.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 [.theme-clear_&]:text-slate-600">
                                        <MessageSquare className="w-4 h-4 text-indigo-400" /> Catatan Feedback Umum
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Contoh: Sangat baik dalam perakitan, perlu diperdalam di bagian troubleshooting."
                                        className="w-full h-24 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-indigo-500 transition-all outline-none resize-none text-sm [.theme-clear_&]:bg-white [.theme-clear_&]:border-slate-300 [.theme-clear_&]:text-slate-900"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-6 items-center justify-between [.theme-clear_&]:bg-slate-100 [.theme-clear_&]:border-slate-200">
                    {!loadingLevel && (
                        <div className="flex flex-wrap gap-6 w-full sm:w-auto">
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lulus / Tidak Lulus</div>
                                <div className="text-2xl font-black">
                                    <span className="text-emerald-500">{passCount}</span>
                                    <span className="text-slate-600 mx-1">/</span>
                                    <span className="text-red-500">{failCount}</span>
                                </div>
                                <div className="text-[9px] text-slate-500">per kriteria, dinilai sendiri-sendiri</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total XP Didapat</div>
                                <div className="text-2xl font-black text-indigo-400">
                                    +{Math.round(totalXP)} <span className="text-sm opacity-50">XP</span>
                                </div>
                            </div>
                            {includedCount < numTestedCriteria && (
                                <div className="text-xs text-amber-500 font-semibold self-center">
                                    {numTestedCriteria - includedCount} kriteria akan tersisa untuk dinilai di sesi berikutnya.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors [.theme-clear_&]:text-slate-600 [.theme-clear_&]:hover:text-slate-900"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={isSaving || loadingLevel}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 min-w-[160px]"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{includedCount < numTestedCriteria ? 'Simpan Sebagian' : 'Simpan Penilaian'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
