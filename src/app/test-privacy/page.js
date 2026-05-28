"use client";
import PrivacyGate from "@/components/PrivacyGate";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const MOCK_EVENTS = {
  wedding:     { id: "test-1", slug: "test-1", name: "งานแต่ง คุณเอ & คุณบี", theme: "wedding" },
  funeral:     { id: "test-2", slug: "test-2", name: "ร่วมไว้อาลัย คุณปู่สมชาย", theme: "funeral" },
  anniversary: { id: "test-3", slug: "test-3", name: "ครบรอบ 10 ปี คุณซี & คุณดี", theme: "anniversary" },
  baby:        { id: "test-4", slug: "test-4", name: "ยินดีต้อนรับน้องน้ำหวาน", theme: "baby" },
};

const BG = { wedding: "bg-rose-50", funeral: "bg-gray-950", anniversary: "bg-amber-50", baby: "bg-purple-50" };
const TEXT = { wedding: "text-rose-300", funeral: "text-gray-700", anniversary: "text-amber-200", baby: "text-purple-200" };

function FakePage({ theme }) {
  return (
    <div className={`min-h-screen w-full ${BG[theme] || "bg-white"} flex flex-col items-center pt-24 gap-6 select-none pointer-events-none`}>
      <div className="w-48 h-48 rounded-full bg-gray-300/40 animate-pulse" />
      <div className={`w-64 h-6 rounded-full bg-current opacity-20 ${TEXT[theme]}`} />
      <div className={`w-48 h-4 rounded-full bg-current opacity-10 ${TEXT[theme]}`} />
      <div className="flex gap-3 mt-4">
        {[1,2,3].map(i => <div key={i} className={`w-24 h-24 rounded-xl bg-current opacity-10 ${TEXT[theme]}`} />)}
      </div>
    </div>
  );
}

function TestPrivacyInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("theme") || "wedding";
  const [theme, setTheme] = useState(initial);
  const [unlocked, setUnlocked] = useState(false);

  const switchTheme = (t) => {
    setTheme(t);
    setUnlocked(false);
    router.replace(`/test-privacy?theme=${t}`);
  };

  return (
    <div className="relative">
      <FakePage theme={theme} />
      {!unlocked && <PrivacyGate event={MOCK_EVENTS[theme]} onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-green-500/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <p className="text-2xl mb-2">✅ เข้าชมได้แล้ว!</p>
            <button onClick={() => setUnlocked(false)} className="mt-3 text-sm text-gray-500 underline">ทดสอบใหม่</button>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] flex gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border">
        {Object.keys(MOCK_EVENTS).map(t => (
          <button key={t} onClick={() => switchTheme(t)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${theme === t ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TestPrivacyPage() {
  return <Suspense><TestPrivacyInner /></Suspense>;
}
