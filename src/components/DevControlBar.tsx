"use client";

import React from "react";
import { useAppMode, ThemeType, RoleType, PhaseType } from "@/context/AppModeContext";

// ========== Theme Config ==========
const THEMES: { key: ThemeType; label: string; icon: string }[] = [
  { key: "funeral", label: "งานอาลัย", icon: "🕯️" },
  { key: "anniversary", label: "ของขวัญ", icon: "🎁" },
  { key: "wedding", label: "งานแต่ง", icon: "💍" },
];

const ROLES: { key: RoleType; label: string }[] = [
  { key: "owner", label: "เจ้าภาพ 👤" },
  { key: "guest", label: "แขก 🙋‍♂️" },
];

const PHASES: { key: PhaseType; label: string }[] = [
  { key: "invitation", label: "ก่อนงาน 📅" },
  { key: "memory", label: "หลังงาน 🎞️" },
];

export default function DevControlBar() {
  const { theme, setTheme, role, setRole, phase, setPhase } = useAppMode();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 mb-6 rounded-xl bg-gray-800 shadow-lg text-white">
      {/* Theme Switcher */}
      <div className="flex flex-col items-center md:items-start">
        <div className="text-sm font-medium mb-1">ธีมงาน</div>
        <div className="flex gap-4">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-xl border-2
                ${theme === t.key ? "border-orange-500 bg-white text-black animate-pulse" : "border-gray-300 bg-white/70 hover:scale-110"}
                transition-all duration-150
              `}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Role Switcher */}
      <div className="flex flex-col items-center md:items-start">
        <div className="text-sm font-medium mb-1">มุมมอง</div>
        <div className="flex gap-2">
          {ROLES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className={`px-3 py-1 rounded-full text-sm font-medium shadow
                ${role === r.key ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-100"}
                transition-all duration-150`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Switcher */}
      <div className="flex flex-col items-center md:items-start">
        <div className="text-sm font-medium mb-1">ช่วงเวลา</div>
        <div className="flex gap-2">
          {PHASES.map((p) => (
            <button
              key={p.key}
              onClick={() => setPhase(p.key)}
              className={`px-3 py-1 rounded-full text-sm font-medium shadow
                ${phase === p.key ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-100"}
                transition-all duration-150`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
