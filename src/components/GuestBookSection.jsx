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

  return (
    <section className="w-full flex justify-center py-10 px-4 md:px-0 bg-transparent">
      {/* Book Container */}
      <div className="relative w-full max-w-5xl transition-all duration-500">

        {/* Book Cover / Shadow Layer */}
        <div className="absolute inset-0 bg-[#e3d5c5] rounded-lg shadow-2xl transform translate-y-2 translate-x-1 md:rotate-1 z-0 pointer-events-none border border-[#d4c5b5]"></div>

        {/* Open Book Surface */}
        <div className="relative z-10 bg-[#fdfaf5] rounded-l-md rounded-r-md shadow-inner flex flex-col md:flex-row overflow-hidden min-h-[600px] border border-[#f0e6d2]">

          {/* Spine Shadow (Desktop Center) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 pointer-events-none z-20 hidden md:block"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.05) 100%)"
            }}
          />

          {/* Left Page */}
          <div className="flex-1 p-6 md:p-10 relative flex flex-col items-center border-b md:border-b-0 md:border-r border-[#f3ebdb]">
            {/* Paper Texture/Fold effect left */}
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,0.03))" }}></div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <h2 className="text-3xl font-serif text-[#5a4a42] mb-6 flex items-center gap-2">
                <span>✍️</span> ฝากคำอวยพร
              </h2>

              <div className="w-full max-w-sm">
                {/* Form Component */}
                <GuestBookForm
                  theme={theme}
                  memoryId={memoryId}
                  onSubmitSuccess={fetchGuestbook}
                />
              </div>

              <div className="mt-8 text-center text-[#8c7b70] text-sm opacity-80">
                <p>ขอขอบคุณสำหรับทุกคำอวยพร</p>
                <p>ที่เป็นกำลังใจให้เราสองคน</p>
              </div>
            </div>
          </div>

          {/* Right Page */}
          <div className="flex-1 p-6 md:p-10 relative bg-[#fffefa]">
            {/* Paper Texture/Fold effect right */}
            <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,0), rgba(0,0,0,0.03))" }}></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-[#ece4d9] pb-3">
                <h3 className="text-xl font-serif text-[#5a4a42]">ข้อความล่าสุด</h3>
                <span className="text-xs text-[#9c8b80] font-mono">Page 1 of {Math.ceil(entries.length / 4) || 1}</span>
              </div>

              {entries.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 flex-grow">
                  {previewCards.map((entry, idx) => (
                    <div key={entry.id || idx} className="transform rotate-0 hover:rotate-1 transition-transform duration-200">
                      <GuestBookCard
                        {...entry}
                        theme={theme}
                        onDelete={handleDelete}
                        // Simplify card style if needed inside book
                        className="bg-white/50 border-none shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-[#bcaaa0] italic opacity-60 min-h-[200px]">
                  <p>ยังไม่มีข้อความ... เป็นคนแรกเลยไหม?</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-[#ece4d9] flex justify-center">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-sm font-semibold text-[#8c7b70] hover:text-[#5a4a42] hover:underline transition-all flex items-center gap-1"
                >
                  เปิดดูทั้งหมด <span>📖</span>
                </button>
              </div>
            </div>
          </div>

        </div>
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
