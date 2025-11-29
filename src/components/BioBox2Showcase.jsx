import { useState } from "react";
import BioBox2WeddingPoster from "@/components/BioBox2WeddingPoster"; // path ตามของจริง

export default function BioBox2Showcase({ event }) {
  // สำหรับ lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="relative">
      {/* Responsive Card/Poster */}
      <div
        className="w-full max-w-[420px] aspect-[9/13] mx-auto bg-gray-50 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
        onClick={() => setLightboxOpen(true)}
        title="คลิกเพื่อขยายภาพโปสเตอร์"
      >
        <BioBox2WeddingPoster
          bridePic={event.bridePic}
          groomPic={event.groomPic}
          brideBio={event.brideBio}
          groomBio={event.groomBio}
          eventBio={event.eventBio}
          funFact1={event.funFact1}
          funFact2={event.funFact2}
          className="w-full h-full block"
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] p-2 bg-white rounded-2xl"
            onClick={e => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกในภาพ
          >
            <button
              className="absolute top-2 right-2 text-2xl bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
              onClick={() => setLightboxOpen(false)}
              aria-label="ปิด"
            >
              ×
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <BioBox2WeddingPoster
                bridePic={event.bridePic}
                groomPic={event.groomPic}
                brideBio={event.brideBio}
                groomBio={event.groomBio}
                eventBio={event.eventBio}
                funFact1={event.funFact1}
                funFact2={event.funFact2}
                className="w-full h-full block"
                style={{
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  boxShadow: "0 8px 40px #0004",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Prompt (แนะนำ/ช่วย user) */}
      <div className="mt-3 text-sm text-gray-500 text-center">
        <div>
          <strong>แนะนำ:</strong>  
          ควรเลือกรูปแนวตั้ง (portrait) และเขียนข้อความไม่เกิน 2-3 บรรทัด เพื่อความสวยงาม
        </div>
        <div>คลิกที่โปสเตอร์เพื่อดูแบบขยาย</div>
      </div>
    </div>
  );
}
