"use client";

import { useEffect } from "react";
import { useAppMode } from "@/context/AppModeContext";
import InvitationPage from "@/components/InvitationPage";
import MemoryPage from "@/components/MemoryPage";

const VALID_THEMES = ["wedding", "funeral", "anniversary", "baby"];
const VALID_PHASES = ["invitation", "memory"];

export const DEMO_EVENTS = {
  wedding: {
    id: "demo-wedding",
    theme: "wedding",
    name: "ธีรพล & นภัสสร",
    date: "2025-08-15",
    start_datetime: "2025-08-15T16:00:00.000Z",
    end_datetime: "2025-08-15T22:00:00.000Z",
    event_place: "https://maps.google.com/?q=Mandarin+Oriental+Bangkok",
    event_phone: "02-659-9000",
    bio: "<p>ด้วยความรักและความสุข เราทั้งสองขอเชิญคุณร่วมเป็นส่วนหนึ่งในวันแต่งงาน เพื่อร่วมสร้างความทรงจำที่ดีงามไปด้วยกัน ณ โรงแรมแมนดาริน โอเรียนเต็ล กรุงเทพฯ</p>",
    cover_url: "/images/wedding.png",
    feature_image_1: "/images/wedding.png",
    profile_url: null,
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#f8bbd0", "#fff9e1", "#b3e5fc"]),
    introEffect: false,
  },
  funeral: {
    id: "demo-funeral",
    theme: "funeral",
    name: "คุณตาวิชัย มงคลสุข",
    date: "2025-07-20",
    start_datetime: "2025-07-20T09:00:00.000Z",
    end_datetime: "2025-07-20T16:00:00.000Z",
    event_place: "https://maps.google.com/?q=Wat+Pho+Bangkok",
    event_phone: "02-226-0335",
    bio: "<p>ด้วยความอาลัยและรำลึกถึงอย่างจริงใจ ครอบครัวมงคลสุขขอเชิญมิตรสหายทุกท่านมาร่วมงาน เพื่อส่งท่านสู่สุคติในสวรรค์</p>",
    cover_url: "/images/funeral.png",
    feature_image_1: "/images/funeral.png",
    profile_url: null,
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#232323", "#f5f5f5", "#bdbdbd"]),
    introEffect: false,
  },
  anniversary: {
    id: "demo-anniversary",
    theme: "anniversary",
    name: "25 ปีแห่งความรัก",
    date: "2025-09-01",
    start_datetime: "2025-09-01T18:00:00.000Z",
    end_datetime: "2025-09-01T22:00:00.000Z",
    event_place: "https://maps.google.com/?q=The+Glass+House+Pattaya",
    event_phone: "081-234-5678",
    bio: "<p>ฉลอง 25 ปีแห่งความรักและความผูกพัน ขอเชิญคนที่รักทุกท่านมาร่วมแบ่งปันความสุขในโอกาสพิเศษนี้ด้วยกัน</p>",
    cover_url: "/images/anniversary.png",
    feature_image_1: "/images/anniversary.png",
    profile_url: null,
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#ffe082", "#81d4fa", "#ffd1b3"]),
    introEffect: false,
  },
  baby: {
    id: "demo-baby",
    theme: "baby",
    name: "น้องมิ้นท์",
    date: "2025-06-01",
    start_datetime: "2025-06-01T10:00:00.000Z",
    end_datetime: "2025-06-01T14:00:00.000Z",
    event_place: "https://maps.google.com/?q=Bangkok",
    event_phone: "091-234-5678",
    bio: "<p>ด้วยความปีติยินดี ครอบครัวสุขใจขอต้อนรับสมาชิกใหม่ น้องมิ้นท์ ขอเชิญทุกท่านร่วมแสดงความยินดีและอวยพรให้หนูน้อย</p>",
    cover_url: "/images/baby.png",
    feature_image_1: "/images/baby.png",
    profile_url: null,
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#e9d5ff", "#bae6fd", "#fbcfe8"]),
    introEffect: false,
  },
};

export default function DemoPageClient({ theme, phase }) {
  const { setTheme, setPhase, setRole } = useAppMode();

  const safeTheme = VALID_THEMES.includes(theme) ? theme : "wedding";
  const safePhase = VALID_PHASES.includes(phase) ? phase : "invitation";

  useEffect(() => {
    setTheme(safeTheme);
    setPhase(safePhase);
    setRole("guest");
  }, [safeTheme, safePhase, setTheme, setPhase, setRole]);

  const event = { ...DEMO_EVENTS[safeTheme], phase: safePhase };

  if (safePhase === "memory") return <MemoryPage event={event} />;
  return <InvitationPage event={event} />;
}
