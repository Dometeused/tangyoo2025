"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Gift catalog per theme
const GIFT_CATALOG = {
  wedding: [
    { emoji: "💐", label: "ช่อดอกไม้" },
    { emoji: "💍", label: "แหวน" },
    { emoji: "🥂", label: "แชมเปญ" },
    { emoji: "🎂", label: "เค้กแต่งงาน" },
    { emoji: "💌", label: "การ์ดอวยพร" },
    { emoji: "🕯️", label: "เทียนหอม" },
    { emoji: "🎁", label: "กล่องของขวัญ" },
    { emoji: "🍰", label: "ของหวาน" },
  ],
  funeral: [
    { emoji: "🌸", label: "ดอกไม้" },
    { emoji: "🕯️", label: "เทียน" },
    { emoji: "🕊️", label: "นกพิราบสันติ" },
    { emoji: "🙏", label: "กำลังใจ" },
    { emoji: "💐", label: "พวงหรีด" },
    { emoji: "🤍", label: "ใจขาว" },
  ],
  anniversary: [
    { emoji: "🥂", label: "แชมเปญ" },
    { emoji: "🎉", label: "ปาร์ตี้" },
    { emoji: "💐", label: "ช่อดอกไม้" },
    { emoji: "🎁", label: "ของขวัญ" },
    { emoji: "🍰", label: "เค้ก" },
    { emoji: "💫", label: "ประกาย" },
    { emoji: "🌹", label: "กุหลาบ" },
    { emoji: "🎊", label: "คอนเฟตตี้" },
  ],
  baby: [
    { emoji: "🍼", label: "ขวดนม" },
    { emoji: "🧸", label: "ตุ๊กตาหมี" },
    { emoji: "🌈", label: "สายรุ้ง" },
    { emoji: "⭐", label: "ดาว" },
    { emoji: "🎀", label: "ริบบิ้น" },
    { emoji: "🎁", label: "ของขวัญ" },
    { emoji: "🌸", label: "ดอกไม้" },
    { emoji: "💛", label: "ใจเหลือง" },
  ],
};

const THEME_STYLE = {
  wedding: {
    bg: "from-rose-50 via-pink-50 to-white",
    header: "from-pink-500 to-rose-400",
    headerShimmer: "from-pink-400 via-rose-300 to-pink-400",
    accent: "from-pink-500 to-rose-400",
    accentSolid: "bg-pink-500",
    accentHover: "hover:from-pink-600 hover:to-rose-500",
    ring: "ring-pink-300",
    selectedBg: "bg-pink-50",
    selectedRing: "ring-pink-400",
    selectedGlow: "shadow-pink-200",
    tab: "from-pink-500 to-rose-400",
    text: "text-pink-700",
    bankBg: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200",
    divider: "#fda4af",
    certBorder: "#fda4af",
  },
  funeral: {
    bg: "from-gray-50 via-stone-50 to-white",
    header: "from-gray-700 to-gray-600",
    headerShimmer: "from-gray-600 via-gray-400 to-gray-600",
    accent: "from-gray-700 to-gray-600",
    accentSolid: "bg-gray-700",
    accentHover: "hover:from-gray-800 hover:to-gray-700",
    ring: "ring-gray-400",
    selectedBg: "bg-gray-100",
    selectedRing: "ring-gray-500",
    selectedGlow: "shadow-gray-200",
    tab: "from-gray-700 to-gray-600",
    text: "text-gray-700",
    bankBg: "bg-gray-50 border-gray-200",
    divider: "#9ca3af",
    certBorder: "#9ca3af",
  },
  anniversary: {
    bg: "from-amber-50 via-yellow-50 to-white",
    header: "from-amber-500 to-yellow-400",
    headerShimmer: "from-amber-400 via-yellow-300 to-amber-400",
    accent: "from-amber-500 to-yellow-400",
    accentSolid: "bg-amber-500",
    accentHover: "hover:from-amber-600 hover:to-yellow-500",
    ring: "ring-amber-300",
    selectedBg: "bg-amber-50",
    selectedRing: "ring-amber-400",
    selectedGlow: "shadow-amber-200",
    tab: "from-amber-500 to-yellow-400",
    text: "text-amber-700",
    bankBg: "bg-amber-50 border-amber-200",
    divider: "#fcd34d",
    certBorder: "#fcd34d",
  },
  baby: {
    bg: "from-yellow-50 via-orange-50 to-white",
    header: "from-yellow-400 to-orange-300",
    headerShimmer: "from-yellow-300 via-orange-200 to-yellow-300",
    accent: "from-yellow-400 to-orange-300",
    accentSolid: "bg-yellow-400",
    accentHover: "hover:from-yellow-500 hover:to-orange-400",
    ring: "ring-yellow-300",
    selectedBg: "bg-yellow-50",
    selectedRing: "ring-yellow-400",
    selectedGlow: "shadow-yellow-200",
    tab: "from-yellow-400 to-orange-300",
    text: "text-yellow-700",
    bankBg: "bg-yellow-50 border-yellow-200",
    divider: "#fde68a",
    certBorder: "#fde68a",
  },
};

// Full-screen confetti particles
function ConfettiParticle({ onComplete }) {
  const emojis = ["🎉", "🎊", "✨", "💫", "⭐", "🌟", "💖", "🎈", "🎀", "🥳"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * 100;
  const delay = Math.random() * 0.6;
  const duration = 1.8 + Math.random() * 1.2;
  return (
    <motion.div
      className="fixed pointer-events-none select-none text-2xl z-[9999]"
      style={{ left: `${x}vw`, top: "-40px" }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
      animate={{ y: "110vh", opacity: [1, 1, 0.5, 0], rotate: (Math.random() - 0.5) * 540, scale: [0.5, 1.2, 0.8] }}
      transition={{ duration, delay, ease: "easeIn" }}
      onAnimationComplete={onComplete}
    >
      {emoji}
    </motion.div>
  );
}

export default function GiftModal({ isOpen, onClose, event, theme = "wedding" }) {
  const s = THEME_STYLE[theme] || THEME_STYLE.wedding;
  const gifts = GIFT_CATALOG[theme] || GIFT_CATALOG.wedding;

  const [selectedGift, setSelectedGift] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("offline");
  const [step, setStep] = useState("pick");
  const [sending, setSending] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  const confettiIdRef = useRef(0);

  const bankInfo = event?.bank_info || "";
  const hasBankInfo = !!bankInfo;

  const launchConfetti = () => {
    const particles = Array.from({ length: 40 }, () => confettiIdRef.current++);
    setConfettiParticles(particles);
  };

  const removeConfetti = (id) => setConfettiParticles(p => p.filter(x => x !== id));

  const handleConfirm = async () => {
    if (!selectedGift || !senderName.trim()) return;
    setSending(true);
    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memoryId: event?.id,
          name: senderName.trim(),
          message: message.trim() || `ส่ง${selectedGift.label}ให้เป็นกำลังใจ`,
          prompt: `GIFT:${selectedGift.emoji}:${tab}`,
          imageUrl: null,
        }),
      });
    } catch {}
    launchConfetti();
    setStep("success");
    setSending(false);
  };

  const handleClose = () => {
    setStep("pick");
    setSelectedGift(null);
    setSenderName("");
    setMessage("");
    setTab("offline");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Confetti */}
      <AnimatePresence>
        {confettiParticles.map(id => (
          <ConfettiParticle key={id} onComplete={() => removeConfetti(id)} />
        ))}
      </AnimatePresence>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.92 }}
          transition={{ type: "spring", damping: 24, stiffness: 320 }}
          className={`relative w-full sm:max-w-md bg-gradient-to-b ${s.bg} rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden`}
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`relative bg-gradient-to-r ${s.header} px-5 py-4 flex items-center justify-between overflow-hidden`}>
            {/* Shimmer line */}
            <div className="absolute inset-0 opacity-20"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)" }} />
            <div className="text-white relative z-10">
              <p className="text-xs opacity-75 font-medium tracking-wide">
                {step === "success" ? "✨ ส่งสำเร็จแล้ว" : "🎁 ส่งของขวัญ"}
              </p>
              <h3 className="font-bold text-lg leading-tight mt-0.5">
                {event?.name || "งานพิเศษ"}
              </h3>
            </div>
            <button onClick={handleClose}
              className="relative z-10 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all">
              <X size={18} />
            </button>
          </div>

          <div className="p-5">

            {/* ── STEP: PICK ── */}
            {step === "pick" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${s.divider})` }} />
                  <p className="text-xs text-gray-400 font-medium tracking-wide">เลือกของขวัญที่อยากส่งให้</p>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${s.divider}, transparent)` }} />
                </div>

                {/* Gift Grid */}
                <div className="mb-5" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {gifts.map((g, i) => {
                    const isSelected = selectedGift?.emoji === g.emoji;
                    return (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.88 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        onClick={() => setSelectedGift(g)}
                        className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-all duration-200 ${
                          isSelected
                            ? `${s.selectedBg} ring-2 ${s.selectedRing} shadow-lg ${s.selectedGlow}`
                            : "bg-white ring-1 ring-gray-100 hover:ring-gray-200 shadow-sm hover:shadow-md"
                        }`}
                      >
                        <span className="text-3xl leading-none">{g.emoji}</span>
                        <span className="text-[10px] text-gray-500 font-medium text-center leading-tight px-0.5">{g.label}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-current opacity-60"
                            style={{ backgroundColor: s.divider }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  disabled={!selectedGift}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep("confirm")}
                  className={`w-full py-3.5 rounded-full font-bold text-white text-sm bg-gradient-to-r ${s.accent} ${s.accentHover} disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg`}
                  style={selectedGift ? { boxShadow: `0 8px 24px rgba(0,0,0,0.15)` } : {}}
                >
                  {selectedGift
                    ? <span className="flex items-center justify-center gap-2">{selectedGift.emoji} <span>ส่ง{selectedGift.label}</span> <span className="opacity-70">→</span></span>
                    : "เลือกของขวัญก่อนนะ 🎁"}
                </motion.button>
              </motion.div>
            )}

            {/* ── STEP: CONFIRM ── */}
            {step === "confirm" && (
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>

                {/* Gift preview card */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {/* Card */}
                    <div className="w-28 rounded-2xl overflow-hidden shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
                        border: "1.5px solid #fde68a",
                      }}>
                      <div className="h-1.5" style={{ background: "linear-gradient(90deg, #d97706, #fcd34d, #d97706)" }} />
                      <div className="flex flex-col items-center py-3 gap-1">
                        <motion.span
                          className="text-5xl"
                          animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        >
                          {selectedGift?.emoji}
                        </motion.span>
                        <span className="text-[10px] text-amber-600 font-semibold tracking-wide">{selectedGift?.label}</span>
                      </div>
                    </div>
                    {/* Ribbon bow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl pointer-events-none">🎀</div>
                  </div>
                </div>

                {/* Tab: Online / Offline */}
                <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-full">
                  {["offline", "online"].map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        tab === t
                          ? `bg-gradient-to-r ${s.tab} text-white shadow-md`
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {t === "offline" ? "🎁 ส่งออฟไลน์" : "💳 โอนออนไลน์"}
                    </button>
                  ))}
                </div>

                {/* Online: bank info */}
                {tab === "online" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`mb-4 p-3.5 rounded-2xl border ${s.bankBg}`}
                  >
                    {hasBankInfo ? (
                      <div className="text-center">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">ข้อมูลบัญชี</p>
                        <p className="font-mono text-base font-bold text-gray-800 tracking-wider">{bankInfo}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center text-xs">ยังไม่มีข้อมูลบัญชี — ติดต่อเจ้าภาพโดยตรงนะครับ 🙏</p>
                    )}
                  </motion.div>
                )}

                {/* Inputs */}
                <input
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="ชื่อของคุณ *"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-2.5 focus:outline-none focus:ring-2 focus:border-transparent bg-white/80"
                  style={{ "--tw-ring-color": s.divider }}
                  maxLength={40}
                />
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="ข้อความ (ไม่บังคับ)"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:border-transparent bg-white/80"
                  maxLength={120}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep("pick")}
                    className="flex-1 py-3 rounded-full text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    ← กลับ
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleConfirm}
                    disabled={!senderName.trim() || sending}
                    className={`flex-[2] py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r ${s.accent} ${s.accentHover} disabled:opacity-40 shadow-lg transition-all`}
                  >
                    {sending ? "กำลังส่ง..." : `ส่ง ${selectedGift?.emoji} เลย!`}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP: SUCCESS ── */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="flex flex-col items-center text-center py-2"
              >
                {/* Certificate card */}
                <div className="w-full rounded-2xl overflow-hidden mb-5 shadow-xl"
                  style={{
                    background: "linear-gradient(145deg, #fffbeb 0%, #fef9ee 50%, #fef3c7 100%)",
                    border: `2px solid ${s.certBorder}`,
                  }}>
                  {/* Gold strip */}
                  <div className="h-2" style={{ background: "linear-gradient(90deg, #d97706, #fcd34d, #f59e0b, #fcd34d, #d97706)" }} />

                  <div className="px-6 py-5">
                    {/* Divider */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #fcd34d)" }} />
                      <span className="text-[9px] font-bold tracking-[0.25em] text-amber-500 uppercase">Gift Certificate</span>
                      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #fcd34d, transparent)" }} />
                    </div>

                    {/* Emoji */}
                    <motion.div
                      animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.7 }}
                      className="text-7xl mb-3"
                    >
                      {selectedGift?.emoji}
                    </motion.div>

                    {/* Text */}
                    <div className="font-bold text-xl text-gray-800 mb-1">ส่งสำเร็จแล้ว! 🎉</div>
                    <div className="text-sm text-gray-600 mb-0.5">
                      <span className="font-bold text-gray-800">{senderName}</span>
                      <span> ส่ง{selectedGift?.label}</span>
                    </div>

                    {/* Dashed divider */}
                    <div className="my-3 border-t border-dashed border-amber-200" />
                    <p className="text-xs text-amber-500 font-medium tracking-wide">ขอบคุณที่ร่วมแสดงความยินดี 🙏</p>
                  </div>

                  {/* Bottom strip */}
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #d97706, #fcd34d, #f59e0b, #fcd34d, #d97706)" }} />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={handleClose}
                  className={`px-10 py-3 rounded-full font-bold text-white text-sm bg-gradient-to-r ${s.accent} shadow-lg`}
                >
                  ปิด
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
