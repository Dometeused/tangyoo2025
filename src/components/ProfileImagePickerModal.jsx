"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { compressImage } from "@/lib/compressImage";

export default function ProfileImagePickerModal({
  open, onClose, eventId, onSelect,
  label = "เลือกรูปจากแกลลอรี่"
}) {
  const supabase = createClientComponentClient();
  const [gallery, setGallery]     = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  // โหลดรูป 8 ล่าสุดใน eventId/
  useEffect(() => {
    if (!open || !eventId) return;
    setError("");
    supabase.storage
      .from("gallery")
      .list(eventId, { limit: 8, sortBy: { column: "created_at", order: "desc" } })
      .then(({ data, error: listErr }) => {
        if (listErr) { setError("โหลดรูปไม่สำเร็จ"); return; }
        const imgs = (data || [])
          .filter(i => /\.(jpg|jpeg|png|webp)$/i.test(i.name))
          .map(img => ({
            url: supabase.storage.from("gallery").getPublicUrl(`${eventId}/${img.name}`).data.publicUrl,
            name: img.name,
          }));
        setGallery(imgs);
      });
  }, [open, eventId, uploading, supabase]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      // บีบก่อน upload
      const compressed = await compressImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.88 });
      const path = `${eventId}/${Date.now()}_${compressed.name}`;
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, compressed, { upsert: true });
      if (upErr) { setError("อัปโหลดไม่สำเร็จ: " + upErr.message); return; }
      const url = supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;
      onSelect(url);
      onClose();
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm w-full mx-4 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">{label}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">✕</button>
        </div>

        {error && <div className="text-red-500 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2">{error}</div>}

        {/* Gallery grid */}
        <div className="grid grid-cols-4 gap-2 mb-4 max-h-48 overflow-y-auto">
          {gallery.length > 0
            ? gallery.map(img => (
                <img
                  key={img.name}
                  src={img.url}
                  className="w-full aspect-square object-cover rounded-lg border-2 border-transparent hover:border-pink-400 cursor-pointer transition-all"
                  onClick={() => { onSelect(img.url); onClose(); }}
                  alt=""
                />
              ))
            : <div className="col-span-4 text-center text-sm text-gray-400 py-6">
                ยังไม่มีรูปในแกลลอรี่<br/>
                <span className="text-xs">อัปโหลดรูปด้านล่างได้เลย</span>
              </div>
          }
        </div>

        {/* Upload */}
        <label className="cursor-pointer block">
          <div className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-dashed text-sm transition-colors ${
            uploading
              ? "border-gray-200 text-gray-400"
              : "border-pink-200 text-pink-500 hover:border-pink-400 hover:bg-pink-50"
          }`}>
            {uploading ? "กำลังอัปโหลด..." : "📷 อัปโหลดรูปใหม่"}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

      </div>
    </div>
  );
}
