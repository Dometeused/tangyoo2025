"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrashAlt, FaImage, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Modal from "@/components/Modal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAppMode } from "@/context/AppModeContext";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile;
}

const TIMELINE_TITLE = {
  wedding: "การเดินทางของเรา",
  funeral: "เรื่องราวความทรงจำ",
  family: "ชีวิตครอบครัว",
};

export default function TimelineTree({ eventId, event, theme = "wedding" }) {
  const [milestones, setMilestones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    year: "",
    text: "",
    emoji: "",
    image_url: "",
    detail: "",
  });
  const [showEmoji, setShowEmoji] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const isMobile = useIsMobile();
  const { role } = useAppMode();

  // Load milestone
  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    fetch(`/api/milestones?event_id=${eventId}`)
      .then((res) => res.json())
      .then(({ data }) => setMilestones(data || []))
      .finally(() => setLoading(false));
  }, [eventId]);

  // กล่องสุดท้าย (static)
  const finalCard = {
    isFinal: true,
    year: event?.date ? event.date.slice(0, 4) : "",
    text: theme === "wedding" ? "💒 Our Wedding Day" : "🕯️ Funeral Day",
    emoji: theme === "wedding" ? "💒" : "🕯️",
    detail:
      theme === "wedding"
        ? "วันที่สองหัวใจได้มาบรรจบกัน"
        : "วันแห่งการรำลึกและขอบคุณสำหรับทุกความทรงจำ",
  };

  // Sort + add final
  const sorted = [...milestones].sort((a, b) => (a.year > b.year ? 1 : -1));
  const timelineCards = [...sorted, finalCard];

  // === Handlers ===
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEmojiPick = (emoji) => {
    setForm((prev) => ({ ...prev, emoji: emoji.emoji }));
    setShowEmoji(false);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, image_url: imagePreview })); // mock
  };
  const handleAddMilestone = async (e) => {
    e.preventDefault();
    if (!form.year || !form.text) return;
    setLoading(true);
    const res = await fetch("/api/milestones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, event_id: eventId }),
    });
    const { data } = await res.json();
    if (data) setMilestones((prev) => [...prev, ...data]);
    setForm({ year: "", text: "", emoji: "", image_url: "", detail: "" });
    setImagePreview(null);
    setShowForm(false);
    setLoading(false);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("ลบจริง?")) return;
    setLoading(true);
    await fetch(`/api/milestones?id=${id}`, { method: "DELETE" });
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setLoading(false);
  };
  const [showLightbox, setShowLightbox] = useState(null);

  // UI (theme)
  const themeColor =
    theme === "wedding"
      ? "pink-500"
      : theme === "funeral"
      ? "gray-700"
      : "yellow-500";
  const fontFamily = "font-sukhumvit";
  const fadeVariant = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i },
    }),
  };

  return (
    <div className={`py-10 relative w-full bg-white ${fontFamily}`}>
      {/* Timeline Line (หลบ header) */}
      <div
        className="absolute left-1/2 top-20 bottom-10 w-2 -translate-x-1/2 z-0 rounded-full"
        style={{ background: "linear-gradient(180deg,#fce4ec 0%,#e3f2fd 100%)" }}
      />

      {/* Header */}
      <h2 className={`text-3xl font-bold text-center mb-12 text-${themeColor} relative z-10`}>
        {TIMELINE_TITLE[theme]}
      </h2>

      {/* Timeline Cards: Zigzag */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 z-10 relative">
        {timelineCards.map((m, idx) => {
          const isLeft = idx % 2 === 0;
          const isFinal = m.isFinal;
          // mobile: center all
          const cardAlign = isMobile || isFinal ? "items-center justify-center" : isLeft ? "items-end justify-start" : "items-start justify-end";
          return (
            <motion.div
              className={`relative flex w-full ${cardAlign}`}
              key={m.id || `card-${idx}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeVariant}
              custom={idx}
              style={{ minHeight: 170 }}
            >
              <div
                className={
                  `relative z-10 flex flex-col items-center bg-white/95 shadow-lg 
                  rounded-3xl px-7 py-8 min-w-[220px] max-w-xs` +
                  (isFinal
                    ? " border-4 border-pink-400 scale-105 shadow-2xl"
                    : " border border-pink-100")
                }
                style={{
                  marginLeft: isMobile || isFinal ? "auto" : isLeft ? 0 : "auto",
                  marginRight: isMobile || isFinal ? "auto" : isLeft ? "auto" : 0,
                  boxShadow: isFinal
                    ? "0 6px 36px 0 #fbc2eb66"
                    : "0 2px 16px 0 #e0e0e055",
                }}
              >
                {/* Emoji */}
                <Tippy content={m.text}>
                  <motion.span
                    className={`w-14 h-14 border-2 border-pink-300 bg-white shadow rounded-full flex items-center justify-center text-3xl font-bold mb-2`}
                    whileTap={{ scale: 1.18 }}
                    whileHover={{ scale: 1.10 }}
                    title={m.text}
                  >
                    {m.emoji || "✨"}
                  </motion.span>
                </Tippy>
                <div className={`font-bold text-xl md:text-2xl text-${themeColor} mb-0.5`}>
                  {m.year}
                </div>
                <div className={`font-semibold text-base md:text-lg text-gray-800 mb-1`}>
                  {m.text}
                </div>
                {m.image_url && !isFinal && (
                  <img
                    src={m.image_url}
                    className="w-20 h-20 object-cover rounded-xl shadow border-2 border-white cursor-pointer"
                    alt={m.text}
                    onClick={() => setShowLightbox(m.image_url)}
                  />
                )}
                {m.detail && (
                  <div className="text-xs text-gray-500 mt-2">{m.detail}</div>
                )}
                {/* ปุ่มลบ */}
                {role === "owner" && !isFinal && (
                  <button
                    className="mt-2 text-xs text-red-400 hover:text-red-700 underline"
                    onClick={() => handleDelete(m.id)}
                    disabled={loading}
                  >
                    <FaTrashAlt className="inline" /> ลบ
                  </button>
                )}
                {/* ปุ่มเพิ่ม (owner, final card) */}
                {role === "owner" && isFinal && (
                  <button
                    className="mt-5 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 font-bold"
                    onClick={() => setShowForm(true)}
                  >
                    <FaPlus /> เพิ่มเหตุการณ์
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <Modal onClose={() => setShowLightbox(null)}>
          <img
            src={showLightbox}
            className="max-w-full max-h-[80vh] mx-auto rounded-xl shadow"
            alt="milestone"
          />
        </Modal>
      )}

      {/* Modal ฟอร์ม + Emoji Picker + Drag&Drop */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <form
            onSubmit={handleAddMilestone}
            className="flex flex-col gap-3 w-[340px] mx-auto bg-white rounded-2xl p-5"
          >
            <div className="font-bold text-lg mb-2">เพิ่มเหตุการณ์ชีวิต</div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleFormChange}
                placeholder="ปี (เช่น 2024)"
                className="border p-2 rounded flex-1"
                required
              />
              <button
                type="button"
                className="p-2 rounded-full bg-pink-100 hover:bg-pink-200"
                onClick={() => setShowEmoji((v) => !v)}
                tabIndex={-1}
              >
                <FaSmile />
              </button>
              {showEmoji && (
                <div className="absolute z-50 mt-24 left-1/2 -translate-x-1/2">
                  <EmojiPicker
                    onEmojiClick={handleEmojiPick}
                    theme="light"
                    height={350}
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              name="text"
              value={form.text}
              onChange={handleFormChange}
              placeholder="หัวข้อเหตุการณ์ (เช่น จบ ม.ปลาย)"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="detail"
              value={form.detail}
              onChange={handleFormChange}
              placeholder="รายละเอียด (เช่น สถานที่)"
              className="border p-2 rounded"
            />
            {/* Drag & drop + preview */}
            <div className="border-dashed border-2 p-4 rounded flex flex-col items-center bg-gray-50 mt-1">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <FaImage className="text-xl" />
                <span className="text-sm text-gray-500">เลือกรูป หรือ drag & drop</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="mt-2 w-24 h-24 rounded-xl shadow"
                  alt="preview"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded mt-3 hover:bg-pink-600 transition font-bold"
              disabled={loading}
            >
              {loading ? "บันทึก..." : "บันทึก"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
