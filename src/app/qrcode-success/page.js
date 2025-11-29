// /app/qrcode-success/page.js

import QRCode from "react-qr-code";

export default function QrCodeSuccess() {
  const eventUrl = "https://tangyoo.com/memory/1234"; // แก้ให้เป็น dynamic id
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-6">สร้างงานสำเร็จ!</h1>
      <div className="bg-gray-50 p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <QRCode value={eventUrl} size={168} />
        <div className="mt-4">
          <button
            className="bg-blue-600 text-white rounded-xl px-6 py-2 mr-2 shadow"
            // ฟังก์ชันดาวน์โหลด QR code (ดูตัวอย่างเพิ่มเติมได้)
          >
            ดาวน์โหลด QR Code
          </button>
          <button
            className="bg-orange-500 text-white rounded-xl px-6 py-2 shadow"
            // ฟังก์ชัน copy link
          >
            คัดลอกลิงก์
          </button>
        </div>
      </div>
      <a href="/dashboard" className="mt-8 text-blue-700 underline">ไปที่แดชบอร์ด</a>
    </main>
  );
}
