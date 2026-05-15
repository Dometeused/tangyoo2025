import QRCode from "react-qr-code";
import { Download, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";

export default function SuccessSection({ memoryId, themeKey, onGoToDashboard }) {
  const qrRef = useRef(null);
  const memoryUrl = `https://tangyoo.com/memory/${memoryId}`; // In real app, use actual domain

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
        .catch((err) => {
          console.error("Could not download QR", err);
        });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold font-kanit text-gray-800 mb-2">
            สร้างหน้าความทรงจำสำเร็จ!
          </h2>
          <p className="text-gray-600">
            พร้อมให้คุณส่งต่อความรู้สึกดีๆ แล้ว
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex flex-col items-center">
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-xl shadow-sm mb-4"
          >
            <QRCode value={memoryUrl} size={200} />
          </div>
          <p className="text-sm text-gray-500 mb-4 break-all font-mono bg-gray-100 px-3 py-1 rounded">
            {memoryUrl}
          </p>

          <div className="flex gap-3 justify-center w-full">
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <Download size={16} />
              บันทึก QR
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <Share2 size={16} />
              แชร์
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/memory/${memoryId}`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            <ExternalLink size={20} />
            ดูหน้า Memory Page
          </Link>
          <button
            onClick={onGoToDashboard}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}
