// /app/qrcode-success/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, Suspense } from "react";
import QRCode from "react-qr-code";

function QRSuccessContent() {
  const params = useSearchParams();
  const eventId = params.get("id");
  const eventUrl = eventId
    ? `${window.location.origin}/event/${eventId}`
    : `${window.location.origin}/event/`;

  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // ดาวน์โหลด QR เป็น PNG
  function handleDownload() {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `tangyoo-qr-${eventId || "event"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  }

  // คัดลอกลิงก์
  function handleCopy() {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-sm w-full">

        <div className="text-4xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">สร้างงานสำเร็จ!</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          แชร์ QR Code นี้ให้แขกสแกนเพื่อเข้าร่วมงาน
        </p>

        {/* QR Code */}
        <div
          ref={qrRef}
          className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4"
        >
          <QRCode value={eventUrl} size={200} />
        </div>

        {/* URL + Copy */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 mb-5">
          <span className="text-xs text-gray-500 truncate flex-1">{eventUrl}</span>
          <button
            onClick={handleCopy}
            className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              copied ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {copied ? "✓ คัดลอก" : "คัดลอก"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold text-sm hover:bg-blue-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            ดาวน์โหลด QR
          </button>
          {eventId && (
            <a
              href={eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition"
            >
              ดูหน้างาน
            </a>
          )}
        </div>

        <a href="/dashboard" className="mt-5 text-sm text-gray-400 hover:text-gray-600 underline">
          ← กลับสู่ Dashboard
        </a>
      </div>
    </main>
  );
}

export default function QrCodeSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        กำลังโหลด...
      </div>
    }>
      <QRSuccessContent />
    </Suspense>
  );
}
