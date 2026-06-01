"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppMode } from "@/context/AppModeContext";
import { getEventById } from "@/lib/events";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import MemoryPage from "@/components/MemoryPage";
import InvitationPage from "@/components/InvitationPage";
import PrivacyGate from "@/components/PrivacyGate";

export default function EventPageRouter() {
  const { id: eventId } = useParams();
  const { setRole, setTheme, setPhase } = useAppMode();
  const supabase = createClientComponentClient();

  const [event, setEvent] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [locked, setLocked] = useState(false);

  const load = async () => {
    const ev = await getEventById(eventId);
    if (!ev) { setNotFound(true); return; }

    const { data: { user } } = await supabase.auth.getUser();

    let role = "guest";
    if (user) {
      const { data: profile } = await supabase
        .from("profiles").select("is_admin").eq("id", user.id).maybeSingle();

      if (profile?.is_admin) {
        role = "admin";
      } else if (
        (ev.user_id && user.id === ev.user_id) ||
        (ev.email   && user.email?.toLowerCase() === ev.email?.toLowerCase())
      ) {
        role = "owner";
      }
    }

    setTheme(ev.theme || "wedding");
    setPhase(ev.phase  || "invitation");
    setRole(role);

    if (ev.is_private && role === "guest") {
      const hasAccess = localStorage.getItem(`ty_access_${ev.id}`) === "1";
      if (!hasAccess) setLocked(true);
    }

    setEvent(ev);
    setIsReady(true);
  };

  useEffect(() => {
    if (!eventId) return;
    load();
  }, [eventId]);

  // Loading
  if (!isReady && !notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  // Not found
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="text-5xl">🔍</div>
          <h1 className="text-xl font-bold text-gray-800">ไม่พบ Event นี้</h1>
          <p className="text-gray-400 text-sm">Event อาจถูกลบหรือ URL ไม่ถูกต้อง</p>
          <a href="/dashboard" className="inline-block mt-2 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition">
            กลับ Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Route by phase (render behind the gate too)
  const pageContent = event.phase === "memory"
    ? <MemoryPage event={event} refetchEvent={load} />
    : event.phase === "invitation"
    ? <InvitationPage event={event} refetchEvent={load} />
    : null;

  return (
    <>
      {pageContent}
      {locked && <PrivacyGate event={event} onUnlock={() => setLocked(false)} />}
    </>
  );

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">ไม่รู้จัก phase: {event.phase}</p>
    </div>
  );
}
