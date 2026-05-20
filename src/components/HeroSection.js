// path: src/components/HeroSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import DotThemeSwitcher from "@/components/DotThemeSwitcher";

export default function HeroSection({ current, onChange, THEMES }) {
    const theme = THEMES[current];

    // Theme-aware accent colours for AI button + bolt icon
    const getThemeAccent = () => {
        switch (theme.key) {
            case 'wedding':   return { from: 'rgba(244,63,126,0.18)', to: 'rgba(251,113,133,0.10)', bolt: '#f472b6' };
            case 'funeral':    return { from: 'rgba(249,115,22,0.18)', to: 'rgba(251,191,36,0.10)', bolt: '#fb923c' };
            case 'baby':       return { from: 'rgba(167,139,250,0.18)', to: 'rgba(196,181,253,0.10)', bolt: '#a78bfa' };
            case 'anniversary':
            default:           return { from: 'rgba(245,158,11,0.18)', to: 'rgba(253,224,71,0.10)',  bolt: '#fbbf24' };
        }
    };
    const accent = getThemeAccent();

    return (
        <section className="relative w-full h-[92vh] flex items-center justify-center overflow-hidden bg-black/90">
            {/* Background Image - Cinematic Zoom Effect */}
            <div className="absolute inset-0 w-full h-full z-0 select-none">
                <Image
                    src={theme.image}
                    alt={theme.label}
                    fill
                    style={{ objectFit: "cover" }}
                    className="opacity-60 scale-105 animate-[scaleIn_20s_ease-out_forwards]"
                    priority
                />

                {/* Simplified Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid place-items-center pt-20 pb-8">
                <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in-up">

                    {/* Minimalist Theme Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-sm font-medium tracking-wide text-white/90 shadow-sm animate-float-gentle">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {theme.label}
                    </div>

                    {/* Typography - Bigger, Bolder, Cleaner */}
                    <div className="space-y-4">
                        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] drop-shadow-2xl font-kanit text-balance">
                            {theme.title}
                        </h1>
                        <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed text-balance">
                            {theme.desc}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href={theme.ctaLink}
                            className={`group relative px-10 py-4 bg-white text-black rounded-full font-semibold text-lg hover:px-12 transition-all duration-500 ease-out shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {theme.cta}
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>


                        {/* Theme Switcher - Clean & Minimal */}
                        <div className="mt-8">
                            <div className="glass-premium px-4 py-2 rounded-full inline-block">
                                <DotThemeSwitcher
                                    current={current}
                                    onChange={onChange}
                                    THEMES={THEMES}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
