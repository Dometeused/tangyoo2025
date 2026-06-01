"use client";
import { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import { QrCode, Download, X } from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function QRLightbox({ url, eventId, eventName }) {
  const [open, setOpen] = useState(false);
  const [qrValue, setQrValue] = useState(null);
  const qrRef = useRef(null);

  // Compute QR value on client only (avoids SSR/hydration mismatch)
  useEffect(() => {
    if (eventId) {
      setQrValue(`${window.location.origin}/event/${eventId}`);
    } else if (url) {
      setQrValue(url);
    }
  }, [eventId, url]);

  if (!qrValue && !eventId && !url) return null;

  // Placeholder button even before qrValue is set (avoids layout shift)
  const showButton = eventId || url;
  if (!showButton) return null;

  const isImageUrl = !eventId && !!url;

  const downloadQR = () => {
    if (!qrRef.current) return;
    htmlToImage.toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `tangyoo-qr-${eventId || "event"}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(() => {});
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 active:scale-95"
        style={{ background: "#f5f5f4", color: "#57534e", border: "1px solid #e7e5e3" }}
        title="ดู QR Code"
      >
        <QrCode size={13} />
        QR Code
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full text-center"
            style={{ maxWidth: 320 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-800 text-sm truncate pr-2 max-w-[220px]">
                {eventName || "QR Code"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors shrink-0"
              >
                <X size={14} className="text-stone-400" />
              </button>
            </div>

            {/* QR */}
            <div ref={qrRef} className="bg-white p-4 rounded-xl inline-block mb-3">
              {qrValue ? (
                isImageUrl
                  ? <img src={url} alt="QR" style={{ width: 192, height: 192, objectFit: "contain" }} />
                  : <QRCode value={qrValue} size={192} />
              ) : (
                <div style={{ width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* URL */}
            {qrValue && (
              <p className="text-stone-400 mb-4 break-all" style={{ fontSize: "10px", fontFamily: "monospace" }}>
                {qrValue}
              </p>
            )}

            {/* Download */}
            <button
              onClick={downloadQR}
              disabled={!qrValue}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
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
