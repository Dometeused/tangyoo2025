
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ProfileImagePickerModal({
  open, onClose, eventId, onSelect,
  label = "เลือกรูปจากแกลลอรี่"
}) {
  const supabase = createClientComponentClient();
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // โหลดรูป 5 ล่าสุด
  useEffect(() => {
    if (!open) return;
    (async () => {
      setError("");
      const { data, error } = await supabase
        .storage
        .from('gallery')
        .list(`${eventId}`, { limit: 5, sortBy: { column: 'created_at', order: 'desc' } });
      if (error) setError("โหลดรูปไม่สำเร็จ");
      if (data)
        setGallery(
          data
            .filter(i => i.name.match(/\.(jpg|jpeg|png)$/i))
            .map(img => ({
              url: supabase.storage.from('gallery').getPublicUrl(`${eventId}/${img.name}`).publicUrl,
              name: img.name
            }))
        );
    })();
  }, [open, eventId, uploading]);

  // อัปโหลด
  async function handleUpload(e) {
    setUploading(true);
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const { data, error } = await supabase
      .storage
      .from('gallery')
      .upload(`${eventId}/${file.name}`, file, { upsert: true });
    setUploading(false);
    if (error) setError("อัปโหลดไม่สำเร็จ");
    else if (data) {
      const url = supabase.storage.from('gallery').getPublicUrl(`${eventId}/${file.name}`).publicUrl;
      onSelect(url); // เลือกอัตโนมัติหลังอัป
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xs w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-black"
        >×</button>
        <div className="font-bold mb-3">{label}</div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex gap-2 mb-4">
          {gallery.map(img => (
            <img
              key={img.name}
              src={img.url}
              className="w-16 h-24 object-cover rounded border-2 border-gray-200 hover:border-pink-400 cursor-pointer"
              onClick={() => { onSelect(img.url); onClose(); }}
              alt=""
            />
          ))}
          {gallery.length === 0 && (
            <div className="text-sm text-gray-400 my-3">ยังไม่มีรูปในแกลลอรี่</div>
          )}
        </div>
        <label className="block">
          <span className="text-xs mb-1 block">หรืออัปโหลดภาพใหม่</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block"
          />
        </label>
      </div>
    </div>
  );
}
