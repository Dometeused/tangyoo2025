"use client";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function QRLightbox({ url, eventId }) {
  const [open, setOpen] = useState(false);

  // รองรับทั้ง url เดิม (image URL) และ eventId (generate QR จาก event page)
  const qrValue = url || (eventId ? `${window.location.origin}/event/${eventId}` : null);
  const displayUrl = eventId ? `${window.location.origin}/event/${eventId}` : url;

  if (!qrValue) return null;

  return (
    <>
      {/* thumbnail คลิกแล้วเปิด modal */}
      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 flex items-center justify-center bg-white border rounded p-1 cursor-pointer hover:shadow-md transition"
        title="ดู QR Code"
      >
        <QRCode value={qrValue} size={48} />
      </button>

      {/* Modal fullscreen */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <QRCode value={qrValue} size={220} />
            <p className="text-xs text-gray-500 text-center max-w-[220px] break-all">{displayUrl}</p>
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 bg-gray-800 text-white rounded-full text-sm"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
}
