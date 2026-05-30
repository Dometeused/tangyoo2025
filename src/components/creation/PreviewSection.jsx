"use client";
import { useState, useEffect, useRef } from "react";
import { THEMES } from "@/data/themes";
import { ArrowLeft, ArrowRight, Type, CalendarDays, MapPin, RefreshCw } from "lucide-react";
import { differenceInDays, differenceInYears } from "date-fns";

function buildPreviewUrl(themeKey, formData, phase) {
  const params = new URLSearchParams({
    theme: themeKey,
    name:  formData.name  || "",
    date:  formData.date  || "",
    place: formData.place || "",
    phase: phase === 1 ? "invitation" : "memory",
  });
  return `/preview-event?${params.toString()}`;
}

export default function PreviewSection({ themeKey, onBack, onNext, loading }) {
  const [phase, setPhase]       = useState(1);
  const [formData, setFormData] = useState({ name: "", date: "", place: "" });
  const [errors, setErrors]     = useState({});
  const [iframeSrc, setIframeSrc] = useState(() => buildPreviewUrl(themeKey, { name: "", date: "", place: "" }, 1));
  const [iframeLoading, setIframeLoading] = useState(true);
  const debounceRef = useRef(null);
  const theme = THEMES.find((t) => t.key === themeKey);

  if (!theme) return null;

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setErrors(p => ({ ...p, [field]: undefined }));

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setIframeLoading(true);
      setIframeSrc(buildPreviewUrl(themeKey, updated, phase));
    }, 500);
  };

  const handlePhaseChange = (p) => {
    setPhase(p);
    setIframeLoading(true);
    setIframeSrc(buildPreviewUrl(themeKey, formData, p));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "กรุณากรอกชื่องาน";
    // date + place เป็น optional — เพิ่มทีหลังได้
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onNext(formData);
  };

  const inputStyle = (field) => ({
    background: "#fafaf9",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "#e7e5e3"}`,
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          ย้อนกลับ
        </button>
        <h2 className="text-2xl font-bold font-kanit">กรอกข้อมูลงาน — {theme.label}</h2>
        <div className="w-20" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── Live Preview (iframe in phone shell) ────────────── */}
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col items-center gap-3">

          {/* Phase toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-full w-full max-w-xs">
            {[{ v: 1, label: "Invitation" }, { v: 2, label: "Memory Page" }].map(({ v, label }) => (
              <button
                key={v}
                onClick={() => handlePhaseChange(v)}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${phase === v ? "bg-white shadow text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Phone shell */}
          <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] border-[7px] border-gray-900 shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-0 right-0 h-7 z-20 bg-black flex items-center justify-center pointer-events-none">
              <div className="w-20 h-3.5 bg-gray-900 rounded-full" />
            </div>

            {/* Loading overlay */}
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 pointer-events-none">
                <RefreshCw size={20} className="animate-spin text-orange-400" />
              </div>
            )}

            {/* Real invitation iframe */}
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              className="absolute inset-0 w-full h-full border-0"
              style={{ marginTop: "28px", height: "calc(100% - 28px)" }}
              onLoad={() => setIframeLoading(false)}
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          <p className="text-xs text-gray-400 text-center">
            Preview จริงจากหน้าเว็บ — อัปเดตตามที่คุณกรอก
          </p>
        </div>

        {/* ── Form Side ─────────────────────────────────────── */}
        <div className="flex-1 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Type size={18} className="text-orange-500" />
              ข้อมูลงานของคุณ
            </h3>

            {/* Event Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest">
                ชื่องาน *
              </label>
              <input
                value={formData.name}
                onChange={e => handleChange("name", e.target.value)}
                placeholder={
                  themeKey === "wedding"     ? "เช่น งานแต่งงาน คุณเอ & คุณบี"
                  : themeKey === "funeral"   ? "เช่น งานพิธีรำลึก คุณพ่อสมชาย"
                  : themeKey === "baby"      ? "เช่น ต้อนรับน้องปีใหม่"
                  : "เช่น ครบรอบ 10 ปี คุณเจมส์ & คุณปุ้ย"
                }
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-kanit"
                style={inputStyle("name")}
                onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = errors.name ? "#ef4444" : "#e7e5e3"; e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)"; }}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <CalendarDays size={12} />
                {themeKey === "anniversary" ? "วันเริ่มต้นความสัมพันธ์ *" : "วันที่จัดงาน *"}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => handleChange("date", e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-kanit"
                style={inputStyle("date")}
                onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = errors.date ? "#ef4444" : "#e7e5e3"; e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)"; }}
              />
              {themeKey === "anniversary" && formData.date && (() => {
                const since = new Date(formData.date);
                const today = new Date();
                const days = differenceInDays(today, since);
                const years = differenceInYears(today, since);
                if (days > 0) return (
                  <p className="text-xs font-semibold" style={{ color: "#b8800a" }}>
                    ✦ {days.toLocaleString()} วัน · {years} ปีแห่งความทรงจำ
                  </p>
                );
              })()}
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>

            {/* Place */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <MapPin size={12} /> สถานที่จัดงาน *
              </label>
              <input
                value={formData.place}
                onChange={e => handleChange("place", e.target.value)}
                placeholder="เช่น โรงแรมดุสิตธานี กรุงเทพ"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-kanit"
                style={inputStyle("place")}
                onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = errors.place ? "#ef4444" : "#e7e5e3"; e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)"; }}
              />
              {errors.place && <p className="text-xs text-red-500">{errors.place}</p>}
            </div>
          </div>

          {/* 2-Phase explanation */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
            <div className="text-2xl shrink-0">📱</div>
            <div>
              <p className="text-sm font-bold text-orange-800 mb-1">QR Code 2-Phase คืออะไร?</p>
              <p className="text-xs text-orange-700 leading-relaxed">
                QR เดียวกัน — เปลี่ยนหน้าได้ตลอดเวลา<br />
                <span className="font-semibold">Phase 1:</span> ก่อนงาน → หน้าการ์ดเชิญ<br />
                <span className="font-semibold">Phase 2:</span> หลังงาน → หน้า Memory รวมภาพและคำอวยพร
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                กำลังสร้าง...
              </>
            ) : (
              <>สร้าง Event นี้เลย <ArrowRight size={20} /></>
            )}
          </button>
          <p className="text-center text-xs text-gray-400">
            สามารถแก้ไขรูปภาพและข้อมูลเพิ่มเติมได้ในหน้า Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
