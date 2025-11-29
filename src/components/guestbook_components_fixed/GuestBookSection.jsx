"use client";
import React, { useState } from "react";
import GuestBookCard from "@/components/GuestBookCard";
import GuestBookForm from "@/components/GuestBookForm";
import GuestBookModal from "@/components/GuestBookModal";

export default function GuestBookSection({ entries = [], theme = "wedding", phase }) {
  const [modalOpen, setModalOpen] = useState(false);
  const previewCards = entries.slice(0, 4);

  return (
    <section className="w-full max-w-2xl bg-white rounded-2xl shadow p-4 mb-8">
      <h2 className="font-semibold text-gray-700 mb-2">ฝากคำอวยพร</h2>

      {/* แสดง card ย่อ (แค่ 1-4 รายการ) */}
      {phase === "memory" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
          {previewCards.map((entry, idx) => (
            <GuestBookCard key={entry.id || idx} {...entry} theme={theme} />
          ))}
        </div>
      )}

      {/* ปุ่มดูทั้งหมด (modal) */}
      {phase === "memory" && entries.length > 4 && (
        <button
          className="mt-4 w-full bg-pink-100 text-pink-700 rounded-xl py-2 font-semibold shadow hover:bg-pink-200"
          onClick={() => setModalOpen(true)}
        >
          ดู Guest Book ทั้งหมด
        </button>
      )}

      {/* ฟอร์มส่งอวยพร */}
      <div className="mt-6">
        <GuestBookForm theme={theme} />
      </div>

      {/* Modal สมุดเล่ม (popup) */}
      {phase === "memory" && (
        <GuestBookModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          entries={entries}
          theme={theme}
        />
      )}
    </section>
  );
}
