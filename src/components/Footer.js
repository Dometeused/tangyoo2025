
export default function FooterComponent() {
  return (
    <footer className="w-full py-8 bg-gray-50 mt-12 border-t border-blue-100">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* LOGO + TEXT + Made with love */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-tangyoo.png"
            alt="TangYoo logo"
            className="h-10 w-auto opacity-90"
            style={{ maxWidth: 64 }}
            loading="lazy"
          />
          <span className="text-gray-700 font-semibold text-base">
            TangYoo © {new Date().getFullYear()}
          </span>
          <span className="ml-3 text-gray-400 text-sm hidden md:inline">
            | Made with{" "}
            <span className="text-pink-400 text-lg">♥</span> in Thailand 🇹🇭
          </span>
        </div>
        {/* MENU */}
        <nav className="flex gap-6 text-sm mt-4 md:mt-0">
          <a
            href="/features"
            className="text-gray-500 hover:text-black"
          >
            ฟีเจอร์
          </a>
          <a
            href="/catalog"
            className="text-gray-500 hover:text-black"
          >
            Catalog
          </a>
          <a
            href="/about"
            className="text-gray-500 hover:text-black"
          >
            About Us
          </a>
        </nav>
        {/* Made with love on mobile (ย้ายลงล่างเฉพาะ mobile) */}
        <span className="text-gray-400 text-sm md:hidden mt-2">
          Made with{" "}
          <span className="text-pink-400 text-lg">♥</span> in Thailand 🇹🇭
        </span>
      </div>
    </footer>
  );
}
