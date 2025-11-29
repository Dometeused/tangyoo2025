// components/ThemeEffect.jsx
"use client";
import { useAppMode } from "@/context/AppModeContext";
import { useEffect, useState } from "react";

const ICONS = {
  wedding: "💖",
  funeral: "🕯️",
  anniversary: "🎁",
};

export default function ThemeEffect() {
  const { theme } = useAppMode();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let timer;
    if (theme === "wedding") {
      timer = setInterval(() => {
        setHearts((prev) => [
          ...prev,
          {
            id: Math.random(),
            left: Math.random() * 100, // percent
            duration: 2.5 + Math.random() * 1.5,
            size: 24 + Math.random() * 18,
            opacity: 0.5 + Math.random() * 0.4,
          },
        ]);
      }, 600); // ความถี่
    }
    return () => clearInterval(timer);
  }, [theme]);

  // ลบหัวใจหลังหมด animation
  useEffect(() => {
    if (!hearts.length) return;
    const timeout = setTimeout(() => setHearts((prev) => prev.slice(1)), 2500);
    return () => clearTimeout(timeout);
  }, [hearts]);

  // effect theme อื่น ค่อยว่ากัน
  if (theme !== "wedding") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            animation: `fall ${h.duration}s linear forwards`,
          }}
          className="absolute top-0 select-none"
        >
          💖
        </span>
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(88vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
