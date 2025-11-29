"use client";
export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
      tabIndex={-1}
    >
      {/* กรณีเป็น Lightbox รูป ให้ลบ bg-white/p-4/rounded ออก เหลือแค่ตรงนี้ */}
      <div
        className="relative max-w-full max-h-full flex items-center justify-center"
        onClick={e => e.stopPropagation()}
        style={{ background: "transparent", boxShadow: "none", borderRadius: 0, padding: 0 }}
      >
        {/* ปุ่มปิด */}
        <button
          className="absolute top-3 right-3 z-20 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
          onClick={onClose}
        >✕</button>
        {children}
      </div>
    </div>
  );
}
