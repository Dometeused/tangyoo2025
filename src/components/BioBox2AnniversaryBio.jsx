// BioBox2AnniversaryBio.jsx
// Premium anniversary poster — milestone year as hero, warm gold palette
"use client";

const BG        = "#fdf8ee";
const GOLD      = "#b8800a";
const GOLD_MID  = "#d4a820";
const GOLD_LITE = "#e8cc70";
const LINE      = "#eddfa8";
const MUTED     = "#7a5c20";
const SOFT      = "#a08840";

/* ── Gold ornamental line ───────────────────────────── */
function GoldLine({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 24px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${LINE} 80%)` }} />
      {label
        ? <span style={{ color: GOLD_MID, fontSize: "9px", letterSpacing: "0.32em", whiteSpace: "nowrap", fontWeight: 600 }}>
            {label}
          </span>
        : <span style={{ color: GOLD_LITE, fontSize: "10px" }}>✦</span>
      }
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${LINE} 80%)` }} />
    </div>
  );
}

/* ── Round couple photo slot ───────────────────────── */
function RoundPhoto({ src, size = 140 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      /* double ring: white gap + gold outer */
      boxShadow: `
        0 0 0 3px ${BG},
        0 0 0 6px ${GOLD_LITE},
        0 0 0 9px ${BG},
        0 8px 24px rgba(180,120,0,0.25)
      `,
      background: LINE,
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {src
        ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: GOLD_LITE, fontSize: "22px" }}>✦</span>
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
  const yearNum   = (brideBio || "").match(/\d+/)?.[0] || "✦";
  const yearLabel = (brideBio || "")
    .replace(/\d+/, "").replace(/\n/g, " ").trim() || "ปีแห่งความรัก";

  return (
    <div
      className={`w-full flex flex-col overflow-hidden ${className ?? ""}`}
      style={{
        background: BG,
        fontFamily: "var(--font-kanit, sans-serif)",
        position: "relative",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "35%",
        background: "linear-gradient(180deg, rgba(232,204,112,0.14) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ═══ TOP GROUP ═══ */}
      <div>
        {/* Header ornament */}
        <div style={{ padding: "16px 24px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: LINE }} />
            <span style={{ color: GOLD_LITE, fontSize: "9px", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: 1, background: LINE }} />
          </div>
        </div>

        {/* Hero: Photos + Year */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, padding: "0 16px 14px",
        }}>
          <RoundPhoto src={bridePic} />

          {/* Center milestone */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 0 }}>
            {/* Year number — Playfair Display */}
            <div style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontSize: "clamp(3rem,12vw,4.2rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background: `linear-gradient(180deg, ${GOLD_LITE} 0%, ${GOLD_MID} 40%, ${GOLD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(180,120,0,0.28))",
            }}>
              {yearNum}
            </div>
            {/* Year label */}
            <div style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "10px",
              color: MUTED,
              letterSpacing: "0.10em",
              textAlign: "center",
              marginTop: 3,
            }}>
              {yearLabel}
            </div>
          </div>

          <RoundPhoto src={groomPic} />
        </div>

        {/* SINCE label */}
        <div style={{ margin: "0 0 12px" }}>
          <GoldLine label={groomBio || "SINCE · 2000"} />
        </div>

        {/* Quote */}
        {eventBio && (
          <div style={{ padding: "0 26px 10px" }}>
            <div
              dangerouslySetInnerHTML={{ __html: eventBio }}
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontStyle: "italic",
                fontSize: "11px",
                color: SOFT,
                lineHeight: 2,
                textAlign: "center",
              }}
            />
          </div>
        )}
      </div>

      {/* ═══ MIDDLE ORNAMENT ═══ */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_MID})` }} />
          <span style={{ color: GOLD_MID, fontSize: "9px" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_MID})` }} />
        </div>

        {/* Heart */}
        <span style={{
          fontSize: "44px",
          lineHeight: 1,
          background: `linear-gradient(160deg, ${GOLD_LITE} 0%, ${GOLD_MID} 60%, ${GOLD} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 2px 6px rgba(180,120,0,0.28))",
        }}>♡</span>

        <p style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "8px",
          color: MUTED,
          letterSpacing: "0.38em",
          textAlign: "center",
        }}>
          LOVE · TIME · FOREVER
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_MID})` }} />
          <span style={{ color: GOLD_MID, fontSize: "9px" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_MID})` }} />
        </div>
      </div>

      {/* ═══ BOTTOM GROUP ═══ */}
      <div>
        {/* Fun facts */}
        {(funFact1 || funFact2) && (
          <>
            <div style={{ margin: "0 0 10px" }}>
              <GoldLine />
            </div>
            <div style={{ display: "flex", gap: 0, padding: "0 22px 10px" }}>
              {funFact1 && (
                <div style={{ flex: 1, paddingRight: 12, borderRight: `1px solid ${LINE}` }}>
                  <p style={{ fontSize: "10px", color: MUTED, lineHeight: 1.8, textAlign: "center" }}>{funFact1}</p>
                </div>
              )}
              {funFact2 && (
                <div style={{ flex: 1, paddingLeft: 12 }}>
                  <p style={{ fontSize: "10px", color: MUTED, lineHeight: 1.8, textAlign: "center" }}>{funFact2}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ padding: "6px 24px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          <GoldLine />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "7.5px", color: SOFT, letterSpacing: "0.14em" }}>✦ TANGYOO</span>
            <span style={{ fontSize: "7.5px", color: SOFT, letterSpacing: "0.14em" }}>MEMORY FOREVER ✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
