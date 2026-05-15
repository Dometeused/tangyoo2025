// BioBox2FuneralBio.jsx
// Premium editorial memorial biography — replaces the flat SVG poster
"use client";

// ── Funeral palette ──────────────────────────────────────────────
const PARCHMENT = "#faf6f2"; // warm paper background
const BRONZE    = "#c9a882"; // accent lines & ornaments
const DARKBROWN = "#3d2010"; // primary text
const MIDBROWN  = "#7a5030"; // secondary text
const SOFTBROWN = "#b08060"; // muted / caption
const LINE      = "#e8d8c8"; // thin separator
const PHOTOBG   = "#d4c8bc"; // photo placeholder
// ─────────────────────────────────────────────────────────────────

function OrnamentalRule({ label, compact = false }) {
  return (
    <div className={`flex items-center gap-2 px-5 ${compact ? "my-2" : "my-3"}`}>
      <div className="flex-1 h-px" style={{ background: LINE }} />
      {label ? (
        <span
          className="text-[7px] tracking-[0.3em] uppercase shrink-0 font-light"
          style={{ color: BRONZE }}
        >
          {label}
        </span>
      ) : (
        <span style={{ color: BRONZE, fontSize: "7px", letterSpacing: "0.3em" }}>✦</span>
      )}
      <div className="flex-1 h-px" style={{ background: LINE }} />
    </div>
  );
}

export default function BioBox2FuneralBio({
  profile,        // URL รูปภาพผู้วายชนม์
  poster_name,    // ชื่อ
  living,         // ช่วงปีเกิด–ตาย เช่น "พ.ศ. 2480 – 2567"
  word,           // วรรคทองหรือคำจารึก (quote)
  poster_caption, // คำอธิบาย/ข้อมูลเพิ่มเติม
  className,
  style,
}) {
  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden ${className ?? ""}`}
      style={{
        background: PARCHMENT,
        fontFamily: "var(--font-kanit, sans-serif)",
        border: `1px solid ${LINE}`,
        boxShadow: "0 2px 30px rgba(180,100,10,0.08), 0 0 0 1px rgba(200,160,100,0.15)",
        ...style,
      }}
    >

      {/* ── Portrait Photo ── */}
      <div
        className="w-full relative shrink-0"
        style={{ aspectRatio: "4/3", background: PHOTOBG }}
      >
        {profile ? (
          <img
            src={profile}
            alt={poster_name || "ผู้วายชนม์"}
            className="w-full h-full object-cover object-top"
            style={{
              /* Sepia + slight desaturation: looks like an old memorial photograph */
              filter: "grayscale(0.25) sepia(0.3) contrast(1.05)",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-1">
            <span style={{ color: BRONZE, fontSize: "18px", opacity: 0.4 }}>🕯️</span>
            <span style={{ color: BRONZE, fontSize: "10px", letterSpacing: "0.15em", opacity: 0.5 }}>
              รูปภาพ
            </span>
          </div>
        )}
        {/* Warm gradient fade at bottom of photo */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${PARCHMENT})` }}
        />
        {/* Subtle dark vignette on all edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 40px rgba(20,10,5,0.35)",
          }}
        />
      </div>

      {/* ── Name & Years ── */}
      <div className="flex flex-col items-center px-5 pt-1 pb-1 gap-0.5">
        <h2
          className="text-center font-medium leading-snug tracking-wide"
          style={{ color: DARKBROWN, fontSize: "clamp(14px, 3.5vw, 20px)" }}
        >
          {poster_name || "ชื่อผู้วายชนม์"}
        </h2>
        {living && (
          <p
            className="text-center font-light tracking-[0.15em]"
            style={{ color: SOFTBROWN, fontSize: "clamp(9px, 2vw, 12px)" }}
          >
            {living}
          </p>
        )}
      </div>

      <OrnamentalRule />

      {/* ── Quote / Inscription ── */}
      {word && (
        <div className="px-6 flex flex-col items-center gap-0.5 mb-1">
          <span style={{ color: BRONZE, fontSize: "9px" }}>"</span>
          <p
            className="text-center italic font-light leading-relaxed"
            style={{
              color: MIDBROWN,
              fontSize: "clamp(9px, 2.2vw, 12px)",
              letterSpacing: "0.03em",
            }}
          >
            {word}
          </p>
          <span style={{ color: BRONZE, fontSize: "9px" }}>"</span>
        </div>
      )}

      {/* ── Caption / Description ── */}
      {poster_caption && (
        <>
          <OrnamentalRule label="ประวัติ" compact />
          <p
            className="px-5 text-center font-light leading-relaxed"
            style={{
              color: SOFTBROWN,
              fontSize: "clamp(8px, 1.9vw, 11px)",
              letterSpacing: "0.02em",
            }}
          >
            {poster_caption}
          </p>
        </>
      )}

      {/* ── Footer ornament ── */}
      <div className="mt-auto px-5 pb-4 pt-2 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px" style={{ background: LINE }} />
          <span style={{ color: BRONZE, fontSize: "9px", letterSpacing: "0.35em" }}>🕯️</span>
          <div className="flex-1 h-px" style={{ background: LINE }} />
        </div>
        <p
          className="text-[7px] tracking-[0.3em] uppercase font-light"
          style={{ color: BRONZE, opacity: 0.65 }}
        >
          TangYoo · Memory Forever
        </p>
      </div>

    </div>
  );
}
