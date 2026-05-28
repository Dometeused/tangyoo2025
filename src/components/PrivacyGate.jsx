"use client";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

/* ── Candle Flame SVG ─────────────────────────────── */
function Flame({ size = 28, style }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none" style={style}>
      <path d="M12 2C12 2 6 10 6 18a6 6 0 0012 0C18 10 12 2 12 2z" fill="url(#fg)" opacity="0.95"/>
      <path d="M12 12C12 12 9 17 9 21a3 3 0 006 0C15 17 12 12 12 12z" fill="url(#fi)" opacity="0.8"/>
      <ellipse cx="12" cy="27" rx="5" ry="1.5" fill="#7c4e00" opacity="0.3"/>
      <defs>
        <linearGradient id="fg" x1="12" y1="2" x2="12" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff7a0"/>
          <stop offset="40%" stopColor="#ffb347"/>
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="fi" x1="12" y1="12" x2="12" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#ffe066" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Floating Hearts (wedding) ────────────────────── */
function FloatingHearts() {
  const hearts = [
    { left: "12%", delay: "0s",   dur: "3.2s", size: 14, color: "#f9a8d4" },
    { left: "25%", delay: "0.8s", dur: "2.8s", size: 10, color: "#fda4af" },
    { left: "70%", delay: "0.3s", dur: "3.5s", size: 16, color: "#fecdd3" },
    { left: "82%", delay: "1.2s", dur: "2.6s", size: 11, color: "#f9a8d4" },
    { left: "50%", delay: "1.8s", dur: "3.0s", size: 9,  color: "#fbcfe8" },
  ];
  return (
    <>
      {hearts.map((h, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: h.left,
            bottom: 0,
            fontSize: h.size,
            color: h.color,
            animation: `floatHeart ${h.dur} ${h.delay} ease-in infinite`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >♥</span>
      ))}
    </>
  );
}

const THEME_OVERLAY = {
  funeral: {
    fog:     "bg-gray-900/65",
    blur:    "backdrop-blur-xl",
    card:    "bg-gray-900/85 border-amber-500/40",
    heading: "text-white",
    sub:     "text-gray-400",
    input:   "bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-amber-400",
    btn:     "bg-amber-500/90 text-gray-950 hover:bg-amber-400 font-bold",
    iconBg:  "bg-amber-500/20",
    iconColor: "text-amber-400",
    error:   "text-red-400",
    cardShadow: "0 0 40px rgba(251,191,36,0.18), 0 8px 40px rgba(0,0,0,0.5)",
  },
  wedding: {
    fog:     "bg-rose-50/50",
    blur:    "backdrop-blur-xl",
    card:    "bg-white/75 border-rose-300/50",
    heading: "text-[#6b2d4a]",
    sub:     "text-rose-400",
    input:   "bg-white/80 border-rose-200 text-stone-800 placeholder-rose-300 focus:border-rose-400",
    btn:     "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600",
    iconBg:  "bg-rose-100/80",
    iconColor: "text-rose-400",
    error:   "text-red-500",
    cardShadow: "0 0 40px rgba(251,113,133,0.22), 0 8px 40px rgba(0,0,0,0.08)",
  },
  anniversary: {
    fog:     "bg-amber-100/45",
    blur:    "backdrop-blur-xl",
    card:    "bg-white/75 border-amber-200/60",
    heading: "text-amber-800",
    sub:     "text-amber-500",
    input:   "bg-white/80 border-amber-200 text-amber-900 placeholder-amber-300 focus:border-amber-400",
    btn:     "bg-amber-600 text-white hover:bg-amber-700",
    iconBg:  "bg-amber-100/80",
    iconColor: "text-amber-500",
    error:   "text-red-500",
    cardShadow: "0 8px 40px rgba(0,0,0,0.10)",
  },
  baby: {
    fog:     "bg-purple-100/45",
    blur:    "backdrop-blur-xl",
    card:    "bg-white/75 border-purple-200/60",
    heading: "text-purple-700",
    sub:     "text-purple-400",
    input:   "bg-white/80 border-purple-200 text-purple-900 placeholder-purple-300 focus:border-purple-400",
    btn:     "bg-purple-500 text-white hover:bg-purple-600",
    iconBg:  "bg-purple-100/80",
    iconColor: "text-purple-400",
    error:   "text-red-500",
    cardShadow: "0 8px 40px rgba(0,0,0,0.10)",
  },
  default: {
    fog:     "bg-gray-100/45",
    blur:    "backdrop-blur-xl",
    card:    "bg-white/75 border-gray-200/60",
    heading: "text-gray-800",
    sub:     "text-gray-500",
    input:   "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gray-500",
    btn:     "bg-gray-900 text-white hover:bg-gray-700",
    iconBg:  "bg-gray-100/80",
    iconColor: "text-gray-400",
    error:   "text-red-500",
    cardShadow: "0 8px 40px rgba(0,0,0,0.10)",
  },
};

export default function PrivacyGate({ event, onUnlock }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const s = THEME_OVERLAY[event?.theme] || THEME_OVERLAY.default;
  const eventKey = event?.slug || event?.id;
  const isFuneral = event?.theme === "funeral";
  const isWedding = event?.theme === "wedding";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventKey, password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem(`ty_access_${event.id}`, "1");
        onUnlock();
      } else {
        setError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่");
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Keyframes */}
      <style>{`
        @keyframes flicker {
          0%,100% { opacity:1; transform:scaleY(1) rotate(-1deg); filter:brightness(1); }
          20%      { opacity:.85; transform:scaleY(.93) rotate(1.5deg); filter:brightness(.9); }
          40%      { opacity:.95; transform:scaleY(1.06) rotate(-.8deg); filter:brightness(1.1); }
          70%      { opacity:.88; transform:scaleY(.97) rotate(.6deg); filter:brightness(.95); }
        }
        @keyframes floatHeart {
          0%   { transform:translateY(0) scale(1); opacity:.75; }
          80%  { opacity:.2; }
          100% { transform:translateY(-80px) scale(.4); opacity:0; }
        }
        @keyframes candleGlow {
          0%,100% { box-shadow: 0 0 40px rgba(251,191,36,.18), 0 8px 40px rgba(0,0,0,.5); }
          50%     { box-shadow: 0 0 60px rgba(251,191,36,.30), 0 8px 40px rgba(0,0,0,.5); }
        }
        @keyframes roseGlow {
          0%,100% { box-shadow: 0 0 40px rgba(251,113,133,.22), 0 8px 40px rgba(0,0,0,.08); }
          50%     { box-shadow: 0 0 60px rgba(251,113,133,.38), 0 8px 40px rgba(0,0,0,.08); }
        }
      `}</style>

      <div className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 ${s.fog} ${s.blur}`}>

        {/* Floating hearts — wedding only */}
        {isWedding && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingHearts />
          </div>
        )}

        {/* Card */}
        <div
          className={`relative w-full max-w-sm border rounded-3xl p-8 backdrop-blur-sm ${s.card}`}
          style={{
            boxShadow: s.cardShadow,
            animation: isFuneral ? "candleGlow 2.5s ease-in-out infinite"
                      : isWedding ? "roseGlow 3s ease-in-out infinite"
                      : undefined,
          }}
        >
          {/* Candle flames — funeral only */}
          {isFuneral && (
            <>
              <div style={{ position:"absolute", top:-20, left:18, animation:"flicker 1.6s ease-in-out infinite" }}>
                <Flame size={22} />
              </div>
              <div style={{ position:"absolute", top:-24, left:"50%", transform:"translateX(-50%)", animation:"flicker 1.9s .3s ease-in-out infinite" }}>
                <Flame size={28} />
              </div>
              <div style={{ position:"absolute", top:-20, right:18, animation:"flicker 1.4s .6s ease-in-out infinite" }}>
                <Flame size={22} />
              </div>
            </>
          )}

          {/* Wedding rose decoration */}
          {isWedding && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl select-none pointer-events-none" style={{ filter:"drop-shadow(0 2px 6px rgba(244,114,182,.5))" }}>
              🌹
            </div>
          )}

          {/* Lock icon */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${s.iconBg}`}
            style={isFuneral ? { boxShadow:"0 0 14px rgba(251,191,36,.3)" } : undefined}>
            <Lock size={24} className={s.iconColor} />
          </div>

          <h1 className={`text-xl font-bold text-center mb-1 ${s.heading}`}>
            งานนี้เป็น Private
          </h1>
          <p className={`text-sm text-center mb-6 ${s.sub}`}>
            {event?.name ? `"${event.name}"` : "Event นี้"} ต้องการรหัสผ่านในการเข้าชม
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none transition ${s.input}`}
                placeholder="รหัสผ่าน"
                autoFocus
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${s.sub}`}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>

            {error && <p className={`text-xs text-center ${s.error}`}>{error}</p>}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className={`w-full py-3 rounded-xl text-sm font-bold transition disabled:opacity-50 ${s.btn}`}
            >
              {loading ? "กำลังตรวจสอบ..." : "เข้าชมงาน"}
            </button>
          </form>

          <p className={`text-xs text-center mt-4 ${s.sub}`}>
            ติดต่อเจ้าภาพเพื่อขอรหัสผ่าน
          </p>
        </div>
      </div>
    </>
  );
}
