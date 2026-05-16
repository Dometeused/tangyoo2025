"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ถ้า login อยู่แล้ว redirect ไปที่ ?next= หรือ /dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const next = searchParams.get("next") || "/dashboard";
        router.replace(next);
      } else {
        setLoading(false);
      }
    });

    // ฟัง event login สำเร็จ
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const next = searchParams.get("next") || "/dashboard";
        router.replace(next);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, searchParams]);

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
          providers={["google"]}
          theme="default"
        />
      </div>

      <p className="mt-8 text-sm text-gray-400">© 2025 TangYoo — ร่วมเก็บความทรงจำของคุณ</p>
    </div>
  );
}
