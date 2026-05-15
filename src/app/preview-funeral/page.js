"use client";
export const dynamic = "force-dynamic";
;
import { useState, useEffect } from "react";
import { useAppMode } from "@/context/AppModeContext";
import MemoryPage from "@/components/MemoryPage";
import InvitationPage from "@/components/InvitationPage";

const MOCK_FUNERAL_EVENT = {
  id: "preview-funeral",
  name: "คุณพ่อสมชาย ใจดี",
  theme: "funeral",
  phase: "invitation",
  bio: "เพื่อระลึกถึงคุณพ่อสมชาย ใจดี ผู้เป็นที่รักยิ่งของครอบครัว ซึ่งได้จากไปอย่างสงบในวันที่ 10 มีนาคม 2568",
  bio2: "ชีวิตที่เต็มไปด้วยความรักและการเสียสละ",
  date: "2025-03-10",
  place: "วัดโพธิ์ บางกอกน้อย",
  cover_url: null,
  poster_name: "สมชาย ใจดี",
  poster_caption: "อดีตข้าราชการครู ผู้มีคุณธรรม เมตตา และความรักต่อครอบครัวตลอดชีวิต",
  word: "ความทรงจำของท่านยังคงอยู่ในใจเราตลอดไป",
  living: "พ.ศ. 2490 – 2567",
  profile: null,
  line: null,
  facebook: null,
  instagram: null,
  phone: null,
  qr_url: null,
  schedule_url: null,
  youtube_link: null,
  introEffect: false,
};

export default function PreviewFuneralPage() {
  const { setTheme, setPhase, setRole } = useAppMode();
  const [activePhase, setActivePhase] = useState("invitation");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme("funeral");
    setRole("owner");
    setPhase("invitation");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setPhase(activePhase);
  }, [activePhase, ready]);

  const mockEvent = { ...MOCK_FUNERAL_EVENT, phase: activePhase };

  if (!ready) return <div className="min-h-screen flex items-center justify-center text-gray-400">กำลังโหลด...</div>;

  return (
    <div>
      {/* Phase toggle bar */}
      <div className="fixed top-16 left-0 right-0 z-[9999] flex justify-center gap-3 py-2 bg-black/80 backdrop-blur-sm">
        <button
          onClick={() => setActivePhase("invitation")}
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${activePhase === "invitation" ? "bg-orange-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
        >
          📅 Invitation Phase
        </button>
        <button
          onClick={() => setActivePhase("memory")}
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${activePhase === "memory" ? "bg-orange-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
        >
          🎞️ Memory Phase
        </button>
      </div>

      {/* Page content */}
      {activePhase === "invitation"
        ? <InvitationPage event={mockEvent} refetchEvent={() => {}} />
        : <MemoryPage event={mockEvent} />
      }
    </div>
  );
}
