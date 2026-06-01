// path: src/components/timeline-tree/TimelineTree.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrashAlt, FaImage } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Modal from "@/components/Modal";
import { useAppMode } from "@/context/AppModeContext";

const TIMELINE_TITLE = {
  wedding:     "การเดินทางของเรา",
  funeral:     "เรื่องราวความทรงจำ",
  anniversary: "ชีวิตร่วมกันของเรา",
  baby:        "เติบโตทีละก้าว",
};

const THEME = {
  wedding:     { line: "#ddb0c0", dot: "#6b2d4a", year: "#9e6b7d", title: "#3d2020", badge: "#6b2d4a", badgeBg: "#fdf2f8" },
  funeral:     { line: "#c9a882", dot: "#5a3a1a", year: "#9e7e46", title: "#2a1a0a", badge: "#5a3a1a", badgeBg: "#fdf8f0" },
  anniversary: { line: "#c9a050", dot: "#6b4a1e", year: "#9e7e46", title: "#2a1a0a", badge: "#6b4a1e", badgeBg: "#fdf8f0" },
  baby:        { line: "#c8a8d8", dot: "#7b3f8a", year: "#9e6b8a", title: "#3d1a3d", badge: "#7b3f8a", badgeBg: "#fdf0ff" },
};

export default function TimelineTree({ eventId, event, theme = "wedding" }) {
  const [milestones, setMilestones]   = useState([]);
  const [showForm, setShowForm]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [form, setForm]               = useState({ year: "", text: "", emoji: "", image_url: "", detail: "" });
  const [showEmoji, setShowEmoji]     = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showLightbox, setShowLightbox] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, text }

  const { role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const t = THEME[theme] ?? THEME.wedding;

  /* ─── Candle waypoint glow (funeral only) ─── */
  const dotRefs = useRef([]);
  const [glowAnim, setGlowAnim] = useState(null);

  /* ─── Scroll highlight tracker ─── */
  const itemRefs  = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (theme !== "funeral" || milestones.length === 0) return;

    const PAUSE_S = 1.4;   // วินาทีที่หยุดอยู่ที่แต่ละ milestone
    const SPEED   = 160;   // px/วินาที ขณะเดินทาง

    const timer = setTimeout(() => {
      const lineEl = dotRefs.current.find(Boolean)?.closest("[data-timeline-line]");
      if (!lineEl) return;

      const lineTop = lineEl.getBoundingClientRect().top;
      const positions = dotRefs.current
        .filter(Boolean)
        .map(el => {
          const r = el.getBoundingClientRect();
          return r.top - lineTop + r.height / 2;
        })
        .filter(y => isFinite(y));

      if (positions.length === 0) return;

      // สร้าง keyframe: [-140, dot0, dot0, dot1, dot1, ..., 1400]
      const yFrames  = [-140];
      const tFrames  = [0];
      const easeArr  = [];
      let t = 0, prevY = -140;

      positions.forEach(pos => {
        t += Math.abs(pos - prevY) / SPEED;
        yFrames.push(pos, pos);
        tFrames.push(t, t + PAUSE_S);
        easeArr.push("easeInOut", "linear");
        t += PAUSE_S;
        prevY = pos;
      });

      t += (1400 - prevY) / SPEED;
      yFrames.push(1400);
      tFrames.push(t);
      easeArr.push("easeInOut");

      const dur = t;
      setGlowAnim({
        y:        yFrames,
        times:    tFrames.map(x => Math.min(1, parseFloat((x / dur).toFixed(4)))),
        ease:     easeArr,
        duration: dur,
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [milestones.length, theme]);

  /* ─── Scroll highlight: window scroll → nearest item to 40% viewport ─── */
  useEffect(() => {
    const handleScroll = () => {
      const target = window.innerHeight * 0.4;
      let bestIdx = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - target);
        if (dist < bestDist) { bestDist = dist; bestIdx = idx; }
      });
      setActiveIdx(bestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [milestones.length]);

  /* ─── Load milestones ─── */
  useEffect(() => {
    let initial = [];
    if (event?.timeline_events && Array.isArray(event.timeline_events)) {
      initial = event.timeline_events.map((e, i) => ({
        id: `ai-${i}`, year: e.year, text: e.title, detail: e.description, emoji: "✦", isAiGenerated: true,
      }));
    }
    if (!eventId) { if (initial.length) setMilestones(initial); return; }

    setLoading(true);
    fetch(`/api/milestones?memoryId=${eventId}`)
      .then(r => r.json())
      .then(({ data }) => setMilestones(data?.length ? data : initial))
      .finally(() => setLoading(false));
  }, [eventId, event]);

  /* ─── Final card ─── */
  const finalCardText = {
    wedding:     { text: "Our Wedding Day",   detail: "วันที่สองหัวใจได้มาบรรจบกัน" },
    funeral:     { text: "วันที่ระลึก",        detail: "วันแห่งการรำลึกและขอบคุณทุกความทรงจำ" },
    anniversary: { text: "วันครบรอบพิเศษ",    detail: "ขอบคุณทุกปีที่ผ่านมาร่วมกัน" },
    baby:        { text: "วันเกิดของหนูน้อย", detail: "จุดเริ่มต้นของการเดินทางอันแสนพิเศษ" },
  };
  const finalCard = {
    isFinal: true,
    year: event?.date ? event.date.slice(0, 4) : new Date().getFullYear().toString(),
    ...(finalCardText[theme] ?? finalCardText.wedding),
  };

  const timelineItems = [...[...milestones].sort((a, b) => a.year > b.year ? 1 : -1), finalCard];

  /* ─── Handlers ─── */
  const handleFormChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleEmojiPick  = e => { setForm(p => ({ ...p, emoji: e.emoji })); setShowEmoji(false); };
  const handleImageChange = e => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url); setForm(p => ({ ...p, image_url: url }));
  };

  const handleAdd = async e => {
    e.preventDefault(); if (!form.year || !form.text) return;
    setLoading(true);
    try {
      const res = await fetch("/api/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, memoryId: eventId }),  // ✅ ตรงกับ DB column
      });
      const { data, error } = await res.json();
      if (error) { console.error("[handleAdd]", error); return; }
      // API returns array from .select("*"), take first item
      const newItem = Array.isArray(data) ? data[0] : data;
      if (newItem) setMilestones(p => [...p, newItem]);  // ✅ push object ไม่ใช่ array
      setForm({ year: "", text: "", emoji: "", image_url: "", detail: "" });
      setImagePreview(null); setShowForm(false);
    } finally { setLoading(false); }
  };

  const handleDelete = async id => {
    setLoading(true);
    try { await fetch(`/api/milestones?id=${id}`, { method: "DELETE" }); setMilestones(p => p.filter(m => m.id !== id)); }
    finally { setLoading(false); setDeleteTarget(null); }
  };

  /* ─── Render ─── */
  return (
    <div className="relative w-full py-10 font-kanit">

      {/* ── Section heading (matches SectionTitle style) ── */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="flex items-center gap-3 w-full max-w-xs mx-auto">
          <div className="flex-1 h-px" style={{ background: t.line }} />
          <span style={{ color: t.line, fontSize: "7px", letterSpacing: "0.25em" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: t.line }} />
        </div>
        <h2 className="text-lg md:text-xl font-medium text-center tracking-wide" style={{ color: t.dot }}>
          {TIMELINE_TITLE[theme] ?? TIMELINE_TITLE.wedding}
        </h2>
      </div>

      {/* ── Timeline ── */}
      <div className="relative pl-10 md:pl-14" data-timeline-line>

        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ left: "16px", background: `linear-gradient(to bottom, transparent 0%, ${t.line} 8%, ${t.line} 92%, transparent 100%)` }}
        />

        {/* Candle glow — funeral theme only */}
        {theme === "funeral" && (
          <div
            className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
            style={{ left: "11px", width: "11px" }}
          >
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to bottom, transparent 0%, rgba(245,215,100,0.65) 25%, rgba(215,155,25,0.82) 50%, rgba(245,215,100,0.65) 75%, transparent 100%)",
                filter: "blur(3px)",
                borderRadius: "9999px",
              }}
              initial={{ y: -140 }}
              animate={glowAnim ? { y: glowAnim.y } : { y: 1400 }}
              transition={glowAnim
                ? { duration: glowAnim.duration, times: glowAnim.times, ease: glowAnim.ease, repeat: Infinity }
                : { duration: 6, ease: "linear", repeat: Infinity }
              }
            />
          </div>
        )}

        <div className="flex flex-col gap-8">
          {timelineItems.map((m, idx) => (
            <motion.div
              key={m.id ?? `card-${idx}`}
              ref={el => { itemRefs.current[idx] = el; }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="relative"
            >
              {/* Dot glow — blurred div ที่ animate opacity */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "-34px", top: "-3px",
                  width: "24px", height: "24px",
                  borderRadius: "50%",
                  background: t.line,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: activeIdx === idx ? 0.85 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {/* Dot */}
              <motion.div
                ref={el => { dotRefs.current[idx] = el; }}
                className="absolute ring-2 ring-white"
                style={{
                  left: "-26px",
                  top: "5px",
                  width:  m.isFinal ? "10px" : "8px",
                  height: m.isFinal ? "10px" : "8px",
                  borderRadius: "50%",
                  background: m.isFinal ? t.dot : t.line,
                  boxShadow: m.isFinal ? `0 0 0 3px white, 0 0 0 5px ${t.line}` : "none",
                }}
                animate={theme === "funeral" && glowAnim ? {
                  scale:     [1, m.isFinal ? 1.5 : 1.8, 1],
                  boxShadow: [
                    m.isFinal ? `0 0 0 3px white, 0 0 0 5px ${t.line}` : "0 0 0 2px white",
                    `0 0 0 2px white, 0 0 10px 5px rgba(215,155,25,0.9)`,
                    m.isFinal ? `0 0 0 3px white, 0 0 0 5px ${t.line}` : "0 0 0 2px white",
                  ],
                } : {
                  scale: activeIdx === idx ? 1.4 : 1,
                }}
                transition={theme === "funeral" && glowAnim ? {
                  duration:    0.9,
                  delay:       glowAnim.times[idx * 2 + 1] * glowAnim.duration,
                  repeat:      Infinity,
                  repeatDelay: glowAnim.duration - 0.9,
                  ease:        "easeInOut",
                } : { duration: 0.35, ease: "easeOut" }}
              />

              {/* Card content */}
              <div className={`relative pb-6 ${idx < timelineItems.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: `${t.line}40` }}>

                {/* Active glow wash — follows scroll */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: activeIdx === idx ? 0.75 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at 0% 50%, ${t.line}, transparent 70%)`,
                  }}
                />

                {/* Year row */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
                    style={{
                      color:      activeIdx === idx ? t.line : t.year,
                      fontWeight: activeIdx === idx ? 700 : 500,
                    }}
                  >
                    {m.year}
                  </span>

                  {m.isFinal && (
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full tracking-wider font-medium"
                      style={{ color: t.badge, background: t.badgeBg }}
                    >
                      วันพิเศษ
                    </span>
                  )}

                  {m.emoji && !m.isFinal && (
                    <span className="text-sm opacity-70">{m.emoji}</span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-sm md:text-base font-medium leading-snug mb-1 transition-colors duration-300"
                  style={{ color: m.isFinal ? t.dot : activeIdx === idx ? t.line : t.title }}
                >
                  {m.text}
                </h3>

                {/* Detail */}
                {m.detail && (
                  <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: "#9e8585" }}>
                    {m.detail}
                  </p>
                )}

                {/* Image */}
                {m.image_url && !m.isFinal && (
                  <div
                    className="mt-3 w-full max-w-xs h-36 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => setShowLightbox(m.image_url)}
                  >
                    <img src={m.image_url} alt={m.text} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                )}

                {/* Owner: delete */}
                {isOwner && !m.isFinal && (
                  <button
                    onClick={() => setDeleteTarget({ id: m.id, text: m.text })}
                    className="mt-2 flex items-center gap-1 text-[10px] transition-colors"
                    style={{ color: "#ccc" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                    onMouseLeave={e => e.currentTarget.style.color = "#ccc"}
                  >
                    <FaTrashAlt size={9} /> ลบ
                  </button>
                )}

                {/* Owner: add button (on final card) */}
                {isOwner && m.isFinal && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                    style={{ borderColor: t.line, color: t.dot, background: t.badgeBg }}
                  >
                    <FaPlus size={9} /> เพิ่มความทรงจำ
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {showLightbox && (
        <Modal onClose={() => setShowLightbox(null)} variant="lightbox">
          <img src={showLightbox} className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" alt="Preview" />
        </Modal>
      )}

      {/* ── Delete confirm modal ── */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="p-6 max-w-xs mx-auto text-center">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-800 mb-1">ลบความทรงจำนี้?</h3>
            <p className="text-sm text-gray-500 mb-5">
              "<span className="font-medium text-gray-700">{deleteTarget.text}</span>"<br />
              จะถูกลบถาวร ไม่สามารถกู้คืนได้
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                disabled={loading}
                className="px-5 py-2 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "กำลังลบ..." : "ลบเลย"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Add form modal ── */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <form onSubmit={handleAdd} className="relative w-[90vw] max-w-sm bg-white p-8 rounded-3xl shadow-2xl">
            <h3 className="text-lg font-medium text-center mb-6" style={{ color: t.dot }}>เพิ่มความทรงจำ</h3>

            <div className="space-y-3">
              {/* Year + Emoji */}
              <div className="flex gap-2">
                <input
                  name="year"
                  value={form.year}
                  onChange={handleFormChange}
                  placeholder="ปี (เช่น 2020)"
                  className="flex-1 px-4 py-3 bg-stone-50 rounded-xl text-sm text-stone-700 outline-none focus:ring-2 focus:ring-rose-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowEmoji(s => !s)}
                  className="px-3 py-3 bg-stone-50 rounded-xl text-xl hover:bg-stone-100 transition-colors"
                >
                  {form.emoji || "✦"}
                </button>
              </div>

              {showEmoji && (
                <div className="absolute z-50 right-0 top-24 shadow-2xl rounded-2xl overflow-hidden">
                  <EmojiPicker onEmojiClick={handleEmojiPick} width={280} height={320} searchDisabled />
                </div>
              )}

              <input
                name="text"
                value={form.text}
                onChange={handleFormChange}
                placeholder="ชื่อเหตุการณ์"
                className="w-full px-4 py-3 bg-stone-50 rounded-xl text-sm text-stone-700 outline-none focus:ring-2 focus:ring-rose-100"
                required
              />

              <textarea
                name="detail"
                value={form.detail}
                onChange={handleFormChange}
                placeholder="รายละเอียด..."
                rows={3}
                className="w-full px-4 py-3 bg-stone-50 rounded-xl text-sm text-stone-700 outline-none focus:ring-2 focus:ring-rose-100 resize-none"
              />

              {/* Image upload */}
              <div className="relative border border-dashed rounded-xl p-5 text-center cursor-pointer group hover:bg-stone-50 transition-colors"
                style={{ borderColor: t.line }}>
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-32 object-cover rounded-lg" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-stone-300">
                    <FaImage size={22} />
                    <span className="text-xs">อัปโหลดรูปภาพ</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ background: t.dot }}
            >
              {loading ? "กำลังบันทึก..." : "บันทึกความทรงจำ"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
