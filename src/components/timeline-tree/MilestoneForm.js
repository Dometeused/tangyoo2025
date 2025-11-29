import React from "react";

export default function MilestoneForm({ value, onChange, onDelete, showDelete = false }) {
  // value = { year: "", text: "", image: "", emoji: "" }
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl p-4 shadow mb-3">
      <div className="flex items-center gap-2">
        <label className="w-12 font-medium">ปี</label>
        <input
          type="number"
          min="1900"
          max="2100"
          required
          placeholder="2024"
          className="rounded px-2 py-1 border"
          value={value.year}
          onChange={e => onChange({ ...value, year: e.target.value })}
        />
        {/* (อนาคตใส่ emoji picker ตรงนี้ได้) */}
      </div>
      <textarea
        className="rounded px-2 py-1 border w-full"
        rows={2}
        placeholder="เรื่องราว / เหตุการณ์สำคัญ เช่น 'เรียนจบ, เริ่มงาน, แต่งงาน...'"
        value={value.text}
        onChange={e => onChange({ ...value, text: e.target.value })}
      />
      <div className="flex items-center gap-2">
        <label className="w-12 font-medium">ภาพ/วิดีโอ</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={e => {
            const file = e.target.files[0];
            onChange({ ...value, image: file }); // (dev: เปลี่ยนชื่อ image → media จะรองรับ video)
          }}
        />
      </div>
      {showDelete && (
        <button
          className="text-red-500 underline text-sm mt-2"
          onClick={onDelete}
          type="button"
        >
          ลบเหตุการณ์นี้
        </button>
      )}
    </div>
  );
}
