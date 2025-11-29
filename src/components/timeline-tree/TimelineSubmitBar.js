import React from "react";

export default function TimelineSubmitBar({ onSubmit, loading, disabled }) {
  return (
    <div className="w-full flex justify-end mt-6">
      <button
        onClick={onSubmit}
        disabled={loading || disabled}
        className={`px-6 py-2 rounded-xl font-bold shadow 
          ${loading ? "bg-gray-300 text-gray-500" : "bg-pink-500 hover:bg-pink-600 text-white"} 
          transition`}
        type="button"
      >
        {loading ? "บันทึก..." : "บันทึก Timeline"}
      </button>
    </div>
  );
}
