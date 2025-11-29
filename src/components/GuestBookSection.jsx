"use client";

import React, { useEffect, useState } from "react";
import GuestBookCard from "@/components/GuestBookCard";
import GuestBookForm from "@/components/GuestBookForm";
import GuestBookModal from "@/components/GuestBookModal";

export default function GuestBookSection({
  memoryId,
  theme = "wedding",
  phase = "invitation",
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log("📒 GuestBookSection loaded with:", { memoryId, theme, phase });
  }, [memoryId, theme, phase]);

  const fetchGuestbook = async () => {
    if (!memoryId) return;
    try {
      const res = await fetch(`/api/guestbook?memoryId=${memoryId}`);
      const json = await res.json();
      if (json.success) setEntries(json.data);
    } catch (err) {
      console.error("❌ Guestbook fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("ต้องการลบข้อความนี้จริงหรือไม่?");
    if (!confirmed) return;

    const res = await fetch(`/api/guestbook?id=${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      alert("ลบแล้วเรียบร้อย");
      fetchGuestbook();
    } else {
      alert("ลบไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchGuestbook();
  }, [memoryId]);

  const previewCards = [...entries]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

  // สี open book เบจ/ชมพูจาง (แนะนำใช้ bg-page อยู่แล้ว, ตรงนี้ไม่ต้อง card อีก)
  return (
    <section className="w-full flex flex-col items-center mb-10 relative">
      {/* SVG/shape “open book” faint (mobile: ซ่อน, desktop: โชว์ faint ๆ) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 370" fill="none" className="w-full h-full">
          {/* left page */}
          <rect x="0" y="0" width="390" height="370" rx="32" fill="#fefbf6" opacity="0.75" />
          {/* right page */}
          <rect x="410" y="0" width="390" height="370" rx="32" fill="#fdf6fa" opacity="0.75" />
          {/* center shadow */}
          <rect x="397" y="0" width="6" height="370" fill="#eab1c6" opacity="0.12" />
          {/* faint heart/emoji */}
          <text x="60" y="340" fontSize="40" opacity="0.07">💗</text>
          <text x="690" y="340" fontSize="32" opacity="0.05">✨</text>
        </svg>
      </div>

      {/* Headline กลาง + emoji faint */}
      <div className="w-full flex flex-col items-center z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-wide mb-2 relative">
          ฝากคำอวยพร
          <span className="ml-2 text-2xl select-none pointer-events-none align-middle opacity-30">💌</span>
        </h2>
        <div className="w-12 h-1 bg-pink-200 rounded-full mb-4 opacity-40" />
      </div>

      {/* Card Preview (ไม่มี card-box ไม่มี bg-white) */}
      {entries.length > 0 ? (
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-2 z-10">
          {previewCards.map((entry, idx) => (
            <GuestBookCard
              key={entry.id || idx}
              {...entry}
              theme={theme}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic mt-4 z-10">ยังไม่มีข้อความอวยพร</p>
      )}

      {/* ปุ่ม modal */}
      <button
        className="mt-5 w-auto px-6 bg-pink-50/60 text-pink-700 rounded-full py-2 font-semibold shadow hover:bg-pink-200/70 transition z-10"
        onClick={() => setModalOpen(true)}
      >
        ดู Guest Book ทั้งหมด
      </button>

      {/* ฟอร์ม (soft, ไม่ใช่กล่อง, มี bg faint ได้) */}
      <div className="mt-8 w-full max-w-md z-10">
        <GuestBookForm
          theme={theme}
          memoryId={memoryId}
          onSubmitSuccess={fetchGuestbook}
        />
      </div>

      {/* Modal */}
      <GuestBookModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        entries={[...entries].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))}
        theme={theme}
        onDelete={handleDelete}
      />
    </section>
  );
}
