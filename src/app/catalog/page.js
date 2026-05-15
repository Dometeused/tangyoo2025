"use client";
export const dynamic = "force-dynamic";
;
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// หมวดสินค้า & mock ข้อมูล (เพิ่มเองได้)
const CATEGORIES = [
  { key: "all", label: "ทั้งหมด" },
  { key: "anniversary", label: "วันครบรอบ" },
  { key: "giftset", label: "ของขวัญ" },
  { key: "notebook", label: "สมุดโน้ต" },
  { key: "mug", label: "แก้วน้ำ" },
];

const THEMES = [
  { key: "wedding", label: "งานแต่ง" },
  { key: "funeral", label: "งานอาลัย" },
  { key: "gift", label: "ของขวัญ/ครบรอบ" },
];

const THEME_CONFIG = {
  wedding: {
    bg: "bg-[#FAF7F2]",
    card: "bg-white",
    text: "text-pink-600",
    accent: "text-pink-400",
    border: "border-pink-200",
    header: "สินค้า/ของชำร่วยงานแต่ง",
  },
  funeral: {
    bg: "bg-gray-900",
    card: "bg-gray-800",
    text: "text-yellow-200",
    accent: "text-yellow-300",
    border: "border-yellow-300",
    header: "สินค้า/ของชำร่วยงานอาลัย",
  },
  gift: {
    bg: "bg-orange-50",
    card: "bg-white",
    text: "text-blue-600",
    accent: "text-blue-600",
    border: "border-blue-200",
    header: "สินค้า/ของขวัญ/วันครบรอบ",
  },
};

const CATALOG = [
  {
    id: "flowerbox001",
    name: "Box of Eternal Love",
    desc: "กล่องดอกไม้ประดิษฐ์เกรดพรีเมียม พร้อมการ์ดอวยพร",
    img: "/catalog/flowerbox.png",
    price: "฿1,290",
    category: "anniversary"
  },
  {
    id: "coupleframe001",
    name: "Couple Memory Frame",
    desc: "กรอบรูปคู่สลักชื่อ พร้อมอัดรูปคุณภาพสูง",
    img: "/catalog/frame.png",
    price: "฿590",
    category: "anniversary"
  },
  {
    id: "notebook001",
    name: "สมุดโน้ตความทรงจำ",
    desc: "บันทึกความรู้สึกพิเศษสำหรับวันสำคัญ",
    img: "/catalog/notebook.png",
    price: "฿250",
    category: "notebook"
  },
  {
    id: "mug001",
    name: "TangYoo Mug",
    desc: "แก้วน้ำมินิมอล พร้อมช่องแปะ QR Code",
    img: "/catalog/mug.png",
    price: "฿199",
    category: "mug"
  },
  {
    id: "gift001",
    name: "Premium Gift Set",
    desc: "ชุดของขวัญวันครบรอบ/ของฝาก พร้อมแพ็กเกจหรู",
    img: "/catalog/giftset1.png",
    price: "฿390",
    category: "giftset"
  },
  {
    id: "gift002",
    name: "Mini Gift Box",
    desc: "ของขวัญชิ้นเล็กสำหรับความทรงจำใหญ่",
    img: "/catalog/giftset2.png",
    price: "฿159",
    category: "giftset"
  },
];

export default function CatalogPage() {
  const [selected, setSelected] = useState("all");
  const [theme, setTheme] = useState("gift"); // Default to gift theme for anniversary
  const [modal, setModal] = useState(null);

  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [eventName, setEventName] = useState("");

  const config = THEME_CONFIG[theme];

  // Logic to fetch event name (optional for better UX)
  useEffect(() => {
    if (eventId) {
      // Fetch event name logic can be added here if needed
      setEventName(`Event #${eventId.slice(0, 8)}`);
    }
  }, [eventId]);


  const items = selected === "all"
    ? CATALOG
    : CATALOG.filter(p => p.category === selected);

  // Helper to generate Line URL
  const getLineUrl = (item) => {
    let message = `สวัสดีครับ สนใจสั่งซื้อ ${item.name} (${item.id})`;
    if (eventId) {
      message += `\nสำหรับงาน Event: ${eventId}`;
    }
    return `https://line.me/R/ti/p/@tangyoo?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className={`min-h-screen ${config.bg} font-sans flex flex-col items-center px-2`}>
      {/* Header + กลับ Dashboard */}
      <header className="w-full max-w-6xl text-center pt-12 pb-7 relative">
        {/* กลับ Dashboard (ขวาบน) */}
        <Link
          href={eventId ? `/event/${eventId}` : "/dashboard"}
          className="absolute right-0 top-0 mt-5 mr-7 px-5 py-2 rounded-full bg-[#ece4d9] text-gray-800 hover:bg-yellow-100 transition font-medium shadow"
        >
          {eventId ? "⬅️ กลับไปที่งาน" : "กลับ Dashboard"}
        </Link>

        {eventId && (
          <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4 animate-pulse">
            🎁 กำลังเลือกของขวัญสำหรับ {eventName}
          </div>
        )}

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          TangYoo Catalog
        </h1>
        <div className="text-lg text-gray-600 mb-6 font-light">
          ค้นหาของที่ระลึกสำหรับทุกโอกาสสำคัญ <br />
          <span className={`${config.accent} font-medium`}>Made with Memory &amp; Heart</span>
        </div>
        {/* เลือกธีม (ปุ่มเล็ก) */}
        <div className="flex justify-center items-center gap-2 mb-5">
          <span className="text-gray-500 mr-2">ธีม: </span>
          {THEMES.map(t => (
            <button
              key={t.key}
              className={`px-4 py-1 rounded-full text-sm font-semibold shadow transition
                ${theme === t.key
                  ? `${config.accent} bg-white`
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"}
              `}
              onClick={() => setTheme(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* หมวดสินค้า */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`px-6 py-2 rounded-full font-semibold transition shadow
                ${selected === c.key
                  ? `${config.accent} text-white`
                  : "bg-white text-pink-400 border border-pink-200 hover:bg-pink-100"}`}
              onClick={() => setSelected(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className={`text-xl font-semibold mb-2 ${config.text}`}>{config.header}</div>
        <Link
          href="/"
          className="inline-block px-7 py-2 mt-2 rounded-full bg-[#ece4d9] text-gray-800 hover:bg-yellow-100 transition font-medium shadow"
        >กลับหน้าแรก</Link>
      </header>

      {/* Grid สินค้า (4 columns, responsive) */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-24">
        {items.map(prod => (
          <div
            key={prod.id}
            className={`${config.card} rounded-3xl shadow-[0_6px_32px_0_rgba(220,170,120,0.09)] hover:shadow-xl transition-all p-7 flex flex-col items-center ${config.border} border cursor-pointer`}
            style={{ minHeight: 370 }}
            onClick={() => setModal(prod)}
          >
            <div className="relative w-[160px] h-[160px] mb-6">
              <Image
                src={prod.img}
                alt={prod.name}
                fill
                className="object-cover rounded-2xl border-2 border-[#f5eee6] shadow"
              />
            </div>
            <div className={`font-bold text-lg mb-1 tracking-tight ${config.text}`}>{prod.name}</div>
            <div className="text-gray-600 text-sm mb-3 text-center font-light line-clamp-2">{prod.desc}</div>
            <div className={`font-semibold text-base mb-1 ${config.accent} mt-auto`}>{prod.price}</div>
          </div>
        ))}
      </div>

      {/* Modal ดูรายละเอียดสินค้า */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 shadow-2xl max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setModal(null)}
            >✕</button>
            <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden shadow-inner">
              <Image src={modal.img} alt={modal.name} fill className="object-cover" />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${config.text}`}>{modal.name}</h2>
            <div className="mb-4 text-gray-600 leading-relaxed">{modal.desc}</div>
            <div className={`text-2xl font-bold mb-6 ${config.accent}`}>{modal.price}</div>
            <div className="flex flex-col gap-3">
              <a
                href={getLineUrl(modal)}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl px-6 py-3 shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 font-bold flex items-center justify-center gap-2"
                target="_blank" rel="noopener noreferrer"
              >
                <span>💬</span> แชทสั่งซื้อ (Line)
              </a>
              <p className="text-xs text-center text-gray-400">
                {eventId ? `*ระบบจะแนบรหัสงาน ${eventId.slice(0, 8)}... ไปในแชทอัตโนมัติ` : "*ท่านสามารถแจ้งรหัสงาน Event ในแชทได้"}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
