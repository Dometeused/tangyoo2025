"use client";
import { useEffect, useState } from "react";
import { useAppMode } from "@/context/AppModeContext";

// ── Wedding: soft blush bokeh ──────────────────────────────────
const PETAL_COLORS = ["#fce7f3", "#fbcfe8", "#f9a8d4", "#ffe4e6", "#fecdd3", "#fdf2f8"];
const MAX_PETALS = 10;

function newPetal() {
  return {
    id: Date.now() + Math.random(),
    left: 4 + Math.random() * 92,
    duration: 6 + Math.random() * 5,
    size: 14 + Math.random() * 18,
    opacity: 0.25 + Math.random() * 0.3,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    drift: (Math.random() - 0.5) * 80,
  };
}

// ── Funeral: warm amber candle sparks ─────────────────────────
const SPARK_COLORS = ["#f5a623", "#f7c464", "#fdd888", "#e89030", "#fcebc0", "#f0c060"];
const MAX_SPARKS = 7;

function newSpark() {
  return {
    id: Date.now() + Math.random(),
    left: 5 + Math.random() * 90,
    duration: 10 + Math.random() * 8,     // 10–18s slow rise
    size: 3 + Math.random() * 5,          // 3–8px tiny embers
    opacity: 0.25 + Math.random() * 0.35, // 0.25–0.60
    color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
    drift: (Math.random() - 0.5) * 50,    // subtle sideways drift
  };
}

export default function ThemeEffect() {
  const { theme } = useAppMode();
  const [petals,  setPetals]  = useState([]);
  const [sparks,  setSparks]  = useState([]);

  // Apply theme body class
  useEffect(() => {
    document.body.classList.remove("theme-wedding", "theme-funeral", "theme-anniversary", "theme-baby");
    if (theme) document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Wedding: falling bokeh petals
  useEffect(() => {
    if (theme !== "wedding") { setPetals([]); return; }
    const add = () =>
      setPetals((prev) => (prev.length >= MAX_PETALS ? prev : [...prev, newPetal()]));
    const seeds = [0, 1000, 2200, 3600].map((d) => setTimeout(add, d));
    const interval = setInterval(add, 2800);
    return () => { seeds.forEach(clearTimeout); clearInterval(interval); };
  }, [theme]);

  // Funeral: rising candle sparks
  useEffect(() => {
    if (theme !== "funeral") { setSparks([]); return; }
    const add = () =>
      setSparks((prev) => (prev.length >= MAX_SPARKS ? prev : [...prev, newSpark()]));
    const seeds = [0, 1500, 3000, 5000, 7000].map((d) => setTimeout(add, d));
    const interval = setInterval(add, 3500);
    return () => { seeds.forEach(clearTimeout); clearInterval(interval); };
  }, [theme]);

  const removePetal = (id) => setPetals((prev) => prev.filter((p) => p.id !== id));
  const removeSpark = (id) => setSparks((prev) => prev.filter((s) => s.id !== id));

  // --- Funeral: rising candle embers + warm dark vignette ---
  if (theme === "funeral") {
    return (
      <>
        {/* Deep warm vignette edges */}
        <div
          className="fixed inset-0 pointer-events-none z-[10]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(15,8,3,0.55) 100%)",
          }}
        />
        {/* Warm amber glow at bottom (candlelight source) */}
        <div
          className="fixed bottom-0 left-0 right-0 pointer-events-none z-[11]"
          style={{
            height: "30vh",
            background: "linear-gradient(to top, rgba(180,90,10,0.12), transparent)",
            filter: "blur(8px)",
          }}
        />
        {/* Rising spark particles */}
        <div className="pointer-events-none fixed inset-0 z-[12] overflow-hidden">
          {sparks.map((s) => (
            <div
              key={s.id}
              onAnimationEnd={() => removeSpark(s.id)}
              style={{
                position: "absolute",
                bottom: "-6px",
                left: `${s.left}%`,
                width:  s.size,
                height: s.size,
                "--drift":   `${s.drift}px`,
                "--base-op": s.opacity,
                animation: `sparkRise ${s.duration}s ease-out forwards`,
                borderRadius: "50%",
                background: s.color,
                filter: "blur(1px)",
                boxShadow: `0 0 ${s.size * 1.5}px ${s.color}`,
              }}
            />
          ))}
          <style>{`
            @keyframes sparkRise {
              0%   { transform: translateY(0)        translateX(0);            opacity: var(--base-op); }
              8%   { opacity: var(--base-op); }
              100% { transform: translateY(-102vh)   translateX(var(--drift)); opacity: 0; }
            }
          `}</style>
        </div>
      </>
    );
  }

  // --- Anniversary: warm gold overlay ---
  if (theme === "anniversary") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-yellow-300/10 to-transparent" />
      </div>
    );
  }

  // --- Baby: soft lavender overlay ---
  if (theme === "baby") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
        <div className="absolute inset-0 bg-purple-400/5 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-200/10 to-transparent" />
      </div>
    );
  }

  // --- Wedding: soft pink overlay + elegant falling petals ---
  if (theme === "wedding") {
    return (
      <>
        {/* Soft blush overlay */}
        <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
          <div className="absolute inset-0 bg-pink-500/5 mix-blend-overlay" />
        </div>

        {/* Falling petals */}
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {petals.map((p) => (
            <div
              key={p.id}
              onAnimationEnd={() => removePetal(p.id)}
              style={{
                position: "absolute",
                top: "-20px",
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                "--drift": `${p.drift}px`,
                "--base-op": p.opacity,
                animation: `petalFall ${p.duration}s ease-in forwards`,
                borderRadius: "50%",
                background: p.color,
                filter: "blur(2.5px)",
              }}
            />
          ))}
          <style>{`
            @keyframes petalFall {
              0%   { transform: translateY(0)    translateX(0)            rotate(0deg);   opacity: var(--base-op); }
              15%  {                                                                       opacity: var(--base-op); }
              100% { transform: translateY(97vh) translateX(var(--drift)) rotate(380deg); opacity: 0; }
            }
          `}</style>
        </div>
      </>
    );
  }

  return null;
}
