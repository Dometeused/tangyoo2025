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
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const load = async () => {
      // 1. Load event
      const event = await getEventById(eventId);
      if (!event) {
        setNotFound(true);
        return;
      }

      // 2. Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // 3. Determine role (admin > owner > guest)
      let role = "guest";

      if (user) {
        // Check admin via profiles table
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (profile?.is_admin) {
          role = "admin";
        } else if (event.user_id && user.id === event.user_id) {
          // Owner = user_id ตรงกัน (ไม่ใช้ email)
          role = "owner";
        }
      }

      // 4. Set context
      setTheme(event.theme || "wedding");
      setPhase(event.phase || "invitation");
      setRole(role);

      setEvent(event);
      setIsReady(true);
    };

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

  // Route by phase
  if (event.phase === "memory") return <MemoryPage event={event} />;
  if (event.phase === "invitation") return <InvitationPage event={event} />;

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">ไม่รู้จัก phase: {event.phase}</p>
    </div>
  );
}
