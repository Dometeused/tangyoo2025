
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FooterComponent() {
  const pathname = usePathname();
  if (pathname?.startsWith("/preview-event") || pathname?.startsWith("/demo/")) return null;
  return (
    <footer
      className="w-full pt-20 pb-10 font-kanit relative overflow-hidden transition-all duration-700"
      style={{
        backgroundColor: "var(--landing-dark, #0c0a09)",
        color: "#9ca3af",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top accent glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] blur-sm transition-all duration-700"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--landing-accent, #f97316), transparent)",
          opacity: 0.6,
        }}
      />

      {/* Background radial glow */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: "var(--landing-accent-glow, rgba(249,115,22,0.10))" }}
      />
      {/* Second glow left */}
      <div
        className="absolute bottom-0 -left-32 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: "var(--landing-accent-glow, rgba(249,115,22,0.06))" }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div
                  className="absolute inset-0 rounded-xl blur-lg transition-all duration-700"
                  style={{ backgroundColor: "var(--landing-accent-glow, rgba(249,115,22,0.20))" }}
                />
                <Image
                  src="/logo-tangyoo.png"
                  alt="TangYoo logo"
                  fill
                  className="object-contain brightness-110"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">TangYoo</span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-700"
                  style={{ color: "var(--landing-accent, #f97316)", opacity: 0.85 }}
                >
                  Memory Forever
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-light pr-4" style={{ color: "#9ca3af" }}>
              พื้นที่ดิจิทัลสำหรับเก็บรักษาความทรงจำอันล้ำค่าของคุณและคนที่คุณรัก
              ให้ &quot;ตั้งอยู่&quot; ตลอดไป ไม่ว่าเวลาจะผ่านไปนานแค่ไหน
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-base tracking-wide">ผลิตภัณฑ์</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/catalog"   className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>Catalog ของขวัญ</a></li>
              <li><a href="/creation"  className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>สร้าง Memory Page</a></li>
              <li><a href="/features"  className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>ฟีเจอร์ทั้งหมด</a></li>
              <li><a href="/pricing"   className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>ราคาแพ็คเกจ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-base tracking-wide">บริษัท</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/about"    className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>เกี่ยวกับเรา</a></li>
              <li><a href="/blog"     className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>บทความ</a></li>
              <li><a href="/careers"  className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>ร่วมงานกับเรา</a></li>
              <li><a href="/contact"  className="footer-link-hover transition-colors" style={{ color: "#9ca3af" }}>ติดต่อสอบถาม</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-base tracking-wide">ติดตามข่าวสาร</h4>
            <p className="text-xs mb-2" style={{ color: "#6b7280" }}>รับข่าวสารฟีเจอร์ใหม่และโปรโมชั่นพิเศษ</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="w-full rounded-lg px-4 py-2 text-sm text-white focus:outline-none transition-colors placeholder:text-gray-600"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--landing-accent, #f97316)")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
              />
              <button
                className="rounded-lg px-3 py-2 text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: "var(--landing-accent, #ea580c)" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#4b5563" }}
        >
          <p>© {new Date().getFullYear()} TangYoo. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="footer-link-hover" style={{ color: "#4b5563" }}>Privacy Policy</a>
            <a href="#" className="footer-link-hover" style={{ color: "#4b5563" }}>Terms of Service</a>
            <div
              className="flex items-center gap-2 pl-4"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span>Made with</span>
              <span className="text-red-500 animate-pulse text-base">♥</span>
              <span>in Thailand</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
