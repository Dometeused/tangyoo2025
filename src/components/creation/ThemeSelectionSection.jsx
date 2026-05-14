// /components/creation/ThemeSelectionSection.jsx
"use client";
import { useState } from "react";

const THEMES = [
  {
    key: "wedding",
    label: "งานแต่งงาน",
    emoji: "💍",
    desc: "การ์ดเชิญ, แกลเลอรี่, ภาพทรงจำ",
    bg: "bg-pink-50 border-pink-200 hover:border-pink-400",
    selected: "border-pink-500 bg-pink-100",
  },
  {
    key: "funeral",
    label: "งานรำลึก / อาลัย",
    emoji: "🕯️",
    desc: "หน้าระลึกถึง, แสดงความไว้อาลัย",
    bg: "bg-gray-50 border-gray-200 hover:border-gray-400",
    selected: "border-gray-600 bg-gray-100",
  },
  {
    key: "anniversary",
    label: "วันครบรอบ / ของขวัญ",
    emoji: "🎉",
    desc: "ฉลองวันสำคัญ, แชร์ความสุข",
    bg: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    selected: "border-yellow-500 bg-yellow-100",
  },
];

export default function ThemeSelectionSection({ onNext, onBack }) {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <h1 className="text-2xl mb-1 font-bold text-gray-800">เลือกประเภทงาน</h1>
      <p className="text-gray-500 text-sm mb-5">เลือกประเภทที่ตรงกับงานของคุณ</p>

      <div className="flex flex-col gap-3 mb-6">
        {THEMES.map((t) => (
          <button
            key={t.key}
            onClick={() => setSelected(t.key)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              selected === t.key ? t.selected : t.bg
            }`}
          >
            <span className="text-3xl">{t.emoji}</span>
            <div>
              <div className="font-semibold text-gray-800">{t.label}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </div>
            {selected === t.key && (
              <span className="ml-auto text-green-500 font-bold text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={!selected}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ถัดไป
      </button>
    </div>
  );
}
