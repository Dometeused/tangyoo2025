// BioBox2AnniversaryBio.jsx
// Premium anniversary poster — milestone year as hero, warm gold palette
"use client";

const BG        = "#fdf8ee";
const GOLD      = "#b8800a";
const GOLD_MID  = "#d4a820";
const GOLD_LITE = "#e8cc70";
const LINE      = "#eddfa8";
const DARK      = "#3a2400";
const MUTED     = "#7a5c20";
const SOFT      = "#a08840";

/* ── Gold ornamental line ───────────────────────────── */
function GoldLine({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 20px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${LINE} 80%)` }} />
      {label
        ? <span style={{ color: GOLD_MID, fontSize: "8px", letterSpacing: "0.3em", whiteSpace: "nowrap", fontWeight: 500 }}>
            {label}
          </span>
        : <span style={{ color: GOLD_LITE, fontSize: "8px" }}>✦</span>
      }
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${LINE} 80%)` }} />
    </div>
  );
}

/* ── Round couple photo slot ───────────────────────── */
function RoundPhoto({ src, size = 80 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      border: `2px solid ${GOLD_LITE}`,
      boxShadow: `0 0 0 3px rgba(212,168,32,0.12), 0 4px 16px rgba(180,120,0,0.18)`,
      background: LINE,
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {src
        ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: GOLD_LITE, fontSize: "18px" }}>✦</span>
          </div>
      }
    </div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function BioBox2AnniversaryBio({
  bridePic, groomPic,
  brideBio, groomBio,
  eventBio,
  funFact1, funFact2,
  className, style,
}) {
  // Extract year number from brideBio e.g. "25" or "25 ปี\nแห่งรัก" → "25"
  const yearNum = (brideBio || "").match(/\d+/)?.[0] || "✦";
  // Rest of brideBio after the number (the label, e.g. "ปีแห่งความรัก")
  const yearLabel = (brideBio || "")
    .replace(/\d+/, "")
    .replace(/\n/g, " ")
    .trim() || "ปีแห่งความรัก";

  return (
    <div
      className={`w-full flex flex-col overflow-hidden ${className ?? ""}`}
      style={{ background: BG, fontFamily: "var(--font-kanit, sans-serif)", position: "relative", justifyContent: "space-between", ...style }}
    >

      {/* ── Subtle gold corner ornament ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "30%",
        background: "linear-gradient(180deg, rgba(232,204,112,0.12) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ═══ TOP GROUP ═══ */}
      <div>
        {/* ── Top ornamental header ── */}
        <div style={{ padding: "14px 20px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 1, background: LINE }} />
            <span style={{ color: GOLD_LITE, fontSize: "8px", letterSpacing: "0.35em" }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: 1, background: LINE }} />
          </div>
        </div>

        {/* ── Hero: Photos + Year number ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "4px 24px 8px" }}>
          <RoundPhoto src={bridePic} />

          {/* Center milestone */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{
              fontSize: "clamp(3.2rem,14vw,4.5rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background: `linear-gradient(180deg, ${GOLD_LITE} 0%, ${GOLD_MID} 45%, ${GOLD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 6px rgba(180,120,0,0.3))",
            }}>
              {yearNum}
            </div>
            <div style={{
              fontSize: "9px",
              color: MUTED,
              letterSpacing: "0.18em",
              textAlign: "center",
              marginTop: 2,
            }}>
              {yearLabel}
            </div>
          </div>

          <RoundPhoto src={groomPic} />
        </div>

        {/* ── "Since" label from groomBio ── */}
        <div style={{ margin: "4px 0 10px" }}>
          <GoldLine label={groomBio || "SINCE · 2000"} />
        </div>

        {/* ── Love story quote ── */}
        {eventBio && (
          <div style={{ padding: "0 22px 8px" }}>
            <p style={{
              fontSize: "10px",
              color: SOFT,
              lineHeight: 1.85,
              textAlign: "center",
              fontStyle: "italic",
              whiteSpace: "pre-line",
            }}>
              &ldquo;{eventBio}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* ═══ MIDDLE ORNAMENT ═══ */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "0 28px" }}>
        {/* Decorative lines */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_MID})` }} />
          <span style={{ color: GOLD_MID, fontSize: "8px", letterSpacing: "0.2em" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_MID})` }} />
        </div>
        {/* Big heart */}
        <span style={{
          fontSize: "38px",
          lineHeight: 1,
          background: `linear-gradient(160deg, ${GOLD_LITE} 0%, ${GOLD_MID} 60%, ${GOLD} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 1px 4px rgba(180,120,0,0.25))",
        }}>♡</span>
        {/* Tagline */}
        <p style={{ fontSize: "7.5px", color: MUTED, letterSpacing: "0.32em", textAlign: "center" }}>
          LOVE · TIME · FOREVER
        </p>
        {/* Bottom lines */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_MID})` }} />
          <span style={{ color: GOLD_MID, fontSize: "8px", letterSpacing: "0.2em" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_MID})` }} />
        </div>
      </div>

      {/* ═══ BOTTOM GROUP ═══ */}
      <div>
        {/* ── Fun facts row ── */}
        {(funFact1 || funFact2) && (
          <>
            <div style={{ margin: "0 0 8px" }}>
              <GoldLine />
            </div>
            <div style={{ display: "flex", gap: 0, padding: "0 20px 8px" }}>
              {funFact1 && (
                <div style={{ flex: 1, paddingRight: 10, borderRight: `1px solid ${LINE}` }}>
                  <p style={{ fontSize: "9px", color: MUTED, lineHeight: 1.7, textAlign: "center" }}>{funFact1}</p>
                </div>
              )}
              {funFact2 && (
                <div style={{ flex: 1, paddingLeft: 10 }}>
                  <p style={{ fontSize: "9px", color: MUTED, lineHeight: 1.7, textAlign: "center" }}>{funFact2}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Footer ── */}
        <div style={{ padding: "6px 20px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
          <GoldLine />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "7px", color: SOFT, letterSpacing: "0.12em" }}>✦ TANGYOO</span>
            <span style={{ fontSize: "7px", color: SOFT, letterSpacing: "0.12em" }}>MEMORY FOREVER ✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
