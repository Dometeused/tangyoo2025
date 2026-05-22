"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuestBookCard from "@/components/GuestBookCard";
import GuestBookForm from "@/components/GuestBookForm";
import GuestBookModal from "@/components/GuestBookModal";

export default function GuestBookSection({
  memoryId,
  role = "guest",
  theme = "wedding",
  phase = "invitation",
}) {
  const isOwner = role === "owner" || role === "admin";
  const [modalOpen, setModalOpen] = useState(false);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null); // id ที่จะลบ
  const [deleting, setDeleting] = useState(false);

  const demoEntries = {
    wedding: [
      { id: "demo-wedding-1", name: "คุณแพร", message: "ขอให้ทั้งสองคนมีความสุขมาก ๆ และจับมือกันไปทุกฤดูของชีวิตนะคะ", created_at: "2025-08-15T10:00:00.000Z" },
      { id: "demo-wedding-2", name: "เพื่อนเจ้าบ่าว", message: "วันนี้สวยงามมาก ยินดีด้วยจากใจจริงครับ", created_at: "2025-08-15T10:10:00.000Z" },
      { id: "demo-wedding-3", name: "ครอบครัวนภัสสร", message: "ขอให้บ้านหลังใหม่เต็มไปด้วยเสียงหัวเราะและความเข้าใจเสมอ", created_at: "2025-08-15T10:20:00.000Z" },
    ],
    funeral: [
      { id: "demo-funeral-1", name: "ลูกหลาน", message: "คำสอนและความเมตตาของคุณตาจะอยู่ในใจพวกเราเสมอ", created_at: "2025-07-20T04:00:00.000Z" },
      { id: "demo-funeral-2", name: "ครอบครัวศิริพร", message: "ขอร่วมไว้อาลัยและส่งกำลังใจให้ครอบครัวมงคลสุขอย่างสุดซึ้ง", created_at: "2025-07-20T04:15:00.000Z" },
    ],
    anniversary: [
      { id: "demo-anniversary-1", name: "ลูก ๆ", message: "25 ปีของพ่อกับแม่คือเรื่องราวที่ทำให้เราเชื่อในความรัก ขอบคุณที่เป็นบ้านให้เสมอ", created_at: "2025-09-01T12:00:00.000Z" },
      { id: "demo-anniversary-2", name: "เพื่อนเก่า", message: "ดีใจที่ได้เห็นความรักเดินทางมาไกลขนาดนี้ สุขสันต์วันครบรอบครับ", created_at: "2025-09-01T12:10:00.000Z" },
    ],
    baby: [
      { id: "demo-baby-1", name: "คุณยาย", message: "ขอให้น้องมิ้นท์เติบโตอย่างสดใส แข็งแรง และมีคนรักล้อมรอบเสมอ", created_at: "2025-06-01T03:00:00.000Z" },
      { id: "demo-baby-2", name: "น้าแอม", message: "ยินดีต้อนรับสมาชิกตัวน้อยของบ้านนะคะ", created_at: "2025-06-01T03:12:00.000Z" },
    ],
  };

  const fetchGuestbook = async () => {
    if (!memoryId) return;
    if (String(memoryId).startsWith("demo-")) {
      setEntries(demoEntries[theme] || demoEntries.wedding);
      return;
    }
    try {
      const res = await fetch(`/api/guestbook?memoryId=${memoryId}`);
      const json = await res.json();
      if (json.success) setEntries(json.data);
    } catch {
      // Silently ignore fetch errors
    }
  };

  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/guestbook?id=${deleteTarget}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchGuestbook();
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  useEffect(() => {
    fetchGuestbook();
  }, [memoryId]);

  // Pagination Logic: 2 per side -> 4 per spread
  const ITEMS_PER_SPREAD = 4;
  const totalSpreads = Math.ceil(entries.length / ITEMS_PER_SPREAD) || 1;
  const sortedEntries = [...entries].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const currentSpreadEntries = sortedEntries.slice(
    currentPage * ITEMS_PER_SPREAD,
    (currentPage + 1) * ITEMS_PER_SPREAD
  );

  const leftPageEntries = currentSpreadEntries.slice(0, 2);
  const rightPageEntries = currentSpreadEntries.slice(2, 4);

  const goToNextPage = () => {
    if (currentPage < totalSpreads - 1) setCurrentPage(p => p + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <section className="w-full flex flex-col items-center py-10 px-2 md:px-0">

      {/* HEADER ACTION AREA - Z-index fix */}
      <div className="relative w-full max-w-6xl flex justify-between items-center mb-6 px-4 z-20">
        {/* Navigation Controls (Top) */}
        <div className="flex gap-4">
          {currentPage > 0 && (
            <button
              onClick={goToPrevPage}
              className="px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-white transition-all text-sm font-bold flex items-center gap-2 text-gray-700 hover:shadow-lg"
            >
              <span>⬅️</span> หน้าก่อนหน้า
            </button>
          )}
        </div>

        <div className="flex gap-4">
          {currentPage < totalSpreads - 1 && (
            <button
              onClick={goToNextPage}
              className="px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-white transition-all text-sm font-bold flex items-center gap-2 text-gray-700 hover:shadow-lg"
            >
              หน้าถัดไป <span>➡️</span>
            </button>
          )}

          <button
            onClick={() => setSignModalOpen(true)}
            className={`group relative px-6 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 overflow-hidden ${theme === 'funeral'
              ? 'bg-[#3e2723] text-white border border-[#5d4037]'
              : 'bg-white text-pink-500 border border-pink-200'
              }`}
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100" />
            <span className="text-2xl animate-bounce">✍️</span>
            <span>ร่วมลงนามสมุดอวยพร</span>
          </button>
        </div>
      </div>

      {/* Big Book Container */}
      <div className="relative w-full max-w-6xl mx-auto perspective-1000 z-10">

        {/* Leather Cover (Backing) */}
        <div className="absolute inset-0 bg-[#3e2723] rounded-2xl shadow-2xl transform translate-y-4 md:translate-x-2 md:rotate-1 z-0 border-2 border-[#281815]"></div>

        {/* The Open Book */}
        <div className="relative z-10 bg-[#fdfbf7] rounded-xl flex flex-col md:flex-row overflow-hidden min-h-[700px] shadow-2xl border border-[#d7ccc8]">

          {/* Spine (Center Fold) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-16 -ml-8 z-20 hidden md:block pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.05))",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)"
            }}
          />

          {/* LEFT PAGE */}
          <div className="flex-1 relative bg-[#faeecd] p-6 md:p-10 flex flex-col border-r border-[#d7ccc8] overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-end mb-6 border-b-2 border-[#d7ccc8] pb-2">
                <h2 className="text-2xl font-kanit font-bold text-[#5d4037]">สมุดอวยพร</h2>
                <span className="text-xs text-[#8d6e63] font-mono mb-1">Page {currentPage * 2 + 1}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: -50, rotateY: 90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -50, rotateY: 90 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col gap-4 flex-grow"
                >
                  {entries.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center gap-3 text-center py-6">
                      <div className="text-5xl opacity-40">✍️</div>
                      <div>
                        <p className="font-bold text-[#5d4037] text-base">ยังไม่มีคำอวยพร</p>
                        <p className="text-sm text-[#8d6e63] mt-1 opacity-80">เป็นคนแรกที่ร่วมลงนามสมุดอวยพรนี้</p>
                      </div>
                      <button
                        onClick={() => setSignModalOpen(true)}
                        className={`mt-2 px-5 py-2 rounded-full text-sm font-semibold shadow transition-all hover:-translate-y-0.5 ${theme === "funeral" ? "bg-[#5d4037] text-white" : "bg-pink-500 text-white"}`}
                      >
                        ลงนามเลย
                      </button>
                    </div>
                  ) : leftPageEntries.length > 0 ? (
                    leftPageEntries.map((entry, idx) => (
                      <div key={entry.id || idx} className="relative group">
                        {/* Pass compact={true} */}
                        <div className="relative bg-white/80 p-2 shadow-sm border border-[#eefebe] rounded-lg transform -rotate-1 group-hover:rotate-0 transition-all duration-300">
                          <GuestBookCard
                            {...entry}
                            theme={theme}
                            onDelete={isOwner ? handleDelete : undefined}
                            compact={true} // Force compact mode
                            className="shadow-none border-none p-0 bg-transparent"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-[#8d6e63] italic opacity-60">
                      <p>หน้าว่าง...</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT PAGE */}
          <div className="flex-1 relative bg-[#fffdf5] p-6 md:p-10 flex flex-col overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-end items-end mb-6 border-b-2 border-[#efebe9] pb-2">
                <span className="text-xs text-[#a1887f] font-mono mb-1">Page {currentPage * 2 + 2}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50, rotateY: -90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 50, rotateY: -90 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }} // Slight delay for right page
                  className="flex flex-col gap-4 flex-grow"
                >
                  {rightPageEntries.length > 0 ? (
                    rightPageEntries.map((entry, idx) => (
                      <div key={entry.id || idx} className="relative group">
                        {/* Pass compact={true} */}
                        <div className="relative bg-white/80 p-2 shadow-sm border border-gray-100 rounded-lg transform rotate-1 group-hover:rotate-0 transition-all duration-300">
                          <GuestBookCard
                            {...entry}
                            theme={theme}
                            onDelete={isOwner ? handleDelete : undefined}
                            compact={true} // Force compact mode
                            className="shadow-none border-none p-0 bg-transparent"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-[#d7ccc8] italic min-h-[300px]">
                      <span className="text-4xl opacity-20 mb-2">❦</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto pt-4 border-t-2 border-[#efebe9] flex justify-center">
                <button onClick={() => setModalOpen(true)} className="text-sm font-semibold text-[#8d6e63] hover:text-[#5d4037] hover:underline flex items-center gap-1">
                  เปิดดูทั้งหมด ({entries.length}) <span>📖</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full mx-4 text-center">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-800 mb-1">ลบคำอวยพรนี้?</h3>
            <p className="text-sm text-gray-500 mb-5">จะถูกลบถาวร ไม่สามารถกู้คืนได้</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {deleting ? "กำลังลบ..." : "ลบเลย"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && <GuestBookModal isOpen={modalOpen} onClose={() => setModalOpen(false)} entries={sortedEntries} theme={theme} onDelete={handleDelete} />}

      {signModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" style={{ margin: 0 }}>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gray-100 px-4 py-3 flex justify-between items-center border-b">
              <h3 className="font-bold text-gray-700">ร่วมลงนามอวยพร ✍️</h3>
              <button onClick={() => setSignModalOpen(false)} className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 transition-colors">✕</button>
            </div>
            <div className="max-h-[85vh] overflow-y-auto p-4 custom-scrollbar">
              <GuestBookForm theme={theme} memoryId={memoryId} onSubmitSuccess={() => { fetchGuestbook(); setSignModalOpen(false); }} />
            </div>
          </div>
          <div className="absolute inset-0 z-[-1]" onClick={() => setSignModalOpen(false)}></div>
        </div>
      )}
    </section>
  );
}
