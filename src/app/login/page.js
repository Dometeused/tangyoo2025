"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";

const FEATURES = [
  { icon: "💍", label: "งานแต่งงาน" },
  { icon: "🕯️", label: "งานไว้อาลัย" },
  { icon: "✨", label: "ครบรอบ" },
  { icon: "🍼", label: "ต้อนรับสมาชิกใหม่" },
];

const AUTH_APPEARANCE = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: "#e11d48",
        brandAccent: "#be123c",
        brandButtonText: "#ffffff",
        defaultButtonBackground: "#f9f5f3",
        defaultButtonBackgroundHover: "#f3ede9",
        inputBackground: "#ffffff",
        inputBorder: "#e5e0dc",
        inputBorderFocus: "#e11d48",
        inputBorderHover: "#d1c9c4",
        inputText: "#1c1917",
        inputPlaceholder: "#a8a29e",
      },
      radii: {
        borderRadiusButton: "12px",
        buttonBorderRadius: "12px",
        inputBorderRadius: "12px",
      },
      fontSizes: {
        baseBodySize: "14px",
        baseInputSize: "14px",
        baseLabelSize: "13px",
        baseButtonSize: "14px",
      },
      space: {
        inputPadding: "12px 14px",
        buttonPadding: "12px 16px",
      },
    },
  },
  style: {
    button: { fontWeight: "600" },
    anchor: { color: "#e11d48" },
    divider: { background: "#ede8e4" },
    label: { color: "#57534e", marginBottom: "6px" },
  },
};

const AUTH_LOCALIZATION = {
  variables: {
    sign_in: {
      email_label: "อีเมล",
      password_label: "รหัสผ่าน",
      email_input_placeholder: "อีเมลของคุณ",
      password_input_placeholder: "รหัสผ่าน",
      button_label: "เข้าสู่ระบบ",
      social_provider_text: "เข้าสู่ระบบด้วย {{provider}}",
      link_text: "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ",
    },
    sign_up: {
      email_label: "อีเมล",
      password_label: "ตั้งรหัสผ่าน",
      email_input_placeholder: "อีเมลของคุณ",
      password_input_placeholder: "รหัสผ่านอย่างน้อย 6 ตัว",
      button_label: "สมัครสมาชิก",
      social_provider_text: "สมัครด้วย {{provider}}",
      link_text: "ยังไม่มีบัญชี? สมัครสมาชิก",
      confirmation_text: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี",
    },
    forgotten_password: {
      link_text: "ลืมรหัสผ่าน?",
      button_label: "ส่งลิงก์รีเซ็ต",
      email_label: "อีเมล",
      email_input_placeholder: "อีเมลของคุณ",
      confirmation_text: "กรุณาตรวจสอบอีเมลของคุณ",
    },
  },
};

/* ── Phone OTP form ──────────────────────────────────── */
function PhoneForm({ supabase }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // countdown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const toE164 = (raw) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("66")) return "+" + digits;
    if (digits.startsWith("0")) return "+66" + digits.slice(1);
    return "+66" + digits;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    const formatted = toE164(phone);
    if (formatted.length < 11) {
      setError("กรุณากรอกเบอร์โทรให้ถูกต้อง");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({ phone: formatted });
    setLoading(false);
    if (err) {
      setError(err.message === "Signups not allowed for this instance"
        ? "ระบบ SMS ยังไม่เปิดใช้งาน กรุณาติดต่อผู้ดูแล"
        : err.message);
      return;
    }
    setStep("otp");
    setCooldown(60);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("OTP ต้องมี 6 หลัก");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.verifyOtp({
      phone: toE164(phone),
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (err) setError("OTP ไม่ถูกต้องหรือหมดอายุแล้ว");
  };

  const inputCls = "w-full border border-[#e5e0dc] rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-rose-400 bg-white transition";
  const btnCls = "w-full py-3 rounded-xl text-sm font-semibold transition disabled:opacity-50";

  return (
    <form onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp} className="space-y-4">
      {step === "phone" ? (
        <>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">เบอร์โทรศัพท์</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400 select-none">🇹🇭 +66</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError(""); }}
                className={`${inputCls} pl-16`}
                placeholder="0XX-XXX-XXXX"
                autoFocus
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !phone.trim()}
            className={`${btnCls} bg-rose-600 hover:bg-rose-700 text-white`}
          >
            {loading ? "กำลังส่ง..." : "ส่ง OTP"}
          </button>
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">
              OTP 6 หลัก — ส่งไปที่ {toE164(phone)}
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
              className={`${inputCls} tracking-[0.4em] text-center text-lg font-semibold`}
              placeholder="_ _ _ _ _ _"
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className={`${btnCls} bg-rose-600 hover:bg-rose-700 text-white`}
          >
            {loading ? "กำลังตรวจสอบ..." : "ยืนยัน OTP"}
          </button>
          <div className="text-center">
            {cooldown > 0 ? (
              <p className="text-xs text-stone-400">ส่งใหม่ได้อีก {cooldown} วินาที</p>
            ) : (
              <button
                type="button"
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="text-xs text-rose-500 hover:text-rose-700 underline"
              >
                เปลี่ยนเบอร์ / ส่ง OTP ใหม่
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}

/* ── Main login inner ────────────────────────────────── */
function LoginInner() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("email"); // "email" | "phone"

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(searchParams.get("next") || "/dashboard");
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) router.replace(searchParams.get("next") || "/dashboard");
    });
    return () => subscription.unsubscribe();
  }, [supabase, router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex fixed inset-0">

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/wedding-bg.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-rose-950/60" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="relative z-10 flex flex-col items-center text-center px-14 gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🌸</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wide">TangYoo</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white/90 text-xl font-light leading-relaxed">ร่วมเก็บความทรงจำที่ดีที่สุด</p>
            <p className="text-white/50 text-sm tracking-widest uppercase">Create · Share · Remember</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-2 text-white/80 text-sm">
                <span>{f.icon}</span><span>{f.label}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs tracking-widest mt-4">&ldquo;ทุกช่วงเวลา ล้วนคู่ควรแก่การจดจำ&rdquo;</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-[#fdfaf8] overflow-y-auto">

        {/* Mobile logo */}
        <div className="flex flex-col items-center gap-2 mb-6 lg:hidden">
          <span className="text-4xl">🌸</span>
          <h1 className="text-2xl font-bold text-gray-800">TangYoo</h1>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">เข้าสู่ระบบ</h2>
            <p className="text-sm text-gray-400">ยินดีต้อนรับกลับมา</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-stone-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab("email")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "email"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              อีเมล / โซเชียล
            </button>
            <button
              onClick={() => setTab("phone")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "phone"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              📱 เบอร์โทรศัพท์
            </button>
          </div>

          {tab === "email" ? (
            <Auth
              supabaseClient={supabase}
              appearance={AUTH_APPEARANCE}
              providers={["google", "facebook"]}
              localization={AUTH_LOCALIZATION}
            />
          ) : (
            <PhoneForm supabase={supabase} />
          )}
        </div>

        <p className="mt-8 text-xs text-gray-300 text-center">
          © 2025 TangYoo — ร่วมเก็บความทรงจำของคุณ
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginInner />
    </Suspense>
  );
}
