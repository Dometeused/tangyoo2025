"use client";
import { useState } from "react";
import { THEME_DRESSCODE } from "@/constants/theme";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DresscodePicker({ event }) {
  const { theme, role } = useAppMode();
  const supabase = createClientComponentClient();
  const preset = THEME_DRESSCODE[theme] || THEME_DRESSCODE["wedding"];

  const [selected, setSelected] = useState(() => {
    if (!event?.dresscode_colors) return [];
    if (typeof event.dresscode_colors === "string") {
      try {
        return JSON.parse(event.dresscode_colors);
      } catch {
        return [];
      }
    }
    return Array.isArray(event.dresscode_colors) ? event.dresscode_colors : [];
  });

  const [editing, setEditing] = useState(false);
  const [custom, setCustom] = useState("");
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true); // ✅ เริ่มต้นถือว่าบันทึกแล้ว

  const toggleColor = (color) => {
    if (role !== "owner") return;
    setSelected((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("events")
      .update({ dresscode_colors: JSON.stringify(selected) })
      .eq("id", event.id);
    setSaving(false);
    setEditing(false);
    if (error) return alert("บันทึกไม่สำเร็จ");
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col items-center mb-2">
      <div className="text-md font-semibold mb-1">Dresscode</div>

      {!isSaved && (
        <>
          <div className="flex gap-3 mb-1">
            {preset.map(({ color, label }) => (
              <button
                key={color}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center 
                  ${selected.includes(color) ? "ring-2 ring-black/40 border-black" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                title={label}
                onClick={() => toggleColor(color)}
                tabIndex={0}
                aria-label={label}
              >
                {selected.includes(color) && (
                  <span className="text-xs font-bold text-white">✓</span>
                )}
              </button>
            ))}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 bg-white text-lg"
              onClick={() => setEditing(true)}
              type="button"
              aria-label="เลือกสีเอง"
            >
              +
            </button>
          </div>

          {editing && role === "owner" && (
            <div className="flex flex-col items-center mt-2 bg-white rounded-xl shadow px-3 py-2 border z-50">
              <input
                type="color"
                value={custom || "#cccccc"}
                onChange={(e) => setCustom(e.target.value)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 mb-1"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="#RRGGBB"
                  className="border rounded px-2 py-1 w-20 text-center"
                />
                <button
                  className="ml-1 px-2 py-1 bg-black text-white rounded text-xs"
                  onClick={() => {
                    setSelected((prev) =>
                      prev.includes(custom) ? prev : [...prev, custom]
                    );
                    setEditing(false);
                    setCustom("");
                  }}
                  disabled={!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(custom)}
                >
                  เพิ่ม
                </button>
                <button
                  className="ml-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  onClick={() => setEditing(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* แสดงปุ่มสีที่เลือก (ขนาดใหญ่ขึ้น) */}
      <div className="text-sm text-gray-700 mb-2 flex gap-3 flex-wrap justify-center">
        {selected.map((c) => (
          <span
            key={c}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 text-gray-800 text-sm bg-white shadow-sm"
          >
            <span
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: c }}
            ></span>
            {preset.find((p) => p.color === c)?.label || c}
          </span>
        ))}
      </div>

      {/* ปุ่มบันทึก */}
      {role === "owner" && !isSaved && (
        <button
          onClick={handleSave}
          className="mt-2 px-3 py-1 bg-pink-500 text-white rounded shadow text-xs"
          disabled={saving}
        >
          {saving ? "บันทึก..." : "บันทึก Dresscode"}
        </button>
      )}

      {/* ปุ่มแก้ไข (เฉพาะ owner เท่านั้น) */}
      {role === "owner" && isSaved && (
        <button
          onClick={handleEdit}
          className="mt-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition"
        >
          ✏️ แก้ไข Dresscode
        </button>
      )}
    </div>
  );
}
