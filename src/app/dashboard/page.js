// 📄 src/app/dashboard/page.js
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import QRLightbox from "@/components/QRLightbox";
import ShareButtons from "@/components/ShareButtons";
// import AIChatWindow from "@/components/ai-butler/AIChatWindow"; // POST-MVP
import { Eye, Trash2, Pencil, Check, X, CalendarDays, MapPin, ChevronDown, AlertTriangle } from "lucide-react";
import "@/styles/dashboard.css";

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

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [editingNameId, setEditingNameId] = useState(null);
  const [newName, setNewName] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [formErrors, setFormErrors] = useState({});
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user || null);
      if (user) {
        setUserEmail(user.email);
        localStorage.setItem("email", user.email);
      } else {
        router.replace("/login");
      }
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!userEmail) return;
    const loadEvents = async () => {
      setLoading(true);
      const res = await fetch("/api/events", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setEvents(json.data);
      setLoading(false);
    };
    loadEvents();
  }, [userEmail]);

  const handleDelete = (id, name) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });
    setDeleteTarget(null);
    window.location.reload();
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name")?.trim();
    const date = form.get("date");
    const place = form.get("place")?.trim();

    // Client-side validation
    const errors = {};
    if (!name) errors.name = "กรุณากรอกชื่อ Event";
    if (!date) errors.date = "กรุณาเลือกวันที่";
    if (!place) errors.place = "กรุณากรอกสถานที่";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const newEvent = { name, date, place, introEffect: form.get("introEffect") === "on", theme: "wedding" };
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    const json = await res.json();
    if (json.success) {
      window.location.reload();
    } else {
      setFormErrors({ general: "สร้าง Event ไม่สำเร็จ กรุณาลองใหม่" });
    }
  };

  const handleChangeTheme = async (eventId, newTheme) => {
    await fetch("/api/events/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: eventId, theme: newTheme }),
    });
    window.location.reload();
  };

  const handleChangePhase = async (eventId, newPhase) => {
    await fetch("/api/events/phase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: eventId, phase: newPhase }),
    });
    window.location.reload();
  };

  const handleEditName = (eventId, name) => {
    setEditingNameId(eventId);
    setNewName(name);
  };

  const handleUpdateName = async (eventId) => {
    await fetch("/api/events/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: eventId, name: newName }),
    });
    setEditingNameId(null);
    setNewName("");
    window.location.reload();
  };

  return (
    <main className="min-h-screen font-kanit pt-16" style={{ background: "#FAF8F5" }}>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} style={{ color: "#ef4444" }} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-base">ลบ Event</h3>
                <p className="text-xs text-stone-400">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-6">
              คุณต้องการลบ <span className="font-semibold text-stone-800">"{deleteTarget.name}"</span> ใช่หรือไม่? ข้อมูล กาลเลอรี และสมุดอวยพรทั้งหมดจะถูกลบ
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: "#f5f5f4", color: "#57534e" }}
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#ef4444" }}
              >
                ลบเลย
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Window — POST-MVP */}

      {/* ── Dashboard Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #e7e5e3", background: "#FAF8F5" }} className="sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">

            {/* Tab Nav */}
            <nav className="flex items-end h-full gap-1">
              {[
                { key: "events",  label: "My Events" },
                { key: "gallery", label: "My Gallery", href: "/gallery" },
                { key: "catalog", label: "Catalog",    href: "/catalog"  },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                const El = tab.href ? Link : "button";
                return (
                  <El
                    key={tab.key}
                    href={tab.href}
                    onClick={() => !tab.href && setActiveTab(tab.key)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-150 select-none"
                    style={{
                      color: isActive ? "#1c1917" : "#78716c",
                      borderBottom: isActive ? "2px solid #f97316" : "2px solid transparent",
                    }}
                  >
                    {tab.label}
                  </El>
                );
              })}
            </nav>

            {/* User pill */}
            {userEmail && (
              <span className="text-xs text-stone-400 hidden md:block truncate max-w-[200px]">
                {userEmail}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">

        {/* ── Create Event Form ─────────────────────────────────── */}
        <section className="mb-10" style={{ borderLeft: "3px solid #f97316", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-800 tracking-tight">สร้าง Event ใหม่</h2>
              <p className="text-sm text-stone-400 mt-0.5">เริ่มสร้างพื้นที่เก็บความทรงจำของคุณง่ายๆ</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Intro Effect toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-stone-500">
                <span>Intro Effect</span>
                <input
                  type="checkbox"
                  name="introEffect"
                  id="introEffect"
                  defaultChecked
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-4 space-y-1.5">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest">
                  ชื่อ Event
                </label>
                <input
                  name="name"
                  placeholder="เช่น งานแต่งคุณเอ & คุณบี"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-stone-800 outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: `1px solid ${formErrors.name ? "#ef4444" : "#e7e5e3"}`,
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                  }}
                  onFocus={e => e.target.style.borderColor = formErrors.name ? "#ef4444" : "#f97316"}
                  onBlur={e => e.target.style.borderColor = formErrors.name ? "#ef4444" : "#e7e5e3"}
                  onChange={() => setFormErrors(p => ({ ...p, name: undefined }))}
                />
                {formErrors.name && <p className="text-xs text-red-500 mt-0.5">{formErrors.name}</p>}
              </div>
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest">
                  วันที่
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-stone-800 outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: `1px solid ${formErrors.date ? "#ef4444" : "#e7e5e3"}`,
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                  }}
                  onFocus={e => e.target.style.borderColor = formErrors.date ? "#ef4444" : "#f97316"}
                  onBlur={e => e.target.style.borderColor = formErrors.date ? "#ef4444" : "#e7e5e3"}
                  onChange={() => setFormErrors(p => ({ ...p, date: undefined }))}
                />
                {formErrors.date && <p className="text-xs text-red-500 mt-0.5">{formErrors.date}</p>}
              </div>
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest">
                  สถานที่
                </label>
                <input
                  name="place"
                  placeholder="เช่น โรงแรมดุสิตธานี"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-stone-800 outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: `1px solid ${formErrors.place ? "#ef4444" : "#e7e5e3"}`,
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                  }}
                  onFocus={e => e.target.style.borderColor = formErrors.place ? "#ef4444" : "#f97316"}
                  onBlur={e => e.target.style.borderColor = formErrors.place ? "#ef4444" : "#e7e5e3"}
                  onChange={() => setFormErrors(p => ({ ...p, place: undefined }))}
                />
                {formErrors.place && <p className="text-xs text-red-500 mt-0.5">{formErrors.place}</p>}
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <button
                  type="submit"
                  className="w-full h-[42px] rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#f97316" }}
                >
                  + สร้างทันที
                </button>
                {formErrors.general && <p className="text-xs text-red-500 text-center">{formErrors.general}</p>}
              </div>
            </div>
          </form>
        </section>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest whitespace-nowrap">
            Events ของคุณ
          </span>
          <div style={{ height: "1px", background: "#e7e5e3", flex: 1 }} />
          {!loading && (
            <span className="text-xs text-stone-400">{events.length} รายการ</span>
          )}
        </div>

        {/* ── Event Cards ───────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl overflow-hidden animate-pulse" style={{ background: "#f5f5f4", height: 280 }} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState onCreateClick={() => document.querySelector('input[name="name"]')?.focus()} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                editingNameId={editingNameId}
                newName={newName}
                setNewName={setNewName}
                onEditName={handleEditName}
                onUpdateName={handleUpdateName}
                onCancelEdit={() => setEditingNameId(null)}
                onDelete={handleDelete}
                onChangeTheme={handleChangeTheme}
                onChangePhase={handleChangePhase}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* ── Event Card ──────────────────────────────────────────────────── */
function EventCard({
  event,
  editingNameId, newName, setNewName,
  onEditName, onUpdateName, onCancelEdit,
  onDelete, onChangeTheme, onChangePhase,
}) {
  const theme = THEME_META[event.theme] || THEME_META.anniversary;
  const phase = PHASE_META[event.phase || "invitation"];

  return (
    <article
      className="group rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "#fff",
        border: "1px solid #e7e5e3",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"}
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden shrink-0" style={{ background: theme.accent }}>
        {/* Theme dot badge */}
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)", color: "#1c1917" }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block shrink-0"
            style={{ background: theme.dot }}
          />
          {theme.label}
        </div>

        {/* Phase badge */}
        <div
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(8px)", color: phase.color }}
        >
          {phase.label}
        </div>

        {/* Cover image or placeholder */}
        {event.cover_url ? (
          <img
            src={event.cover_url}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Cover"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl opacity-20" style={{ color: theme.dot }}>◻</span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}>
          <Link
            href={`/event/${event.id}`}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#fff", color: "#1c1917" }}
            title="ดูหน้าเว็บ"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => onDelete(event.id, event.name)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#fff", color: "#ef4444" }}
            title="ลบ"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Name */}
        <div className="min-h-[28px]">
          {editingNameId === event.id ? (
            <form
              onSubmit={e => { e.preventDefault(); onUpdateName(event.id); }}
              className="flex gap-2 items-center"
            >
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="flex-1 rounded-lg px-3 py-1.5 text-sm outline-none"
                style={{ border: "1px solid #f97316", background: "#fff7ed" }}
                autoFocus
              />
              <button type="submit" className="w-7 h-7 rounded-lg flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                <Check size={13} />
              </button>
              <button type="button" onClick={onCancelEdit} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: "#f5f5f4", color: "#78716c" }}>
                <X size={13} />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between group/name">
              <h3 className="text-base font-bold text-stone-800 truncate pr-2 leading-tight">{event.name}</h3>
              <button
                onClick={() => onEditName(event.id, event.name)}
                className="opacity-0 group-hover/name:opacity-100 w-6 h-6 rounded flex items-center justify-center transition-all hover:bg-stone-100 shrink-0"
                style={{ color: "#a8a29e" }}
                title="แก้ไขชื่อ"
              >
                <Pencil size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {event.date || "—"}
          </span>
          {event.place && (
            <span className="flex items-center gap-1 truncate">
              <MapPin size={12} />
              {event.place}
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {/* Theme */}
          <div className="relative">
            <select
              value={event.theme}
              onChange={e => onChangeTheme(event.id, e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 text-xs font-semibold outline-none cursor-pointer transition-all"
              style={{ background: "#fafaf9", border: "1px solid #e7e5e3", color: "#57534e" }}
              onFocus={e => e.target.style.borderColor = "#f97316"}
              onBlur={e => e.target.style.borderColor = "#e7e5e3"}
            >
              <option value="wedding">Wedding</option>
              <option value="funeral">Funeral</option>
              <option value="anniversary">Anniversary</option>
              <option value="baby">Baby</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

          {/* Phase */}
          <div className="relative">
            <select
              value={event.phase || "invitation"}
              onChange={e => onChangePhase(event.id, e.target.value)}
              className="w-full appearance-none rounded-lg px-3 py-2 text-xs font-semibold outline-none cursor-pointer transition-all"
              style={{
                background: "#fafaf9",
                border: "1px solid #e7e5e3",
                color: event.phase === "memory" ? "#ec4899" : "#3b82f6",
              }}
              onFocus={e => e.target.style.borderColor = "#f97316"}
              onBlur={e => e.target.style.borderColor = "#e7e5e3"}
            >
              <option value="invitation">Invitation</option>
              <option value="memory">Memory</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid #f5f5f4" }}
        >
          <div className="scale-75 origin-left opacity-70 hover:opacity-100 transition-opacity">
            <ShareButtons url={`/event/${event.id}`} />
          </div>
          <div className="scale-75 origin-right opacity-70 hover:opacity-100 transition-opacity">
            <QRLightbox url={event.qr_url} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Empty State ─────────────────────────────────────────────────── */
function EmptyState({ onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
      >
        <CalendarDays size={28} style={{ color: "#f97316" }} />
      </div>
      <h3 className="text-lg font-bold text-stone-700 mb-2">ยังไม่มี Event</h3>
      <p className="text-sm text-stone-400 mb-6 max-w-xs">
        เริ่มสร้าง Event แรกของคุณ เพื่อเก็บความทรงจำที่สำคัญไว้ตลอดไป
      </p>
      <button
        onClick={onCreateClick}
        className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ background: "#f97316" }}
      >
        สร้าง Event แรก
      </button>
    </div>
  );
}
