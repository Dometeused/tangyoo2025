"use client";
import { useState } from "react";

export default function SlotImageSelector({ label, value, onSelect, images = [], getImgUrl, lightbox }) {
  const [open, setOpen] = useState(false);

  return (

    <div className="bg-white/5 rounded-xl p-4">
      <div className="text-sm font-semibold text-white/80 mb-2">{label}</div>
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-lg border-2 border-white/30 overflow-hidden cursor-pointer"
          onClick={() => {
            if (value) lightbox(value);
            else setOpen(!open);
          }}
        >
          {value ? (
            <img
              src={getImgUrl(value)}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-2xl">
              +
            </div>
          )}
        </div>
        <button
          className="text-sm px-3 py-1 rounded-lg bg-white/10 text-white/70 hover:bg-white/20"
          onClick={() => setOpen(!open)}
        >
          เลือกรูป
        </button>
      </div>

      {/* Dropdown grid */}
      {open && (
        <div className="mt-2 p-2 bg-white/10 rounded-lg grid grid-cols-5 gap-2">
          {images.map((img) => (
            <button
              key={img.name}
              onClick={() => {
                onSelect(img.name);
                setOpen(false);
              }}
              className={`w-full aspect-square rounded-md overflow-hidden border ${
                value === img.name
                  ? "border-yellow-400 ring-2 ring-yellow-300"
                  : "border-white/20"
              }`}
            >
              <img
                src={getImgUrl(img.name)}
                alt={img.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
