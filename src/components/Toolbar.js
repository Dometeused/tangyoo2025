import { useState } from "react";

// กำหนดรายชื่อฟอนต์ตรงนี้ (ชื่อ value ต้องตรงกับ @font-face ใน global.css)
const fontList = [
  { label: "Default", value: "inherit" },
  { label: "SukhumvitSet", value: "'SukhumvitSet', sans-serif" },
  { label: "Kart Suparerk", value: "'Kart-Suparerk', sans-serif" },
  { label: "Kaewpet", value: "'Kaewpet', serif" },
  { label: "Juliette", value: "'Juliette', cursive" },
  { label: "StyleScript", value: "'StyleScript', cursive" },
  { label: "Rukdeaw", value: "'Rukdeaw', cursive" },
  { label: "TimesCustom", value: "'TimesCustom', serif" },
  { label: "VTML", value: "'VTML', sans-serif" },      // ถ้ามีฟอนต์ VTML ในระบบ
];

const sizeList = [
  { label: "ปกติ", value: "18px" },
  { label: "ใหญ่", value: "22px" },
  { label: "หัวข้อ", value: "32px" },
  { label: "เล็ก", value: "14px" },
];

export default function Toolbar({ editor }) {
  const [customSize, setCustomSize] = useState("");
  const [customColor, setCustomColor] = useState("#e954a6");

  if (!editor) return null;

  // อ่าน fontFamily/fontSize ปัจจุบัน
  const fontFamilyValue = editor.getAttributes("fontFamily")?.family || "inherit";
  const fontSizeValue = editor.getAttributes("fontSize")?.size || "18px";

  const btnClass = "px-1 py-0.5 rounded transition text-gray-600 hover:bg-gray-100 hover:text-black text-base";

  return (
    <div className="flex flex-wrap gap-2 mb-2 items-center">
      {/* B/I/Clear */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass + (editor.isActive("bold") ? " bg-gray-200 text-black font-bold" : "")} title="Bold">B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass + (editor.isActive("italic") ? " bg-gray-200 text-black italic" : "")} title="Italic">I</button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className={btnClass} title="ล้างสไตล์">×</button>
      
      {/* Font Family */}
      <select
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={fontFamilyValue}
        className="px-2 py-1 border rounded bg-white text-sm text-gray-600"
        title="เลือกฟอนต์"
      >
        {fontList.map(f => (
          <option value={f.value} key={f.value}>{f.label}</option>
        ))}
      </select>

      {/* Font Size */}
      <select
        onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        value={fontSizeValue}
        className="px-2 py-1 border rounded bg-white text-sm text-gray-600"
        title="ขนาดฟอนต์"
      >
        {sizeList.map(s => (
          <option value={s.value} key={s.value}>{s.label}</option>
        ))}
      </select>
      {/* Custom Font Size */}
      <input
        type="text"
        placeholder="ขนาด (เช่น 28px)"
        value={customSize}
        onChange={e => setCustomSize(e.target.value)}
        className="border rounded px-2 py-1 text-sm w-20"
      />
      <button
        onClick={() => customSize && editor.chain().focus().setFontSize(customSize).run()}
        className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200 text-xs"
      >
        ใช้ขนาดนี้
      </button>
      {/* Color */}
      <input
        type="color"
        value={customColor}
        onChange={e => {
          setCustomColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-8 h-8 border rounded"
        title="เลือกสีข้อความ"
      />
      <button
        onClick={() => editor.chain().focus().setColor(customColor).run()}
        className="px-2 py-1 bg-pink-100 rounded hover:bg-pink-200 text-xs"
      >
        ใช้สีนี้
      </button>
    </div>
  );
}
