"use client";
import { useAppMode } from "@/context/AppModeContext";
import { THEMES_OBJ } from "@/constants/theme";
import CoverSection from "@/components/CoverSection";
import GalleryPreview from "@/components/GalleryPreview";
import GuestBookSection from "@/components/GuestBookSection";
import BioBox from "@/components/BioBox";
import BioBox2 from "@/components/BioBox2";
import BlessingButton from "@/components/BlessingSocialRow";
import SocialMediaButton from "@/components/SocialMediaButton";
import TimelineTree from "@/components/timeline-tree/TimelineTree";

import QRCodeAndScheduleSection from "@/components/QRCodeAndScheduleSection";
import CandleScrollTrail from "@/components/CandleScrollTrail";
import PetalScrollTrail from "@/components/PetalScrollTrail";
import SparkleScrollTrail from "@/components/SparkleScrollTrail";

// เพิ่ม BGM/Effect
import BGMPlayer from "@/components/BGMPlayer";
import ThemeEffect from "@/components/ThemeEffect";
import IntroOverlay from "@/components/IntroOverlay";
import { useState } from "react";

export default function MemoryPage({ event }) {
  const { role, theme, phase } = useAppMode();
  // Default to true if undefined, otherwise use the setting.
  // We can also add a logic here to check localStorage if needed in the future.
  const [showIntro, setShowIntro] = useState(event?.introEffect !== false);

  if (!event) return <div className="min-h-screen flex items-center justify-center text-gray-400 font-light text-lg">⏳ กำลังโหลดข้อมูลแห่งความทรงจำ...</div>;
  const isOwner = role === "owner" || role === "admin";
  // Use theme background or fallback to soft gradient
  const bgClass = THEMES_OBJ[theme]?.bg || "bg-gradient-to-br from-[#fff6fa] to-[#fff0f5]";

  return (
    <main className={`min-h-screen pb-20 ${bgClass}`}>
      {/* Intro Overlay */}
      {showIntro && (
        <IntroOverlay
          theme={theme}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* BGM และ Theme Effect */}
      <BGMPlayer />
      <ThemeEffect />
      <CandleScrollTrail theme={theme} />
      <PetalScrollTrail theme={theme} />
      <SparkleScrollTrail theme={theme} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">

        {/* BENTO GRID LAYOUT */}
        <div className="bento-grid">

          {/* 1. Cover Image (Full Width) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12 overflow-hidden rounded-[32px] shadow-warm-xl">
            <CoverSection event={event} />
          </div>

          {/* 2. BioBox (Left) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 glass-card p-6 md:p-8 flex flex-col justify-center">
            <BioBox bio={event.bio} eventId={event.id} />
          </div>

          {/* 3. Gallery Preview (Right - Wider) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-8 glass-card p-2 overflow-hidden">
            <div className="w-full h-full rounded-[24px] overflow-hidden">
              <GalleryPreview event={event} />
            </div>
          </div>

          {/* 4. GuestBook (Large Block) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 glass-card p-6 md:p-8 min-h-[400px]">
            <GuestBookSection memoryId={event.id} role={role} theme={theme} />
          </div>


          {/* 5. Right Sidebar (Bio2 + Social + Blessing) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col gap-6">
            {/* Bio 2 */}
            <div className="glass-card p-6 md:p-8">
              <BioBox2
                theme={event.theme}
                name={event.name}
                bio2={event.bio2}
                eventBio={event.bio2} // ✅ Map Story to Poster Bio
                eventId={event.id}
                isOwner={isOwner}
              />
            </div>

            {/* Blessing Actions */}
            <div className="glass-card p-4">
              <BlessingButton event={event} theme={theme} phase={phase} />
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-center text-gray-500 text-sm mb-4 font-medium tracking-wide">SHARE YOUR MEMORY</h3>
              <SocialMediaButton
                line={event.line}
                facebook={event.facebook}
                instagram={event.instagram}
                phone={event.phone}
                isOwner={isOwner}
                eventId={event.id}
                onEdit={() => { }}
              />
            </div>
          </div>

          {/* 6. Timeline Tree (Full Width) - Added based on user feedback */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12">
            <div className="glass-card p-4 md:p-8">
              <TimelineTree
                eventId={event.id}
                event={event}
                theme={event.theme || theme}
              />
            </div>
          </div>

          {/* 7. QR Code + Dress Code + Schedule (Full Width) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12">
            <div className="glass-card p-4 md:p-8">
              <QRCodeAndScheduleSection
                qrImageUrl={event.qr_url}
                scheduleImageUrl={event.schedule_url}
                event={event}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
