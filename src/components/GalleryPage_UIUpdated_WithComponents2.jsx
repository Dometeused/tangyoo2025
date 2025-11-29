// 📄 Updated GalleryPage.jsx with enhanced UI (single file, no external components)
"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// SLOT CONFIG
const SLOT_CONFIG = [
  { key: "feature_image_1", label: "Feature 1", icon: "⭐" },
  { key: "feature_image_2", label: "Feature 2", icon: "⭐" },
  { key: "feature_image_3", label: "Feature 3", icon: "⭐" },
  { key: "cover_url", label: "Cover", icon: "🖼️" },
  { key: "profile_url", label: "Profile", icon: "👤" },
  { key: "qr_url", label: "QR", icon: "🔳" },
  { key: "schedule_url", label: "Schedule", icon: "🕒" }
];

export default function GalleryPage() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [slotImages, setSlotImages] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [viewImage, setViewImage] = useState(null);
  const supabase = createClientComponentClient();

  // Public URL
  const getImgPublicUrl = (imgName) => {
    if (!imgName) return null;
    if (imgName.startsWith("http")) return imgName;
    return supabase.storage.from("gallery").getPublicUrl(`${userId}/${imgName}`).data.publicUrl;
  };

  const getImgUrl = getImgPublicUrl;

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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;
    setUploading(true);
    const filename = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("gallery")
      .upload(`${userId}/${filename}`, file, { upsert: true });
    setUploading(false);
    if (!error) window.location.reload();
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
      patch[key] = slotImages[key]
        ? getImgPublicUrl(slotImages[key])
        : null;
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

  return (
    <main className="min-h-screen bg-[#101010] text-white px-4 py-8 max-w-5xl mx-auto">
      {!user ? (
        <div className="p-6 rounded-xl bg-yellow-50 text-yellow-800 text-center shadow">
          กรุณา Login เพื่อใช้งาน Gallery
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">จัดการภาพใน Gallery</h2>
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

          {/* Feature + Slot Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {SLOT_CONFIG.map(({ key, label, icon }) => (
              <div key={key} className="bg-[#181818] rounded-xl p-3 shadow">
                <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <span>{icon}</span> <span>{label}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setViewImage(getImgUrl(slotImages[key]))}
                  >
                    {slotImages[key] ? (
                      <img
                        src={getImgUrl(slotImages[key])}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-center pt-8 text-gray-500 text-sm">ยังไม่เลือก</div>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {images.map((img) => (
                      <div
                        key={img.name}
                        onClick={() => handleSelectSlot(key, img.name)}
                        className={`cursor-pointer aspect-square rounded border
                          ${slotImages[key] === img.name ? "ring-2 ring-blue-400" : "border-gray-600"}`}
                        style={{
                          backgroundImage: `url(${getImgUrl(img.name)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                        title={img.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload & Gallery */}
          <div className="mb-6">
            <label className="bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
              + อัปโหลดรูป
              <input type="file" hidden onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {images.map((img) => (
              <div key={img.name} className="relative group">
                <img
                  src={getImgUrl(img.name)}
                  className="w-full aspect-square object-cover rounded-lg border border-gray-600 cursor-pointer"
                  onClick={() => setViewImage(getImgUrl(img.name))}
                />
                <button
                  onClick={() => handleDelete(img.name)}
                  className="absolute top-1 right-1 text-xs bg-red-600 text-white px-2 rounded opacity-0 group-hover:opacity-100"
                >
                  ลบ
                </button>
                {getUsedIn(img.name).length > 0 && (
                  <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs rounded px-1 shadow">
                    {getUsedIn(img.name).join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Confirm / Cancel */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700" onClick={() => window.location.reload()}>
              ยกเลิก
            </button>
            <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold" onClick={handleConfirm}>
              ✅ ยืนยันการเลือกภาพ
            </button>
          </div>

          {/* Lightbox */}
          {viewImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={() => setViewImage(null)}>
              <img src={viewImage} className="max-w-[90%] max-h-[90%] rounded-xl" />
            </div>
          )}
        </>
      )}
    </main>
  );
}