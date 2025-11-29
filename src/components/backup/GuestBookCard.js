"use client";

import { useState } from "react";
import Image from "next/image";
// import { HelpCircle } from "lucide-react"; // ถ้าใช้ lucide-react

function dateFormat(dt) {
  if (!dt) return "";
  return new Date(dt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function GuestBookCard({
  name = "Anonymous",
  relation = "",
  message = "",
  photoUrl = "",
  date = "",
  prompt = "",
  theme = "wedding",
}) {
  const [showPrompt, setShowPrompt] = useState(false);

  const themeMap = {
    wedding: "bg-pink-50 border-pink-200",
    funeral: "bg-gray-50 border-gray-200",
    family: "bg-yellow-50 border-yellow-200",
  };
  const themeClass = themeMap[theme] || "bg-white border-gray-100";

  return (
    <div
      className={`rounded-xl shadow-md border p-4 flex flex-col gap-2 ${themeClass} max-w-xs min-w-[260px] relative transition-all duration-150`}
    >
      {/* header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="rounded-full bg-white border w-10 h-10 flex items-center justify-center text-lg font-bold text-pink-500">
          {name?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700">{name}</span>
          {relation && (
            <span className="text-xs text-gray-500">{relation}</span>
          )}
        </div>
        <span className="ml-auto text-xs text-gray-400">
          {dateFormat(date)}
        </span>
        {/* Icon "?" ตรงนี้ */}
        {prompt?.trim() && (
          <button
            type="button"
            className="ml-2 text-pink-300 hover:text-pink-500 focus:outline-none"
            title="ดูคำถามที่แขกตอบ"
            onMouseEnter={() => setShowPrompt(true)}
            onMouseLeave={() => setShowPrompt(false)}
            onFocus={() => setShowPrompt(true)}
            onBlur={() => setShowPrompt(false)}
            tabIndex={0}
          >
            <span className="text-lg">❓</span>
          </button>
        )}
      </div>

      {/* message */}
      <div className="text-gray-700 leading-relaxed font-medium">
        {message}
      </div>

      {/* photo (optional) */}
      {photoUrl && (
        <div className="mt-2">
          <Image
            src={photoUrl}
            alt="แนบรูป"
            width={320}
            height={200}
            className="rounded-lg border"
            style={{ objectFit: "cover", maxHeight: "120px" }}
          />
        </div>
      )}

      {/* Prompt Hover (แสดง prompt ถ้า mouse ไปวางที่ "?" หรือโฟกัสปุ่ม) */}
      {prompt?.trim() && showPrompt && (
        <div className="absolute right-2 top-12 bg-white/95 border border-pink-200 shadow-xl px-4 py-2 rounded-lg text-sm text-pink-500 italic z-20 animate-fade-in min-w-[200px] max-w-[240px]">
          <span className="text-xs text-pink-600">Prompt:</span>
          <br />
          {prompt}
        </div>
      )}
    </div>
  );
}
