// BioBox2WeddingBio.jsx
// Premium editorial biography card — wedding / baby theme
"use client";

const ROSE      = "#6b2d4a";
const BLUSH     = "#ddb0c0";
const BLUSH_MID = "#c9899e";
const MUTED     = "#9e6b7d";
const TEXT      = "#3d2020";
const SOFT      = "#9e8585";
const BG        = "#fdf8f5";
const LINE      = "#f0dde6";
const ROSE_LITE = "#f0c4d4";

/* ── Portrait photo slot ─────────────────────────────── */
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

/* ── Rose ornamental line ────────────────────────────── */
function RoseLine({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 20px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${LINE} 80%)` }} />
      {label
        ? <span style={{ color: BLUSH, fontSize: "8px", letterSpacing: "0.3em", whiteSpace: "nowrap", fontWeight: 500 }}>
            {label}
          </span>
        : <span style={{ color: BLUSH, fontSize: "8px" }}>✦</span>
      }
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${LINE} 80%)` }} />
    </div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function BioBox2WeddingBio({
  bridePic, groomPic,
  brideBio, groomBio,
  eventBio,
  funFact1, funFact2,
  className, style,
}) {
  const hasBrideBio = !!brideBio;
  const hasGroomBio = !!groomBio;
  const hasEventBio = !!eventBio;

  return (
    <div
      className={`w-full flex flex-col overflow-hidden ${className ?? ""}`}
      style={{
        background: BG,
        fontFamily: "var(--font-kanit, sans-serif)",
        justifyContent: "space-between",
        position: "relative",
        ...style,
      }}
    >

      {/* ═══ TOP GROUP ═══ */}
      <div>
        {/* Header ornament */}
        <div style={{ padding: "12px 20px 8px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: LINE }} />
          <span style={{ color: BLUSH, fontSize: "8px", letterSpacing: "0.35em" }}>✦ ✦ ✦</span>
          <div style={{ flex: 1, height: 1, background: LINE }} />
        </div>

        {/* Photos */}
        <div className="flex gap-3 px-5 pt-1">
          <PhotoSlot src={bridePic} label="Bride" offset={false} />
          <PhotoSlot src={groomPic} label="Groom" offset={true} />
        </div>

        {/* Divider */}
        <div style={{ margin: "10px 0 8px" }}>
          <RoseLine />
        </div>

        {/* Bios side by side */}
        <div style={{ display: "flex", gap: 0, padding: "0 20px 8px" }}>
          {/* Bride bio */}
          <div style={{ flex: 1, paddingRight: 10, borderRight: `1px solid ${LINE}` }}>
            <p style={{
              fontSize: "10px",
              fontWeight: 500,
              color: hasBrideBio ? TEXT : BLUSH,
              fontStyle: hasBrideBio ? "normal" : "italic",
              lineHeight: 1.6,
              textAlign: "center",
            }}>
              {brideBio || "ชื่อเจ้าสาว"}
            </p>
            {funFact1 && (
              <p style={{ fontSize: "9px", color: SOFT, lineHeight: 1.6, marginTop: 4, textAlign: "center" }}>
                {funFact1}
              </p>
            )}
          </div>

          {/* Groom bio */}
          <div style={{ flex: 1, paddingLeft: 10 }}>
            <p style={{
              fontSize: "10px",
              fontWeight: 500,
              color: hasGroomBio ? TEXT : BLUSH,
              fontStyle: hasGroomBio ? "normal" : "italic",
              lineHeight: 1.6,
              textAlign: "center",
            }}>
              {groomBio || "ชื่อเจ้าบ่าว"}
            </p>
            {funFact2 && (
              <p style={{ fontSize: "9px", color: SOFT, lineHeight: 1.6, marginTop: 4, textAlign: "center" }}>
                {funFact2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ═══ MIDDLE ORNAMENT ═══ */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 28px" }}>
        {/* Top lines */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${BLUSH_MID})` }} />
          <span style={{ color: BLUSH_MID, fontSize: "8px", letterSpacing: "0.2em" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${BLUSH_MID})` }} />
        </div>

        {/* Rose heart */}
        <span style={{
          fontSize: "38px",
          lineHeight: 1,
          background: `linear-gradient(160deg, ${ROSE_LITE} 0%, ${BLUSH} 50%, ${ROSE} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 1px 4px rgba(107,45,74,0.20))",
        }}>♡</span>

        <p style={{ fontSize: "7.5px", color: MUTED, letterSpacing: "0.32em", textAlign: "center" }}>
          FOREVER &amp; ALWAYS
        </p>

        {/* Bottom lines */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${BLUSH_MID})` }} />
          <span style={{ color: BLUSH_MID, fontSize: "8px", letterSpacing: "0.2em" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${BLUSH_MID})` }} />
        </div>
      </div>

      {/* ═══ BOTTOM GROUP ═══ */}
      <div>
        {/* Love story / eventBio — always shown */}
        <div style={{ padding: "0 22px 10px" }}>
          {hasEventBio ? (
            <div
              dangerouslySetInnerHTML={{ __html: eventBio }}
              style={{
                fontSize: "9.5px", color: SOFT,
                lineHeight: 1.85, textAlign: "center",
              }}
            />
          ) : (
            <p style={{ fontSize: "9.5px", color: BLUSH, fontStyle: "italic", lineHeight: 1.85, textAlign: "center" }}>
              "เรื่องราวความรักของเรา..."
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "4px 20px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
          <RoseLine />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "7px", color: BLUSH, letterSpacing: "0.12em" }}>✦ TANGYOO</span>
            <span style={{ fontSize: "7px", color: BLUSH, letterSpacing: "0.12em" }}>MEMORY FOREVER ✦</span>
          </div>
        </div>
      </div>

    </div>
  );
}
