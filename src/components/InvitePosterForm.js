"use client";
import { useState } from "react";
import LiveSVGPoster from "./LiveSVGPoster";

const SVG_URL = "/templates/modern.svg";

export default function InvitePosterForm() {
  const [form, setForm] = useState({
    groom: "",
    bride: "",
    date: "",
    place: "",
    image: null,
    imageUrl: "",
  });

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({
        ...f,
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Input ฟอร์ม */}
      <div className="flex-1 space-y-4 max-w-xs">
        <Input label="ชื่อเจ้าบ่าว" value={form.groom} onChange={v => setForm(f => ({ ...f, groom: v }))} />
        <Input label="ชื่อเจ้าสาว" value={form.bride} onChange={v => setForm(f => ({ ...f, bride: v }))} />
        <Input label="วันที่" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
        <Input label="สถานที่" value={form.place} onChange={v => setForm(f => ({ ...f, place: v }))} />
        <div>
          <label className="text-sm text-gray-600">อัปโหลดรูป (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block mt-1 text-xs"
          />
          {form.imageUrl && (
            <img src={form.imageUrl} className="w-24 h-24 object-cover rounded-lg mt-2 border" />
          )}
        </div>
      </div>

      {/* Live SVG Preview */}
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <LiveSVGPoster svgUrl={SVG_URL} form={form} imageUrl={form.imageUrl} />
      </div>
    </div>
  );
}

// Input Field
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
