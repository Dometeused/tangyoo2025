// src/components/ai-video/VideoAIResult.jsx

"use client";
import { useState } from "react";

export default function VideoAIResult({
  videoUrl,
  message,
  onRetry,
  loading,
  error
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-3" />
        <div className="text-pink-500 font-semibold">กำลังประมวลผลวิดีโอ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        {error}
        <button
          className="block mx-auto mt-3 px-4 py-2 bg-gray-200 rounded"
          onClick={onRetry}
        >ลองใหม่อีกครั้ง</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="rounded-xl shadow max-w-[380px] w-full"
          poster="/ai-video-poster.png"
        />
      ) : (
        <div className="text-gray-400">ยังไม่มีวิดีโอ</div>
      )}
      {/* ถ้อยคำสุดท้าย */}
      <div className="bg-gray-50 rounded-lg p-3 border max-w-xs w-full text-center text-gray-700 text-sm mt-1">
        “{message}”
      </div>
      {/* ปุ่มดาวน์โหลด/แชร์ */}
      {videoUrl && (
        <div className="flex gap-3 justify-center mt-2">
          <a
            href={videoUrl}
            download
            className="bg-green-600 text-white px-4 py-2 rounded shadow text-sm hover:bg-green-700"
          >ดาวน์โหลดวิดีโอ</a>
          {/* Optional: ปุ่มแชร์ไป LINE, FB */}
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded shadow text-sm">แชร์</button> */}
        </div>
      )}
      {/* ปุ่มสร้างใหม่ (dev/debug เท่านั้น) */}
      {/* <button onClick={onRetry} className="mt-2 text-xs underline text-pink-400">สร้างใหม่</button> */}
    </div>
  );
}
