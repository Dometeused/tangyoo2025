export const dynamic = "force-dynamic";
// PREVIEW ONLY — ลบทิ้งได้หลัง review
"use client";
import { useState } from "react";
import { Eye, Trash2, Pencil, Check, X, CalendarDays, MapPin, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

const THEME_META = {
  wedding:     { label: "Wedding",     dot: "#f43f7e", accent: "#fce7f3" },
  funeral:     { label: "Funeral",     dot: "#f97316", accent: "#fff7ed" },
  anniversary: { label: "Anniversary", dot: "#f59e0b", accent: "#fffbeb" },
  baby:        { label: "Baby",        dot: "#a78bfa", accent: "#f5f3ff" },
};
const PHASE_META = {
  invitation: { label: "Invitation", color: "#3b82f6" },
  memory:     { label: "Memory",     color: "#ec4899" },
};

const MOCK_EVENTS = [
  { id: "1", name: "งานแต่งงาน เอ & บี",    date: "2025-06-15", place: "โรงแรมดุสิตธานี", theme: "wedding",     phase: "invitation", cover_url: "", qr_url: "" },
  { id: "2", name: "วันครบรอบ 10 ปี",       date: "2025-08-20", place: "The Athenee Hotel",  theme: "anniversary", phase: "memory",     cover_url: "", qr_url: "" },
  { id: "3", name: "งานอาลัย คุณพ่อสมชาย", date: "2025-03-10", place: "วัดโพธิ์",           theme: "funeral",     phase: "invitation", cover_url: "", qr_url: "" },
];

function EventCard({ event }) {
  const theme = THEME_META[event.theme] || THEME_META.anniversary;
  const phase = PHASE_META[event.phase || "invitation"];

  return (
    <article
      className="group rounded-xl overflow-hidden flex flex-col font-kanit"
      style={{
        background: "#fff",
        border: "1px solid #e7e5e3",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        transition: "box-shadow .25s, transform .25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = ""; }}
    >
      {/* Cover */}
      <div className="relative h-44 shrink-0 flex items-center justify-center" style={{ background: theme.accent }}>
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)", color: "#1c1917" }}
        >
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.dot }} />
          {theme.label}
        </div>
        <div
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)", color: phase.color }}
        >
          {phase.label}
        </div>
        <span className="text-3xl opacity-15" style={{ color: theme.dot }}>◻</span>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff", color: "#1c1917" }}>
            <Eye size={16} />
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff", color: "#ef4444" }}>
            <Trash2 size={16} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between group/name">
          <h3 className="text-base font-bold text-stone-800 truncate pr-2">{event.name}</h3>
          <div className="opacity-0 group-hover/name:opacity-100 w-6 h-6 rounded flex items-center justify-center" style={{ color: "#a8a29e" }}>
            <Pencil size={12} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span className="flex items-center gap-1"><CalendarDays size={12} />{event.date}</span>
          <span className="flex items-center gap-1 truncate"><MapPin size={12} />{event.place}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="relative">
            <div className="w-full rounded-lg px-3 py-2 text-xs font-semibold" style={{ background: "#fafaf9", border: "1px solid #e7e5e3", color: "#57534e" }}>
              {theme.label}
            </div>
          </div>
          <div className="relative">
            <div className="w-full rounded-lg px-3 py-2 text-xs font-semibold" style={{ background: "#fafaf9", border: "1px solid #e7e5e3", color: phase.color }}>
              {phase.label}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #f5f5f4" }}>
          <span className="text-xs text-stone-300">Share</span>
          <span className="text-xs text-stone-300">QR</span>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <main className="min-h-screen font-kanit pt-16" style={{ background: "#FAF8F5" }}>

      {/* Sub-header tabs */}
      <div style={{ borderBottom: "1px solid #e7e5e3", background: "#FAF8F5" }} className="sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">
            <nav className="flex items-end h-full gap-1">
              {[
                { key: "events",  label: "My Events" },
                { key: "gallery", label: "My Gallery" },
                { key: "catalog", label: "Catalog" },
              ].map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-150"
                    style={{
                      color: isActive ? "#1c1917" : "#78716c",
                      borderBottom: isActive ? "2px solid #f97316" : "2px solid transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <span className="text-xs text-stone-400 hidden md:block">preview@tangyoo.com</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">

        {/* Create Event Form */}
        <section className="mb-10" style={{ borderLeft: "3px solid #f97316", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-800 tracking-tight">สร้าง Event ใหม่</h2>
              <p className="text-sm text-stone-400 mt-0.5">เริ่มสร้างพื้นที่เก็บความทรงจำของคุณง่ายๆ</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer" style={{ background: "#1c1917", color: "#fafaf9" }}>
                <Sparkles size={14} />
                ให้ AI ช่วยสร้าง
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-stone-500">
                <span>Intro Effect</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {[
              { label: "ชื่อ Event",  span: 4, placeholder: "เช่น งานแต่งคุณเอ & คุณบี" },
              { label: "วันที่",       span: 3, placeholder: "วว/ดด/ปปปป" },
              { label: "สถานที่",      span: 3, placeholder: "เช่น โรงแรมดุสิตธานี" },
            ].map(f => (
              <div key={f.label} className={`md:col-span-${f.span} space-y-1.5`}>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest">{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-stone-800 outline-none"
                  style={{ background: "#fff", border: "1px solid #e7e5e3", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)" }}
                  onFocus={e => e.target.style.borderColor = "#f97316"}
                  onBlur={e => e.target.style.borderColor = "#e7e5e3"}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <div className="w-full h-[42px] rounded-lg text-sm font-bold text-white flex items-center justify-center cursor-pointer" style={{ background: "#f97316" }}>
                + สร้างทันที
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest whitespace-nowrap">Events ของคุณ</span>
          <div style={{ height: "1px", background: "#e7e5e3", flex: 1 }} />
          <span className="text-xs text-stone-400">{MOCK_EVENTS.length} รายการ</span>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {MOCK_EVENTS.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </div>
    </main>
  );
}
