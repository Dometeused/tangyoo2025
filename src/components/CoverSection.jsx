"use client";
import { useState, useEffect, useRef } from "react";
// Audio handled by BGMPlayer in InvitationPage — no audio logic here
import { FiSettings, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Modal from "@/components/Modal";

export default function CoverSection({ event }) {
  const { role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const supabase = createClientComponentClient();

  // State
  const [coverUrl, setCoverUrl] = useState(event.cover_url || "");
  const [profileUrl, setProfileUrl] = useState(event.profile_url || "");
  const [offsetY, setOffsetY] = useState(event.cover_offset_y || 0);
  const [showProfile, setShowProfile] = useState(!!event.profile_url); // default ตาม DB
  const [showModal, setShowModal] = useState(false);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Helper upload ใช้ร่วมกัน
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
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    await uploadImage(file, "cover_url", (url) => setCoverUrl(url));
    setUploadingCover(false);
  };

  const handleUploadProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingProfile(true);
    await uploadImage(file, "profile_url", (url) => { setProfileUrl(url); setShowProfile(true); });
    setUploadingProfile(false);
  };

  // --- แก้ตรงนี้ --- //
  const prevShowProfile = useRef(showProfile);
  useEffect(() => {
    if (prevShowProfile.current === showProfile) return;
    prevShowProfile.current = showProfile;
    if (!showProfile && profileUrl) {
      supabase
        .from("events")
        .update({ profile_url: null })
        .eq("id", event.id)
        .then(({ error }) => {
          if (!error) setProfileUrl("");
        });
    }
  }, [showProfile, profileUrl, supabase, event.id]);
  // --- end --- //

  return (
    <section
      className="relative w-full flex flex-col items-center mb-0 transition-all"
    >
      <div
        className="w-full max-w-[2000px] mx-auto overflow-hidden relative"
        style={{
          borderRadius: "2.5rem",
          background: "#2222",
          minHeight: "320px",
          height: "clamp(320px, 55vw, 580px)",
        }}
      >
        {/* ปุ่ม Settings */}
        {isOwner && (
          <button
            className="absolute top-4 left-4 z-30 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            onClick={() => setShowModal(true)}
            title="Settings"
          >
            <FiSettings size={24} />
          </button>
        )}

        {/* ปุ่มเลื่อน Cover */}
        {isOwner && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
            <button
              onClick={() => handleMoveCover(-20)}
              className="bg-white rounded-full shadow p-1 hover:bg-pink-100"
              title="เลื่อนขึ้น"
              tabIndex={0}
            >
              <FiChevronUp size={24} />
            </button>
            <button
              onClick={() => handleMoveCover(20)}
              className="bg-white rounded-full shadow p-1 hover:bg-pink-100"
              title="เลื่อนลง"
              tabIndex={0}
            >
              <FiChevronDown size={24} />
            </button>
          </div>
        )}

        {/* Cover Image */}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
            style={{
              objectPosition: `center ${offsetY}px`,
              transition: "object-position 0.2s",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
            No Cover
          </div>
        )}
      </div>

      {/* Profile (แสดง/ซ่อน) */}
      {profileUrl && showProfile && (
        <div
          className="
            absolute left-1/2 bottom-[1.5rem] md:bottom-[1.5rem] -translate-x-1/2 z-30
            bg-white rounded-2xl shadow-xl flex items-center justify-center
            w-28 h-28 md:w-44 md:h-44 border-[6px] border-white
          "
          style={{ overflow: "hidden" }}
        >
          <img
            src={profileUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}



      {/* MODAL SETTINGS */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4 max-w-md mx-auto flex flex-col gap-6">
            <div className="text-lg font-bold mb-3">ตั้งค่าหน้าปก</div>
            {uploadError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2">{uploadError}</div>
            )}
            {/* Cover */}
            <div>
              <div className="mb-2 font-medium">เปลี่ยนภาพปก (Cover)</div>
              <input
                type="file"
                accept="image/*"
                className="mb-2"
                onChange={handleUploadCover}
                disabled={uploadingCover}
              />
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-gray-100 rounded shadow"
                  onClick={() => handleMoveCover(-20)}
                  title="เลื่อนขึ้น"
                >
                  <FiChevronUp />
                </button>
                <button
                  className="px-3 py-1 bg-gray-100 rounded shadow"
                  onClick={() => handleMoveCover(20)}
                  title="เลื่อนลง"
                >
                  <FiChevronDown />
                </button>
                <span className="text-xs text-gray-400 ml-2">OffsetY: {offsetY}px</span>
              </div>
            </div>
            {/* Profile */}
            <div>
              <div className="mb-2 font-medium">เปลี่ยนรูปโปรไฟล์ (Profile)</div>
              <input
                type="file"
                accept="image/*"
                className="mb-2"
                onChange={handleUploadProfile}
                disabled={uploadingProfile}
              />
              <label className="inline-flex items-center gap-2 mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showProfile}
                  onChange={e => setShowProfile(e.target.checked)}
                  className="accent-pink-400"
                />
                แสดงรูปโปรไฟล์บนหน้า
              </label>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
