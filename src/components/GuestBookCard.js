"use client";

import { useAppMode } from "@/context/AppModeContext";
import { FaTrashAlt, FaExpand } from "react-icons/fa";
import { useState } from "react";
import Modal from "@/components/Modal";

const handwritingClass = "font-sukhumvit tracking-wide";

// Parse gift prompt: "GIFT:💐:offline" → { emoji: "💐", type: "offline" }
function parseGift(prompt) {
  if (!prompt?.startsWith("GIFT:")) return null;
  const parts = prompt.split(":");
  return { emoji: parts[1] || "🎁", type: parts[2] || "offline" };
}

// ── GIFT CARD — premium voucher layout ──────────────────────────────────────
function GiftCard({ gift, name, message, date, id, isOwner, onDelete, compact }) {
  const formattedDate = date
    ? new Date(date).toLocaleString("th-TH", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : "";

  if (compact) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-amber-200 shadow-sm my-2"
        style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a22 100%)" }}>
        {/* Gold top strip */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)" }} />
        <div className="px-3 py-2 flex items-center gap-2">
          <span className="text-2xl">{gift.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-gray-800 truncate">{name || "ไม่ระบุชื่อ"}</div>
            {message && <div className="text-xs text-gray-500 truncate">{message}</div>}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">🎁</span>
            {gift.type === "online" && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-semibold">💳</span>
            )}
          </div>
        </div>
        {isOwner && onDelete && (
          <button onClick={() => onDelete(id)} className="absolute top-2 right-2 text-[10px] text-amber-400 hover:text-red-400 z-10">
            <FaTrashAlt />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden my-3 shadow-md"
      style={{
        background: "linear-gradient(145deg, #fffbeb 0%, #fef9ee 40%, #fef3c7 100%)",
        border: "1px solid #fde68a",
      }}>

      {/* Delete button */}
      {isOwner && onDelete && (
        <button onClick={() => onDelete(id)}
          className="absolute top-3 right-3 text-xs text-amber-300 hover:text-red-400 z-20 transition-colors">
          <FaTrashAlt />
        </button>
      )}

      {/* Gold shimmer top strip */}
      <div className="h-2 w-full"
        style={{ background: "linear-gradient(90deg, #d97706, #fcd34d, #f59e0b, #fcd34d, #d97706)" }} />

      <div className="px-5 pt-4 pb-4">

        {/* Emoji in decorative frame */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shadow-inner"
              style={{
                background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
                border: "1.5px solid #fde68a",
                boxShadow: "inset 0 2px 8px rgba(251,191,36,0.15), 0 4px 12px rgba(245,158,11,0.15)",
              }}>
              {gift.emoji}
            </div>
            {/* Corner sparkles */}
            <span className="absolute -top-1.5 -right-1.5 text-sm">✨</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-sm opacity-70">✨</span>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #fcd34d, transparent)" }} />
          <span className="text-[9px] font-bold tracking-[0.2em] text-amber-500 uppercase">ของขวัญ</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #fcd34d, transparent)" }} />
        </div>

        {/* Sender name */}
        <div className="text-center mb-1">
          <div className="font-bold text-gray-800 text-base leading-tight">{name || "ไม่ระบุชื่อ"}</div>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center text-sm text-gray-500 italic mb-3 leading-snug px-2">
            &ldquo;{message}&rdquo;
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2.5"
          style={{ borderTop: "1px dashed #fde68a" }}>
          <div className="flex gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              🎁 ของขวัญ
            </span>
            {gift.type === "online" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-semibold">
                💳 โอนแล้ว
              </span>
            )}
          </div>
          <div className="text-[10px] text-amber-400 font-medium">{formattedDate}</div>
        </div>

      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function GuestBookCard({
  name, message, prompt, date, image_url = "",
  id, onDelete, compact = false,
}) {
  const { theme, role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const photoUrl = image_url;
  const gift = parseGift(prompt);

  // Delegate to premium gift card
  if (gift) {
    return <GiftCard gift={gift} name={name} message={message} date={date}
      id={id} isOwner={isOwner} onDelete={onDelete} compact={compact} />;
  }

  // ── Regular card ──────────────────────────────────────────────────────────
  const bgMap = {
    wedding: "bg-white/70 border-pink-100",
    funeral: "bg-white/60 border-gray-200",
    anniversary: "bg-[#fffbeb]/70 border-amber-100",
    baby: "bg-[#f3e8ff]/70 border-purple-100",
  };
  const bgClass = bgMap[theme] || "bg-white/80 border-gray-100";

  const formattedDate = date
    ? new Date(date).toLocaleString("th-TH", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : "";

  const [showLightbox, setShowLightbox] = useState(false);
  const [imgPos, setImgPos] = useState(50);
  const showMoveBtn = !!photoUrl && isOwner;

  const paddingClass = compact ? "px-3 py-2 my-2" : "px-4 py-3 my-3";
  const nameClass = compact
    ? "text-base font-bold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
    : `text-lg font-bold mb-1 ${handwritingClass}`;
  const msgClass = compact ? "text-sm mb-0.5 line-clamp-3" : "text-base mb-1";
  const imgMaxH = compact ? "max-h-32" : "";

  return (
    <div
      className={`relative border shadow-sm rounded-2xl ${paddingClass} ${bgClass} transition-all group`}
      style={{ fontFamily: "'SukhumvitSet', 'Inter', 'sans-serif'", minHeight: compact ? 70 : 90 }}
    >
      {isOwner && onDelete && (
        <button onClick={() => onDelete(id)}
          className="absolute top-2 right-2 text-xs text-pink-400 hover:text-pink-600 z-10">
          <FaTrashAlt />
        </button>
      )}

      <div className="relative z-10">
        <div className="text-[10px] text-gray-400 mb-0.5 leading-none">{formattedDate}</div>
        <div className={nameClass}>{name || "ไม่ระบุชื่อ"}</div>
        <div className={`${msgClass} whitespace-pre-wrap break-words`}>{message}</div>
        {prompt && (
          <div className="text-[10px] italic text-pink-500 opacity-60 mt-0.5 leading-none mb-1">&quot;{prompt}&quot;</div>
        )}

        {photoUrl && (
          <div className="w-full flex justify-center items-center mt-1 relative group">
            <div className={`w-full max-w-[420px] ${compact ? "aspect-[21/9]" : "aspect-[4/3]"} rounded-xl overflow-hidden shadow-md relative group`}>
              <img src={photoUrl} alt="guest-upload"
                className={`object-cover w-full h-full cursor-pointer transition hover:scale-105 ${imgMaxH}`}
                onClick={() => setShowLightbox(true)}
                style={{ objectPosition: `center ${imgPos}%` }}
                loading="lazy" />

              {showMoveBtn && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
                  <button className="bg-white/90 hover:bg-pink-100 rounded-full p-1 shadow"
                    onClick={(e) => { e.stopPropagation(); setImgPos((v) => Math.max(0, v - 10)); }}
                    title="ขยับขึ้น" type="button">▲</button>
                  <button className="bg-white/90 hover:bg-pink-100 rounded-full p-1 shadow"
                    onClick={(e) => { e.stopPropagation(); setImgPos((v) => Math.min(100, v + 10)); }}
                    title="ขยับลง" type="button">▼</button>
                </div>
              )}

              <button className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1.5 text-pink-400 hover:text-pink-600 shadow"
                onClick={() => setShowLightbox(true)} title="ขยายดูภาพ" type="button" style={{ zIndex: 2 }}>
                <FaExpand size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showLightbox && (
        <Modal onClose={() => setShowLightbox(false)}>
          <img src={photoUrl} alt="รูปจากแขก"
            className="max-w-full max-h-[90vh] mx-auto rounded-2xl shadow"
            style={{ background: "transparent", border: "none" }} />
        </Modal>
      )}
    </div>
  );
}
