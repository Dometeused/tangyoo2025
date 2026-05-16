"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Trash2, ExternalLink, Search } from "lucide-react";
import Link from "next/link";

const THEME_BADGE = {
  wedding: "bg-pink-500/20 text-pink-300",
  funeral: "bg-gray-500/20 text-gray-300",
  anniversary: "bg-yellow-500/20 text-yellow-300",
  baby: "bg-purple-500/20 text-purple-300",
};

export default function AdminEventsPage() {
  const supabase = createClientComponentClient();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    const { data } = await supabase
      .from("events")
      .select("id, name, theme, phase, email, created_at, place")
      .order("created_at", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("ลบ event นี้จริงๆ ไหม?")) return;
    setDeleting(id);
    await supabase.from("events").delete().eq("id", id);
    await load();
    setDeleting(null);
  };

  const filtered = events.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Events</h2>
          <p className="text-gray-400 text-sm mt-1">ทั้งหมด {events.length} events</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ / email..."
            className="bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-64"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">กำลังโหลด...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">ไม่พบ events</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">Event</th>
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">Owner</th>
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">Theme / Phase</th>
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">วันที่สร้าง</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(event => (
                <tr key={event.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{event.name}</p>
                    <p className="text-gray-500 text-xs">{event.place || "-"}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{event.email || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${THEME_BADGE[event.theme] || "bg-gray-700 text-gray-300"}`}>
                        {event.theme}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        {event.phase}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(event.created_at).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/event/${event.id}`} target="_blank"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                        <ExternalLink size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={deleting === event.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
