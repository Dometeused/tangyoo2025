"use client";
import { motion } from "framer-motion";

/* ── Wax seal SVG ── */
function WaxSeal({ color = "#c8a050", size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Outer ring */}
      <circle cx="22" cy="22" r="20" fill={color} opacity="0.15" />
      {/* Main seal */}
      <circle cx="22" cy="22" r="17" fill={color} />
      {/* Inner ring */}
      <circle cx="22" cy="22" r="13" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* ✦ center */}
      <text
        x="22" y="27"
        textAnchor="middle"
        fontSize="14"
        fill="rgba(255,255,255,0.90)"
        fontFamily="Georgia, serif"
      >
        ✦
      </text>
    </svg>
  );
}

/* ── Decorative line ── */
function DashedLine({ color = "rgba(180,140,60,0.25)" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, margin: "12px 0",
    }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <span style={{ color, fontSize: 10, letterSpacing: "0.3em" }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

export default function BirthdayLetter({ eventName, bio, senderName }) {
  if (!bio) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Envelope back peek */}
      <div style={{
        position: "absolute",
        top: -10, left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 8px)",
        height: 30,
        background: "linear-gradient(180deg, #c8a050 0%, #a87e30 100%)",
        borderRadius: "8px 8px 0 0",
        opacity: 0.4,
        zIndex: 0,
      }} />

      {/* Main letter card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(160deg, #fdf8ee 0%, #faf4e4 50%, #fdf8ee 100%)",
          borderRadius: 16,
          padding: "32px 28px 36px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 0 rgba(212,168,32,0.3), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(200,160,60,0.2)",
        }}
      >
        {/* Paper grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23fdf8ee'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(180,140,60,0.06)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(180,140,60,0.04)'/%3E%3C/svg%3E")`,
          pointerEvents: "none", opacity: 0.8,
        }} />

        {/* Top decoration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <WaxSeal color="#c8a050" size={40} />
        </div>

        <DashedLine />

        {/* "ถึง" header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{
            fontFamily: "var(--font-kanit, sans-serif)",
            fontSize: 11,
            letterSpacing: "0.35em",
            color: "#a08040",
            marginBottom: 4,
          }}>
            ✦ จดหมายถึง ✦
          </p>
          <h3 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
            fontWeight: 700,
            color: "#7a5820",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}>
            {eventName || "คุณ"}
          </h3>
        </div>

        <DashedLine />

        {/* Letter content — render HTML from TipTap */}
        <div
          dangerouslySetInnerHTML={{ __html: bio }}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
            color: "#5a3e18",
            lineHeight: 2.0,
            textAlign: "left",
            padding: "8px 4px",
            letterSpacing: "0.01em",
          }}
        />

        <DashedLine />

        {/* Sender */}
        <div style={{ textAlign: "right", marginTop: 4 }}>
          <p style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#9a7030",
            letterSpacing: "0.06em",
          }}>
            ด้วยรัก 💛
          </p>
          {senderName && (
            <p style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 12,
              color: "#c8a050",
              marginTop: 2,
            }}>
              — {senderName}
            </p>
          )}
        </div>

        {/* Bottom wax seal */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <WaxSeal color="#b87830" size={48} />
        </div>

        {/* Corner fold */}
        <div style={{
          position: "absolute",
          bottom: 0, right: 0,
          width: 32, height: 32,
          background: "linear-gradient(225deg, rgba(200,160,60,0.15) 0%, transparent 60%)",
          borderRadius: "0 0 16px 0",
          pointerEvents: "none",
        }} />
      </div>
    </motion.div>
  );
}
