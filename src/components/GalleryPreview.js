"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryPreview({ event }) {
  const router = useRouter();

  if (!event) return null;

  const images = [
    event.feature_image_1,
    event.feature_image_2,
    event.feature_image_3,
  ].filter(Boolean);

  const slots = [...images];
  while (slots.length < 3) slots.push(null);

  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const makeUrl = (filename) => {
    if (!filename) return null;
    const baseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://your-project.supabase.co";
    return filename.startsWith("http")
      ? filename
      : `${baseUrl}/storage/v1/object/public/gallery/${filename}`;
  };

  const slides = images
    .map((filename) => ({ src: makeUrl(filename) }))
    .filter((s) => !!s.src);

  const handleClickAll = () => {
    router.push("/gallery");
  };

  return (
    <section className="w-full mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-xl text-gray-700">แกลเลอรีภาพเด่น</div>
        <button
          onClick={handleClickAll}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition"
        >
          ดูทั้งหมด
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {slots.map((filename, i) =>
          filename ? (
            <div key={i} className="w-full aspect-[3/4] relative">
              <img
                src={makeUrl(filename)}
                alt={`gallery-feature-${i}`}
                className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                onClick={() => {
                  setLightboxIndex(i);
                  setOpenLightbox(true);
                }}
              />
            </div>
          ) : (
            <div
              key={i}
              className="w-full aspect-[3/4] flex items-center justify-center border border-dashed rounded-xl border-gray-300 bg-gray-50"
              onClick={handleClickAll}
              title="เพิ่มรูป"
              style={{ cursor: "pointer" }}
            >
              <span className="text-5xl text-gray-300">＋</span>
            </div>
          )
        )}
      </div>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={lightboxIndex}
        callbacks={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />

      <div className="text-gray-400 text-xs mt-4 text-center">
        สามารถเปลี่ยน/เพิ่มรูปเด่นได้ที่หน้า <b>จัดการแกลเลอรี</b>
      </div>
    </section>
  );
}
