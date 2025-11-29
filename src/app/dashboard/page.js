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
    <main className="min-h-screen bg-gray-50 p-4">
      {/* Navigation */}
      <nav className="mb-6 flex gap-3 text-sm font-medium text-gray-600">
        <a href="#" className="px-3 py-2 rounded bg-white shadow hover:bg-gray-100">📅 My Events</a>
        <a href="/gallery" className="px-3 py-2 rounded bg-white shadow hover:bg-gray-100">🖼️ My Gallery</a>
        <a href="/catalog" className="px-3 py-2 rounded bg-white shadow hover:bg-gray-100">🛒 Catalog</a>
      </nav>

      {/* ฟอร์มสร้าง Event */}
      <section className="max-w-3xl mx-auto my-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2 text-gray-900">🎉 สร้าง Event ใหม่</h2>
        <form onSubmit={handleCreateEvent}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input name="name" placeholder="ชื่อ Event" required className="border p-2 rounded text-gray-900" />
            <input name="date" type="date" required className="border p-2 rounded text-gray-900" />
            <input name="place" placeholder="สถานที่" required className="border p-2 rounded text-gray-900" />
          </div>
          <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-blue-900 font-semibold">
            ➕ สร้าง Event
          </button>
        </form>
      </section>

      {/* แสดง Event Cards */}
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 shadow-sm bg-white relative"
              style={{ borderColor: themeColor(event.theme) }}
            >
              {/* รูป Cover */}
              <div className="mb-3">
                {event.cover_url ? (
                  <img
                    src={event.cover_url}
                    className="w-full h-40 object-cover rounded"
                    alt="Cover"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
                    ไม่มีรูป
                  </div>
                )}
              </div>

              <div className="space-y-1 mb-4">
                {/* แก้ไขชื่อ */}
                {editingNameId === event.id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleUpdateName(event.id);
                    }}
                    className="flex gap-2 items-center"
                  >
                    <input
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                    <button type="submit" className="text-blue-700 text-xs">บันทึก</button>
                    <button type="button" onClick={() => setEditingNameId(null)} className="text-gray-400 text-xs">ยกเลิก</button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                    <button
                      onClick={() => handleEditName(event.id, event.name)}
                      className="text-gray-400 hover:text-blue-700 text-xs"
                      title="แก้ไขชื่อ"
                    >✏️</button>
                  </div>
                )}
                <p className="text-sm text-gray-500">{event.date}</p>
                <a href={`/event/${event.id}`} className="text-sm text-blue-600 hover:underline">
                  ดู Event
                </a>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <QRLightbox url={event.qr_url} />
                <ShareButtons url={`/event/${event.id}`} />
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 hover:text-red-700 text-sm ml-auto"
                  title="ลบ Event นี้"
                >
                  🗑️
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={event.theme}
                  onChange={(e) => handleChangeTheme(event.id, e.target.value)}
                  className="border px-2 py-1 rounded text-sm text-gray-800"
                >
                  <option value="wedding">Wedding</option>
                  <option value="funeral">Funeral</option>
                  <option value="anniversary">Anniversary</option>
                </select>
                <select
                  value={event.phase || "invitation"}
                  onChange={(e) => handleChangePhase(event.id, e.target.value)}
                  className="border px-2 py-1 rounded text-sm text-gray-800"
                >
                  <option value="invitation">Invitation</option>
                  <option value="memory">Memory</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function themeColor(theme) {
  switch (theme) {
    case "wedding":
      return "#e9aabb";
    case "funeral":
      return "#d1d5db";
    case "anniversary":
      return "#ffe199";
    default:
      return "#ccc";
  }
}
