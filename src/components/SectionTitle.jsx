"use client";
import { useState } from "react";

const STYLES = {
  wedding:     { text: "#6b2d4a", accent: "#ddb0c0" },
  funeral:     { text: "#f0e8df", accent: "#c9a882" },
  anniversary: { text: "#f5e090", accent: "#d4a820" },
  baby:        { text: "#5b21b6", accent: "#c4b5fd" },
};

export default function SectionTitle({ title, theme = "wedding", editable = false, onSave }) {
  const { text, accent } = STYLES[theme] ?? STYLES.wedding;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [display, setDisplay] = useState(title);

  const handleSave = () => {
    setEditing(false);
    const trimmed = value.trim();
    if (trimmed && trimmed !== display) {
      setDisplay(trimmed);
      onSave?.(trimmed);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-3">
      {/* Ornamental rule */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px" style={{ background: accent }} />
        <span style={{ color: accent, fontSize: "7px", letterSpacing: "0.25em" }}>✦</span>
        <div className="flex-1 h-px" style={{ background: accent }} />
      </div>

      {/* Title — editable inline */}
      {editable && editing ? (
        <input
          className="text-lg md:text-xl font-medium text-center tracking-wide leading-snug bg-transparent border-b-2 outline-none w-full max-w-sm"
          style={{ color: text, borderColor: accent }}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <h2
          className={`text-lg md:text-xl font-medium text-center tracking-wide leading-snug group relative transition-opacity ${
            editable ? "cursor-pointer hover:opacity-70" : ""
          }`}
          style={{ color: text }}
          onClick={() => editable && setEditing(true)}
          title={editable ? "คลิกเพื่อแก้ไข" : undefined}
        >
          {display}
          {editable && (
            <span className="ml-1 text-xs opacity-0 group-hover:opacity-50 transition-opacity select-none">
              ✏️
            </span>
          )}
        </h2>
      )}
    </div>
  );
}
