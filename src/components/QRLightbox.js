"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import { QrCode, Download, X } from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function QRLightbox({ url, eventId, eventName }) {
  const [open, setOpen] = useState(false);
  const [qrValue, setQrValue] = useState(null);
  const [mounted, setMounted] = useState(false);
  const qrRef = useRef(null);

  // Must be client-only (window.location)
  useEffect(() => {
    setMounted(true);
    if (eventId) {
      setQrValue(`${window.location.origin}/event/${eventId}`);
    } else if (url) {
      setQrValue(url);
    }
  }, [eventId, url]);

  if (!mounted || (!eventId && !url)) return null;

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

  const modal = open ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.65)",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: 24,
          width: "100%",
          maxWidth: 320,
          textAlign: "center",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#1c1917", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>
            {eventName || "QR Code"}
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "#f5f5f4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <X size={14} color="#78716c" />
          </button>
        </div>

        {/* QR */}
        <div ref={qrRef} style={{ background: "#fff", padding: 16, borderRadius: 12, display: "inline-block", marginBottom: 12 }}>
          {qrValue ? (
            isImageUrl
              ? <img src={url} alt="QR" style={{ width: 192, height: 192, objectFit: "contain" }} />
              : <QRCode value={qrValue} size={192} />
          ) : (
            <div style={{ width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, border: "3px solid #f97316", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            </div>
          )}
        </div>

        {/* URL */}
        {qrValue && (
          <p style={{ fontSize: 10, color: "#a8a29e", fontFamily: "monospace", wordBreak: "break-all", marginBottom: 16 }}>
            {qrValue}
          </p>
        )}

        {/* Download */}
        <button
          onClick={downloadQR}
          disabled={!qrValue}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            width: "100%", padding: "10px 0", borderRadius: 12, border: "none",
            background: qrValue ? "#f97316" : "#e7e5e3",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: qrValue ? "pointer" : "not-allowed",
          }}
        >
          <Download size={14} />
          บันทึก QR
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 10px", borderRadius: 8, border: "1px solid #e7e5e3",
          background: "#f5f5f4", color: "#57534e", fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}
        title="ดู QR Code"
      >
        <QrCode size={13} />
        QR Code
      </button>

      {/* Portal: renders at document.body — bypasses CSS transform stacking context */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
