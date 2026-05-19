"use client";
import QRCode from "react-qr-code";
import { Download, ExternalLink, Share2, Copy, Check, Pencil } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

export default function SuccessSection({ memoryId, themeKey, onGoToDashboard }) {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const memoryUrl = `https://tangyoo2025.vercel.app/event/${memoryId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(memoryUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Tangyoo Memory Page", url: memoryUrl });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // user cancelled — ignore
      }
    } else {
      // fallback: copy
      await copyLink();
    }
  };

  const downloadQR = () => {
    if (qrRef.current) {
      htmlToImage
        .toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `tangyoo-qr-${memoryId}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">

        {/* Header */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold font-kanit text-gray-800 mb-2">
            สร้างหน้าความทรงจำสำเร็จ! 🎉
          </h2>
          <p className="text-gray-500 text-sm">
            QR Code และลิงก์ของคุณพร้อมแชร์แล้ว
          </p>
        </div>

        {/* QR + URL */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-6 flex flex-col items-center">
          <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <QRCode value={memoryUrl} size={200} />
          </div>

          {/* URL row */}
          <div className="flex items-center gap-2 mb-4 w-full max-w-sm">
            <p className="flex-1 text-xs text-gray-500 font-mono bg-gray-100 px-3 py-2 rounded-lg truncate">
              {memoryUrl}
            </p>
            <button
              onClick={copyLink}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all shrink-0 ${
                copied
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "คัดลอกแล้ว!" : "คัดลอก"}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 justify-center w-full flex-wrap">
            <button
              onClick={downloadQR}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <Download size={15} />
              บันทึก QR
            </button>
            <button
              onClick={shareLink}
              className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl transition-all text-sm font-medium ${
                shared
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Share2 size={15} />
              {shared ? "แชร์แล้ว!" : "แชร์"}
            </button>
          </div>
        </div>

        {/* Next steps hint */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-left flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="text-sm font-bold text-orange-800 mb-1">ขั้นต่อไป — เพิ่มความสมบูรณ์</p>
            <p className="text-xs text-orange-700 leading-relaxed">
              ยังสามารถเพิ่มรูปปก, bio, timeline, dresscode และรูปภาพในงานได้ที่ <span className="font-semibold">Dashboard</span>
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/dashboard`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200"
          >
            <Pencil size={18} />
            แก้ไข / เพิ่มรูปภาพ
          </Link>
          <Link
            href={`/event/${memoryId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            <ExternalLink size={18} />
            ดูหน้าจริง
          </Link>
        </div>
      </div>
    </div>
  );
}
