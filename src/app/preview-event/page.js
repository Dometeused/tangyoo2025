"use client";
export const dynamic = "force-dynamic";
;
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppMode } from "@/context/AppModeContext";
import InvitationPage from "@/components/InvitationPage";
import MemoryPage from "@/components/MemoryPage";

function PreviewEventContent() {
  const searchParams = useSearchParams();
  const { setTheme, setPhase, setRole } = useAppMode();
  const [ready, setReady] = useState(false);

  const theme = searchParams.get("theme") || "wedding";
  const name  = searchParams.get("name")  || "";
  const date  = searchParams.get("date")  || "";
  const place = searchParams.get("place") || "";
  const phase = searchParams.get("phase") || "invitation";

  const PLACEHOLDERS = {
    wedding:     { name: "ชื่องานแต่งของคุณ",     poster: "คู่บ่าวสาว" },
    funeral:     { name: "ผู้เป็นที่รักของครอบครัว", poster: "ผู้ล่วงลับ" },
    anniversary: { name: "ชื่องานครบรอบของคุณ",   poster: "ผู้จัดงาน"   },
    baby:        { name: "ชื่อลูกน้อยของคุณ",      poster: "ครอบครัว"    },
  };
  const ph = PLACEHOLDERS[theme] || PLACEHOLDERS.wedding;

  const mockEvent = {
    id: "preview",
    name:  name  || ph.name,
    theme,
    phase,
    date:  date  || "",
    place: place || "",
    bio:   "",
    bio2:  "",
    cover_url:    null,
    profile:      null,
    qr_url:       null,
    schedule_url: null,
    youtube_link: null,
    introEffect:  false,
    poster_name:    name || ph.poster,
    poster_caption: "",
    word:   "",
    living: "",
    bank_info:    null,
    qr_note:      null,
    video_mode:   "none",
  };

  useEffect(() => {
    setTheme(theme);
    setPhase(phase);
    setRole("guest");
    setReady(true);
  }, [theme, phase, setTheme, setPhase, setRole]);

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
      กำลังโหลด...
    </div>
  );

  return phase === "memory"
    ? <MemoryPage event={mockEvent} />
    : <InvitationPage event={mockEvent} refetchEvent={() => {}} />;
}

export default function PreviewEventPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        กำลังโหลด...
      </div>
    }>
      <PreviewEventContent />
    </Suspense>
  );
}
