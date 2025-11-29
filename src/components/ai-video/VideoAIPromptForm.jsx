// src/components/ai-video/VideoAIForm.jsx

"use client";
import { useState } from "react";

export default function VideoAIForm({
  profileUrl,
  posterName,
  loading,
  error,
  onSubmit,
  onPickProfile, // เพิ่ม prop callback สำหรับเปลี่ยนรูป
}) {
  const [message, setMessage] = useState("");

  // ตัวอย่างข้อความแนะนำ (personalize)
  const placeholder =
    "เช่น “ขอบคุณทุกคนที่รักและดูแลกันตลอดมา” หรือ “ไม่ต้องห่วงแม่ ขอให้ทุกคนมีความสุขนะ”";

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit({ message }); // ส่งไป gen วิดีโอ
  }

  return (
    <form
      className="flex flex-col items-center gap-6 p-6 bg-white/90 rounded-xl shadow-lg max-w-md mx-auto"
      onSubmit={handleSubmit}
      style={{ fontFamily: "inherit" }}
    >
      {/* รูปโปรไฟล์ + ปุ่มเลือกรูป */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src={profileUrl || "/profile-placeholder.png"}
            alt="profile"
            className="w-24 h-32 object-cover rounded-lg border-2 border-gray-200 shadow bg-white"
            style={{ fontFamily: "inherit" }}
          />
          <button
            type="button"
            className="absolute bottom-1 left-1 bg-white/80 border border-gray-300 rounded px-2 py-0.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
            onClick={onPickProfile}
            tabIndex={-1}
          >
            เปลี่ยนรูป
          </button>
        </div>
        <div className="text-base font-semibold text-gray-700 mt-1">{posterName}</div>
      </div>

      {/* ช่องกรอกข้อความ */}
      <div className="w-full">
        <textarea
          className="w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg p-3 min-h-[68px] text-base font-medium text-gray-800 transition placeholder-gray-400"
          placeholder={placeholder}
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {/* ปุ่ม */}
      <button
        type="submit"
        className="bg-gray-800 hover:bg-black text-white rounded-lg px-7 py-2 font-bold text-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading || !message.trim()}
      >
        {loading ? "กำลังสร้างวิดีโอ..." : "สร้างวิดีโอ AI"}
      </button>
      <div className="text-xs text-gray-500 mt-1 text-center max-w-[280px] leading-relaxed">
        *วิดีโอนี้จะสร้างเฉพาะ “1 ครั้ง” ต่อรูปภาพ เพื่อความเป็นส่วนตัวและความพิเศษของแต่ละครอบครัว
      </div>
    </form>
  );
}
