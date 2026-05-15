// BioBox2WeddingBio.jsx
// Premium editorial biography card — replaces the scrapbook SVG poster
"use client";

const ROSE  = "#6b2d4a";
const BLUSH = "#ddb0c0";
const MUTED = "#9e6b7d";
const TEXT  = "#3d2020";
const SOFT  = "#9e8585";
const BG    = "#fdf8f5";
const LINE  = "#f0dde6";

function PhotoSlot({ src, label, offset = false }) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-1"
      style={{ marginTop: offset ? "1.5rem" : 0 }}
    >
      <div
        className="w-full overflow-hidden"
        style={{
          aspectRatio: "3/4",
          borderRadius: "999px 999px 12px 12px",
          background: LINE,
        }}
      >
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ color: BLUSH, fontSize: "10px", letterSpacing: "0.1em" }}>
              {label}
            </span>
          </div>
        )}
      </div>
      <span
        className="text-[9px] tracking-[0.2em] uppercase font-medium"
        style={{ color: MUTED }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-2 px-5 my-3">
      <div className="flex-1 h-px" style={{ background: BLUSH }} />
      {label ? (
        <span
          className="text-[8px] tracking-[0.25em] uppercase shrink-0"
          style={{ color: BLUSH }}
        >
          {label}
        </span>
      ) : (
        <span style={{ color: BLUSH, fontSize: "7px", letterSpacing: "0.2em" }}>✦</span>
      )}
      <div className="flex-1 h-px" style={{ background: BLUSH }} />
    </div>
  );
}

export default function BioBox2WeddingBio({
  bridePic, groomPic,
  brideBio, groomBio,
  eventBio,
  funFact1, funFact2,
  className, style,
}) {
  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden ${className ?? ""}`}
      style={{ background: BG, fontFamily: "var(--font-kanit, sans-serif)", ...style }}
    >

      {/* ── Top: Photos ── */}
      <div className="flex gap-3 px-5 pt-5">
        <PhotoSlot src={bridePic} label="Bride" offset={false} />
        <PhotoSlot src={groomPic} label="Groom" offset={true} />
      </div>

      {/* ── Divider ── */}
      <Divider />

      {/* ── Bios side by side ── */}
      <div className="flex gap-0 px-5">
        {/* Bride bio */}
        <div className="flex-1 pr-3 flex flex-col gap-0.5">
          <p
            className="text-xs font-medium leading-snug"
            style={{ color: TEXT }}
          >
            {brideBio || "เจ้าสาว"}
          </p>
          {funFact1 && (
            <p className="text-[10px] font-light leading-relaxed mt-1" style={{ color: SOFT }}>
              {funFact1}
            </p>
          )}
        </div>

        {/* Vertical separator */}
        <div className="w-px self-stretch" style={{ background: LINE }} />

        {/* Groom bio */}
        <div className="flex-1 pl-3 flex flex-col gap-0.5">
          <p
            className="text-xs font-medium leading-snug"
            style={{ color: TEXT }}
          >
            {groomBio || "เจ้าบ่าว"}
          </p>
          {funFact2 && (
            <p className="text-[10px] font-light leading-relaxed mt-1" style={{ color: SOFT }}>
              {funFact2}
            </p>
          )}
        </div>
      </div>

      {/* ── Love story ── */}
      {eventBio && (
        <>
          <Divider label="About Us" />
          <p
            className="px-5 text-[10px] md:text-xs font-light leading-relaxed"
            style={{ color: SOFT }}
          >
            {eventBio}
          </p>
        </>
      )}

      {/* ── Footer ornament ── */}
      <div className="mt-auto px-5 pb-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px" style={{ background: LINE }} />
          <span style={{ color: LINE, fontSize: "8px", letterSpacing: "0.3em" }}>✦ ✦ ✦</span>
          <div className="flex-1 h-px" style={{ background: LINE }} />
        </div>
        <p
          className="text-[8px] tracking-[0.3em] uppercase"
          style={{ color: BLUSH }}
        >
          TangYoo · Memory Forever
        </p>
      </div>

    </div>
  );
}
