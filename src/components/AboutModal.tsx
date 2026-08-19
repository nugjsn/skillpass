import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Code2, 
    Sparkles, 
    Globe, 
    Instagram, 
    MessageCircle, 
    ExternalLink, 
    Layers, 
    ShieldCheck, 
    Zap, 
    Heart 
} from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 text-white my-auto backdrop-blur-xl"
                >
                    {/* Top Glow & Decorative Pattern */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all z-20"
                        title="Tutup"
                    >
                        <X size={18} />
                    </button>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Header Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Sparkles size={12} className="animate-pulse" />
                                Skill Passport System
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                v1.2.0
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-black tracking-tight text-white mb-2">
                            Tentang Aplikasi & Pengembang
                        </h2>
                        <p className="text-xs text-slate-400 leading-relaxed mb-6">
                            Platform ekosistem portofolio digital & sertifikasi kompetensi vokasi berbasis standar industri.
                        </p>

                        {/* Developer Card */}
                        <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-5 mb-6 overflow-hidden group">
                            <div className="flex items-start gap-4">
                                {/* Avatar / Initial */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[2px] shadow-lg shadow-teal-500/20">
                                        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-lg tracking-wider text-teal-300">
                                            JS
                                        </div>
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-sm" title="Lead Developer">
                                        <Code2 size={10} className="text-white" />
                                    </span>
                                </div>

                                {/* Dev Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">
                                        Lead Developer
                                    </div>
                                    <h3 className="text-base font-bold text-white truncate">
                                        J.S. Nugroho
                                    </h3>
                                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                                        Fullstack & System Architect • SMK Mitra Industri MM2100
                                    </p>
                                </div>
                            </div>

                            {/* Contact & Social Links */}
                            <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-white/5">
                                <a
                                    href="https://jsnportofolio.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 text-xs font-semibold transition-all group/btn"
                                >
                                    <Globe size={14} />
                                    <span>Portfolio</span>
                                    <ExternalLink size={10} className="opacity-60 group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>

                                <a
                                    href="https://instagram.com/j.s_nugroho"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 text-xs font-semibold transition-all group/btn"
                                >
                                    <Instagram size={14} />
                                    <span>Instagram</span>
                                </a>

                                <a
                                    href="https://wa.me/6281316052316"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-semibold transition-all group/btn"
                                >
                                    <MessageCircle size={14} />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        {/* App Highlights / Specs */}
                        <div className="grid grid-cols-3 gap-2 text-center mb-6">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <Layers className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                                <div className="text-[10px] text-slate-400">Arsitektur</div>
                                <div className="text-xs font-bold text-slate-200">Modern PWA</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                                <div className="text-[10px] text-slate-400">Verifikasi</div>
                                <div className="text-xs font-bold text-slate-200">Secure DB</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <Zap className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                                <div className="text-[10px] text-slate-400">Real-time</div>
                                <div className="text-xs font-bold text-slate-200">Sync Active</div>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="text-center pt-2 border-t border-white/5 flex flex-col items-center gap-1">
                            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                                Crafted with <Heart size={12} className="text-rose-500 fill-rose-500 inline" /> for Vocational Excellence
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono">
                                © {new Date().getFullYear()} SMK Mitra Industri MM2100 • All Rights Reserved
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
