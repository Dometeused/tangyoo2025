"use client";
// PetalScrollTrail.jsx
// กลีบดอกไม้ร่วงตาม scroll — mobile only, wedding theme only
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function PetalScrollTrail({ theme }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const lineOp = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // แต่ละกลีบมี y offset ต่างกัน → ไม่ร่วงพร้อมกัน ดูเป็นธรรมชาติ
  const y0 = useTransform(scrollYProgress, [0, 1], [-80,  910]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-120, 870]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40,  950]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-100, 885]);

  if (theme !== "wedding" || shouldReduceMotion) return null;

  const petals = [
    { y: y0, x: "0px",  rot: -15, w: 10, h: 7, color: "rgba(255,182,193,0.88)", blur: "0.5px" },
    { y: y1, x: "6px",  rot:  22, w: 8,  h: 5, color: "rgba(255,145,175,0.65)", blur: "1px"   },
    { y: y2, x: "-5px", rot: -30, w: 9,  h: 6, color: "rgba(245,200,215,0.75)", blur: "0.8px" },
    { y: y3, x: "8px",  rot:  10, w: 6,  h: 4, color: "rgba(255,192,203,0.55)", blur: "1.5px" },
  ];

  return (
    <div
      className="fixed top-0 bottom-0 z-[25] pointer-events-none md:hidden"
      style={{ left: "14px", width: "14px" }}
    >
      {/* เส้นทางบาง สีชมพูอ่อน */}
      <motion.div
        className="absolute inset-y-0"
        style={{
          left: "50%",
          width: "1px",
          x: "-50%",
          opacity: lineOp,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,182,193,0.28) 8%, rgba(255,182,193,0.28) 92%, transparent 100%)",
        }}
      />

      {/* กลีบดอกไม้ */}
      {petals.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            x: `calc(-50% + ${p.x})`,
            y: p.y,
            width: `${p.w}px`,
            height: `${p.h}px`,
            background: p.color,
            borderRadius: "50% 0 50% 0",
            rotate: p.rot,
            filter: `blur(${p.blur})`,
          }}
        />
      ))}
    </div>
  );
}
