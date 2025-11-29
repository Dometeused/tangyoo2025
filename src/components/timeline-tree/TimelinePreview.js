import React from "react";

// สมมุติ milestones = [{ year, text, image, emoji }]
export default function TimelinePreview({ milestones }) {
  // sort milestone ตามปี (น้อย → มาก)
  const sorted = milestones
    .filter(ms => ms.year && ms.text) // โชว์เฉพาะที่กรอกปี+ข้อความ
    .sort((a, b) => Number(a.year) - Number(b.year));

  if (!sorted.length) return (
    <div className="py-8 text-center text-gray-400">
      ยังไม่มีเหตุการณ์ใน Timeline<br />เพิ่มเหตุการณ์ด้านบนเพื่อเริ่มเล่าเรื่องราวชีวิตของคุณ!
    </div>
  );

  return (
    <div className="relative py-8">
      {/* เส้น timeline ตรงกลาง */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-pink-100 rounded-full"></div>
      <div className="flex flex-col gap-8 ml-12">
        {sorted.map((ms, i) => (
          <div key={i} className="relative flex items-start gap-4 group">
            {/* จุด timeline */}
            <div className="absolute -left-8 top-2 w-5 h-5 rounded-full bg-white border-4 border-pink-300 shadow group-hover:scale-110 transition">
              {ms.emoji && (
                <span className="absolute -top-2 left-1 text-xl">{ms.emoji}</span>
              )}
            </div>
            {/* card เนื้อหา */}
            <div className="bg-white/70 rounded-xl p-4 shadow w-full">
              <div className="text-pink-600 font-bold mb-1">{ms.year}</div>
              <div className="text-gray-700 whitespace-pre-line">{ms.text}</div>
              {ms.image && (
                <div className="mt-2">
                  {/* ยังไม่ทำ Lightbox — preview รูป/วิดีโอตรงนี้ก่อน */}
                  {typeof ms.image === "string" ? (
                    <img src={ms.image} className="max-w-xs rounded-xl shadow" alt="" />
                  ) : (
                    // สมมติ ms.image เป็นไฟล์ใหม่ยังไม่อัปโหลด
                    <span className="text-xs text-gray-400">[เลือกรูปแล้ว, รอ upload]</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
