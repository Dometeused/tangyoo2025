"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, User } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

const nav = [
  { name: "หน้าแรก", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "สร้างของขวัญ", href: "/creation" },
  { name: "ฟีเจอร์", href: "/features" },
  { name: "About Us", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on preview-only pages (used as iframes)
  if (pathname?.startsWith("/preview-event") || pathname?.startsWith("/demo/")) return null;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (event === "SIGNED_OUT") router.replace("/login");
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      listener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Watch body[data-landing-theme] — set by page.js when theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.body.getAttribute("data-landing-theme") === "funeral");
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-landing-theme"],
    });
    checkTheme(); // read immediately in case already set
    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 font-kanit
      ${scrolled
          ? isDarkTheme
              ? "py-2 bg-stone-900/85 backdrop-blur-xl border-b border-white/10 shadow-sm"
              : "py-2 bg-white/85 backdrop-blur-xl border-b border-white/50 shadow-sm"
          : "py-4 bg-transparent border-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-50" title="กลับหน้าแรก">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <img
              src="/logo-tangyoo.png"
              alt="TangYoo logo"
              className="relative w-full h-full object-contain drop-shadow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            />
          </div>
          <div className={`flex flex-col transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}>
            <span
              className="text-2xl font-bold tracking-tight font-kanit"
              style={{ color: scrolled && isDarkTheme ? "#f5f5f4" : undefined }}
            >
              {!(scrolled && isDarkTheme) ? (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">TangYoo</span>
              ) : "TangYoo"}
            </span>
            <span
              className="text-[9px] font-medium tracking-[0.2em] uppercase -mt-0.5 transition-all duration-500"
              style={{ color: "var(--landing-accent, #f97316)", opacity: 0.75 }}
            >
              Memory Forever
            </span>
          </div>
        </Link>

        {/* Desktop Floating Nav Pill */}
        <nav
          className="hidden md:flex items-center p-1.5 rounded-full backdrop-blur-md border shadow-lg absolute left-1/2 -translate-x-1/2"
          style={{
            background: isDarkTheme ? "rgba(28,25,23,0.75)" : "rgba(255,255,255,0.70)",
            borderColor: isDarkTheme ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.60)",
            boxShadow: isDarkTheme ? "0 4px 24px rgba(0,0,0,0.40)" : "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          {nav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                href={item.href}
                key={item.name}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group"
                style={isActive
                  ? { color: "var(--landing-accent, #ea580c)", background: isDarkTheme ? "rgba(255,255,255,0.08)" : "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }
                  : { color: isDarkTheme ? "#a8a29e" : "#4b5563" }
                }
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--landing-accent, #f97316)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = isDarkTheme ? "#a8a29e" : "#4b5563"; }}
              >
                {item.name}
                {!isActive && (
                  <span
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300"
                    style={{ backgroundColor: "var(--landing-accent, #f97316)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4 relative z-50">
          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white/50 border border-gray-200 hover:bg-white hover:border-gray-300 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-orange-600 border border-white">
                  <User size={16} />
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 origin-top-right">
                <div className="px-3 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                </div>
                <Link href="/dashboard" className="flex items-center px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="group relative px-6 py-2.5 rounded-full overflow-hidden text-white shadow-lg active:scale-95 transition-all"
              style={{ background: isDarkTheme ? "rgba(255,255,255,0.10)" : "#111827", boxShadow: "0 4px 16px rgba(0,0,0,0.20)" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
                เข้าสู่ระบบ <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, var(--landing-accent, #f97316), var(--landing-grad-to, #d97706))` }}
              />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 border border-gray-200/50 text-gray-700 active:scale-90 transition-all"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden flex flex-col justify-center items-center gap-8 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          {nav.map((item, idx) => (
            <Link
              href={item.href}
              key={item.name}
              className="text-2xl font-bold text-gray-800 hover:text-orange-500 transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-12 h-1 bg-gray-100 rounded-full my-4"></div>
          {user ? (
            <button onClick={handleLogout} className="text-red-500 font-medium text-lg">Sign Out</button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-8 py-3 rounded-full text-white font-bold shadow-lg text-lg transition-all"
              style={{ background: `linear-gradient(to right, var(--landing-accent, #f97316), var(--landing-grad-to, #d97706))` }}
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
