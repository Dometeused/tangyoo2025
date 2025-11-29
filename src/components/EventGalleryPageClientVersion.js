
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FullGallery from "@/components/FullGallery";

export default function EventGalleryPage() {
  const { id: eventId } = useParams();
  const [role, setRole] = useState("guest");
  const [log, setLog] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !eventId) {
      alert("⛔ ไม่พบไฟล์หรือ eventId");
      return;
    }

    const supabase = createClientComponentClient();
    const buffer = await file.arrayBuffer();
    const filePath = `event-gallery/${eventId}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("event-gallery")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("🚨 Upload error:", uploadError);
      alert(`อัปโหลด ${file.name} ไม่สำเร็จ`);
    } else {
      alert(`✅ อัปโหลด ${file.name} สำเร็จ`);
      setRefreshKey((prev) => prev + 1); // trigger reload
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🖼️ แกลเลอรี่ภาพทั้งหมด</h1>
      <div className="text-sm mb-2 text-gray-600">
        <p>📦 Event ID: <code>{eventId}</code></p>
        <p>🧑‍💻 Role: <code>{role}</code></p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      <FullGallery eventId={eventId} role={role} key={refreshKey} />
    </div>
  );
}
