// /app/not-found.js
import Link from "next/link";

export const metadata = {
  title: "ไม่พบหน้านี้ | TangYoo",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">ไม่พบหน้าที่คุณต้องการ</h1>
      <p className="text-gray-500 mb-2">
        ลิงก์นี้อาจหมดอายุ ถูกลบ หรือพิมพ์ URL ผิด
      </p>
      <p className="text-gray-400 text-sm mb-8">
        หากคุณได้รับลิงก์จากเจ้าภาพ กรุณาติดต่อเจ้าภาพเพื่อขอลิงก์ใหม่
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          กลับหน้าแรก
        </Link>
        <Link
          href="/creation"
          className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          สร้างหน้างาน
        </Link>
      </div>
      <p className="mt-10 text-xs text-gray-300">© {new Date().getFullYear()} TangYoo</p>
    </main>
  );
}
