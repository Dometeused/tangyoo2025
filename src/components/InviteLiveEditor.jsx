"use client";
import React, { useRef, useEffect, useState } from "react";

export default function InviteLiveEditor() {
  const [form, setForm] = useState({
    groom: "ธันวา",
    bride: "ณัฐญา",
    date: "12 ก.พ. 2568",
    place: "Bangkok",
  });

  // Responsive
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // <object> SVG ref
  const svgObjRef = useRef(null);

  // อัพเดท text ใน SVG ทุกครั้งที่ form เปลี่ยน
  useEffect(() => {
    const svgDoc = svgObjRef.current?.contentDocument;
    if (!svgDoc) return;
    // id ที่ใช้ต้องตรงกับ SVG: "Groom", "Bride", "Date", "Place"
    svgDoc.getElementById("Groom") && (svgDoc.getElementById("Groom").textContent = form.groom);
    svgDoc.getElementById("Bride") && (svgDoc.getElementById("Bride").textContent = form.bride);
    svgDoc.getElementById("Date") && (svgDoc.getElementById("Date").textContent = form.date);
    svgDoc.getElementById("Place") && (svgDoc.getElementById("Place").textContent = form.place);
  }, [form]);

  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
      {/* Input Form */}
      <div className="flex-1 space-y-4 max-w-xs">
        <Input label="ชื่อเจ้าบ่าว (groom)" value={form.groom} onChange={v => setForm(f => ({ ...f, groom: v }))} />
        <Input label="ชื่อเจ้าสาว (bride)" value={form.bride} onChange={v => setForm(f => ({ ...f, bride: v }))} />
        <Input label="วันที่ (date)" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
        <Input label="สถานที่ (place)" value={form.place} onChange={v => setForm(f => ({ ...f, place: v }))} />
      </div>
      {/* SVG Preview */}
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        {/* ตรงนี้ใส่ path จริงของ modern.svg */}
        <object
          data="/templates/modern.svg"
          type="image/svg+xml"
          width={360}
          height={360}
          ref={svgObjRef}
          aria-label="Live SVG Poster"
          style={{ border: "1px solid #eee", borderRadius: "1rem" }}
        />
      </div>
    </div>
  );
}

// Input Subcomponent
function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-gray-600 text-sm">{label}</span>
      <input
        className="block w-full mt-1 rounded border px-3 py-2 text-lg"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
