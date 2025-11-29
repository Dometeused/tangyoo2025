"use client";
import { useState } from "react";
import Image from "next/image";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DresscodePicker from "@/components/DressCodePicker";
import { FiCopy } from "react-icons/fi";
import Countdown from "@/components/Countdown";
import VideoEmbedCard from "@/components/VideoEmbedCard";

export default function QRCodeAndScheduleSection({
  qrImageUrl,
  scheduleImageUrl,
  event,
}) {
  const supabase = createClientComponentClient();
  const { role, theme, phase } = useAppMode();

  const isFuneral = theme === "funeral";
  const isMemoryPhase = phase === "memory";

  // Video Embed
  const [videoUrl, setVideoUrl] = useState(event?.video_url || "");
  const [videoInput, setVideoInput] = useState(videoUrl);
  const [savingVideo, setSavingVideo] = useState(false);

  // Lightbox
  const [zoom, setZoom] = useState({ open: false, url: "" });

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
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-stretch">

      {/* LEFT: SCHEDULE */}
      <div className="flex-1 flex flex-col items-center">
        <div className="mb-2 text-center font-semibold text-gray-700">กำหนดการ</div>
        <div
          className="relative cursor-zoom-in rounded-xl overflow-hidden shadow bg-white"
          onClick={() => scheduleImageUrl && setZoom({ open: true, url: scheduleImageUrl })}
          title="คลิกเพื่อดูภาพใหญ่"
        >
          <Image
            src={scheduleImageUrl || "/images/schedule-mock.png"}
            alt="กำหนดการ"
            width={340}
            height={250}
            className="w-[85vw] max-w-[340px] h-auto object-contain"
          />
        </div>
        {!isFuneral && !isMemoryPhase && (
          <div className="block md:hidden mt-4">
            <Countdown eventDate={event.date || event.start_datetime} />
          </div>
        )}
      </div>

      {/* CENTER: VIDEO */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!isFuneral && !isMemoryPhase && (
          <div className="hidden md:flex justify-center mb-3">
            <Countdown eventDate={event.date || event.start_datetime} />
          </div>
        )}

        {/* ช่องใส่วิดีโอ YouTube (เฉพาะ wedding, invitation, owner) */}
        {role === "owner" && theme === "wedding" && !isMemoryPhase && (
          <div className="mb-2 w-full flex flex-col items-center">
            <input
              value={videoInput}
              onChange={e => setVideoInput(e.target.value)}
              className="border px-3 py-2 rounded shadow-sm w-full max-w-xs mb-2"
              placeholder="https://www.youtube.com/watch?v=xxxx"
            />
            <button
              onClick={handleSaveVideo}
              className="bg-pink-500 text-white px-4 py-1.5 rounded shadow"
              disabled={savingVideo}
            >
              {savingVideo ? "บันทึก..." : "บันทึก"}
            </button>
          </div>
        )}

        {/* แสดงวิดีโอ (ใช้ component เดียวกัน) */}
        {videoUrl && (
          <VideoEmbedCard
            src={videoUrl.replace("/watch?v=", "/embed/").replace("youtu.be/", "youtube.com/embed/")}
            title={isFuneral ? "วิดีโอรำลึกจาก AI" : "วิดีโอ"}
            link={videoUrl}
          />
        )}
      </div>

      {/* RIGHT: QR + NOTE + BANK + DRESSCODE */}
      <div className="flex-1 flex flex-col items-center">
        {/* QR */}
        <div
          className="relative cursor-zoom-in rounded-xl overflow-hidden shadow bg-white p-2"
          onClick={() => qrImageUrl && setZoom({ open: true, url: qrImageUrl })}
          title="คลิกเพื่อดูภาพใหญ่"
        >
          <Image
            src={qrImageUrl || "/images/qr-mock.png"}
            alt="QR code"
            width={170}
            height={170}
            className="w-36 h-36 object-contain bg-white"
          />
        </div>

        {/* QR Note */}
        <div className="mt-2 w-full text-center">
          {editing && role === "owner" ? (
            <div className="flex flex-col items-center gap-10">
              <input
                className="w-full max-w-xs border p-2 rounded text-center"
                value={qrNote}
                onChange={e => setQrNote(e.target.value)}
                placeholder="ข้อความใต้ QR (รหัสสำหรับกรอกแทนการสแกน)"
                maxLength={60}
              />
              <div>
                <button
                  className="px-3 py-1 bg-black text-white rounded text-sm"
                  onClick={handleSaveQrNote}
                  disabled={saving}
                >
                  {saving ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-700">
                {qrNote || "รหัสสำหรับกรอกแทนการสแกน"}
              </span>
              {role === "owner" && (
                <button
                  className="text-xs underline text-blue-500 ml-2"
                  onClick={() => setEditing(true)}
                  type="button"
                >
                  แก้ไข
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bank info */}
        <div className="mt-2 w-full text-center">
          {editingBank && role === "owner" ? (
            <div className="flex flex-col items-center gap-2">
              <input
                className="w-full max-w-xs border p-2 rounded text-center"
                value={bankInfo}
                onChange={e => setBankInfo(e.target.value)}
                placeholder="ชื่อบัญชี ธนาคาร เลขบัญชี"
                maxLength={80}
              />
              <div>
                <button
                  className="px-3 py-1 bg-black text-white rounded text-sm"
                  onClick={handleSaveBank}
                  disabled={savingBank}
                >
                  {savingBank ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  onClick={() => setEditingBank(false)}
                  disabled={savingBank}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-700">{bankInfo || "ชื่อบัญชี ธนาคาร เลขบัญชี"}</span>
              {role === "owner" && (
                <button
                  className="text-xs underline text-blue-500 ml-2"
                  onClick={() => setEditingBank(true)}
                  type="button"
                >
                  แก้ไข
                </button>
              )}
              {bankInfo?.match(/\d{6,}/) && (
                <button
                  className="ml-1 p-1 text-gray-600 hover:text-pink-500"
                  title="คัดลอกเลขบัญชี"
                  onClick={handleCopy}
                  type="button"
                >
                  <FiCopy size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dresscode */}
        <div className="mt-4 md:mt-12 w-full flex flex-col items-center">
          <DresscodePicker event={event} />
        </div>
      </div>

      {/* Lightbox Zoom */}
      {zoom.open && (
        <div
          className="fixed z-[9999] inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setZoom({ open: false, url: "" })}
        >
          <img
            src={zoom.url}
            alt=""
            className="max-w-[92vw] max-h-[90vh] rounded-xl shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
