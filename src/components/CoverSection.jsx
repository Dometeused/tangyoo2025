"use client";
import { useState, useEffect, useRef } from "react";
import { FiSettings, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Modal from "@/components/Modal";

export default function CoverSection({ event }) {
  const { role } = useAppMode();
  const supabase = createClientComponentClient();

  // State
  const [coverUrl, setCoverUrl] = useState(event.cover_url || "");
  const [profileUrl, setProfileUrl] = useState(event.profile_url || "");
  const [offsetY, setOffsetY] = useState(event.cover_offset_y || 0);
  const [showProfile, setShowProfile] = useState(!!event.profile_url); // default ตาม DB
  const [showModal, setShowModal] = useState(false);

  // For UX
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  // ปรับตำแหน่ง cover (ลื่น)
  const handleMoveCover = async (delta) => {
    const newOffset = offsetY + delta;
    setOffsetY(newOffset);
    const { error } = await supabase
      .from("events")
      .update({ cover_offset_y: newOffset })
      .eq("id", event.id);
    if (error) alert("บันทึกตำแหน่งรูปไม่สำเร็จ");
  };

  // อัปโหลด cover ใหม่
  const handleUploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Session หมดอายุ/ยังไม่ได้ login");
      setUploadingCover(false);
      return;
    }
    const userId = user.id;
    const filename = `${Date.now()}_${file.name}`;
    const filePath = `${userId}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      alert("อัปโหลดไม่สำเร็จ");
      setUploadingCover(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);
    const newCoverUrl = urlData.publicUrl;

    const { error: patchError } = await supabase
      .from("events")
      .update({ cover_url: newCoverUrl })
      .eq("id", event.id);
    if (patchError) alert("บันทึก url ไม่สำเร็จ");
    setCoverUrl(newCoverUrl);
    setUploadingCover(false);
  };

  // อัปโหลด profile ใหม่
  const handleUploadProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingProfile(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Session หมดอายุ/ยังไม่ได้ login");
      setUploadingProfile(false);
      return;
    }
    const userId = user.id;
    const filename = `${Date.now()}_${file.name}`;
    const filePath = `${userId}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      alert("อัปโหลดไม่สำเร็จ");
      setUploadingProfile(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);
    const newProfileUrl = urlData.publicUrl;

    const { error: patchError } = await supabase
      .from("events")
      .update({ profile_url: newProfileUrl })
      .eq("id", event.id);
    if (patchError) alert("บันทึก url ไม่สำเร็จ");
    setProfileUrl(newProfileUrl);
    setShowProfile(true); // เมื่ออัปโหลดใหม่ auto show
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
          if (error) alert("ลบโปรไฟล์ในฐานข้อมูลไม่สำเร็จ");
          setProfileUrl("");
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
        {role === "owner" && (
          <button
            className="absolute top-4 right-4 z-30 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            onClick={() => setShowModal(true)}
            title="Settings"
          >
            <FiSettings size={24} />
          </button>
        )}

        {/* ปุ่มเลื่อน Cover */}
        {role === "owner" && (
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
