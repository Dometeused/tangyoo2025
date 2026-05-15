"use client";
export const dynamic = "force-dynamic";
;
import { useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";

const THEMES = [
  { key: "wedding", label: "งานแต่ง", color: "#1a0a10" },
  { key: "funeral", label: "งานอาลัย", color: "#060606" },
  { key: "anniversary", label: "ครบรอบ", color: "#0d0a00" },
  { key: "baby", label: "เด็กแรกเกิด", color: "#04080f" },
];

export default function PreviewIntroPage() {
  const [activeTheme, setActiveTheme] = useState(null);
  const [key, setKey] = useState(0);

  const handlePlay = (themeKey) => {
    setActiveTheme(null);
    setTimeout(() => {
      setActiveTheme(themeKey);
      setKey((k) => k + 1);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-white/40 font-kanit font-light tracking-[0.3em] text-sm uppercase">
        Intro Effect Preview
      </h1>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {THEMES.map((t) => (
          <button
            key={t.key}
            onClick={() => handlePlay(t.key)}
            className="py-4 rounded-2xl font-kanit text-sm font-light tracking-wider transition-all border border-white/10 hover:border-white/30 text-white/60 hover:text-white/90"
            style={{ background: t.color }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-white/20 font-kanit font-light text-xs tracking-widest">
        กดปุ่มเพื่อดู effect — แตะจอเพื่อปิด
      </p>

      {activeTheme && (
        <IntroOverlay
          key={key}
          theme={activeTheme}
          onComplete={() => setActiveTheme(null)}
        />
      )}
    </div>
  );
}
