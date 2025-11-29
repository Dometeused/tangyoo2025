"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const nav = [
  { name: "Catalog", href: "/catalog" },
  { name: "สร้างของขวัญพิเศษ", href: "/creation" },
  { name: "ฟีเจอร์", href: "/features" },
  { name: "About Us", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    // โหลด user ตอน mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
    // ฟัง event login/logout เปลี่ยน
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      // ถ้า logout → redirect ไป /login (กันหลุด)
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
    });

    // 👇 แก้จุดนี้!
    return () => {
      if (listener && typeof listener.subscription?.unsubscribe === "function") {
        listener.subscription.unsubscribe();
      }
    };
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // ไม่ต้อง setUser(null) เดี๋ยว onAuthStateChange จัดการ state + redirect ให้
  };

  return (
    <header className="w-full bg-[#F7F6F3] border-b border-[#ECECEC] shadow-none font-sukhumvit">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo + Slogan */}
        <Link href="/" className="flex items-center gap-2 group" title="กลับหน้าแรก">
          <img
            src="/logo-tangyoo.png"
            alt="TangYoo logo"
            className="h-8 w-auto drop-shadow-sm"
            style={{ maxWidth: 34 }}
            loading="eager"
          />
          <span className="ml-3 text-sm text-[#908C86] font-light hidden md:inline pl-3 select-none">
            ให้ความทรงจำ ‘ตั้งอยู่’ ตลอดไป
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="px-4 py-1.5 text-[#3D3D3D] font-normal rounded-full bg-transparent transition-all duration-150 hover:bg-[#ECE7DF] hover:text-[#111] focus-visible:ring-2 focus-visible:ring-[#ECECEC]"
              style={{ fontSize: "0.98rem", letterSpacing: "0.005em" }}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-[#A0977B] text-xs truncate max-w-[110px] font-normal" title={user.email}>
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full bg-[#ECE7DF] text-[#635D4B] font-semibold hover:bg-[#DFD9CB] transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-3 px-5 py-1.5 rounded-full bg-[#ECE7DF] text-[#635D4B] font-bold shadow hover:bg-[#DFD9CB] transition text-sm"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <nav className="md:hidden bg-[#F7F6F3] border-t border-[#ECECEC] shadow z-50 px-4 pb-2 rounded-b-2xl animate-fade-in-down">
          {nav.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="block py-2 text-[#3D3D3D] font-normal border-b border-[#ECECEC] text-base rounded-lg hover:bg-[#ECE7DF] hover:text-[#111]"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center justify-between py-2">
              <span className="text-[#A0977B] text-xs truncate max-w-[100px] font-normal" title={user.email}>
                {user.email}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="ml-3 px-4 py-1.5 rounded-full bg-[#ECE7DF] text-[#635D4B] font-semibold hover:bg-[#DFD9CB] transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-[#635D4B] font-bold text-base rounded-full hover:bg-[#DFD9CB] hover:text-[#111]"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
