"use client";
// FestiveEffect.jsx — festive falling particles for anniversary & baby themes
import { useReducedMotion } from "framer-motion";

/* ── Pre-computed particle data (deterministic, no Math.random SSR issue) ── */
const anniversaryParticles = [
  // [left%, delayS, durationS, size, symbol, colorIdx, driftX]
  [3,  0.0, 6.0, 14, "✦", 0,  4],
  [8,  1.2, 7.5, 10, "✧", 1, -3],
  [14, 0.6, 5.5, 16, "◆", 2,  5],
  [19, 2.1, 8.0,  8, "✦", 3, -4],
  [25, 0.3, 6.5, 12, "•", 0,  3],
  [31, 1.8, 7.0, 14, "✧", 1, -5],
  [37, 0.9, 5.0, 10, "✦", 2,  4],
  [42, 2.4, 7.5, 18, "◆", 3, -3],
  [48, 0.5, 6.0,  8, "✦", 0,  5],
  [54, 1.5, 8.5, 12, "✧", 1, -4],
  [60, 0.2, 6.5, 16, "•", 2,  3],
  [65, 2.0, 5.5, 10, "✦", 3, -5],
  [71, 0.8, 7.0, 14, "◆", 0,  4],
  [77, 1.4, 6.0,  8, "✧", 1, -3],
  [82, 0.4, 8.0, 12, "✦", 2,  5],
  [88, 2.2, 5.5, 18, "•", 3, -4],
  [93, 1.0, 7.5, 10, "✦", 0,  3],
  [97, 0.7, 6.0, 14, "✧", 1, -5],
];

const GOLD = ["#d4a820", "#e8cc70", "#f5e090", "#c9a050"];

const babyParticles = [
  // [left%, delayS, durationS, size, shape(0=circle,1=rect), colorIdx, rot, driftX]
  [2,  0.0, 5.0, 10, 0, 0,   0,  3],
  [7,  1.3, 6.5,  8, 1, 1,  45, -4],
  [13, 0.5, 4.5, 12, 0, 2,   0,  5],
  [18, 2.0, 7.0,  7, 1, 3,  30, -3],
  [24, 0.8, 5.5,  9, 0, 4,   0,  4],
  [29, 1.6, 6.0, 11, 1, 5,  60, -5],
  [35, 0.3, 4.8,  8, 0, 6,   0,  3],
  [40, 2.3, 7.5, 10, 1, 0,  45, -4],
  [46, 1.0, 5.2,  7, 0, 1,   0,  5],
  [51, 0.6, 6.8, 12, 1, 2,  30, -3],
  [57, 1.9, 5.0,  9, 0, 3,   0,  4],
  [62, 0.2, 7.0,  8, 1, 4,  60, -5],
  [68, 1.4, 4.5, 11, 0, 5,   0,  3],
  [73, 2.1, 6.5,  7, 1, 6,  45, -4],
  [79, 0.7, 5.5, 10, 0, 0,   0,  5],
  [84, 1.7, 7.0, 12, 1, 1,  30, -3],
  [90, 0.4, 5.0,  8, 0, 2,   0,  4],
  [95, 2.5, 6.0,  9, 1, 3,  60, -5],
  [11, 1.1, 5.8,  7, 0, 4,   0,  3],
  [33, 0.9, 7.2, 11, 1, 5,  45, -4],
  [55, 2.2, 4.7,  8, 0, 6,   0,  5],
  [77, 1.5, 6.3, 10, 1, 0,  30, -3],
];

const BABY_COLORS = ["#c4b5fd","#f9a8d4","#7dd3fc","#fde68a","#a7f3d0","#fca5a5","#d8b4fe"];

/* ── Component ─────────────────────────────────────────── */
export default function FestiveEffect({ theme }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  if (theme !== "anniversary" && theme !== "baby") return null;

  const isAnniversary = theme === "anniversary";

  return (
    <>
      <style>{`
        @keyframes festive-fall {
          0%   { transform: translateY(-60px) translateX(0px) rotate(0deg); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        .festive-particle {
          position: fixed;
          top: 0;
          pointer-events: none;
          z-index: 5;
          animation: festive-fall var(--dur) var(--delay) ease-in infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {isAnniversary
        ? anniversaryParticles.map(([left, delay, dur, size, symbol, ci, drift], i) => (
            <span
              key={i}
              className="festive-particle select-none"
              style={{
                left: `${left}%`,
                fontSize: `${size}px`,
                color: GOLD[ci],
                textShadow: `0 0 ${size}px ${GOLD[ci]}aa`,
                "--dur":   `${dur}s`,
                "--delay": `${delay}s`,
                "--drift": `${drift * 6}px`,
                "--rot":   `${drift > 0 ? 180 : -180}deg`,
              }}
            >
              {symbol}
            </span>
          ))
        : babyParticles.map(([left, delay, dur, size, shape, ci, rot, drift], i) => (
            <div
              key={i}
              className="festive-particle"
              style={{
                left: `${left}%`,
                width:  `${size}px`,
                height: shape === 1 ? `${size * 0.5}px` : `${size}px`,
                background: BABY_COLORS[ci],
                borderRadius: shape === 0 ? "50%" : "2px",
                opacity: 0.85,
                "--dur":   `${dur}s`,
                "--delay": `${delay}s`,
                "--drift": `${drift * 8}px`,
                "--rot":   `${rot + (drift > 0 ? 180 : -180)}deg`,
              }}
            />
          ))
      }
    </>
  );
}
