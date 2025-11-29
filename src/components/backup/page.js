"use client";

import { useState } from "react";
import DevControlBar from "@/components/DevControlBar";
import CoverSection from "@/components/CoverSection";
import BioBox from "@/components/BioBox";
import ButtonGroupSection from "@/components/ButtonGroupSection";
import QRCodeAndScheduleSection from "@/components/QRCodeAndScheduleSection";
import Gallery from "@/components/Gallery";
import BlessingButton from "@/components/BlessingSocialRow";
import GuestBookSection from "@/components/GuestBookSection";
import { useAppMode } from "@/context/AppModeContext";

export default function MemoryPage() {
  const { theme, phase, role } = useAppMode();

  const [gallery, setGallery] = useState([
    {
      src: "/gallery/sample1.jpg",
      uploadedAt: "2025-06-01T08:00:00Z",
    },
    {
      src: "/gallery/sample2.jpg",
      uploadedAt: "2025-06-02T12:00:00Z",
    },
    {
      src: "/gallery/sample3.jpg",
      uploadedAt: "2025-06-03T16:30:00Z",
    },
  ]);

  // ✅ MOCK Guest Book Entries
  const [guestbookEntries] = useState([
    {
      id: 1,
      name: "ปิ่น",
      message: "ขอให้มีความสุขมาก ๆ",
      prompt: "💌 โมเมนต์สุดประทับใจของคุณกับคู่บ่าวสาว?",
      date: "2025-06-12T10:00:00Z",
      photoUrl: "",
    },
    {
      id: 2,
      name: "บี",
      message: "รักกันนาน ๆ นะ",
      prompt: "🎉 มีอะไรอยากอวยพรให้กับทั้งสองคน?",
      date: "2025-06-12T11:00:00Z",
      photoUrl: "",
    },
    {
      id: 3,
      name: "เก๋",
      message: "เป็นคู่ที่น่ารักมากเลยค่ะ 💖",
      prompt: "🌸 คุณรู้สึกอย่างไรในงานนี้?",
      date: "2025-06-12T13:00:00Z",
    },
    {
      id: 4,
      name: "นนท์",
      message: "จำได้ว่าตอนไปทะเลด้วยกัน สนุกมากกก!",
      prompt: "📸 แชร์ภาพหรือเหตุการณ์ลึกซึ้ง",
      date: "2025-06-12T14:00:00Z",
    },
    {
      id: 5,
      name: "แจน",
      message: "ยินดีด้วยนะคะ ขอให้มีความสุขทุกวัน",
      prompt: "🎉 มีอะไรอยากอวยพรให้กับทั้งสองคน?",
      date: "2025-06-12T15:00:00Z",
    },
  ]);

  const bgClass =
    theme === "funeral"
      ? "bg-black text-white"
      : theme === "wedding"
      ? "bg-pink-50"
      : "bg-gray-50";

  return (
    <main className={`min-h-screen w-full ${bgClass} flex flex-col items-center py-6 px-4`}>
      <CoverSection />

      <div className="w-full max-w-screen-lg">
        <DevControlBar />
        <BioBox />
        {phase === "invitation" && (
          <>
            <ButtonGroupSection />
            <QRCodeAndScheduleSection />
          </>
        )}
      </div>

      {/* ✅ Gallery อยู่ใต้ทุกเฟส และเต็มจอ */}
      <div className="w-full max-w-screen-xl mt-6">
        <Gallery
          gallery={gallery}
          onUpload={role === "owner" ? (img) => setGallery((prev) => [...prev, img]) : undefined}
          onViewAll={() => alert("👉 ดูทั้งหมด")}
        />
      </div>

      {/* ✅ Blessing + GuestBook */}
      <div className="w-full max-w-screen-lg mt-6 flex flex-col items-center gap-6">
        <BlessingButton />
        <GuestBookSection entries={guestbookEntries} theme={theme} phase={phase} />
      </div>
    </main>
  );
}