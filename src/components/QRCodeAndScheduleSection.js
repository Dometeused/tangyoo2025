"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DresscodePicker from "@/components/DressCodePicker";
import { FiCopy, FiDownload } from "react-icons/fi";
import Countdown from "@/components/Countdown";
import VideoEmbedCard from "@/components/VideoEmbedCard";
import QRCode from "react-qr-code";
import AIVideoSection from "@/components/ai-video/AIVideoSection";

export default function QRCodeAndScheduleSection({
  qrImageUrl,
  scheduleImageUrl,
  event,
}) {
  const supabase = createClientComponentClient();
  const { role, theme, phase } = useAppMode();

  const THEME_STYLES = {
    funeral: {
      heading: "text-white drop-shadow-md",
      text: "text-gray-200",
      subtext: "text-gray-400",
      border: "border-gray-600",
      buttonPrimary: "bg-white text-black hover:bg-gray-200",
      buttonSecondary: "bg-gray-800 text-gray-300 hover:bg-gray-700",
      input: "bg-gray-900 border-gray-700 text-white placeholder-gray-500",
    },
    wedding: {
      heading: "text-[#6b2d4a]",
      text: "text-stone-700",
      subtext: "text-stone-400",
      border: "border-rose-100",
      buttonPrimary: "bg-[#6b2d4a] text-white hover:bg-[#5a2540]",
      buttonSecondary: "bg-rose-50 text-[#6b2d4a] hover:bg-rose-100",
      input: "bg-white border-rose-100 text-stone-800 placeholder-stone-400",
    },
    family: {
      heading: "text-orange-700",
      text: "text-gray-800",
      subtext: "text-gray-500",
      border: "border-orange-200",
      buttonPrimary: "bg-orange-500 text-white hover:bg-orange-600",
      buttonSecondary: "bg-orange-50 text-orange-700 hover:bg-orange-100",
      input: "bg-white border-orange-200 text-gray-800 placeholder-gray-400",
    },
    default: {
      heading: "text-gray-800",
      text: "text-gray-700",
      subtext: "text-gray-500",
      border: "border-gray-200",
      buttonPrimary: "bg-black text-white hover:bg-gray-800",
      buttonSecondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      input: "bg-white border-gray-300 text-gray-800 placeholder-gray-400",
    }
  };
  const tStyle = THEME_STYLES[theme] || THEME_STYLES.default;

  const isFuneral = theme === "funeral";
  const isMemoryPhase = phase === "memory";

  // Video Mode: 'ai' | 'youtube' | 'none'
  const [videoMode, setVideoMode] = useState(event?.video_mode || (isFuneral ? "ai" : "youtube"));
  const [savingMode, setSavingMode] = useState(false);

  // Video Embed
  const [videoUrl, setVideoUrl] = useState(event?.video_url || "");
  const [videoInput, setVideoInput] = useState(videoUrl);
  const [savingVideo, setSavingVideo] = useState(false);

  // Lightbox
  const [zoom, setZoom] = useState({ open: false, url: "" });

  // QR Code
  const qrRef = useRef(null);
  const eventUrl = typeof window !== "undefined"
    ? `${window.location.origin}/event/${event?.id}`
    : `https://tangyoo.com/event/${event?.id}`;

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = `qr-${event?.id || "event"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  // QR note
  const [editing, setEditing] = useState(false);
  const [qrNote, setQrNote] = useState(event?.qr_note || "");
  const [saving, setSaving] = useState(false);

  // Bank info
  const [editingBank, setEditingBank] = useState(false);
  const [bankInfo, setBankInfo] = useState(event?.bank_info || "");
  const [savingBank, setSavingBank] = useState(false);

  const handleCopy = () => {
    const m = bankInfo.match(/\d{6,}/g);
    const accountNum = m ? m[0] : "";
    if (accountNum) {
      navigator.clipboard.writeText(accountNum);
      alert("คัดลอกเลขบัญชีแล้ว!");
    }
  };

  const handleSaveVideoMode = async (mode) => {
    setSavingMode(true);
    setVideoMode(mode);
    await supabase.from("events").update({ video_mode: mode }).eq("id", event.id);
    setSavingMode(false);
  };

  const handleSaveVideo = async () => {
    setSavingVideo(true);
    setVideoUrl(videoInput);
    await supabase.from("events").update({ video_url: videoInput }).eq("id", event.id);
    setSavingVideo(false);
  };

  const handleSaveQrNote = async () => {
    setSaving(true);
    await supabase.from("events").update({ qr_note: qrNote }).eq("id", event.id);
    setSaving(false);
    setEditing(false);
  };

  const handleSaveBank = async () => {
    setSavingBank(true);
    await supabase.from("events").update({ bank_info: bankInfo }).eq("id", event.id);
    setSavingBank(false);
    setEditingBank(false);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-start">

      {/* 2. VIDEO SECTION (Mobile: Order 2, Desktop: Order 1/Left) */}
      <div className="flex-1 w-full order-2 md:order-1 flex flex-col items-center justify-center">

        {/* Toggle Video Mode (Owner Only) */}
        {role === "owner" && !isMemoryPhase && (
          <div className={`flex p-1 rounded-full mb-4 shadow-sm relative z-20 ${theme === 'funeral' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {["ai", "youtube", "none"].map((m) => {
              const label = m === "ai" ? "AI Video" : m === "youtube" ? "YouTube" : "ปิด";
              const isActive = videoMode === m;
              const activeClass = theme === 'funeral'
                ? "bg-gray-600 text-white font-bold shadow"
                : "bg-white shadow text-pink-600 font-bold";
              const inactiveClass = theme === 'funeral' ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700";

              return (
                <button
                  key={m}
                  onClick={() => handleSaveVideoMode(m)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${isActive ? activeClass : inactiveClass}`}
                  disabled={savingMode}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Render Content Based on Mode */}
        {videoMode === "none" ? (
          // Placeholder or Empty
          role === "owner" ? (
            <div className={`w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center text-sm ${tStyle.border} ${tStyle.subtext}`}>
              ปิดการแสดงผลวิดีโอ
            </div>
          ) : null
        ) : videoMode === "ai" ? (
          // AI Video Component
          <div className="w-full max-w-[420px]">
            <AIVideoSection event={event} />
          </div>
        ) : (
          // YouTube Component
          <>
            {/* Video Input (Owner) */}
            {role === "owner" && !isMemoryPhase && (
              <div className="mb-2 w-full flex flex-col items-center z-20 relative">
                <input
                  value={videoInput}
                  onChange={e => setVideoInput(e.target.value)}
                  className={`border px-3 py-2 rounded shadow-sm w-full max-w-xs mb-2 backdrop-blur ${tStyle.input}`}
                  placeholder="YouTube URL"
                />
                <button
                  onClick={handleSaveVideo}
                  className={`px-4 py-1.5 rounded shadow transition ${tStyle.buttonPrimary}`}
                  disabled={savingVideo}
                >
                  {savingVideo ? "บันทึก..." : "บันทึกวิดีโอ"}
                </button>
              </div>
            )}

            {/* Video Embed */}
            {videoUrl ? (
              <VideoEmbedCard
                src={videoUrl.replace("/watch?v=", "/embed/").replace("youtu.be/", "youtube.com/embed/")}
                title="Multimedia Video"
                link={videoUrl}
              />
            ) : (
              <div className={`hidden md:block w-full max-w-sm h-48 rounded-xl border flex items-center justify-center ${tStyle.border} ${tStyle.subtext} ${theme === 'funeral' ? 'bg-gray-800/50' : 'bg-gray-50/50'}`}>
                No YouTube Video
              </div>
            )}
          </>
        )}
      </div>

      {/* 1. SCHEDULE SECTION (Mobile: Order 1, Desktop: Order 2/Center) */}
      <div className="flex-1 w-full order-1 md:order-2 flex flex-col items-center">
        <div className={`mb-3 text-center font-bold text-lg tracking-wide ${tStyle.heading}`}>กำหนดการ</div>
        <div
          className={`relative cursor-zoom-in rounded-2xl overflow-hidden shadow-xl bg-white transition-transform hover:scale-[1.02] border-4 ${theme === 'funeral' ? 'border-gray-700' : 'border-white'}`}
          onClick={() => scheduleImageUrl && setZoom({ open: true, url: scheduleImageUrl })}
          title="คลิกเพื่อดูภาพใหญ่"
        >
          <Image
            src={scheduleImageUrl || "/images/schedule-mock.png"}
            alt="กำหนดการ"
            width={400}
            height={300}
            className="w-full max-w-[380px] h-auto object-contain"
          />
        </div>

        {/* Countdown (Mobile & Desktop) */}
        {!isFuneral && !isMemoryPhase && (
          <div className="mt-6 mb-2">
            <Countdown eventDate={event.date || event.start_datetime} />
          </div>
        )}

        {/* Add to Calendar */}
        {!isFuneral && !isMemoryPhase && (event.date || event.start_datetime) && (
          <div className="mt-3">
            <a
              href={(() => {
                const d = (event.date || event.start_datetime || "").replace(/-/g, "");
                const title = encodeURIComponent(event.name || "งานสำคัญ");
                const location = encodeURIComponent(event.place || "");
                return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${d}/${d}&location=${location}`;
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#4b5563", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
            >
              📅 บันทึกลง Google Calendar
            </a>
          </div>
        )}

        {/* Dresscode (Moved here as requested) */}
        <div className="mt-6 w-full flex flex-col items-center">
          <DresscodePicker event={event} />
        </div>
      </div>

      {/* 3. QR SECTION (Mobile: Order 3, Desktop: Order 3/Right) */}
      <div className="flex-1 w-full order-3 md:order-3 flex flex-col items-center">

        {/* Label */}
        <div className={`mb-3 text-center font-bold text-lg tracking-wide ${tStyle.heading}`}>
          {isFuneral ? "QR รำลึก" : "QR เข้างาน"}
        </div>

        {/* Generated QR Code */}
        <div
          ref={qrRef}
          className={`rounded-2xl shadow-lg p-4 border ${tStyle.border}`}
          style={{ background: "#ffffff" }}
        >
          <QRCode
            value={eventUrl}
            size={160}
            fgColor={isFuneral ? "#3e2723" : theme === "anniversary" ? "#6b4a1e" : "#6b2d4a"}
            bgColor="#ffffff"
            style={{ display: "block" }}
          />
        </div>

        {/* Download button (Owner only) */}
        {role === "owner" && (
          <button
            onClick={handleDownloadQR}
            className={`mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md ${tStyle.buttonSecondary}`}
          >
            <FiDownload size={12} />
            บันทึก QR
          </button>
        )}

        {/* URL preview (tiny) */}
        <p className={`mt-2 text-[10px] text-center break-all opacity-40 max-w-[160px] ${tStyle.text}`}>
          {eventUrl}
        </p>

        {/* QR Note */}
        <div className="mt-4 w-full text-center">
          {editing && role === "owner" ? (
            <div className={`flex flex-col items-center gap-2 p-3 rounded-lg backdrop-blur mx-auto max-w-xs shadow-sm ${theme === 'funeral' ? 'bg-gray-800/90' : 'bg-white/80'}`}>
              <input
                className={`w-full border p-2 rounded text-center text-sm ${tStyle.input}`}
                value={qrNote}
                onChange={e => setQrNote(e.target.value)}
                placeholder="ข้อความใต้ QR"
                maxLength={60}
              />
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded text-xs ${tStyle.buttonPrimary}`}
                  onClick={handleSaveQrNote}
                  disabled={saving}
                >
                  บันทึก
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs ${tStyle.buttonSecondary}`}
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <span className={`font-medium text-sm ${tStyle.text}`}>
                {qrNote || "รหัสสำหรับกรอกแทนการสแกน"}
              </span>
              {role === "owner" && (
                <button onClick={() => setEditing(true)}>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded transition ${tStyle.buttonSecondary}`}>แก้ไข</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bank info */}
        <div className="mt-2 w-full text-center">
          {editingBank && role === "owner" ? (
            <div className={`flex flex-col items-center gap-2 p-3 rounded-lg backdrop-blur mx-auto max-w-xs shadow-sm mt-1 ${theme === 'funeral' ? 'bg-gray-800/90' : 'bg-white/80'}`}>
              <input
                className={`w-full border p-2 rounded text-center text-sm ${tStyle.input}`}
                value={bankInfo}
                onChange={e => setBankInfo(e.target.value)}
                placeholder="ชื่อบัญชี ธนาคาร เลขบัญชี"
                maxLength={80}
              />
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded text-xs ${tStyle.buttonPrimary}`}
                  onClick={handleSaveBank}
                  disabled={savingBank}
                >
                  บันทึก
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs ${tStyle.buttonSecondary}`}
                  onClick={() => setEditingBank(false)}
                  disabled={savingBank}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium border-b border-dashed pb-0.5 ${tStyle.text} ${theme === 'funeral' ? 'border-gray-500' : 'border-gray-300'}`}>
                  {bankInfo || "ชื่อบัญชี ธนาคาร เลขบัญชี"}
                </span>
                {role === "owner" && (
                  <button onClick={() => setEditingBank(true)}>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded transition ${tStyle.buttonSecondary}`}>แก้ไข</span>
                  </button>
                )}
              </div>
              {bankInfo?.match(/\d{6,}/) && (
                <button
                  className={`flex items-center gap-1 text-xs font-semibold mt-1 px-3 py-1 rounded-full transition ${isFuneral ? 'text-gray-300 hover:text-white bg-gray-800' : 'text-pink-500 hover:text-pink-600 bg-pink-50'}`}
                  onClick={handleCopy}
                >
                  <FiCopy size={12} />
                  <span>คัดลอกเลขบัญชี</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Zoom */}
      {zoom.open && (
        <div
          className="fixed z-[9999] inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoom({ open: false, url: "" })}
        >
          <img
            src={zoom.url}
            alt=""
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
