"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LiveSVGPoster from "@/components/LiveSVGPoster";

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

export default function InvitePosterCreatePage() {
  const params = useSearchParams();
  const themeKey = params.get("theme");
  const templateKey = params.get("template");
  const theme = THEMES.find(t => t.key === themeKey) || THEMES[0];
  const selectedTemplate = theme.templates.find(t => t.key === templateKey) || theme.templates[0];

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
        imageUrl: URL.createObjectURL(file),
      }));
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col items-center py-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-8 text-center text-black">
          กรอกข้อมูลโปสเตอร์ {theme.name}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Input ฟอร์ม */}
          <div className="flex-1 space-y-4 max-w-xs">
            <Input label="ชื่อเจ้าบ่าว" value={form.groom} onChange={v => setForm(f => ({ ...f, groom: v }))} />
            <Input label="ชื่อเจ้าสาว" value={form.bride} onChange={v => setForm(f => ({ ...f, bride: v }))} />
            <Input label="วันที่" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <Input label="สถานที่" value={form.place} onChange={v => setForm(f => ({ ...f, place: v }))} />
            <div>
              <label className="text-sm text-black">อัปโหลดรูป (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="block mt-1 text-xs text-black"
              />
              {form.imageUrl && (
                <img src={form.imageUrl} className="w-24 h-24 object-cover rounded-lg mt-2 border" />
              )}
            </div>
          </div>

          {/* Live SVG Preview */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            <LiveSVGPoster
              svgUrl={selectedTemplate.svg}
              form={form}
              imageUrl={form.imageUrl}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// Input Field
function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-black text-sm">{label}</span>
      <input
        className="block w-full mt-1 rounded border px-3 py-2 text-lg text-black border-gray-300 bg-white"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
