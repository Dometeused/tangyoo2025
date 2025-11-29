import React from "react";

// ตัวอย่าง Lightbox modal ใช้งานง่าย ๆ (ภาพ/วิดีโอ)
export default function LightboxModal({ open, src, type = "image", onClose, alt = "" }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white/0 rounded-lg shadow-lg max-w-full max-h-full p-3"
        onClick={e => e.stopPropagation()} // กันปิด modal เวลากดในกล่อง
      >
        <button
          className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-3 py-1"
          onClick={onClose}
        >
          ✕
        </button>
        {type === "image" && (
          <img src={src} alt={alt} className="max-w-[80vw] max-h-[80vh] rounded-xl shadow" />
        )}
        {type === "video" && (
          <video
            src={src}
            controls
            className="max-w-[80vw] max-h-[80vh] rounded-xl shadow"
          />
        )}
        {/* เพิ่ม embed/iframe ได้ (YouTube, TikTok ฯลฯ) */}
        {type === "embed" && (
          <iframe
            src={src}
            title="Embed"
            allowFullScreen
            className="w-[80vw] h-[45vw] max-w-[1000px] max-h-[60vh] rounded-xl shadow"
          />
        )}
      </div>
    </div>
  );
}
