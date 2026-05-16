"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Login
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
      return;
    }

    // 2. Check is_admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .single();

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      setError("คุณไม่มีสิทธิ์เข้าถึงระบบ Admin");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <img src="/logo-tangyoo.png" alt="TangYoo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white">TangYoo</span>
          </div>
          <p className="text-gray-400 text-sm">Admin Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white mb-6">เข้าสู่ระบบ Admin</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                placeholder="admin@tangyoo.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
            >
              {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          TangYoo Admin — Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
