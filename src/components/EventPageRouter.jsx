"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppMode } from "@/context/AppModeContext";
import { getEventById } from "@/lib/events";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import MemoryPage from "@/components/MemoryPage";
import InvitationPage from "@/components/InvitationPage";

export default function EventPageRouter() {
  const { id: eventId } = useParams();
  const { setRole, setTheme, setPhase } = useAppMode();
  const supabase = createClientComponentClient();
  const [event, setEvent] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const load = async () => {
      const event = await getEventById(eventId);
      if (!event) {
        console.error("❌ ไม่พบ Event จาก getEventById");
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      const savedEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

      const normalizedUser = user?.email?.trim().toLowerCase();
      const normalizedLocal = savedEmail?.trim().toLowerCase();
      const normalizedOwner = event.email?.trim().toLowerCase();
      const isOwner = normalizedUser === normalizedOwner || normalizedLocal === normalizedOwner;

      // log event
      console.log("[EventPageRouter] loaded event:", event);

      setTheme(event.theme);
      setPhase(event.phase);
      setRole(isOwner ? "owner" : "guest");

      setEvent(event);
      setIsReady(true);
    };

    load();
  }, [eventId]);

  if (!event || !isReady) {
    return <div className="text-center py-10">⏳ กำลังโหลดข้อมูล Event...</div>;
  }

  return event.phase === "memory"
    ? <MemoryPage event={event} />
    : <InvitationPage event={event} />;
}
