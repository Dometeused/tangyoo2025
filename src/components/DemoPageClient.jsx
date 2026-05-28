"use client";

import { useEffect } from "react";
import { useAppMode } from "@/context/AppModeContext";
import InvitationPage from "@/components/InvitationPage";
import MemoryPage from "@/components/MemoryPage";

const VALID_THEMES = ["wedding", "funeral", "anniversary", "baby"];
const VALID_PHASES = ["invitation", "memory"];

const DEMO_ASSETS = {
  wedding: {
    cover_url: "/images/wedding.png",
    profile_url: "/covers/wedding-profile.png",
    feature_image_1: "/demo/wedding/gallery-1.png",
    feature_image_2: "/covers/prewed2.jpg",
    feature_image_3: "/covers/prewed3.jpg",
    bridePic: "/covers/wedding-profile.png",
    groomPic: "/covers/wedding1.png",
    schedule_url: "/images/Pink and Cream Simple Floral Wedding Timeline Planner.jpg",
  },
  funeral: {
    cover_url: "/images/funeral.png",
    profile_url: "/covers/funeral-profile.png",
    profile: "/covers/funeral-profile.png",
    feature_image_1: "/demo/funeral/gallery-1.png",
    feature_image_2: "/images/funeralcover.jpg",
    feature_image_3: "/images/funeral-bg.png",
    schedule_url: "/schedule/funeral-sample.PNG",
  },
  anniversary: {
    cover_url: "/images/anniversary.png",
    profile_url: "/images/anniversary-gift.png",
    feature_image_1: "/demo/anniversary/gallery-1.png",
    feature_image_2: "/images/catalog-souvenir-anniversary-1.png",
    feature_image_3: "/images/catalog-souvenir-anniversary-2.png",
    bridePic: "/images/anniversary-gift.png",
    groomPic: "/images/Hidden Smiles in Nature.png",
    schedule_url: "/images/howtouse-anniversary.png",
  },
  baby: {
    cover_url: "/images/welcome.png",
    profile_url: "/images/Hidden Smiles in Nature.png",
    feature_image_1: "/demo/baby/gallery-1.png",
    feature_image_2: "/images/Hidden Smiles in Nature.png",
    feature_image_3: "/images/catalog-anniversary-wedding-1.png",
    bridePic: "/images/Hidden Smiles in Nature.png",
    groomPic: "/images/welcome.png",
    schedule_url: "/images/howtouse-anniversary.png",
  },
};

const COMMON_DEMO_FIELDS = {
  line: "@tangyoo",
  facebook: "https://facebook.com/tangyoo",
  instagram: "@tangyoo.memories",
  phone: "081-234-5678",
  video_mode: "none",
};

export const DEMO_EVENTS = {
  wedding: {
    ...COMMON_DEMO_FIELDS,
    id: "demo-wedding",
    theme: "wedding",
    name: "ธีรพล & นภัสสร",
    date: "2025-08-15",
    start_datetime: "2025-08-15T16:00:00.000Z",
    end_datetime: "2025-08-15T22:00:00.000Z",
    event_place: "https://maps.google.com/?q=Mandarin+Oriental+Bangkok",
    event_phone: "02-659-9000",
    place: "Mandarin Oriental Bangkok",
    bio: "<p>ด้วยความรักและความสุข เราทั้งสองขอเชิญคุณร่วมเป็นส่วนหนึ่งในวันแต่งงาน เพื่อร่วมสร้างความทรงจำที่ดีงามไปด้วยกัน ณ โรงแรมแมนดาริน โอเรียนเต็ล กรุงเทพฯ</p>",
    ...DEMO_ASSETS.wedding,
    brideBio: "ธีรพล\nเจ้าบ่าว",
    groomBio: "นภัสสร\nเจ้าสาว",
    eventBio: "ขอบคุณที่มาร่วมเป็นส่วนหนึ่ง\nในวันสำคัญของเรา",
    funFact1: "พบกันครั้งแรกที่เชียงใหม่",
    funFact2: "เพลงโปรด: Can't Help Falling in Love",
    qr_note: "สแกนเพื่อเปิดหน้าเชิญและฝากคำอวยพร",
    bank_info: "กองทุนของขวัญ ธ.กสิกรไทย 123-4-56789-0",
    timeline_events: [
      { year: "2021", title: "พบกันครั้งแรก", description: "บทสนทนาสั้น ๆ กลายเป็นจุดเริ่มต้นของเรื่องราวยาวไกล" },
      { year: "2023", title: "ขอแต่งงาน", description: "ค่ำคืนเล็ก ๆ ที่กลายเป็นความทรงจำใหญ่ของเราสองคน" },
    ],
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#f8bbd0", "#fff9e1", "#b3e5fc"]),
    introEffect: false,
  },
  funeral: {
    ...COMMON_DEMO_FIELDS,
    id: "demo-funeral",
    theme: "funeral",
    name: "คุณตาวิชัย มงคลสุข",
    date: "2025-07-20",
    start_datetime: "2025-07-20T09:00:00.000Z",
    end_datetime: "2025-07-20T16:00:00.000Z",
    event_place: "https://maps.google.com/?q=Wat+Pho+Bangkok",
    event_phone: "02-226-0335",
    place: "วัดโพธิ์ กรุงเทพฯ",
    bio: "<p>ด้วยความอาลัยและรำลึกถึงอย่างจริงใจ ครอบครัวมงคลสุขขอเชิญมิตรสหายทุกท่านมาร่วมงาน เพื่อส่งท่านสู่สุคติในสวรรค์</p>",
    ...DEMO_ASSETS.funeral,
    poster_name: "คุณตาวินัย มงคลสุข",
    poster_caption: "ในความทรงจำของครอบครัว",
    word: "ทุกความรักและความดีงาม\nจะอยู่ในใจเราเสมอ",
    living: "2498 - 2568",
    qr_note: "สแกนเพื่อร่วมรำลึกและฝากข้อความถึงครอบครัว",
    bank_info: "ร่วมทำบุญ ธ.ไทยพาณิชย์ 234-5-67890-1",
    timeline_events: [
      { year: "2498", title: "กำเนิดชีวิตที่อ่อนโยน", description: "เริ่มต้นเส้นทางของคนที่ครอบครัวรักและเคารพ" },
      { year: "2525", title: "สร้างครอบครัว", description: "บ้านหลังเล็ก ๆ เต็มไปด้วยความอบอุ่นและคำสอนที่ยังอยู่ในใจ" },
      { year: "2568", title: "อยู่ในความทรงจำ", description: "ความดีงามของท่านยังคงเป็นแสงสว่างให้ทุกคน" },
    ],
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#232323", "#f5f5f5", "#bdbdbd"]),
    introEffect: false,
  },
  anniversary: {
    ...COMMON_DEMO_FIELDS,
    id: "demo-anniversary",
    theme: "anniversary",
    name: "25 ปีแห่งความรัก",
    date: "2025-09-01",
    start_datetime: "2025-09-01T18:00:00.000Z",
    end_datetime: "2025-09-01T22:00:00.000Z",
    event_place: "https://maps.google.com/?q=The+Glass+House+Pattaya",
    event_phone: "081-234-5678",
    place: "The Glass House Pattaya",
    bio: "<p>ฉลอง 25 ปีแห่งความรักและความผูกพัน ขอเชิญคนที่รักทุกท่านมาร่วมแบ่งปันความสุขในโอกาสพิเศษนี้ด้วยกัน</p>",
    ...DEMO_ASSETS.anniversary,
    brideBio: "25",
    groomBio: "SINCE · 2000",
    eventBio: "ขอบคุณทุกความทรงจำที่เดินทางมาด้วยกัน",
    funFact1: "เริ่มจากของขวัญชิ้นเล็ก\nที่กลายเป็นทุกสิ่ง",
    funFact2: "25 ปีผ่านไป\nยังรักกันเหมือนเดิม",
    qr_note: "สแกนเพื่อเปิดกล่องความทรงจำ",
    bank_info: "ของขวัญครบรอบ ธ.กรุงไทย 345-6-78901-2",
    timeline_events: [
      { year: "2000", title: "วันแรกที่ได้รู้จัก", description: "จุดเริ่มต้นของความผูกพันที่ค่อย ๆ เติบโต" },
      { year: "2010", title: "บ้านหลังแรก", description: "พื้นที่เล็ก ๆ ที่เต็มไปด้วยเสียงหัวเราะ" },
      { year: "2025", title: "25 ปีแห่งความรัก", description: "วันนี้เรากลับมาขอบคุณทุกความทรงจำด้วยกันอีกครั้ง" },
    ],
    youtube_link: null,
    dresscode_colors: JSON.stringify(["#ffe082", "#81d4fa", "#ffd1b3"]),
    introEffect: false,
  },
  baby: {
    ...COMMON_DEMO_FIELDS,
    id: "demo-baby",
    theme: "baby",
    name: "น้องมิ้นท์",
    date: "2025-06-01",
    start_datetime: "2025-06-01T10:00:00.000Z",
    end_datetime: "2025-06-01T14:00:00.000Z",
    event_place: "https://maps.google.com/?q=Bangkok",
    event_phone: "091-234-5678",
    place: "Bangkok",
    bio: "<p>ด้วยความปีติยินดี ครอบครัวสุขใจขอต้อนรับสมาชิกใหม่ น้องมิ้นท์ ขอเชิญทุกท่านร่วมแสดงความยินดีและอวยพรให้หนูน้อย</p>",
    ...DEMO_ASSETS.baby,
    brideBio: "น้องมิ้นท์\nสมาชิกใหม่",
    groomBio: "ครอบครัว\nสุขใจ",
    eventBio: "ทุกคำอวยพรคือของขวัญ\nสำหรับการเติบโตของหนูน้อย",
    funFact1: "รอยยิ้มแรกของบ้าน",
    funFact2: "ของขวัญจากทุกคน",
    qr_note: "สแกนเพื่อฝากคำอวยพรให้น้องมิ้นท์",
    bank_info: "ของขวัญรับขวัญ ธ.กรุงเทพ 456-7-89012-3",
    timeline_events: [
      { year: "2025", title: "วันแรกของน้องมิ้นท์", description: "รอยยิ้มเล็ก ๆ ที่ทำให้บ้านสว่างขึ้นทั้งหลัง" },
      { year: "2025", title: "เสียงหัวเราะแรก", description: "โมเมนต์ที่ทุกคนหยุดมองและยิ้มไปพร้อมกัน" },
    ],
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
