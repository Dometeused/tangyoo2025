"use client";
import { useState } from "react";

// หมวดสินค้า & mock ข้อมูล (เพิ่มเองได้)
const CATEGORIES = [
  { key: "all", label: "ทั้งหมด" },
  { key: "notebook", label: "สมุดโน้ต" },
  { key: "giftset", label: "ของขวัญ" },
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
  // ... เพิ่มสินค้าอีกได้เลย
];

export default function CatalogPage() {
  const [selected, setSelected] = useState("all");
  const [theme, setTheme] = useState("wedding");
  const [modal, setModal] = useState(null);

  const config = THEME_CONFIG[theme];

  const items = selected === "all"
    ? CATALOG
    : CATALOG.filter(p => p.category === selected);

  return (
    <main className={`min-h-screen ${config.bg} font-sans flex flex-col items-center px-2`}>
      {/* Header + กลับ Dashboard */}
      <header className="w-full max-w-6xl text-center pt-12 pb-7 relative">
        {/* กลับ Dashboard (ขวาบน) */}
        <a
          href="/dashboard"
          className="absolute right-0 top-0 mt-5 mr-7 px-5 py-2 rounded-full bg-[#ece4d9] text-gray-800 hover:bg-yellow-100 transition font-medium shadow"
        >กลับ Dashboard</a>

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
        <a
          href="/"
          className="inline-block px-7 py-2 mt-2 rounded-full bg-[#ece4d9] text-gray-800 hover:bg-yellow-100 transition font-medium shadow"
        >กลับหน้าแรก</a>
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
            <img
              src={prod.img}
              alt={prod.name}
              className="w-40 h-40 object-cover rounded-2xl border-2 border-[#f5eee6] shadow mb-6"
            />
            <div className={`font-bold text-lg mb-1 tracking-tight ${config.text}`}>{prod.name}</div>
            <div className="text-gray-600 text-sm mb-3 text-center font-light">{prod.desc}</div>
            <div className={`font-semibold text-base mb-1 ${config.accent}`}>{prod.price}</div>
          </div>
        ))}
      </div>

      {/* Modal ดูรายละเอียดสินค้า */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-pink-500"
              onClick={() => setModal(null)}
            >×</button>
            <img src={modal.img} alt={modal.name} className="w-48 h-48 mx-auto object-cover rounded-xl border-2 mb-5" />
            <h2 className="text-xl font-bold mb-2">{modal.name}</h2>
            <div className="mb-2">{modal.desc}</div>
            <div className={`mb-3 font-semibold ${config.accent}`}>{modal.price}</div>
            <div className="flex gap-4 justify-center mt-6">
              <a
                href="https://lin.ee/xxxxxx"
                className="bg-green-500 text-white rounded-full px-6 py-2 shadow hover:bg-green-600 transition"
                target="_blank" rel="noopener noreferrer"
              >แชทสั่งซื้อ (Line)</a>
              <button
                className="bg-gray-200 text-gray-700 rounded-full px-6 py-2 shadow hover:bg-gray-300 transition"
                onClick={() => setModal(null)}
              >ปิด</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
