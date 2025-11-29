import { useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { useAppMode } from "@/context/AppModeContext";
import BioBox2WeddingPoster from "@/components/BioBox2WeddingPoster";
import BioBox2FuneralPoster from "@/components/BioBox2FuneralPoster";

export default function BioBox2(props) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const { theme } = useAppMode();

  // mapping props สำหรับแต่ละ theme (wedding, funeral)
  let PosterComponent, posterProps, portraitHint;
  if (theme === "funeral") {
    PosterComponent = BioBox2FuneralPoster;
    const { profile, poster_name, word, living } = props;
    posterProps = { profile, poster_name, word, living };
    portraitHint = (
      <div className="text-xs text-gray-500 mb-2 text-center">
        * แนะนำ: ใช้รูปถ่ายแนวตั้ง (portrait) เพื่อความสวยงาม
      </div>
    );
  } else {
    PosterComponent = BioBox2WeddingPoster;
    const { bridePic, groomPic, brideBio, groomBio, eventBio, funFact1, funFact2 } = props;
    posterProps = { bridePic, groomPic, brideBio, groomBio, eventBio, funFact1, funFact2 };
    portraitHint = (
      <div className="text-xs text-gray-500 mb-2 text-center">
        * แนะนำ: ใช้รูปถ่ายแนวตั้ง (portrait) และเขียนข้อความไม่เกิน 2-3 บรรทัด
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {portraitHint}

      {/* กล่องโปสเตอร์พร้อม Lightbox */}
      <div
        className="relative w-full max-w-[420px] aspect-[7/10] rounded-2xl overflow-hidden shadow cursor-pointer bg-white border border-gray-100"
        onClick={() => setOpenLightbox(true)}
        tabIndex={0}
        aria-label="แสดงโปสเตอร์เต็มจอ"
      >
        <PosterComponent {...posterProps} className="w-full h-full" />
        <div className="absolute right-2 bottom-2 bg-black/40 text-white rounded-full p-2 text-xl pointer-events-none">
          <IoMdExpand />
        </div>
        {props.isOwner && (
          <button
            className="absolute top-2 right-2 bg-white/70 hover:bg-white p-2 rounded-full text-sm shadow"
            style={{ zIndex: 3 }}
            onClick={e => {
              e.stopPropagation();
              props.onEdit?.();
            }}
            tabIndex={0}
            aria-label="แก้ไขโปสเตอร์"
          >
            ✏️
          </button>
        )}
      </div>

      {/* Lightbox */}
      {openLightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpenLightbox(false)}
        >
          <button
            className="absolute top-8 right-8 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow z-10"
            onClick={() => setOpenLightbox(false)}
            aria-label="ปิดโปสเตอร์"
          >
            ✕
          </button>
          <div className="w-[min(95vw,900px)] h-[min(95vh,1200px)] flex items-center justify-center">
            <PosterComponent {...posterProps} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}
