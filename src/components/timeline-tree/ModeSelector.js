import React from "react";

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="radio"
          className="accent-pink-500 w-5 h-5"
          checked={mode === "timeline"}
          onChange={() => onChange("timeline")}
        />
        <span className="font-medium text-gray-700">สร้าง Timeline (หลายเหตุการณ์)</span>
      </label>
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="radio"
          className="accent-pink-500 w-5 h-5"
          checked={mode === "moment"}
          onChange={() => onChange("moment")}
        />
        <span className="font-medium text-gray-700">Moment เดียว (Embed วิดีโอ/รูป)</span>
      </label>
    </div>
  );
}
