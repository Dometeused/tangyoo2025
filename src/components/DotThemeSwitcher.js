// path: src/components/DotThemeSwitcher.jsx
"use client";

export default function DotThemeSwitcher({ current, onChange, THEMES }) {
    return (
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
            {THEMES.map((theme, idx) => (
                <button
                    key={theme.key}
                    onClick={() => onChange(idx)}   // ✅ เปลี่ยน themeIdx ที่หน้า Home
                    type="button"
                    aria-label={theme.label}
                    className={[
                        "w-3 h-3 rounded-full border border-white/70 transition-all duration-200",
                        idx === current
                            ? "bg-white scale-125 shadow-[0_0_0_4px_rgba(255,255,255,0.35)]"
                            : "bg-white/30 hover:bg-white/70 hover:scale-110",
                    ].join(" ")}
                />
            ))}
        </div>
    );
}
