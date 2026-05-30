"use client";
import { differenceInDays, differenceInYears } from "date-fns";

const GOLD      = "#d4a820";
const GOLD_LITE = "#e8cc70";
const GOLD_DIM  = "#a08840";
const BG        = "rgba(18,10,0,0.55)";

/* Tiny sparkling star SVG */
function Star({ size = 10, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={GOLD_LITE} style={style}>
      <polygon points="10,1 12.5,7.5 19,8 14,13 15.5,19 10,15.5 4.5,19 6,13 1,8 7.5,7.5" />
    </svg>
  );
}

export default function AnniversaryCounter({ coupleSince }) {
  if (!coupleSince) return null;

  const since = new Date(coupleSince);
  const today = new Date();
  const days  = differenceInDays(today, since);
  const years = differenceInYears(today, since);

  if (days <= 0) return null;

  return (
    <div
      className="w-full rounded-3xl overflow-hidden"
      style={{
        background: BG,
        backdropFilter: "blur(12px)",
        border: `1px solid rgba(212,168,32,0.25)`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,168,32,0.15)",
      }}
    >
      {/* Top ornament */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 28px 0" }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_LITE}60)` }} />
        <Star size={8} />
        <Star size={11} style={{ margin: "0 2px" }} />
        <Star size={8} />
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_LITE}60)` }} />
      </div>

      {/* Main counter */}
      <div style={{ padding: "16px 28px 8px", textAlign: "center" }}>
        {/* Heart */}
        <div style={{
          fontSize: "28px",
          background: `linear-gradient(160deg, ${GOLD_LITE} 0%, ${GOLD} 60%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: 12,
          filter: "drop-shadow(0 2px 6px rgba(180,120,0,0.4))",
        }}>
          ♡
        </div>

        {/* Days number */}
        <div style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "clamp(2.8rem, 10vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          background: `linear-gradient(180deg, ${GOLD_LITE} 0%, ${GOLD} 40%, #b8800a 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 3px 12px rgba(180,120,0,0.35))",
        }}>
          {days.toLocaleString("th-TH")}
        </div>

        {/* Days label */}
        <div style={{
          fontFamily: "var(--font-kanit, sans-serif)",
          fontSize: "13px",
          fontWeight: 500,
          color: GOLD_LITE,
          letterSpacing: "0.08em",
          marginTop: 6,
        }}>
          วันแห่งความทรงจำ
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontStyle: "italic",
          fontSize: "11px",
          color: GOLD_DIM,
          letterSpacing: "0.06em",
          marginTop: 4,
        }}>
          และยังคงดำเนินต่อไป...
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 28px 0" }}>
        <div style={{ flex: 1, height: 1, background: `rgba(212,168,32,0.2)` }} />
        <span style={{ color: GOLD_DIM, fontSize: "9px", letterSpacing: "0.3em" }}>✦</span>
        <div style={{ flex: 1, height: 1, background: `rgba(212,168,32,0.2)` }} />
      </div>

      {/* Milestones row */}
      <div style={{
        display: "flex",
        padding: "12px 20px 20px",
        gap: 0,
      }}>
        {/* Years */}
        <div style={{
          flex: 1,
          textAlign: "center",
          borderRight: `1px solid rgba(212,168,32,0.18)`,
          paddingRight: 16,
        }}>
          <div style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "1.8rem",
            fontWeight: 700,
            background: `linear-gradient(180deg, ${GOLD_LITE} 0%, ${GOLD} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}>
            {years}
          </div>
          <div style={{ fontSize: "10px", color: GOLD_DIM, marginTop: 4, letterSpacing: "0.06em" }}>
            ปีครบรอบ
          </div>
        </div>

        {/* Lives */}
        <div style={{ flex: 1, textAlign: "center", paddingLeft: 16 }}>
          <div style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "1.8rem",
            fontWeight: 700,
            background: `linear-gradient(180deg, ${GOLD_LITE} 0%, ${GOLD} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}>
            1
          </div>
          <div style={{ fontSize: "10px", color: GOLD_DIM, marginTop: 4, letterSpacing: "0.06em" }}>
            ชีวิต
          </div>
        </div>
      </div>

      {/* Bottom ornament */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px 16px" }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_LITE}60)` }} />
        <Star size={8} />
        <Star size={11} style={{ margin: "0 2px" }} />
        <Star size={8} />
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD_LITE}60)` }} />
      </div>
    </div>
  );
}
