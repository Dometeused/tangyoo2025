"use client";
// CandleScrollTrail.jsx
// แสงเทียนไล่ตาม scroll — mobile only, funeral theme only
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function CandleScrollTrail({ theme }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // แสงเดินจากบนสุด → ล่างสุดของ viewport ตาม scroll
  const glowY  = useTransform(scrollYProgress, [0, 1], [-80, 900]);
  // เส้นค่อยๆ fade in หลัง scroll เริ่ม
  const lineOp = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  if (theme !== "funeral" || shouldReduceMotion) return null;

  return (
    <div
      className="fixed top-0 bottom-0 z-[25] pointer-events-none md:hidden"
      style={{ left: "14px", width: "12px" }}
    >
      {/* เส้นทางบาง — fade in เมื่อ scroll */}
      <motion.div
        className="absolute inset-y-0"
        style={{
          left: "50%",
          width: "1px",
          x: "-50%",
          opacity: lineOp,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(201,168,130,0.22) 8%, rgba(201,168,130,0.22) 92%, transparent 100%)",
        }}
      />

      {/* แสงเทียน */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          y: glowY,
          width: "12px",
          height: "72px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(245,215,100,0.6) 25%, rgba(215,155,25,0.85) 50%, rgba(245,215,100,0.6) 75%, transparent 100%)",
          filter: "blur(3.5px)",
          borderRadius: "9999px",
        }}
      />

      {/* จุดเปลวเทียนเล็กๆ บนกลุ่มแสง */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          y: glowY,
          marginTop: "28px",
          width: "4px",
          height: "4px",
          background: "rgba(255,240,180,0.95)",
          borderRadius: "50%",
          filter: "blur(1px)",
          boxShadow: "0 0 6px 3px rgba(255,210,80,0.7)",
        }}
      />
    </div>
  );
}
