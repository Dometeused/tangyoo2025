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

  // Audio State & Logic (Ported from DraftPanel)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const getThemeAudio = (theme) => {
    switch (theme?.toLowerCase()) {
      case 'wedding': return '/audio/wedding.mp3';
      case 'funeral': return '/audio/funeral.mp3';
      case 'birthday': return '/audio/birthday.mp3';
      default: return '/audio/wedding.mp3';
    }
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    // YouTube
    if (event.youtube_link) {
      setIsPlaying(!isPlaying);
      return;
    }
    // Local Audio
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
        {/* Audio Elements (Hidden) */}
        {event.youtube_link && isPlaying ? (
          <div className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYouTubeId(event.youtube_link)}?autoplay=1&loop=1&playlist=${getYouTubeId(event.youtube_link)}`}
              title="YouTube audio"
              allow="autoplay"
            />
          </div>
        ) : (
          <audio ref={audioRef} src={getThemeAudio(event.theme)} loop />
        )}

        {/* Vinyl UI (Top Right) */}
        {(event.theme || event.theme_song || event.youtube_link) && (
          <div
            onClick={toggleAudio}
            className={`
                 absolute top-6 right-6 flex items-center gap-3 
                 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full 
                 border ${isPlaying ? 'border-green-400/30' : 'border-white/10'} 
                 z-40 cursor-pointer hover:bg-black/40 hover:scale-105 transition-all duration-300
                 shadow-lg hover:shadow-xl group
             `}
          >
            <div
              className={`w-9 h-9 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center shadow-2xl ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '4s' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-black border border-gray-700/50" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] text-white/70 uppercase tracking-widest leading-none mb-0.5 font-medium group-hover:text-white/90 transition-colors">
                {isPlaying ? "Now Playing" : "Tap to Play"}
              </span>
              <span className="text-xs text-white font-medium leading-tight drop-shadow-sm max-w-[140px] truncate">
                {event.theme_song || event.theme ? `${event.theme || 'Event'} Vibes` : "Memory Soundtrack"}
              </span>
            </div>
          </div>
        )}
        {/* ปุ่ม Settings */}
        {role === "owner" && (
          <button
            className="absolute top-4 left-4 z-30 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
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
