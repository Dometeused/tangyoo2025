"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// THEMES & Templates
const THEMES = [
  {
    key: "wedding",
    name: "งานแต่ง",
    templates: [
      { key: "a", name: "Romantic Pink", svg: "/svg/wedding-a.svg", thumb: "/svg/wedding-a-thumb.png" },
      { key: "b", name: "Modern Minimal", svg: "/svg/wedding-b.svg", thumb: "/svg/wedding-b-thumb.png" },
      { key: "c", name: "Classic Gold", svg: "/svg/wedding-c.svg", thumb: "/svg/wedding-c-thumb.png" },
    ],
  },
  {
    key: "funeral",
    name: "งานศพ",
    templates: [
      { key: "a", name: "Simple White", svg: "/svg/funeral-a.svg", thumb: "/svg/funeral-a-thumb.png" },
      { key: "b", name: "Black Ribbon", svg: "/svg/funeral-b.svg", thumb: "/svg/funeral-b-thumb.png" },
    ],
  },
];

const themeKey = "wedding"; // สมมติรับจาก Dashboard/context

export default function SelectTemplatePage() {
  const router = useRouter();
  const theme = THEMES.find(t => t.key === themeKey);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openModal(template) {
    setSelected(template);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }
  function handleNext() {
    if (selected)
      router.push(`/invite-poster/create?theme=${theme.key}&template=${selected.key}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-8 bg-[#faf9f7]">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          เลือกเทมเพลตโปสเตอร์เชิญงาน {theme.name}
        </h1>
        <div className="flex gap-8 flex-wrap justify-center">
          {theme.templates.map(tpl => (
            <button
              key={tpl.key}
              className="border-2 rounded-xl p-4 bg-white hover:shadow-xl transition flex flex-col items-center w-56"
              onClick={() => openModal(tpl)}
            >
              <img src={tpl.thumb} className="w-40 h-40 object-cover rounded-lg mb-2" alt={tpl.name} />
              <div className="text-base font-medium">{tpl.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={closeModal}>
          <div
            className="bg-white rounded-2xl shadow-xl p-6 relative flex flex-col items-center max-w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={selected.thumb}
              alt={selected.name}
              className="w-[360px] h-[360px] object-cover rounded-xl mb-4"
              style={{maxWidth: "85vw", maxHeight: "70vh"}}
            />
            <div className="text-lg font-semibold mb-2">{selected.name}</div>
            <button
              onClick={handleNext}
              className="mt-2 px-6 py-2 rounded-lg bg-pink-500 text-white font-bold shadow hover:bg-pink-600"
            >
              เลือกเทมเพลตนี้
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
