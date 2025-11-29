"use client";

import { useAppMode } from "@/context/AppModeContext";

const PHASES = [
  { key: "invitation", label: "ก่อนงาน 📅" },
  { key: "memory", label: "หลังงาน 🎞️" },
];

export default function PhaseSwitcher() {
  const { phase, setPhase } = useAppMode();

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="text-sm font-medium text-white drop-shadow">เลือกช่วงเวลา:</div>
      <div className="flex gap-2">
        {PHASES.map((p) => (
          <button
            key={p.key}
            onClick={() => setPhase(p.key)}
            className={`px-3 py-1 rounded-full text-sm font-medium shadow
              ${
                phase === p.key
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }
              transition-all duration-150`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
