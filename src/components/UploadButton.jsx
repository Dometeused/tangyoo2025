// 📁 components/UploadButton.jsx
export default function UploadButton({ onUpload, uploading = false, className = "" }) {
  return (
    <label
      className={`
        flex flex-col items-center justify-center cursor-pointer
        w-16 h-16 rounded-full bg-[#ECE7DF] hover:bg-[#DFD9CB] shadow
        border border-[#D9D3C2] transition-all duration-150
        ${uploading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      style={{
        fontSize: "2.3rem",
        position: "relative",
        overflow: "hidden",
      }}
      title="อัปโหลดรูปใหม่"
    >
      {/* input รองรับหลายไฟล์ */}
      <input
        type="file"
        accept="image/*"
        multiple           // ✅ เพิ่มตรงนี้!
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        onChange={onUpload}
        disabled={uploading}
        tabIndex={-1}
      />
      {/* ไอคอน */}
      <span className="text-3xl mb-1 pointer-events-none select-none">
        <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
          <path fill="#bcae91" d="M17 16v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
          <path
            stroke="#8d8372"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2m7-3 4 4m0 0-4 4m4-4H11"
          />
        </svg>
      </span>
      {/* ข้อความใต้ไอคอน */}
      <span className="text-xs font-semibold text-[#6f6654] leading-tight pointer-events-none select-none">
        อัปโหลด
      </span>
    </label>
  );
}
