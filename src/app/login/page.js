"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ STEP 1: ถ้า login อยู่แล้ว ไม่ต้องให้เข้าหน้า login
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/dashboard"); // ใช้ replace ป้องกัน back กลับมา login อีก
      } else {
        setLoading(false);
      }
    });

    // ✅ STEP 2: ฟัง event login สำเร็จ
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // (ถ้าอยาก save email)
        localStorage.setItem("userEmail", session.user.email);
        router.replace("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">เข้าสู่ระบบ TangYoo</h1>

      <div className="w-full max-w-md rounded-2xl shadow-xl p-6 border border-gray-200 bg-white">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github", "email"]}
          theme="default"
        />
      </div>

      <p className="mt-8 text-sm text-gray-400">© 2025 TangYoo — ร่วมเก็บความทรงจำของคุณ</p>
    </div>
  );
}
