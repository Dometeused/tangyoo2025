"use client";

// DotThemeSwitcher — ใช้บน HeroSection (landing page)
// รับ current (index), onChange (fn), themes (array จาก page.js)
export default function DotThemeSwitcher({ current, onChange, themes }) {
  if (!themes || !onChange) return null;

  return (
    <div className="flex gap-3">
      {themes.map((theme, idx) => (
        <button
          key={theme.key}
          onClick={() => onChange(idx)}
          title={theme.label}
          aria-label={`เปลี่ยนธีมเป็น ${theme.label}`}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            current === idx
              ? "border-white scale-125 shadow-lg"
              : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
          } ${theme.dot}`}
        />
      ))}
    </div>
  );
}
