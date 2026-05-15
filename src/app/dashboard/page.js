// 📄 src/app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import QRLightbox from "@/components/QRLightbox";
import ShareButtons from "@/components/ShareButtons";
import "@/styles/dashboard.css";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [editingNameId, setEditingNameId] = useState(null);
  const [newName, setNewName] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Auth protect: ถ้าไม่มี user → redirect /login
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
      if (json.success) {
        setEvents(json.data);
      }
      setLoading(false);
    };
    loadEvents();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจว่าจะลบ Event นี้?")) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newEvent = {
      name: form.get("name"),
      date: form.get("date"),
      place: form.get("place"),
      introEffect: form.get("introEffect") === "on", // Add this
      theme: "wedding",
    };
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    const json = await res.json();
    if (json.success) {
      alert("✅ สร้าง Event สำเร็จ!");
      window.location.reload();
    } else {
      alert("❌ สร้าง Event ไม่สำเร็จ");
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

  // NEW: Edit Event Name
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

  // --------- START RENDER ---------
  return (
    <main className="min-h-screen bg-[#FDF9F6] p-4 md:p-8 font-kanit">
      {/* Soft Background Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-tr from-orange-100/40 via-pink-100/40 to-blue-100/40 z-0"></div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        {/* Navigation */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg flex items-center justify-center text-white text-lg font-bold">
              TY
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">TangYoo Dashboard</h1>
          </div>

          <nav className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-white/50">
            <a href="#" className="px-5 py-2.5 rounded-xl bg-white shadow-soft text-orange-600 font-semibold transition-all">📅 My Events</a>
            <a href="/gallery" className="px-5 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white/50 transition-all font-medium">🖼️ My Gallery</a>
            <a href="/catalog" className="px-5 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white/50 transition-all font-medium">🛒 Catalog</a>
          </nav>
        </header>

        {/* ฟอร์มสร้าง Event */}
        <section className="relative overflow-visible bg-white/80 backdrop-blur-xl p-8 rounded-[32px] shadow-warm border border-white mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                ✨ สร้าง Event ใหม่
              </h2>
              <p className="text-gray-500 mt-1 text-sm">เริ่มสร้างพื้นที่ความทรงจำของคุณง่ายๆ</p>
            </div>
            {/* Toggle Intro Effect (Global Setting or Per Event? Checking UI) - Adding directly to form */}
            <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              <label htmlFor="introEffect" className="text-sm font-medium text-orange-800 cursor-pointer select-none">
                เปิด Intro Effect 🎁
              </label>
              <input
                type="checkbox"
                name="introEffect"
                id="introEffect"
                defaultChecked
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
              />
            </div>
          </div>

          <form onSubmit={handleCreateEvent} className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">ชื่อ Event</label>
                <input
                  name="name"
                  placeholder="เช่น งานแต่งคุณเอ & คุณบี"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all placeholder:text-gray-400 text-gray-800 shadow-sm"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">วันที่</label>
                <input
                  name="date"
                  type="date"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all text-gray-800 shadow-sm"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">สถานที่</label>
                <input
                  name="place"
                  placeholder="เช่น โรงแรมดุสิตธานี"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all placeholder:text-gray-400 text-gray-800 shadow-sm"
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full h-[50px] bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all font-bold flex items-center justify-center gap-2">
                  <span className="text-xl">+</span> สร้างทันที
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* แสดง Event Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <p>กำลังโหลดความทรงจำ...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {events.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-[24px] overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                {/* รูป Cover */}
                <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                  <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md bg-white/90 flex items-center gap-1 ${event.theme === 'wedding' ? 'text-pink-600' :
                      event.theme === 'funeral' ? 'text-gray-600' : 'text-orange-600'
                    }`}>
                    {event.theme === 'wedding' ? '💍' : event.theme === 'funeral' ? '🕯️' : '🎁'}
                    {event.theme === 'wedding' ? 'Wedding' : event.theme === 'funeral' ? 'Funeral' : 'Anniversary'}
                  </div>

                  {event.cover_url ? (
                    <img
                      src={event.cover_url}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Cover"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <span className="text-4xl opacity-20 mb-2">🖼️</span>
                      <span className="text-xs">ไม่มีรูปปก</span>
                    </div>
                  )}

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <a href={`/event/${event.id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-orange-600 hover:scale-110 transition-all shadow-lg" title="ดูหน้าเว็บ">
                      <span className="text-lg">👁️</span>
                    </a>
                    <button onClick={() => handleDelete(event.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all shadow-lg" title="ลบ">
                      <span className="text-lg">🗑️</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* แก้ไขชื่อ */}
                  <div className="mb-1 min-h-[32px] flex items-center">
                    {editingNameId === event.id ? (
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          handleUpdateName(event.id);
                        }}
                        className="flex gap-2 items-center w-full"
                      >
                        <input
                          value={newName}
                          onChange={e => setNewName(e.target.value)}
                          className="flex-1 bg-gray-50 border border-blue-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                          autoFocus
                          placeholder="ชื่อใหม่..."
                        />
                        <button type="submit" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all">✓</button>
                        <button type="button" onClick={() => setEditingNameId(null)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-300 transition-all">✕</button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between w-full group/title">
                        <h3 className="text-lg font-bold text-gray-800 truncate pr-2">{event.name}</h3>
                        <button
                          onClick={() => handleEditName(event.id, event.name)}
                          className="opacity-0 group-hover/title:opacity-100 text-gray-400 hover:text-blue-600 transition-all p-1 text-sm bg-gray-50 rounded-full w-6 h-6 flex items-center justify-center"
                          title="แก้ไขชื่อ"
                        >✏️</button>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">🗓️ {event.date}</p>

                  <div className="mt-auto space-y-3">
                    {/* Theme & Phase Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Theme Select */}
                      <div className="relative">
                        <select
                          value={event.theme}
                          onChange={(e) => handleChangeTheme(event.id, e.target.value)}
                          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 focus:ring-2 focus:ring-orange-100 transition-all"
                        >
                          <option value="wedding">💍 Wedding</option>
                          <option value="funeral">🕯️ Funeral</option>
                          <option value="anniversary">🎁 Anniversary</option>
                          <option value="baby">🍼 Baby</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                      </div>

                      {/* Phase Select */}
                      <div className="relative">
                        <select
                          value={event.phase || "invitation"}
                          onChange={(e) => handleChangePhase(event.id, e.target.value)}
                          className={`w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer hover:border-gray-300 focus:ring-2 focus:ring-blue-100 transition-all ${(event.phase === 'memory') ? 'text-pink-600 bg-pink-50/50' : 'text-blue-600 bg-blue-50/50'
                            }`}
                        >
                          <option value="invitation">📩 Invite</option>
                          <option value="memory">💖 Memory</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="scale-75 origin-left opacity-80 hover:opacity-100 transition-opacity">
                          <ShareButtons url={`/event/${event.id}`} />
                        </div>
                      </div>
                      <div className="scale-75 origin-right opacity-80 hover:opacity-100 transition-opacity">
                        <QRLightbox url={event.qr_url} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function themeColor(theme) {
  // Not used anymore in the new design, but kept to avoid breaking if referenced elsewhere? 
  // actually I removed the usage in style={{ borderColor }} so it is fine.
  return "#ccc";
}
