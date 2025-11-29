"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ตั้งค่าธีม
const THEMES = [
  {
    key: "funeral",
    label: "งานอาลัย",
    image: "/images/funeral-hero.png",
    bg: "bg-zinc-900",
    text: "text-white",
    title: "สร้างหน้าอาลัย บันทึกความทรงจำสุดท้าย",
    desc: "ให้ TangYoo เก็บความหมายอาลัย ไม่ให้ความทรงจำหายไป",
    cta: "สร้างหน้าอาลัย",
    ctaLink: "/creation?theme=funeral"
  },
  {
    key: "wedding",
    label: "งานแต่ง",
    image: "/images/wedding-hero.png",
    bg: "bg-pink-100",
    text: "text-pink-700",
    title: "เก็บทุกโมเมนต์แห่งความรัก",
    desc: "รวมภาพความประทับใจและคำอวยพรสำคัญในวันแต่งงาน",
    cta: "สร้างหน้าแต่งงาน",
    ctaLink: "/creation?theme=wedding"
  },
  {
    key: "anniversary",
    label: "งานครบรอบ/ของขวัญ",
    image: "/images/anniversary-hero.png",
    bg: "bg-blue-50",
    text: "text-blue-700",
    title: "ของขวัญความทรงจำ สำหรับคนพิเศษ",
    desc: "ส่งต่อความรู้สึกดี ๆ ในวันสำคัญ ด้วยของขวัญที่มีเรื่องราว",
    cta: "สร้างของขวัญพิเศษ",
    ctaLink: "/creation?theme=anniversary"
  }
];

export default function HeroSection({ current = 0, onChange }) {
  // slider
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: current,
    slideChanged(s) {
      onChange?.(s.track.details.rel);
    },
  });

  // sync external current <-> slider
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(current);
    }
  }, [current, instanceRef]);

  return (
    <div className={`w-full flex flex-col items-center justify-center ${THEMES[current].bg} ${THEMES[current].text} transition-colors duration-500 pb-12`}>
      {/* Hero Carousel */}
      <div ref={sliderRef} className="keen-slider w-full max-w-4xl py-12">
        {THEMES.map((t) => (
          <div className="keen-slider__slide flex flex-col items-center" key={t.key}>
            <Image
              src={t.image}
              alt={t.label}
              width={520}
              height={320}
              className="rounded-2xl shadow-xl mb-8"
              priority
            />
            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center drop-shadow-lg">{t.title}</h1>
            <p className="md:text-2xl text-lg mb-7 text-center font-medium drop-shadow">{t.desc}</p>
            <Link
              href={t.ctaLink}
              className="px-8 py-3 rounded-full text-white font-bold text-lg shadow bg-orange-500 hover:bg-orange-600 transition mb-4"
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Arrow controls */}
      <div className="flex gap-6 mt-2">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="p-3 rounded-full bg-black/20 hover:bg-black/40 text-white"
          aria-label="Prev"
        >&#8592;</button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="p-3 rounded-full bg-black/20 hover:bg-black/40 text-white"
          aria-label="Next"
        >&#8594;</button>
      </div>

      {/* Dot controls */}
      <div className="flex gap-3 mt-7">
        {THEMES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              onChange?.(i);
              instanceRef.current?.moveToIdx(i);
            }}
            className={`w-4 h-4 rounded-full border-2 transition
              ${i === current
                ? "bg-orange-500 border-orange-500 scale-110"
                : "bg-white border-gray-400 hover:bg-orange-100"}`}
            aria-label={THEMES[i].label}
          />
        ))}
      </div>
    </div>
  );
}
