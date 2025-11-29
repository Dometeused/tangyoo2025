import React from "react";
import HTMLFlipBook from "react-pageflip";
import GuestBookCard from "@/components/GuestBookCard";

export default function TestPage() {
  const entries = [
    { id: 1, name: "แบงค์", relation: "เพื่อนประถม", message: "กูเจอมึงมาตั้งแต่เด็ก สนุกมาก ๆ ยินดีด้วยนะเพื่อนรัก!", date: "2025-06-09", prompt: "💬 โมเมนต์สุดประทับใจของคุณกับเจ้าของงาน?", theme: "wedding" },
    { id: 2, name: "ปิ่น", relation: "เพื่อนมหา'ลัย", message: "ขอให้มีความสุขในชีวิตคู่ รักกันนาน ๆ นะ", date: "2025-06-09", prompt: "🎉 มีอะไรอยากอวยพรให้กับทั้งสองคน?", theme: "wedding" },
    // เพิ่ม entry ตามต้องการ
  ];

  // Pair into spreads
  const spreads = [];
  for (let i = 0; i < entries.length; i += 2) {
    spreads.push([entries[i], entries[i + 1]]);
  }

  const width = 1000;
  const height = 650;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <HTMLFlipBook
        width={width}
        height={height}
        size="stretch"
        className="rounded-3xl shadow-2xl"
        style={{
          borderRadius: "1.5rem",
          boxShadow: "0 8px 60px rgba(0,0,0,0.18)"
        }}
        mobileScrollSupport={true}
        showCover={false}
      >
        {spreads.map(([left, right], idx) => (
          <div
            key={idx}
            className="flex w-full h-full relative"
            style={{
              backgroundImage: "url('/images/paper-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* เงากลาง */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-10 z-10 pointer-events-none"
                 style={{
                   background: "linear-gradient(90deg, rgba(128,128,128,0.10) 0%, rgba(255,255,255,0.32) 60%, rgba(128,128,128,0.10) 100%)",
                   filter: "blur(1.2px)"
                 }}
            />
            {/* ซ้าย */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
              {left && (
                <>
                  {left.prompt && (
                    <div className="mb-3 text-lg font-bold text-pink-500 text-center drop-shadow">
                      {left.prompt}
                    </div>
                  )}
                  <div className="w-full max-w-[370px]">
                    <GuestBookCard {...left} theme={left.theme} showPromptInCard={false} />
                  </div>
                </>
              )}
            </div>
            {/* ขวา */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
              {right && (
                <>
                  {right.prompt && (
                    <div className="mb-3 text-lg font-bold text-pink-500 text-center drop-shadow">
                      {right.prompt}
                    </div>
                  )}
                  <div className="w-full max-w-[370px]">
                    <GuestBookCard {...right} theme={right.theme} showPromptInCard={false} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
