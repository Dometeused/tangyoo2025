"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Shield, ShieldOff, Search } from "lucide-react";

export default function AdminUsersPage() {
  const supabase = createClientComponentClient();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState(null);

  const load = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, email, is_admin, created_at")
      .order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleAdmin = async (user) => {
    setToggling(user.id);
    await supabase.from("profiles").update({ is_admin: !user.is_admin }).eq("id", user.id);
    await load();
    setToggling(null);
  };

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Users</h2>
          <p className="text-gray-400 text-sm mt-1">ทั้งหมด {users.length} users</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหา email..."
            className="bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-64"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">กำลังโหลด...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">ไม่พบ users</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">Email</th>
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">Role</th>
                <th className="text-left text-xs text-gray-500 font-medium px-6 py-3">สมัครเมื่อ</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-white text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${user.is_admin
                      ? "bg-orange-500/20 text-orange-300"
                      : "bg-gray-700 text-gray-400"}`}>
                      {user.is_admin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(user.created_at).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAdmin(user)}
                      disabled={toggling === user.id}
                      title={user.is_admin ? "ถอด Admin" : "เพิ่มเป็น Admin"}
                      className={`p-1.5 rounded-lg transition-all disabled:opacity-50 ${user.is_admin
                        ? "text-orange-400 hover:bg-orange-500/10"
                        : "text-gray-500 hover:text-orange-400 hover:bg-orange-500/10"}`}>
                      {user.is_admin ? <ShieldOff size={16} /> : <Shield size={16} />}
                    </button>
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
