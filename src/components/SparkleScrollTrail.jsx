"use client";
// SparkleScrollTrail.jsx
// แสงประกายทองตาม scroll — mobile only, family/anniversary theme only
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function SparkleScrollTrail({ theme }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const lineOp = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // แต่ละประกายอยู่ offset ต่างกัน → กระจายตัวไม่เป็นระเบียบ ดูเป็นธรรมชาติ
  const y0 = useTransform(scrollYProgress, [0, 1], [-80,  910]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-130, 860]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50,  950]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-105, 885]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-20,  970]);

  if ((theme !== "family" && theme !== "anniversary") || shouldReduceMotion) return null;

  const sparkles = [
    // { y, x offset, size, color, blur, rotate(45=diamond / 0=circle) }
    { y: y0, x: "0px",  size: 5, color: "rgba(255,215,0,0.92)",   blur: "1px",   rotate: 45 },
    { y: y1, x: "7px",  size: 3, color: "rgba(255,200,50,0.70)",  blur: "0.5px", rotate: 0  },
    { y: y2, x: "-6px", size: 4, color: "rgba(255,235,100,0.82)", blur: "1px",   rotate: 45 },
    { y: y3, x: "5px",  size: 2, color: "rgba(255,210,0,0.55)",   blur: "0.5px", rotate: 0  },
    { y: y4, x: "-4px", size: 6, color: "rgba(255,220,80,0.65)",  blur: "1.5px", rotate: 45 },
  ];

  return (
    <div
      className="fixed top-0 bottom-0 z-[25] pointer-events-none md:hidden"
      style={{ left: "14px", width: "14px" }}
    >
      {/* เส้นทางบาง สีทองอ่อน */}
      <motion.div
        className="absolute inset-y-0"
        style={{
          left: "50%",
          width: "1px",
          x: "-50%",
          opacity: lineOp,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,215,0,0.28) 8%, rgba(255,215,0,0.28) 92%, transparent 100%)",
        }}
      />

      {/* จุดประกายทอง */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            x: `calc(-50% + ${s.x})`,
            y: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            borderRadius: s.rotate === 0 ? "50%" : "1px",
            rotate: s.rotate,
            filter: `blur(${s.blur})`,
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${s.color.replace(/[\d.]+\)$/, "0.35)")}`,
          }}
        />
      ))}
    </div>
  );
}
