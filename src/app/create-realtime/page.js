"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2, RotateCcw, Check } from "lucide-react";

const THEME_OPTIONS = [
  { key: "wedding",     label: "💍 Wedding",    desc: "งานแต่งงาน" },
  { key: "funeral",     label: "🕯️ Funeral",    desc: "งานพิธีรำลึก" },
  { key: "anniversary", label: "🎊 Anniversary", desc: "งานครบรอบ" },
  { key: "baby",        label: "🍼 Baby",        desc: "ต้อนรับสมาชิกใหม่" },
];

const EXAMPLES = [
  "งานแต่งงานของผม ชื่อ นัท & มิ้ว วันที่ 14 กุมภา 2569 ที่โรงแรม Intercontinental",
  "งานพิธีรำลึกคุณพ่อสมชาย วันที่ 3 มีนาคม 2569 ที่วัดโพธิ์",
  "ฉลองครบรอบ 10 ปีแต่งงาน วันที่ 5 เมษายน 2569 ที่บ้าน",
  "Baby shower น้องปีใหม่ เดือนมิถุนายน 2569 ที่คลินิก",
];

export default function CreateRealtimePage() {
  const router = useRouter();

  const [inputText, setInputText]     = useState("");
  const [parsing, setParsing]         = useState(false);
  const [parsed, setParsed]           = useState(null);
  const [parseError, setParseError]   = useState("");
  const [creating, setCreating]       = useState(false);
  const [createError, setCreateError] = useState("");

  const [form, setForm] = useState({ theme: "wedding", name: "", date: "", place: "" });

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setParsing(true);
    setParseError("");
    setParsed(null);

    const res = await fetch("/api/ai-parse-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    });
    const json = await res.json();
    setParsing(false);

    if (!json.success) {
      setParseError(json.error || "วิเคราะห์ไม่สำเร็จ กรุณาลองใหม่");
      return;
    }

    const d = json.data;
    setForm({
      theme: d.theme || "wedding",
      name:  d.name  || "",
      date:  d.date  || "",
      place: d.place || "",
    });
    setParsed(d);
  };

  const handleCreate = async () => {
    if (!form.name || !form.date || !form.place) return;
    setCreating(true);
    setCreateError("");

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.status === 401) {
      router.push("/login?redirect=/create-realtime");
      return;
    }

    const json = await res.json();
    setCreating(false);

    if (json.success && json.data?.id) {
      router.push("/dashboard");
    } else {
      setCreateError("สร้างไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const handleReset = () => {
    setInputText("");
    setParsed(null);
    setParseError("");
    setForm({ theme: "wedding", name: "", date: "", place: "" });
  };

  const missingFields = parsed && (!form.name || !form.date || !form.place);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} />
            AI-Powered
          </div>
          <h1 className="text-4xl font-bold font-kanit text-gray-900 mb-2">
            บอก AI ให้สร้างให้เลย
          </h1>
          <p className="text-gray-500 text-sm">
            พิมพ์อธิบายงานของคุณเป็นประโยคธรรมดา — AI จะแยกข้อมูลให้เอง
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">

          {/* Input */}
          <div className="space-y-3">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleParse(); }}
              placeholder="เช่น: งานแต่งงานของผม ชื่อ เอ & บี วันที่ 20 ธันวาคม 2569 ที่โรงแรม Mandarin"
              rows={3}
              className="w-full rounded-2xl px-5 py-4 text-sm text-gray-800 resize-none outline-none transition-all font-kanit"
              style={{
                border: "1.5px solid #e5e7eb",
                background: "#fafafa",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={e => e.target.style.borderColor = "#f97316"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />

            {/* Example chips */}
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
                >
                  {ex.slice(0, 22)}…
                </button>
              ))}
            </div>
          </div>

          {/* Analyze button */}
          <button
            onClick={handleParse}
            disabled={!inputText.trim() || parsing}
            className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}
          >
            {parsing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                AI กำลังวิเคราะห์…
              </>
            ) : (
              <>
                <Sparkles size={18} />
                วิเคราะห์ข้อมูล
                <span className="text-xs opacity-70 font-normal ml-1">(⌘ Enter)</span>
              </>
            )}
          </button>

          {parseError && (
            <p className="text-center text-sm text-red-500">{parseError}</p>
          )}

          {/* Result form */}
          {parsed && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                  <Check size={15} className="text-green-500" />
                  วิเคราะห์แล้ว — ตรวจสอบและแก้ไขได้เลย
                </p>
                <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                  <RotateCcw size={12} /> เริ่มใหม่
                </button>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">ประเภทงาน</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_OPTIONS.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setForm(p => ({ ...p, theme: t.key }))}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                        form.theme === t.key
                          ? "border-orange-400 bg-orange-50 text-orange-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  ชื่องาน {!form.name && <span className="text-red-400">*</span>}
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all font-kanit"
                  style={{
                    border: `1.5px solid ${!form.name ? "#fca5a5" : "#e5e7eb"}`,
                    background: "#fafafa",
                  }}
                  onFocus={e => e.target.style.borderColor = "#f97316"}
                  onBlur={e => e.target.style.borderColor = !form.name ? "#fca5a5" : "#e5e7eb"}
                />
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  วันที่จัดงาน {!form.date && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  style={{
                    border: `1.5px solid ${!form.date ? "#fca5a5" : "#e5e7eb"}`,
                    background: "#fafafa",
                  }}
                  onFocus={e => e.target.style.borderColor = "#f97316"}
                  onBlur={e => e.target.style.borderColor = !form.date ? "#fca5a5" : "#e5e7eb"}
                />
              </div>

              {/* Place */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  สถานที่ {!form.place && <span className="text-red-400">*</span>}
                </label>
                <input
                  value={form.place}
                  onChange={e => setForm(p => ({ ...p, place: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all font-kanit"
                  style={{
                    border: `1.5px solid ${!form.place ? "#fca5a5" : "#e5e7eb"}`,
                    background: "#fafafa",
                  }}
                  onFocus={e => e.target.style.borderColor = "#f97316"}
                  onBlur={e => e.target.style.borderColor = !form.place ? "#fca5a5" : "#e5e7eb"}
                />
              </div>

              {missingFields && (
                <p className="text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                  AI ไม่ได้รับข้อมูลบางอย่าง — กรุณากรอกช่องสีแดงก่อนสร้าง
                </p>
              )}

              {/* Create */}
              <button
                onClick={handleCreate}
                disabled={!form.name || !form.date || !form.place || creating}
                className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
                style={{ background: "#1c1917" }}
              >
                {creating ? (
                  <><Loader2 size={18} className="animate-spin" />กำลังสร้าง…</>
                ) : (
                  <>สร้าง Event เลย <ArrowRight size={18} /></>
                )}
              </button>

              {createError && (
                <p className="text-center text-sm text-red-500">{createError}</p>
              )}
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-gray-400">
          หรือ{" "}
          <a href="/creation" className="text-orange-500 hover:underline font-medium">
            สร้างแบบ Manual
          </a>
          {" "}แทน
        </p>
      </div>
    </main>
  );
}
