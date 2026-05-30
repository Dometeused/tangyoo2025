"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { QrCode, Download, X } from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function QRLightbox({ url, eventId, eventName }) {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);

  // Support both legacy image URL mode and new dynamic mode
  const qrValue = url || (eventId ? `${typeof window !== "undefined" ? window.location.origin : "https://tangyoo.com"}/event/${eventId}` : null);
  if (!qrValue) return null;

  const downloadQR = () => {
    if (!qrRef.current) return;
    htmlToImage.toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `tangyoo-qr-${eventId || "event"}.png`;
      link.href = dataUrl;
      link.click();
    }).catch(() => {});
  };

  const isImageUrl = url && !eventId;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
        style={{ background: "#f5f5f4", color: "#57534e", border: "1px solid #e7e5e3" }}
        title="ดู QR Code"
      >
        <QrCode size={13} />
        QR Code
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-800 text-sm truncate pr-2">{eventName || "QR Code"}</h3>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
                <X size={14} className="text-stone-400" />
              </button>
            </div>

            <div ref={qrRef} className="bg-white p-4 rounded-xl inline-block mb-4">
              {isImageUrl
                ? <img src={url} alt="QR" className="w-48 h-48 object-contain" />
                : <QRCode value={qrValue} size={192} />
              }
            </div>

            <p className="text-[10px] text-stone-400 font-mono mb-4 break-all">{qrValue}</p>

            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#f97316" }}
            >
              <Download size={14} />
              บันทึก QR
            </button>
          </div>
        </div>
      )}
    </>
  );
}
