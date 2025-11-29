"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import GuestBookCard from "@/components/GuestBookCard";

export default function GuestBookModal({
  isOpen,
  onClose,
  entries = [],
  theme = "wedding",
}) {
  // --- Split entries เป็น spread คู่ (แบบหนังสือ) ---
  const spreads = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < entries.length; i += 2) {
      pairs.push([entries[i], entries[i + 1]].filter(Boolean));
    }
    return pairs;
  }, [entries]);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Drag state
  const dragStart = useRef(null);

  useEffect(() => {
    setPage(0); // reset page on open
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [entries]);

  // ปุ่ม
  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(spreads.length - 1, p + 1));

  // **SWIPE/DRAG** ทั้ง Touch (มือถือ) และ Mouse (desktop)
  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  // **ลากเม้าส์แบบปกติ (desktop)**
  const onMouseDown = (e) => {
    dragStart.current = e.clientX;
  };
  const onMouseUp = (e) => {
    if (dragStart.current !== null) {
      const dx = e.clientX - dragStart.current;
      if (dx > 80) goPrev();
      if (dx < -80) goNext();
      dragStart.current = null;
    }
  };

  if (!isOpen) return null;
  const currentSpread = spreads[page] || [];

  // Card Padding
  const getCardPad = (i) =>
    isMobile
      ? { padding: "0 8px" }
      : { paddingLeft: i === 0 ? 40 : 40, paddingRight: i === 0 ? 40 : 40 };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.36)",
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center w-full h-full select-none"
        style={{
          backgroundImage: "url('/images/guestbook-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
          boxShadow: "none",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        {...handlers}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        // onMouseLeave={() => (dragStart.current = null)} // optional
        tabIndex={-1}
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-4xl font-bold z-30 bg-white/80 hover:bg-white transition rounded-full w-12 h-12 flex items-center justify-center shadow"
          style={{
            border: "none",
          }}
          title="ปิด"
        >
          ×
        </button>

        {/* ลูกศรนำทาง */}
        <button
          onClick={goPrev}
          disabled={page === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-5xl px-3 py-2 text-gray-300 hover:text-rose-600 font-bold z-20 bg-white/70 rounded-full shadow"
          style={{ border: "none" }}
        >
          &lt;
        </button>
        <button
          onClick={goNext}
          disabled={page === spreads.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-5xl px-3 py-2 text-gray-300 hover:text-rose-600 font-bold z-20 bg-white/70 rounded-full shadow"
          style={{ border: "none" }}
        >
          &gt;
        </button>

        {/* เนื้อหาสองหน้าแบบหนังสือ */}
        <div
          className={`flex flex-row gap-6 w-full items-center justify-center`}
          style={{
            maxWidth: isMobile ? "98vw" : "1100px",
            height: isMobile ? 400 : 650,
            marginTop: isMobile ? 24 : 0,
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {currentSpread.map((item, i) => (
            <div
              key={item?.id || i}
              className="flex-1 flex items-center justify-center"
              style={{ ...getCardPad(i), minWidth: 0, height: "100%" }}
            >
              <div
                style={{
                  width: isMobile ? "96vw" : 390,
                  maxWidth: "98%",
                  margin: "0 auto",
                  height: isMobile ? 360 : 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
                }}
              >
                <GuestBookCard {...item} theme={theme} />
              </div>
            </div>
          ))}
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {spreads.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full ${
                i === page ? "bg-rose-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
