"use client";
import { useState } from "react";

export default function AIVideoGenerator({ profileImage, initialMessage }) {
  const [message, setMessage] = useState(initialMessage || "");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  async function handleGenerate() {
    setLoading(true);
    // MOCK: สมมุติใช้เวลา 2 วินาที แล้วแสดง video
    setTimeout(() => {
      setVideoUrl("https://samplelib.com/mp4/sample-5s.mp4"); // วิดีโอตัวอย่าง
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow max-w-md mx-auto my-6">
      <div className="flex gap-4 items-center mb-4">
        <img
          src={profileImage || "/profile-placeholder.png"}
          alt=""
          className="w-20 h-28 object-cover rounded border"
        />
        <textarea
          className="border p-2 rounded w-full"
          rows={3}
          placeholder="ข้อความที่อยากให้พูด..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading || !message}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "กำลังสร้าง..." : "สร้างวิดีโอ AI"}
      </button>
      {videoUrl && (
        <video className="mt-4 w-full rounded" controls src={videoUrl} />
      )}
    </div>
  );
}
