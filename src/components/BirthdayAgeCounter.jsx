"use client";
import { differenceInDays, differenceInYears, differenceInMonths } from "date-fns";
import { motion } from "framer-motion";

function Star({ size = 8, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#e8cc70" style={style}>
      <polygon points="10,1 12.5,7.5 19,8 14,13 15.5,19 10,15.5 4.5,19 6,13 1,8 7.5,7.5" />
    </svg>
  );
}

export default function BirthdayAgeCounter({ birthday, eventName }) {
  if (!birthday) return null;

  const since = new Date(birthday);
  const today = new Date();
  const years  = differenceInYears(today, since);
  const months = differenceInMonths(today, since) % 12;
  const days   = differenceInDays(today, since) - differenceInDays(
    new Date(today.getFullYear(), today.getMonth(), 1),
    new Date(since.getFullYear() + years, since.getMonth() + months % 12, 1)
  );

  if (years <= 0) return null;

  // Calculate remaining days in current month more simply
  const birthdayThisYear = new Date(today.getFullYear(), since.getMonth(), since.getDate());
  const lastAnniversary = years > 0
    ? new Date(today.getFullYear() - (today < birthdayThisYear ? 1 : 0), since.getMonth(), since.getDate())
    : since;
  const daysIntoYear = differenceInDays(today, lastAnniversary);
  const monthsIntoYear = Math.floor(daysIntoYear / 30.44);
  const remainingDays = Math.floor(daysIntoYear - monthsIntoYear * 30.44);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(10,6,0,0.65)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(212,168,32,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,32,0.12)",
      }}
    >
      {/* Top stars */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "18px 24px 0" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(232,204,112,0.5))" }} />
        <Star size={7} /><Star size={10} style={{ margin: "0 2px" }} /><Star size={7} />
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(232,204,112,0.5))" }} />
      </div>

      {/* Cake + main number */}
      <div style={{ textAlign: "center", padding: "14px 24px 0" }}>

        {/* Cake emoji with glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{
            fontSize: 36, lineHeight: 1, marginBottom: 10,
            filter: "drop-shadow(0 0 12px rgba(255,200,50,0.5))",
          }}
        >
          🎂
        </motion.div>

        {/* Label */}
        <p style={{
          fontFamily: "var(--font-kanit, sans-serif)",
          fontSize: 11, letterSpacing: "0.2em",
          color: "rgba(212,168,32,0.7)", marginBottom: 6,
        }}>
          วันนี้คุณอายุครบ
        </p>

        {/* Age number */}
        <div style={{
          fontFamily: "Georgia, 'Playfair Display', serif",
          fontSize: "clamp(3.5rem, 14vw, 5rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          background: "linear-gradient(180deg, #e8cc70 0%, #d4a820 40%, #b8800a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 3px 12px rgba(180,120,0,0.4))",
        }}>
          {years}
        </div>

        {/* Unit */}
        <p style={{
          fontFamily: "var(--font-kanit, sans-serif)",
          fontSize: 14, fontWeight: 500,
          color: "#e8cc70", letterSpacing: "0.1em", marginTop: 4,
        }}>
          ปี
        </p>

        {/* Sub detail */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 11, color: "rgba(212,168,32,0.55)",
          letterSpacing: "0.05em", marginTop: 6,
        }}>
          {monthsIntoYear} เดือน {remainingDays} วัน
        </p>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px 0" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(212,168,32,0.15)" }} />
        <span style={{ color: "rgba(212,168,32,0.4)", fontSize: 9, letterSpacing: "0.3em" }}>✦</span>
        <div style={{ flex: 1, height: 1, background: "rgba(212,168,32,0.15)" }} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: "center", padding: "10px 24px 0" }}>
        <p style={{
          fontFamily: "var(--font-kanit, sans-serif)",
          fontSize: 11, color: "rgba(200,160,60,0.6)",
          letterSpacing: "0.05em",
        }}>
          นับจากวันที่คุณลืมตาดูโลก
        </p>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: "center", padding: "8px 24px 20px" }}>
        <p style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 12,
          color: "rgba(232,204,112,0.55)",
          letterSpacing: "0.04em",
        }}>
          และยังคงเป็นของขวัญที่ดีที่สุดเสมอ ✦
        </p>
      </div>

      {/* Bottom stars */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 24px 16px" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(232,204,112,0.5))" }} />
        <Star size={7} /><Star size={10} style={{ margin: "0 2px" }} /><Star size={7} />
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(232,204,112,0.5))" }} />
      </div>
    </motion.div>
  );
}
