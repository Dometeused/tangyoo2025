import { THEMES } from "@/data/themes";
import Image from "next/image";

export default function ThemeSelectionSection({ onNext }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-kanit">
        เลือกประเภทงานที่ต้องการสร้าง
      </h1>
      <p className="text-gray-600 mb-10 text-lg">
        เลือกรูปแบบของงานเพื่อเริ่มสร้าง Memory Page ของคุณ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEMES.map((theme) => (
          <div
            key={theme.key}
            onClick={() => onNext(theme.key)}
            className={`
              cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2
              hover:-translate-y-2 hover:shadow-xl group
              ${theme.key === "funeral"
                ? "bg-zinc-50 border-zinc-200 hover:border-zinc-500"
                : theme.key === "anniversary"
                  ? "bg-blue-50 border-blue-200 hover:border-blue-500"
                  : "bg-pink-50 border-pink-200 hover:border-pink-500"
              }
            `}
          >
            <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src={theme.image}
                alt={theme.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className={`text-xl font-bold mb-2 ${theme.text.replace("text-white", "text-zinc-900")}`}>
              {theme.label}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {theme.desc}
            </p>

            {/* Feature chips */}
            {theme.features && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {theme.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "rgba(0,0,0,0.06)", color: "#555" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}

            <div className={`py-2 px-4 rounded-full text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 ${theme.ctaClass}`}>
              เลือกธีมนี้
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
