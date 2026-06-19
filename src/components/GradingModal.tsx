import { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, AlertTriangle, MessageSquare, Award, Loader2 } from 'lucide-react';
import { KRSSubmission, LevelSkill } from '../types';
import { supabase, isMockMode } from '../lib/supabase';
import mockData from '../mocks/mockData';
import { groupCriteria } from '../lib/criteriaHelper';

interface GradingModalProps {
    submission: KRSSubmission;
    onClose: () => void;
    // Updated signature to include earnedXP
    onConfirm: (score: number, earnedXP: number, result: 'Lulus' | 'Tidak Lulus', notes: string) => void;
    initialScore?: number;
}

export function GradingModal({ submission, onClose, onConfirm, initialScore = 0 }: GradingModalProps) {
    const [scores, setScores] = useState<Record<number, number>>({});
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [levelRange, setLevelRange] = useState<number>(25); // default range
    const [loadingLevel, setLoadingLevel] = useState(true);
    const [numTotalLevelCriteria, setNumTotalLevelCriteria] = useState<number>(1);

    // Get the main criteria items to grade (ignoring sub-items for grading logic)
    const criteriaGroups = useMemo(() => {
        return groupCriteria(submission.items || []);
    }, [submission.items]);

    const numTestedCriteria = criteriaGroups.length || 1;

    useEffect(() => {
        const fetchLevel = async () => {
            setLoadingLevel(true);
            try {
                let currentLevel: LevelSkill | null = null;
                if (isMockMode) {
                    currentLevel = mockData.mockLevels.find(l => initialScore >= l.min_skor && initialScore <= l.max_skor) || mockData.mockLevels[0];
                } else {
                    const { data } = await supabase.from('level_skill').select('*').order('urutan');
                    if (data && data.length > 0) {
                        currentLevel = data.find(l => initialScore >= l.min_skor && initialScore <= l.max_skor) || data[0];
                    }
                }

                if (currentLevel) {
                    // Range = max_skor - (min_skor-1) except for first level which might be max-min
                    let min = currentLevel.min_skor;
                    if (currentLevel.urutan > 1) min -= 1; // e.g. 26 to 50 is a range of 25 (50-25)
                    const range = Math.max(0, currentLevel.max_skor - min);
                    setLevelRange(range);

                    let totalLvlCriteria = 1;
                    if (Array.isArray(currentLevel.criteria) && currentLevel.criteria.length > 0) {
                        const levelGroups = groupCriteria(currentLevel.criteria);
                        totalLvlCriteria = levelGroups.length;
                    } else if (currentLevel.hasil_belajar) {
                        totalLvlCriteria = 1;
                    }
                    setNumTotalLevelCriteria(Math.max(totalLvlCriteria, 1));
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

    // Calculations
    const maxXPPerCriterion = levelRange / numTotalLevelCriteria;

    let totalXP = 0;
    let sumScore = 0;

    criteriaGroups.forEach((_, idx) => {
        const s = scores[idx] || 0;
        sumScore += s;
        if (s >= 75) {
            totalXP += maxXPPerCriterion;
        }
    });

    const averageScore = Math.round(sumScore / numTestedCriteria);
    // If average is >= 75 and ALL items are >= 75, result is Lulus. 
    // Usually if totalXP > 0 it means at least partially passed. 
    // We'll let the overall result be 'Lulus' if average >= 75 for simplicity, or we can enforce all must be 75.
    const isLulus = averageScore >= 75;

    const handleConfirm = async () => {
        // Validate all criteria are filled
        for (let i = 0; i < numTestedCriteria; i++) {
            if (scores[i] === undefined || scores[i] === null) {
                alert("Harap isi nilai untuk semua kriteria kompetensi!");
                return;
            }
        }

        try {
            setIsSaving(true);
            const resultStatus = isLulus ? 'Lulus' : 'Tidak Lulus';
            // Round totalXP to 2 decimal places to avoid floating point precision issues, then floor it to whole number or keep decimal?
            // DB skill_siswa.skor is integer usually, we should round it.
            const roundedXP = Math.round(totalXP);
            await onConfirm(averageScore, roundedXP, resultStatus, notes);
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
                                    return (
                                        <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center [.theme-clear_&]:bg-white [.theme-clear_&]:border-slate-200">
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-white [.theme-clear_&]:text-slate-800">{group.main}</div>
                                                {group.subs.length > 0 && (
                                                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                                                        Mencakup {group.subs.length} sub-kriteria
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <div className={`text-xs font-black w-10 text-right uppercase ${color}`}>
                                                    {grade}
                                                </div>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="0-100"
                                                    value={scores[idx] === undefined ? '' : scores[idx]}
                                                    onChange={(e) => handleScoreChange(idx, e.target.value)}
                                                    className="w-20 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-center text-white focus:border-indigo-500 outline-none [.theme-clear_&]:bg-slate-50 [.theme-clear_&]:border-slate-300 [.theme-clear_&]:text-slate-900"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
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
                        </>
                    )}
                </div>

                <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-6 items-center justify-between [.theme-clear_&]:bg-slate-100 [.theme-clear_&]:border-slate-200">
                    {!loadingLevel && (
                        <div className="flex gap-6 w-full sm:w-auto">
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Rata-rata Nilai</div>
                                <div className={`text-2xl font-black ${isLulus ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {averageScore || 0}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total XP Didapat</div>
                                <div className="text-2xl font-black text-indigo-400">
                                    +{Math.round(totalXP)} <span className="text-sm opacity-50">XP</span>
                                </div>
                            </div>
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
                                    <span>Simpan Penilaian</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
