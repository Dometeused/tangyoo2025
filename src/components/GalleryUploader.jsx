"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function GalleryUploader({ eventId, onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${eventId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("event-gallery")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setError("เกิดข้อผิดพลาดในการอัปโหลด");
    } else {
      alert("✅ อัปโหลดสำเร็จ");
      setFile(null);
      onUpload?.(); // 👉 เรียกฟังก์ชัน refresh ถ้ามีส่งมา
    }

    setUploading(false);
  };

  return (
    <div className="my-6 border border-gray-600 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">📤 อัปโหลดรูปภาพ</h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
