import { useAppMode } from "@/context/AppModeContext";
import { FaTrashAlt, FaExpand } from "react-icons/fa";
import { useState } from "react";
import Modal from "@/components/Modal";

const handwritingClass = "font-sukhumvit tracking-wide";

export default function GuestBookCard({
  name,
  message,
  prompt,
  date,
  image_url = "",
  id,
  onDelete,
}) {
  const { theme, role } = useAppMode();
  const photoUrl = image_url;

  // สี card background soft ตามธีม
  const bgMap = {
    wedding: "bg-white/70 border-pink-100",
    funeral: "bg-white/60 border-gray-200",
    family: "bg-[#fffde7]/70 border-yellow-100",
  };
  const bgClass = bgMap[theme] || "bg-white/80 border-gray-100";

  const formattedDate = date
    ? new Date(date).toLocaleString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Lightbox state
  const [showLightbox, setShowLightbox] = useState(false);

  // ปรับสูงต่ำ
  const [imgPos, setImgPos] = useState(50);
  const showMoveBtn = !!photoUrl && role === "owner";

  return (
    <div
      className={`relative border shadow-sm rounded-2xl px-4 py-3 my-3 ${bgClass} transition-all group`}
      style={{
        fontFamily: "'SukhumvitSet', 'Inter', 'sans-serif'",
        minHeight: 90,
      }}
    >
      {/* ปุ่มลบ */}
      {role === "owner" && onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 text-xs text-pink-400 hover:text-pink-600 z-10"
        >
          <FaTrashAlt />
        </button>
      )}

      {/* รายละเอียดใน card */}
      <div className="relative z-10">
        <div className="text-xs text-gray-400 mb-0.5">{formattedDate}</div>
        <div className={`text-lg font-bold mb-1 ${handwritingClass}`}>
          {name || "ไม่ระบุชื่อ"}
        </div>
        <div className="text-base whitespace-pre-wrap mb-1 break-words">{message}</div>
        {prompt && (
          <div className="text-xs italic text-pink-500 opacity-60 mt-1">“{prompt}”</div>
        )}

        {/* รูป (Responsive Aspect Ratio) */}
        {photoUrl && (
          <div className="w-full flex justify-center items-center mt-2 relative group">
            <div className="w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-md relative">
              <img
                src={photoUrl}
                alt="guest-upload"
                className="object-cover w-full h-full cursor-pointer transition hover:scale-105"
                onClick={() => setShowLightbox(true)}
                style={{ objectPosition: `center ${imgPos}%` }}
                loading="lazy"
              />

              {/* ปุ่มขยับสูงต่ำ */}
              {showMoveBtn && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
                  <button
                    className="bg-white/90 hover:bg-pink-100 rounded-full p-1 shadow"
                    onClick={() => setImgPos((v) => Math.max(0, v - 10))}
                    title="ขยับขึ้น"
                    type="button"
                  >▲</button>
                  <button
                    className="bg-white/90 hover:bg-pink-100 rounded-full p-1 shadow"
                    onClick={() => setImgPos((v) => Math.min(100, v + 10))}
                    title="ขยับลง"
                    type="button"
                  >▼</button>
                </div>
              )}

              {/* ปุ่มขยาย (FaExpand) */}
              <button
                className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 text-pink-400 hover:text-pink-600 shadow"
                onClick={() => setShowLightbox(true)}
                title="ขยายดูภาพ"
                type="button"
                style={{ zIndex: 2 }}
              >
                <FaExpand />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Lightbox (full image, no border/white bg) */}
      {showLightbox && (
        <Modal onClose={() => setShowLightbox(false)}>
          <img
            src={photoUrl}
            alt="รูปจากแขก"
            className="max-w-full max-h-[90vh] mx-auto rounded-2xl shadow"
            style={{ background: "transparent", border: "none" }}
          />
        </Modal>
      )}
    </div>
  );
}
