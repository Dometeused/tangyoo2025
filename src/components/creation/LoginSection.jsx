// /components/creation/LoginSection.jsx
"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginSection({ onBack, onLoginSuccess, onMount }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onMount?.();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) onLoginSuccess(user);
      else setChecking(false);
    });
  }, []);

  async function handleGoogleLogin() {
    setLoading(true);
    const next = encodeURIComponent("/creation?resume=1");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    });
    if (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex flex-col items-center py-10 gap-3 text-gray-400">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6">
      <div className="text-4xl mb-4">🔐</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">เข้าสู่ระบบเพื่อบันทึกหน้า</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        ข้อมูลของคุณจะถูกจัดเก็บอย่างปลอดภัย<br />
        และสามารถกลับมาแก้ไขได้ทุกเมื่อ
      </p>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all font-semibold text-gray-700 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 5.1C9.5 39.4 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
        )}
        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วย Google"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
      >
        ← ย้อนกลับ
      </button>
    </div>
  );
}
