"use client";
import { useState } from "react";

const COLORS = {
  wedding:     { cls: "text-[#9e6b7d]", hex: "#9e6b7d" },
  funeral:     { cls: "text-[#c9b49a]", hex: "#c9b49a" },
  anniversary: { cls: "text-[#d4b870]", hex: "#d4b870" },
  baby:        { cls: "text-[#7c3aed]", hex: "#7c3aed" },
};

// Accepts children (primary) or text prop for backward compat
export default function SectionQuote({ children, text, theme = "wedding", editable = false, onSave }) {
  const initial = children ?? text ?? "";
  const colorObj = COLORS[theme] ?? COLORS.wedding;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initial);
  const [display, setDisplay] = useState(initial);

  const handleSave = () => {
    setEditing(false);
    const trimmed = value.trim();
    if (trimmed !== display) {
      setDisplay(trimmed);
      onSave?.(trimmed);
    }
  };

  if (!display && !editable) return null;

  if (editable && editing) {
    return (
      <textarea
        className={`text-center italic text-sm md:text-base font-light mb-6 leading-relaxed px-4 bg-transparent border-b-2 outline-none w-full max-w-sm block mx-auto resize-none ${colorObj.cls}`}
        style={{ borderColor: colorObj.hex }}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
        }}
        rows={2}
        autoFocus
      />
    );
  }

  return (
    <p
      className={`text-center italic text-sm md:text-base font-light mb-6 leading-relaxed px-4 group transition-opacity ${colorObj.cls} ${
        editable ? "cursor-pointer hover:opacity-70" : ""
      }`}
      onClick={() => editable && setEditing(true)}
      title={editable ? "คลิกเพื่อแก้ไข" : undefined}
    >
      {display
        ? <>
            {display}
            {editable && (
              <span className="ml-1 text-xs opacity-0 group-hover:opacity-50 transition-opacity select-none">✏️</span>
            )}
          </>
        : editable
          ? <span className="opacity-40 not-italic text-sm">+ เพิ่ม quote...</span>
          : null
      }
    </p>
  );
}
