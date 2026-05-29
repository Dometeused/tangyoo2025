"use client";
import { useState, useEffect, useRef } from "react";
import { FiSettings, FiChevronUp, FiChevronDown, FiCamera, FiImage, FiLock, FiUnlock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Modal from "@/components/Modal";

export default function CoverSection({ event }) {
  const { role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const supabase = createClientComponentClient();

  // Cover & profile state
  const [coverUrl,    setCoverUrl]    = useState(event.cover_url    || "");
  const [bgUrl,       setBgUrl]       = useState(event.bg_url       || event.cover_url || "");
  const [profileUrl,  setProfileUrl]  = useState(event.profile_url  || "");
  const [offsetY,     setOffsetY]     = useState(event.cover_offset_y || 0);
  const [showProfile, setShowProfile] = useState(!!event.profile_url);
  const [showModal,   setShowModal]   = useState(false);

  // Privacy state
  const [isPrivate,     setIsPrivate]     = useState(event.is_private || false);
  const [password,      setPassword]      = useState("");
  const [showPassword,  setShowPassword]  = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [privacySaved,  setPrivacySaved]  = useState(false);

  const [uploadingCover,   setUploadingCover]   = useState(false);
  const [uploadingBg,      setUploadingBg]      = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadError,      setUploadError]      = useState("");

  // Upload helper
  const uploadImage = async (file, dbField, onSuccess) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploadError("Session หมดอายุ กรุณา login ใหม่"); return; }
    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(filePath, file, { upsert: true });
    if (upErr) { setUploadError("อัปโหลดไม่สำเร็จ"); return; }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);
    const { error: dbErr } = await supabase.from("events").update({ [dbField]: urlData.publicUrl }).eq("id", event.id);
    if (dbErr) { setUploadError("บันทึกไม่สำเร็จ"); return; }
    onSuccess(urlData.publicUrl);
    setUploadError("");
  };

  const handleMoveCover = async (delta) => {
    const newOffset = offsetY + delta;
    setOffsetY(newOffset);
    await supabase.from("events").update({ cover_offset_y: newOffset }).eq("id", event.id);
  };

  const handleUploadCover = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingCover(true);
    await uploadImage(file, "cover_url", (url) => { setCoverUrl(url); if (!bgUrl) setBgUrl(url); });
    setUploadingCover(false);
  };

  const handleUploadBg = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingBg(true);
    await uploadImage(file, "bg_url", (url) => setBgUrl(url));
    setUploadingBg(false);
  };

  const handleUploadProfile = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingProfile(true);
    await uploadImage(file, "profile_url", (url) => { setProfileUrl(url); setShowProfile(true); });
    setUploadingProfile(false);
  };

  const handleSavePrivacy = async () => {
    setSavingPrivacy(true);
    await supabase.from("events").update({
      is_private: isPrivate,
      event_password: isPrivate && password ? password : null,
    }).eq("id", event.id);
    setSavingPrivacy(false);
    setPrivacySaved(true);
    setTimeout(() => setPrivacySaved(false), 2000);
  };

  // Sync showProfile toggle → DB
  const prevShowProfile = useRef(showProfile);
  useEffect(() => {
    if (prevShowProfile.current === showProfile) return;
    prevShowProfile.current = showProfile;
    if (!showProfile && profileUrl) {
      supabase.from("events").update({ profile_url: null }).eq("id", event.id)
        .then(({ error }) => { if (!error) setProfileUrl(""); });
    }
  }, [showProfile, profileUrl, supabase, event.id]);

  return (
    <section className="relative w-full flex flex-col items-center mb-0 transition-all">
      <div
        className="w-full max-w-[2000px] mx-auto overflow-hidden relative"
        style={{
          borderRadius: "2.5rem",
          background: "#22222280",
          minHeight: "320px",
          height: "clamp(320px, 55vw, 580px)",
        }}
      >
        {/* Settings button */}
        {isOwner && (
          <button
            className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => setShowModal(true)}
            title="ตั้งค่าหน้าปก"
          >
            <FiSettings size={22} />
          </button>
        )}

        {/* Offset buttons */}
        {isOwner && coverUrl && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
            <button
              onClick={() => handleMoveCover(-20)}
              className="bg-white/90 backdrop-blur rounded-full shadow p-1.5 hover:bg-pink-50 transition-colors"
              title="เลื่อนภาพขึ้น"
            >
              <FiChevronUp size={22} />
            </button>
            <button
              onClick={() => handleMoveCover(20)}
              className="bg-white/90 backdrop-blur rounded-full shadow p-1.5 hover:bg-pink-50 transition-colors"
              title="เลื่อนภาพลง"
            >
              <FiChevronDown size={22} />
            </button>
          </div>
        )}

        {/* Cover image or placeholder */}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
            style={{ objectPosition: `center ${offsetY}px`, transition: "object-position 0.2s" }}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{
              border: "2.5px dashed rgba(255,255,255,0.25)",
              borderRadius: "2.5rem",
              background: "rgba(0,0,0,0.15)",
            }}
            onClick={() => isOwner && setShowModal(true)}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <FiImage size={32} className="text-white/50" />
            </div>
            <span className="text-white/50 text-sm font-medium tracking-wide">
              {isOwner ? "กดเพื่ออัปโหลดภาพปก" : "ยังไม่มีภาพปก"}
            </span>
          </div>
        )}
      </div>

      {/* Profile */}
      {profileUrl && showProfile && (
        <div
          className="absolute left-1/2 bottom-[1.5rem] -translate-x-1/2 z-30 bg-white rounded-2xl shadow-xl flex items-center justify-center w-28 h-28 md:w-44 md:h-44 border-[6px] border-white"
          style={{ overflow: "hidden" }}
        >
          <img src={profileUrl} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-5 w-full max-w-md mx-auto flex flex-col gap-5">
            <h2 className="text-lg font-bold text-gray-800">ตั้งค่าหน้าปก</h2>

            {uploadError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2">
                {uploadError}
              </div>
            )}

            {/* ── ภาพปก ── */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiImage size={15} /> ภาพปก (Cover)
              </p>
              {/* Preview */}
              <div
                className="w-full h-28 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ background: coverUrl ? "transparent" : "#f0f0f0", border: coverUrl ? "none" : "2px dashed #ddd" }}
              >
                {coverUrl
                  ? <img src={coverUrl} className="w-full h-full object-cover" alt="cover" />
                  : <span className="text-gray-300 text-sm flex flex-col items-center gap-1">
                      <FiImage size={28} />
                      <span>ยังไม่มีภาพปก</span>
                    </span>
                }
              </div>
              {/* Upload */}
              <label className="cursor-pointer w-full">
                <div className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-colors">
                  <FiCamera size={15} />
                  {uploadingCover ? "กำลังอัปโหลด..." : "เลือกภาพปก"}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadCover} disabled={uploadingCover} />
              </label>
              {/* Offset */}
              {coverUrl && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 w-20">ปรับตำแหน่ง:</span>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-pink-50 hover:border-pink-200 transition-colors shadow-sm"
                    onClick={() => handleMoveCover(-20)}
                  >
                    <FiChevronUp size={13} /> ขึ้น
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-pink-50 hover:border-pink-200 transition-colors shadow-sm"
                    onClick={() => handleMoveCover(20)}
                  >
                    <FiChevronDown size={13} /> ลง
                  </button>
                  <span className="text-xs text-gray-400 ml-1">{offsetY > 0 ? `+${offsetY}` : offsetY}px</span>
                </div>
              )}
            </div>

            {/* ── พื้นหลัง (BG) ── */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiImage size={15} /> พื้นหลังหน้างาน (BG)
                <span className="text-xs font-normal text-gray-400">— ถ้าไม่เลือกจะใช้ภาพปกแทน</span>
              </p>
              {bgUrl && bgUrl !== coverUrl && (
                <div className="w-full h-20 rounded-xl overflow-hidden">
                  <img src={bgUrl} className="w-full h-full object-cover" alt="bg" />
                </div>
              )}
              <label className="cursor-pointer w-full">
                <div className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
                  <FiImage size={15} />
                  {uploadingBg ? "กำลังอัปโหลด..." : "เลือกภาพพื้นหลัง"}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadBg} disabled={uploadingBg} />
              </label>
            </div>

            {/* ── รูปโปรไฟล์ ── */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiCamera size={15} /> รูปโปรไฟล์
              </p>
              {profileUrl && (
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow">
                  <img src={profileUrl} className="w-full h-full object-cover" alt="profile" />
                </div>
              )}
              <label className="cursor-pointer w-full">
                <div className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-colors">
                  <FiCamera size={15} />
                  {uploadingProfile ? "กำลังอัปโหลด..." : "เลือกรูปโปรไฟล์"}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadProfile} disabled={uploadingProfile} />
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input type="checkbox" checked={showProfile} onChange={e => setShowProfile(e.target.checked)} className="accent-pink-400 w-4 h-4" />
                แสดงรูปโปรไฟล์บนหน้างาน
              </label>
            </div>

            {/* ── Privacy ── */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {isPrivate ? <FiLock size={15} className="text-orange-500" /> : <FiUnlock size={15} />}
                ความเป็นส่วนตัว
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{isPrivate ? "🔒 Private — ต้องรหัสผ่าน" : "🌐 Public — ทุกคนเข้าดูได้"}</span>
                <button
                  onClick={() => setIsPrivate(v => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isPrivate ? "bg-orange-500" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isPrivate ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              {isPrivate && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="ตั้งรหัสผ่าน (ว่างไว้ = ไม่เปลี่ยน)"
                    className="w-full rounded-lg px-3 py-2 pr-10 text-sm border border-gray-200 bg-white outline-none focus:border-orange-400"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              )}
              <button
                onClick={handleSavePrivacy}
                disabled={savingPrivacy}
                className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "#f97316" }}
              >
                {privacySaved ? "✓ บันทึกแล้ว" : savingPrivacy ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
              </button>
            </div>

          </div>
        </Modal>
      )}
    </section>
  );
}
