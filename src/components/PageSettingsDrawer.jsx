"use client";
import { useState } from "react";
import { FaUpload, FaTrashAlt, FaMusic } from "react-icons/fa";

// ใส่ Preset BG สีหลัก (แก้ตรงนี้ถ้าอยากเพิ่มสี/ลาย)
const THEMES_BG = [
  { color: "#f8bbd0", label: "ชมพู" },
  { color: "#fff9e1", label: "ครีม" },
  { color: "#b3e5fc", label: "ฟ้า" },
  { color: "#ffd700", label: "ทอง" },
  { color: "#232323", label: "ดำ" },
];

export default function PageSettingsDrawer({
  open, onClose, event,
  onBGChange, onProfileUpload
}) {
  const [bg, setBG] = useState(event.bg || THEMES_BG[0].color);
  const [profile, setProfile] = useState(event.cover_url || "");
  const [uploading, setUploading] = useState(false);

  const handleBGChange = (color) => {
    setBG(color);
    onBGChange?.(color); // ← Hook เข้าระบบ (optional)
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // TODO: เชื่อม Supabase/Storage จริง
      setTimeout(() => {
        setProfile(URL.createObjectURL(file));
        setUploading(false);
        onProfileUpload?.(file);
      }, 1000);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
          onClick={onClose}
          title="ปิด"
        >✕</button>
        <h2 className="text-xl font-bold mb-6">ตั้งค่าหน้าเพจ</h2>
        {/* Section: BG/Theme */}
        <div className="mb-6">
          <div className="font-semibold mb-2">เปลี่ยนพื้นหลัง</div>
          <div className="flex gap-3 mb-2">
            {THEMES_BG.map(({ color, label }) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${bg === color ? "border-black ring-2" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                onClick={() => handleBGChange(color)}
                aria-label={label}
              />
            ))}
            <button
              className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-lg"
              title="อัปโหลดภาพพื้นหลัง (เร็วๆนี้)"
              disabled
            >
              <FaUpload />
            </button>
          </div>
        </div>
        {/* Section: Profile Image */}
        <div className="mb-6">
          <div className="font-semibold mb-2">รูปโปรไฟล์</div>
          <div className="flex items-center gap-4">
            <img
              src={profile || "/images/profile-placeholder.png"}
              alt="profile"
              className="w-16 h-16 rounded-full border"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="file" className="hidden" onChange={handleProfileUpload} />
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                <FaUpload /> อัปโหลด
              </span>
            </label>
            {profile && (
              <button
                className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded"
                onClick={() => setProfile("")}
              >
                <FaTrashAlt /> ลบ
              </button>
            )}
          </div>
        </div>
        {/* Section: BGM/Effect */}
        <div className="mb-4">
          <div className="font-semibold mb-2">เพลง / เอฟเฟกต์</div>
          <div className="flex items-center gap-2 opacity-50">
            <FaMusic />
            <select className="border rounded px-2 py-1 bg-gray-50" disabled>
              <option>-- เร็ว ๆ นี้ --</option>
            </select>
            <button className="px-2 py-1 bg-gray-100 rounded" disabled>
              ▶️ Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
