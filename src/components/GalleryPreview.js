"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { useAppMode } from "@/context/AppModeContext";

export default function GalleryPreview({ event }) {
  const router = useRouter();
  const { role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!event) return null;

  const images = [
    event.feature_image_1,
    event.feature_image_2,
    event.feature_image_3,
  ].filter(Boolean);

  const slots = [...images];
  while (slots.length < 3) slots.push(null);



  const makeUrl = (filename) => {
    if (!filename) return null;
    if (
      filename.startsWith("/") ||
      filename.startsWith("data:") ||
      filename.startsWith("blob:")
    ) {
      return filename;
    }
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
    // Navigate to the dynamic gallery page if event ID is available, otherwise default gallery
    if (event?.id) {
      router.push(`/gallery/${event.id}`);
    } else {
      router.push("/gallery");
    }
  };

  return (
    <section className="w-full mb-6">
      <div className="flex items-center justify-between mb-4 font-kanit">
        <div className="font-semibold text-xl text-gray-800">แกลเลอรีภาพเด่น</div>
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
              <Image
                src={makeUrl(filename)}
                alt={`gallery-feature-${i}`}
                fill
                className="object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                onClick={() => {
                  setLightboxIndex(i);
                  setOpenLightbox(true);
                }}
              />
            </div>
          ) : isOwner ? (
            <div
              key={i}
              className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 border border-dashed rounded-xl border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={handleClickAll}
              title="เพิ่มรูปภาพ"
              style={{ cursor: "pointer" }}
            >
              <span className="text-4xl text-gray-300">🖼️</span>
              <span className="text-xs text-gray-400 font-medium text-center px-2">
                {i === 0 ? "เพิ่มรูปหลัก" : `รูปที่ ${i + 1}`}
              </span>
              <span className="text-[10px] text-gray-300">กดเพื่อจัดการ</span>
            </div>
          ) : (
            <div
              key={i}
              className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 border border-dashed rounded-xl border-gray-200 bg-gray-50/50"
            >
              <span className="text-3xl text-gray-200">📷</span>
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

      {isOwner && (
        <div className="text-gray-400 text-xs mt-4 text-center">
          สามารถเปลี่ยน/เพิ่มรูปเด่นได้ที่หน้า <b>จัดการแกลเลอรี</b>
        </div>
      )}
    </section>
  );
}
