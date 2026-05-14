// /components/creation/SuccessSection.jsx
"use client";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function SuccessSection({ eventData, onGoToDashboard }) {
  const [copied, setCopied] = useState(false);

  const eventUrl = eventData?.id
    ? `${window.location.origin}/event/${eventData.id}`
    : null;

  function handleCopy() {
    if (!eventUrl) return;
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="text-5xl mb-3">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">สร้างหน้างานสำเร็จแล้ว!</h2>
      <p className="text-gray-500 text-sm mb-6">แชร์ลิงก์หรือ QR code ให้แขกของคุณได้เลย</p>

      {eventUrl && (
        <>
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-4">
            <QRCode value={eventUrl} size={180} />
          </div>

          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600 truncate flex-1">{eventUrl}</span>
            <button
              onClick={handleCopy}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {copied ? "✓ คัดลอกแล้ว" : "คัดลอก"}
            </button>
          </div>
        </>
      )}

      <div className="flex gap-3 w-full mt-2">
        {eventData?.id && (
          <a
            href={`/qrcode-success?id=${eventData.id}`}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold text-center hover:bg-blue-600"
          >
            ดาวน์โหลด QR
          </a>
        )}
        <button
          onClick={onGoToDashboard}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
