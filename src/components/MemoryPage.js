"use client";
import { useAppMode } from "@/context/AppModeContext";
import { THEMES_OBJ } from "@/constants/theme";
import CoverSection from "@/components/CoverSection";
import GalleryPreview from "@/components/GalleryPreview";
import GuestBookSection from "@/components/GuestBookSection";
import BioBox from "@/components/BioBox";
import BioBox2 from "@/components/BioBox2WeddingPoster";
import BlessingButton from "@/components/BlessingSocialRow";
import SocialMediaButton from "@/components/SocialMediaButton";

// เพิ่ม BGM/Effect
import BGMPlayer from "@/components/BGMPlayer";
import ThemeEffect from "@/components/ThemeEffect";

export default function MemoryPage({ event }) {
  const { role, theme, phase } = useAppMode();
  if (!event) return <div className="p-10 text-center">⏳ กำลังโหลดข้อมูล...</div>;
  const isOwner = role === "owner";
  const bgClass = THEMES_OBJ[theme]?.bg || "bg-white";

  return (
    <main className={`p-6 min-h-screen text-gray-800 ${bgClass}`}>
      {/* BGM และ Theme Effect */}
      <BGMPlayer />
      <ThemeEffect />

      {/* 1. Cover Image */}
      <div className="mb-6">
        <CoverSection event={event} />
      </div>

      {/* 2. BioBox (bio) */}
      <div className="mb-4">
        <BioBox bio={event.bio} eventId={event.id} />
      </div>

      {/* 3. Gallery Preview */}
      <div className="mb-6">
        <GalleryPreview event={event} />
      </div>

      {/* 4. Blessing Button */}
      <div className="mb-6">
        <BlessingButton eventId={event.id} theme={theme} phase={phase} />
      </div>

      {/* 5. GuestBookSection (ซ้าย) + BioBox2 (ขวา) + SocialMediaButton (ใต้ BioBox2) */}
      <div className="mb-6 flex flex-col md:flex-row gap-8">
        {/* GuestBook (ซ้าย) */}
        <div className="md:w-1/2 w-full">
          <GuestBookSection memoryId={event.id} role={role} theme={theme} />
        </div>
        {/* BioBox2 + SocialMediaButton (ขวา) */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <BioBox2
            theme={event.theme}
            name={event.name}
            bio2={event.bio2}
            eventId={event.id}
            isOwner={isOwner}
          />
          <SocialMediaButton
            line={event.line}
            facebook={event.facebook}
            instagram={event.instagram}
            phone={event.phone}
            isOwner={isOwner}
            eventId={event.id}
            onEdit={() => {}}
          />
        </div>
      </div>
    </main>
  );
}
