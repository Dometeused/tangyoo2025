"use client";
import { useState } from "react";

export default function FeatureImageSelector({ label, value, onChange, images = [], getImgUrl, lightbox }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="text-sm font-semibold text-white/80 mb-2">{label}</div>
      <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-white/30 cursor-pointer relative group">
        {value ? (
          <img
            src={getImgUrl(value)}
            alt={label}
            className="w-full h-full object-cover"
            onClick={() => lightbox(value)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white/40 text-3xl"
            onClick={() => setOpen(!open)}
          >
            +
          </div>
        )}
      </div>

      {/* Dropdown แบบ grid */}
      {open && (
        <div className="mt-2 p-2 bg-white/10 rounded-lg grid grid-cols-5 gap-2">
          {images.map((img) => (
            <button
              key={img.name}
              onClick={() => {
                onChange(img.name);
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
