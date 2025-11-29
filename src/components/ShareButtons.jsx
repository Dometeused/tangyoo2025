// 📄 src/components/ShareButtons.js
"use client";
import { useState } from "react";

export default function ShareButtons({ url }) {
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-[#3b5998] text-white rounded text-sm hover:bg-[#365492]"
        title="แชร์ Facebook"
      >
        Facebook
      </a>

      {/* LINE Share */}
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-[#06C755] text-white rounded text-sm hover:bg-[#05b94d]"
        title="แชร์ LINE"
      >
        LINE
      </a>

      {/* Copy Link */}
      <button
        className={`px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 ${copied ? "bg-green-200 text-green-800" : ""}`}
        onClick={copyLink}
        title="คัดลอกลิงก์"
      >
        {copied ? "คัดลอกแล้ว!" : "Copy Link"}
      </button>
    </div>
  );
}
