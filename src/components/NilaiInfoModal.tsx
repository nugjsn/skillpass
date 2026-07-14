import React from 'react';
import type { CompetencyHistory, LevelSkill } from '../types';
import { X, CheckCircle, XCircle, Award, Calendar, User, BookOpen } from 'lucide-react';

interface NilaiInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: CompetencyHistory[];
    levels: LevelSkill[];
    studentName: string;
}

function parseGradeFromCatatan(catatan?: string): { nilai: number | null; grade: string | null } {
    if (!catatan) return { nilai: null, grade: null };

    // Match "Nilai: 80 (Grade B)"
    const nilaiMatch = catatan.match(/Nilai:\s*(\d+)/i);
    const gradeMatch = catatan.match(/Grade\s*([A-Ca-c][+]?)/i);

    return {
        nilai: nilaiMatch ? parseInt(nilaiMatch[1]) : null,
        grade: gradeMatch ? gradeMatch[1].toUpperCase() : null,
    };
}

function getGradeColor(grade: string | null, nilai: number | null): { bg: string; text: string; border: string } {
    const n = grade === 'A+' || nilai ? nilai : null;
    if (grade === 'A+' || (n && n >= 90)) return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40' };
    if (grade === 'A' || (n && n >= 80)) return { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' };
    if (grade === 'B' || (n && n >= 75)) return { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30' };
    if (grade === 'C' || (n && n >= 60)) return { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/30' };
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
}

function cleanKompetensi(text: string): string {
    // Remove markdown bold ** and leading numbers/dots
    return text
        .replace(/\*\*/g, '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .join(', ');
}

export function NilaiInfoModal({ isOpen, onClose, history, levels, studentName }: NilaiInfoModalProps) {
    if (!isOpen) return null;

    const lulus = history.filter(h => h.hasil.toLowerCase() === 'lulus');
    const tidakLulus = history.filter(h => h.hasil.toLowerCase() !== 'lulus');

    return (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl animate-fadeInUp">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-xl">
                            <Award className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-black text-base">Hasil Nilai Ujian</h2>
                            <p className="text-white/40 text-xs">{studentName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="flex gap-3 px-5 py-3 border-b border-white/5">
                    <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center">
                        <div className="text-2xl font-black text-emerald-400">{lulus.length}</div>
                        <div className="text-[10px] text-emerald-400/60 font-bold uppercase tracking-wider">Lulus</div>
                    </div>
                    <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-center">
                        <div className="text-2xl font-black text-red-400">{tidakLulus.length}</div>
                        <div className="text-[10px] text-red-400/60 font-bold uppercase tracking-wider">Tidak Lulus</div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                        <div className="text-2xl font-black text-white">{history.length}</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Total Ujian</div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {history.length === 0 ? (
                        <div className="text-center py-12 text-white/30">
                            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">Belum ada riwayat ujian</p>
                        </div>
                    ) : (
                        history.map((item, idx) => {
                            const level = levels.find(l => l.id === item.level_id);
                            const isLulus = item.hasil.toLowerCase() === 'lulus';
                            const { nilai, grade } = parseGradeFromCatatan(item.catatan);
                            const gradeStyle = getGradeColor(grade, nilai);
                            const kompetensiClean = cleanKompetensi(item.unit_kompetensi);

                            return (
                                <div
                                    key={item.id || idx}
                                    className={`rounded-xl border p-3.5 ${isLulus
                                        ? 'bg-white/5 border-white/10'
                                        : 'bg-red-500/5 border-red-500/10'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        {/* Status Icon */}
                                        <div className="shrink-0 mt-0.5">
                                            {isLulus
                                                ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                : <XCircle className="w-4 h-4 text-red-400" />
                                            }
                                        </div>

                                        {/* Competency Name */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold text-xs leading-snug">{kompetensiClean}</p>
                                            {level && (
                                                <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                                                    {level.nama_level || level.badge_name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Grade & Score Badge */}
                                        <div className={`shrink-0 flex flex-col items-center justify-center px-3 py-2 rounded-xl border ${gradeStyle.bg} ${gradeStyle.border} min-w-[52px]`}>
                                            {grade ? (
                                                <>
                                                    <span className={`text-xl font-black leading-none ${gradeStyle.text}`}>{grade}</span>
                                                    {nilai && <span className={`text-[10px] font-bold ${gradeStyle.text} opacity-70`}>{nilai}</span>}
                                                </>
                                            ) : nilai ? (
                                                <>
                                                    <span className={`text-xl font-black leading-none ${gradeStyle.text}`}>{nilai}</span>
                                                    <span className={`text-[10px] font-bold ${gradeStyle.text} opacity-70`}>Nilai</span>
                                                </>
                                            ) : (
                                                <span className={`text-sm font-black ${isLulus ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {isLulus ? '✓' : '✗'}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Meta */}
                                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-1 text-[10px] text-white/30">
                                            <Calendar className="w-3 h-3" />
                                            {item.tanggal}
                                        </div>
                                        {item.penilai && (
                                            <div className="flex items-center gap-1 text-[10px] text-white/30">
                                                <User className="w-3 h-3" />
                                                {item.penilai}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl transition-all"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
