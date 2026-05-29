"use client";

/**
 * Modal — รองรับ 2 variant:
 *   "dialog"  (default) — กล่องกลางจอ desktop / bottom-sheet mobile
 *   "lightbox"          — พื้นหลังมืด ไม่มีกล่องขาว (สำหรับรูปภาพ)
 */
export default function Modal({ children, onClose, variant = "dialog" }) {
  if (variant === "lightbox") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative max-w-full max-h-full flex items-center justify-center"
          onClick={e => e.stopPropagation()}>
          <button
            className="absolute top-3 right-3 z-20 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
            onClick={onClose}
          >✕</button>
          {children}
        </div>
      </div>
    );
  }

  // ── dialog variant (default) ─────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ปุ่มปิด — sticky ด้านบนของ content */}
        <button
          className="sticky top-3 float-right mr-3 z-20 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors shadow-sm"
          onClick={onClose}
          aria-label="ปิด"
        >✕</button>

        {children}
      </div>
    </div>
  );
}
