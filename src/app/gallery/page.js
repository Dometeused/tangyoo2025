"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SlotImageSelector from "@/components/SlotImageSelector";
import IconHeaderSection from "@/components/IconHeaderSection";
import UploadButton from "@/components/UploadButton";
import GalleryGridImage from "@/components/GalleryGridImage";
import LightboxWrapper from "@/components/LightboxWrapper";
import { useAppMode } from "@/context/AppModeContext";

// SLOT CONFIG
const SLOT_CONFIG = [
  { key: "feature_image_1", label: "Feature 1", icon: "⭐" },
  { key: "feature_image_2", label: "Feature 2", icon: "⭐" },
  { key: "feature_image_3", label: "Feature 3", icon: "⭐" },
  { key: "cover_url", label: "Cover", icon: "🖼️" },
  { key: "profile_url", label: "Profile", icon: "👤" },
  { key: "qr_url", label: "QR", icon: "🔳" },
  { key: "schedule_url", label: "Schedule", icon: "🕒" },
];

export default function GalleryGlobalPage() {
  const { id: eventId } = useParams();
  const { role } = useAppMode();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [slotImages, setSlotImages] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [viewImage, setViewImage] = useState(null);

  const getImgPublicUrl = (imgName) => {
    if (!imgName || imgName.startsWith("http")) return imgName;
    const result = supabase.storage.from("gallery").getPublicUrl(`${userId}/${imgName}`);
    return result.data?.publicUrl || null;
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setUserId(data.user?.id || "");
      setUserEmail(data.user?.email || "");
    });
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    supabase
      .from("events")
      .select("*")
      .eq("email", userEmail)
      .then(({ data }) => {
        setEvents(data || []);
        if (data?.length > 0) {
          setSelectedEventId(data[0].id);
          setSlotImages(data[0]);
        }
      });
  }, [userEmail]);

  useEffect(() => {
    if (!userId) return;
    supabase.storage
      .from("gallery")
      .list(userId + "/", { limit: 100 })
      .then(({ data }) => {
        setImages(data || []);
      });
  }, [userId]);

  const handleEventChange = (e) => {
    const ev = events.find(ev => ev.id === e.target.value);
    setSelectedEventId(ev.id);
    setSlotImages(ev);
  };

  // ✅ MULTI FILE UPLOAD
  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || !userId) return;
    setUploading(true);
    const uploadTasks = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filename = `${Date.now()}_${Math.random().toString(36).slice(2,7)}_${file.name}`;
      uploadTasks.push(
        supabase.storage.from("gallery").upload(`${userId}/${filename}`, file, { upsert: true })
      );
    }
    await Promise.all(uploadTasks);
    setUploading(false);
    window.location.reload();
  };

  const handleSelectSlot = (slotKey, imgName) => {
    setSlotImages((prev) => ({
      ...prev,
      [slotKey]: prev[slotKey] === imgName ? null : imgName,
    }));
  };

  const handleDelete = async (imgName) => {
    if (!window.confirm("ลบรูปนี้?")) return;
    await supabase.storage.from("gallery").remove([`${userId}/${imgName}`]);
    setImages((prev) => prev.filter(img => img.name !== imgName));
    setSlotImages((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k] === imgName) next[k] = null;
      });
      return next;
    });
  };

  const handleConfirm = async () => {
    const patch = {};
    for (const key of SLOT_CONFIG.map(s => s.key)) {
      const val = slotImages[key];
      if (!val) continue;
      const isUrl = val.startsWith("http");
      const publicUrl = isUrl ? val : getImgPublicUrl(val);
      if (publicUrl && !publicUrl.includes("/object/public/gallery/https")) {
        patch[key] = publicUrl;
      }
    }
    const { error } = await supabase
      .from("events")
      .update(patch)
      .eq("id", selectedEventId);

    if (error) alert("บันทึกผิดพลาด");
    else alert("บันทึกสำเร็จ!");
  };

  const getUsedIn = (imgName) =>
    SLOT_CONFIG.filter(slot => slotImages[slot.key] === imgName).map(slot => slot.label);

  // ---------- RENDER ----------
  return (
    <main className="min-h-screen bg-[#101010] text-white px-4 py-8 max-w-6xl mx-auto">
      {!user ? (
        <div className="p-6 rounded-xl bg-yellow-50 text-yellow-800 text-center shadow">
          กรุณา Login เพื่อใช้งาน Gallery
        </div>
      ) : (
        <>
          {/* หัวข้อใหม่แบบ Dashboard ฟีลอบอุ่น ฟอนต์ใหญ่ ขยาย margin */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight text-[#F5E9CE] mb-1 font-sukhumvit"
                style={{ letterSpacing: ".01em" }}
              >
                จัดการภาพใน Gallery
              </h2>
              <div className="text-sm text-[#bfa] font-light mt-1 hidden">
                {/* (Optional subtitle) */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-full bg-[#ECE7DF] text-[#635D4B] font-semibold hover:bg-[#DFD9CB] shadow-sm border border-[#D9D3C2] transition text-sm"
                style={{ letterSpacing: ".01em" }}
              >
                ← กลับสู่ Dashboard
              </button>
              <select
                className="bg-white text-black px-3 py-1 rounded-lg"
                value={selectedEventId}
                onChange={handleEventChange}
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name || ev.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Slot Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {SLOT_CONFIG.map(({ key, label, icon }) => (
              <SlotImageSelector
                key={key}
                label={label}
                icon={icon}
                value={slotImages[key]}
                onSelect={(imgName) => handleSelectSlot(key, imgName)}
                images={images}
                getImgUrl={getImgPublicUrl}
                viewImage={setViewImage}
              />
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-3 mb-6">
            <UploadButton onUpload={handleUpload} uploading={uploading} className="w-16 h-16" />
            <span className="text-sm text-[#ECE7DF]">อัปโหลดรูปใหม่</span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
            {images.map((img) => (
              <GalleryGridImage
                key={img.name}
                image={img}
                getUrl={getImgPublicUrl}
                onClick={() => setViewImage(getImgPublicUrl(img.name))}
                onDelete={() => handleDelete(img.name)}
                usedIn={getUsedIn(img.name)}
              />
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700" onClick={() => window.location.reload()}>
              ยกเลิก
            </button>
            <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold" onClick={handleConfirm}>
              ✅ ยืนยันการเลือกภาพ
            </button>
          </div>

          {viewImage && (
            <LightboxWrapper image={viewImage} onClose={() => setViewImage(null)} />
          )}
        </>
      )}
    </main>
  );
}
