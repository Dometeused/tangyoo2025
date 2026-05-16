"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { LayoutDashboard, Users, CalendarDays, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState("");
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Allow admin/login to render without check
    if (pathname === "/admin/login") { setChecking(false); return; }

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) { router.replace("/admin/login"); return; }

      setAdminEmail(user.email);
      setChecking(false);
    };
    check();
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Login page — no sidebar
  if (pathname === "/admin/login") return <>{children}</>;
  if (checking) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-gray-400">กำลังตรวจสอบสิทธิ์...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <img src="/logo-tangyoo.png" alt="TangYoo" className="w-8 h-8 object-contain" />
          <div>
            <div className="text-white font-bold text-sm">TangYoo</div>
            <div className="text-orange-500 text-xs">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Admin info + logout */}
        <div className="px-3 py-4 border-t border-gray-800">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-xs text-gray-300 truncate">{adminEmail}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-white font-semibold text-sm">
            {navItems.find(n => n.href === pathname)?.label || "Admin"}
          </h1>
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
