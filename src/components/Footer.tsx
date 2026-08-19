import { useState } from 'react';
import { Info } from 'lucide-react';
import { AboutModal } from './AboutModal';

export function Footer() {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <footer className="w-full relative z-40 mt-auto">
                {/* Main Container */}
                <div className="bg-[color:var(--bg-from)]/95 backdrop-blur-md border-t border-[color:var(--card-border)] rounded-t-2xl shadow-[0_-5px_30px_rgba(0,0,0,0.2)] flex flex-col items-center py-6 relative overflow-hidden [.theme-clear_&]:shadow-slate-200/50">

                    {/* Background Decor */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-1),transparent_70%)]" />
                    </div>

                    {/* Footer Credits */}
                    <div className="flex flex-col items-center gap-3 relative z-10">
                        {/* Trigger Button */}
                        <button
                            type="button"
                            onClick={() => setShowAbout(true)}
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[color:var(--card-border)] bg-white/[0.02] hover:bg-[color:var(--accent-1)]/5 hover:border-[color:var(--accent-1)]/30 text-[color:var(--text-muted)] hover:text-[color:var(--accent-1)] transition-all duration-300"
                        >
                            <Info size={13} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Tentang Aplikasi</span>
                        </button>

                        <div className="text-[10px] text-[color:var(--text-muted)]/40 font-medium">
                            © {new Date().getFullYear()} SMK Skill Passport • All Rights Reserved
                        </div>
                    </div>
                </div>
            </footer>

            {/* About Modal */}
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
        </>
    );
}
