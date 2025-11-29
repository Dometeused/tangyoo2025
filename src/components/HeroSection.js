"use client";
import Image from "next/image";
import Link from "next/link";
import DotThemeSwitcher from "@/components/DotThemeSwitcher";

export default function HeroSection({ current, onChange, THEMES }) {
  const theme = THEMES[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* BG Image เดี่ยว */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={theme.image}
          alt={theme.label}
          fill
          style={{ objectFit: "cover" }}
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-3 text-center drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)]">
          {theme.title}
        </h1>
        <div className="text-white text-base md:text-2xl mb-6 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {theme.desc}
        </div>
        <Link
          href={theme.ctaLink}
          className="px-6 py-2 md:px-10 md:py-4 rounded-full bg-orange-500 text-white font-bold text-lg md:text-2xl shadow-lg hover:bg-orange-600 transition mb-1"
        >
          {theme.cta}
        </Link>
      </div>
      
      {/* DotThemeSwitcher center bottom */}
      <div className="absolute left-1/2 bottom-8 z-20 -translate-x-1/2">
        <DotThemeSwitcher current={current} onChange={onChange} />
      </div>
    </section>
  );
}
