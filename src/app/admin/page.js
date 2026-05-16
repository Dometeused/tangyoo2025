"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CalendarDays, Users, Heart, Image } from "lucide-react";

export default function AdminOverviewPage() {
  const supabase = createClientComponentClient();
  const [stats, setStats] = useState({ events: 0, users: 0, wedding: 0, funeral: 0, anniversary: 0, baby: 0 });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [eventsRes, profilesRes, recentRes] = await Promise.all([
        supabase.from("events").select("theme", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("events").select("id, name, theme, phase, created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      const events = eventsRes.data || [];
      setStats({
        events: eventsRes.count || 0,
        users: profilesRes.count || 0,
        wedding: events.filter(e => e.theme === "wedding").length,
        funeral: events.filter(e => e.theme === "funeral").length,
        anniversary: events.filter(e => e.theme === "anniversary").length,
        baby: events.filter(e => e.theme === "baby").length,
      });
      setRecentEvents(recentRes.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    { label: "Events ทั้งหมด", value: stats.events, icon: CalendarDays, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Users ทั้งหมด", value: stats.users, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Wedding", value: stats.wedding, icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10" },
    { label: "Funeral", value: stats.funeral, icon: Image, color: "text-gray-400", bg: "bg-gray-500/10" },
  ];

  const THEME_BADGE = {
    wedding: "bg-pink-500/20 text-pink-300",
    funeral: "bg-gray-500/20 text-gray-300",
    anniversary: "bg-yellow-500/20 text-yellow-300",
    baby: "bg-purple-500/20 text-purple-300",
  };

  if (loading) return <div className="text-gray-400 text-sm">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Overview</h2>
        <p className="text-gray-400 text-sm mt-1">ภาพรวมระบบ TangYoo</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-gray-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Events ล่าสุด</h3>
        <div className="space-y-3">
          {recentEvents.length === 0 && <p className="text-gray-500 text-sm">ยังไม่มี events</p>}
          {recentEvents.map(event => (
            <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{event.name}</p>
                <p className="text-gray-500 text-xs">{new Date(event.created_at).toLocaleDateString("th-TH")}</p>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${THEME_BADGE[event.theme] || "bg-gray-700 text-gray-300"}`}>
                  {event.theme}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                  {event.phase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
