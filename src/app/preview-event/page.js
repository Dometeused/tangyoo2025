"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppMode } from "@/context/AppModeContext";
import InvitationPage from "@/components/InvitationPage";
import MemoryPage from "@/components/MemoryPage";
import { DEMO_EVENTS } from "@/components/DemoPageClient";

function PreviewEventInner() {
  const searchParams = useSearchParams();
  const { setTheme, setPhase, setRole } = useAppMode();

  const theme = searchParams.get("theme") || "wedding";
  const name  = searchParams.get("name")  || "";
  const date  = searchParams.get("date")  || "";
  const place = searchParams.get("place") || "";
  const phase = searchParams.get("phase") || "invitation";

  const safeTheme = ["wedding","funeral","anniversary","baby"].includes(theme) ? theme : "wedding";
  const safePhase = phase === "memory" ? "memory" : "invitation";

  useEffect(() => {
    setTheme(safeTheme);
    setPhase(safePhase);
    setRole("guest");
  }, [safeTheme, safePhase, setTheme, setPhase, setRole]);

  const base = DEMO_EVENTS[safeTheme] || DEMO_EVENTS.wedding;
  const event = {
    ...base,
    name:        name  || base.name,
    date:        date  || base.date,
    place:       place || base.place,
    event_place: place || base.event_place,
    phase:       safePhase,
    introEffect: false,
  };

  if (safePhase === "memory") return <MemoryPage event={event} />;
  return <InvitationPage event={event} />;
}

export default function PreviewEventPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PreviewEventInner />
    </Suspense>
  );
}
