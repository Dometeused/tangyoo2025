// 📁 components/UploadButton.jsx
export default function UploadButton({ onUpload, uploading = false, className = "" }) {
  return (
    <label
      className={`
        flex flex-col items-center justify-center cursor-pointer
        w-16 h-16 rounded-full bg-[#ECE7DF] hover:bg-[#DFD9CB] shadow
        transition-all duration-150 border-2 border-[#D9D3C2]
        ${uploading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      style={{
        fontSize: "2.3rem",
        position: "relative",
        overflow: "hidden",
        color: "#8d8372",
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        onChange={onUpload}
        disabled={uploading}
      />
      <span className="text-4xl">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
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
      <span className="text-xs mt-1 font-semibold text-[#6f6654]">อัปโหลด</span>
    </label>
  );
}
