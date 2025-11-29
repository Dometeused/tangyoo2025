import React from "react";

const EMOJIS = ["😊", "🎉", "💍", "🌸", "❤️", "✨", "📸", "🏫", "👶", "🙏", "🎓", "🏡", "🚗"];

export default function EmojiPicker({ value, onPick }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {EMOJIS.map(e => (
        <button
          key={e}
          className={`text-2xl rounded-full hover:bg-pink-100 px-2 ${value === e ? "bg-pink-200" : ""}`}
          onClick={() => onPick(e)}
          type="button"
        >
          {e}
        </button>
      ))}
      <button
        className="text-sm px-2 py-1 border rounded ml-2"
        onClick={() => onPick("")}
        type="button"
      >
        ไม่มี
      </button>
    </div>
  );
}
