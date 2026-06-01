"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Petal particle for Wedding ----
function Petal({ delay }) {
  const left = Math.random() * 100;
  const duration = 4 + Math.random() * 4;
  const size = 6 + Math.random() * 10;
  const drift = (Math.random() - 0.5) * 120;
  return (
    <motion.div
      className="absolute top-0 rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        width: size,
        height: size * 0.6,
        background: `rgba(255,255,255,${0.3 + Math.random() * 0.5})`,
        borderRadius: "50% 0 50% 0",
        filter: "blur(0.5px)",
      }}
      initial={{ y: -20, x: 0, opacity: 0, rotate: Math.random() * 360 }}
      animate={{
        y: "110vh",
        x: drift,
        opacity: [0, 0.8, 0.8, 0],
        rotate: Math.random() * 720,
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  );
}

// ---- Rose gold dust for Anniversary light bg ----
function RoseGoldDust({ delay }) {
  const left = 20 + Math.random() * 60;
  const duration = 2.5 + Math.random() * 2.5;
  const size = 3 + Math.random() * 5;
  const colors = [
    `rgba(200,100,80,${0.5 + Math.random() * 0.4})`,
    `rgba(220,140,60,${0.5 + Math.random() * 0.4})`,
    `rgba(180,80,100,${0.4 + Math.random() * 0.4})`,
    `rgba(240,180,80,${0.5 + Math.random() * 0.4})`,
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: `${left}%`,
        bottom: "30%",
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -(100 + Math.random() * 180),
        x: (Math.random() - 0.5) * 100,
        opacity: [0, 0.9, 0],
        scale: [0, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 2 }}
    />
  );
}

// ---- Gold dust particle for Anniversary (idle float) ----
function GoldDust({ delay }) {
  const left = 30 + Math.random() * 40;
  const duration = 2.5 + Math.random() * 2;
  const size = 2 + Math.random() * 4;
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: `${left}%`,
        bottom: "35%",
        width: size,
        height: size,
        background: `rgba(255, ${180 + Math.random() * 75}, 0, ${0.6 + Math.random() * 0.4})`,
        boxShadow: `0 0 ${size * 2}px rgba(255,200,0,0.8)`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -(80 + Math.random() * 160),
        x: (Math.random() - 0.5) * 80,
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 2 }}
    />
  );
}

// ---- Gold ray for Anniversary burst ----
function GoldRay({ angle, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 2,
        height: "55vmax",
        background: "linear-gradient(to bottom, rgba(255,210,0,0.7) 0%, rgba(255,180,0,0.2) 40%, transparent 100%)",
        top: "50%",
        left: "50%",
        transformOrigin: "top center",
        rotate: angle,
        translateX: "-50%",
        translateY: "0%",
        filter: "blur(1.5px)",
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: [0, 0.9, 0] }}
      transition={{ duration: 1.0, delay, ease: "easeOut" }}
    />
  );
}

// ---- Exploding spark for Anniversary burst ----
function GoldSpark({ delay }) {
  const angle = Math.random() * 360;
  const dist = 120 + Math.random() * 200;
  const rad = (angle * Math.PI) / 180;
  const size = 3 + Math.random() * 5;
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        background: `rgba(255, ${190 + Math.random() * 65}, 0, 1)`,
        boxShadow: `0 0 ${size * 3}px rgba(255,200,0,1)`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [1, 1, 0],
        scale: [1, 0.6, 0],
      }}
      transition={{ duration: 0.8 + Math.random() * 0.4, delay, ease: "easeOut" }}
    />
  );
}

// ---- Baby pastel dust for Baby theme ----
function BabyDust({ delay }) {
  const COLORS = [
    `rgba(255,165,120,0.85)`,
    `rgba(255,148,158,0.85)`,
    `rgba(255,200,100,0.85)`,
    `rgba(255,188,148,0.85)`,
    `rgba(230,140,88,0.85)`,
  ];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const left = 8 + Math.random() * 84;
  const size = 3 + Math.random() * 5.5;
  const duration = 2.8 + Math.random() * 3;
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: `${left}%`,
        bottom: "12%",
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -(160 + Math.random() * 230),
        x: (Math.random() - 0.5) * 110,
        opacity: [0, 0.9, 0],
        scale: [0, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 2.5 }}
    />
  );
}

// ---- Baby confetti spark — bursts on open ----
function BabySpark({ delay }) {
  const COLORS = ["#ffb895", "#ffd095", "#ff9878", "#ffb3a0", "#ffd880", "#ffccaa", "#e89870"];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const angle = Math.random() * 360;
  const dist = 90 + Math.random() * 230;
  const rad = (angle * Math.PI) / 180;
  const size = 4 + Math.random() * 7;
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [1, 1, 0],
        scale: [1, 0.5, 0],
      }}
      transition={{ duration: 0.85 + Math.random() * 0.55, delay, ease: "easeOut" }}
    />
  );
}

// ---- Balloons tied to gift box — Welcome Baby ----
function BabyGiftBalloons({ isOpening }) {
  return (
    <motion.div
      style={{ position: "relative" }}
      animate={!isOpening ? { y: [0, -9, 0] } : {}}
      transition={!isOpening ? { repeat: Infinity, duration: 4.0, ease: "easeInOut" } : {}}
    >
      {/* Soft glow */}
      <motion.div
        style={{
          position: "absolute",
          width: 220, height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(215,172,255,0.16) 0%, rgba(255,178,218,0.09) 48%, transparent 70%)",
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.10, 1], opacity: [0.5, 0.92, 0.5] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      />

      <svg
        width="200" height="278" viewBox="0 0 200 278"
        style={{ filter: "drop-shadow(0 8px 26px rgba(182,145,255,0.24))" }}
      >
        <defs>
          <radialGradient id="gbPink"   cx="34%" cy="27%" r="66%"><stop offset="0%" stopColor="#ffd8ea"/><stop offset="100%" stopColor="#ff85b5"/></radialGradient>
          <radialGradient id="gbLav"    cx="34%" cy="27%" r="66%"><stop offset="0%" stopColor="#eadaff"/><stop offset="100%" stopColor="#aa78ff"/></radialGradient>
          <radialGradient id="gbMint"   cx="34%" cy="27%" r="66%"><stop offset="0%" stopColor="#c8f8e8"/><stop offset="100%" stopColor="#50cc98"/></radialGradient>
          <radialGradient id="gbYellow" cx="34%" cy="27%" r="66%"><stop offset="0%" stopColor="#fff8c0"/><stop offset="100%" stopColor="#ffd040"/></radialGradient>
          <linearGradient id="gbLid"    x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f8d2ee"/><stop offset="50%" stopColor="#fce8f4"/><stop offset="100%" stopColor="#f0c6e2"/></linearGradient>
          <linearGradient id="gbBody"   x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#e4d4ff"/><stop offset="50%" stopColor="#eedfff"/><stop offset="100%" stopColor="#d8c6f6"/></linearGradient>
          <linearGradient id="gbRib"    x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f8cadf"/><stop offset="50%" stopColor="#ffe8ff"/><stop offset="100%" stopColor="#e8bcd4"/></linearGradient>
        </defs>

        {/* ─── STRINGS ─── */}
        <motion.g animate={isOpening ? { opacity: 0 } : {}} transition={isOpening ? { duration: 0.22 } : {}}>
          <path d="M28 97  Q52 136 97 151" stroke="rgba(210,185,110,0.30)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M56 90  Q66 127 97 151" stroke="rgba(225,138,178,0.30)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M100 77 Q100 114 100 151" stroke="rgba(178,148,232,0.30)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M144 87 Q135 127 103 151" stroke="rgba(130,200,165,0.30)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        </motion.g>

        {/* ─── YELLOW balloon (back-left, small) ─── */}
        <motion.g
          animate={isOpening ? { y: -165, opacity: 0 } : { y: [0, -4, 0] }}
          transition={isOpening ? { duration: 0.6, delay: 0.07 } : { repeat: Infinity, duration: 3.4, delay: 0.6, ease: "easeInOut" }}
        >
          <ellipse cx="28" cy="79" rx="18" ry="21" fill="url(#gbYellow)"/>
          <ellipse cx="21" cy="71" rx="6"  ry="7.5" fill="rgba(255,255,255,0.36)"/>
          <path d="M25 100 L28 106 L31 100 Z" fill="#ffd040"/>
        </motion.g>

        {/* ─── PINK balloon (left) ─── */}
        <motion.g
          animate={isOpening ? { y: -182, opacity: 0 } : { y: [0, -6, 0] }}
          transition={isOpening ? { duration: 0.65, delay: 0.03 } : { repeat: Infinity, duration: 3.7, delay: 0.2, ease: "easeInOut" }}
        >
          <ellipse cx="56" cy="63" rx="23" ry="27" fill="url(#gbPink)"/>
          <ellipse cx="47" cy="53" rx="8"  ry="10" fill="rgba(255,255,255,0.36)"/>
          <path d="M53 90 L56 96 L59 90 Z" fill="#ff85b5"/>
        </motion.g>

        {/* ─── MINT balloon (right) ─── */}
        <motion.g
          animate={isOpening ? { y: -176, opacity: 0 } : { y: [0, -5, 0] }}
          transition={isOpening ? { duration: 0.68, delay: 0.10 } : { repeat: Infinity, duration: 3.9, delay: 0.7, ease: "easeInOut" }}
        >
          <ellipse cx="144" cy="61" rx="23" ry="27" fill="url(#gbMint)"/>
          <ellipse cx="135" cy="51" rx="8"  ry="10" fill="rgba(255,255,255,0.30)"/>
          <path d="M141 88 L144 94 L147 88 Z" fill="#50cc98"/>
        </motion.g>

        {/* ─── LAVENDER balloon (center, front, largest) ─── */}
        <motion.g
          animate={isOpening ? { y: -198, opacity: 0 } : { y: [0, -8, 0] }}
          transition={isOpening ? { duration: 0.62 } : { repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        >
          <ellipse cx="100" cy="45" rx="28" ry="32" fill="url(#gbLav)"/>
          <ellipse cx="90"  cy="34" rx="10" ry="12" fill="rgba(255,255,255,0.36)"/>
          <path d="M97 77 L100 84 L103 77 Z" fill="#aa78ff"/>
        </motion.g>

        {/* ─── GIFT BOX ─── */}
        <motion.g
          animate={isOpening ? { opacity: 0, y: 16 } : {}}
          transition={isOpening ? { duration: 0.42, delay: 0.58 } : {}}
        >
          {/* Bow left loop */}
          <path d="M100 153 C93 144, 73 139, 71 149 C69 157, 87 161, 100 153Z" fill="#f8c0e0"/>
          <path d="M100 153 C95 156, 77 160, 71 149 C69 157, 87 161, 100 153Z" fill="#e8a8cc" opacity="0.55"/>
          {/* Bow right loop */}
          <path d="M100 153 C107 144, 127 139, 129 149 C131 157, 113 161, 100 153Z" fill="#f8c0e0"/>
          <path d="M100 153 C105 156, 123 160, 129 149 C131 157, 113 161, 100 153Z" fill="#e8a8cc" opacity="0.55"/>
          {/* Bow tails */}
          <path d="M100 155 C95 161, 88 168, 84 174" stroke="#f8c0e0" strokeWidth="5" strokeLinecap="round"/>
          <path d="M100 155 C105 161, 112 168, 116 174" stroke="#f8c0e0" strokeWidth="5" strokeLinecap="round"/>
          {/* Knot */}
          <ellipse cx="100" cy="153" rx="8"   ry="6.5" fill="#fce4f4"/>
          <ellipse cx="100" cy="151" rx="4.5" ry="3"   fill="rgba(255,255,255,0.56)"/>

          {/* Lid */}
          <rect x="53" y="162" width="94" height="28" rx="7" ry="7" fill="url(#gbLid)"/>
          <rect x="95" y="162" width="10" height="28" fill="url(#gbRib)" opacity="0.88"/>
          <rect x="98" y="162" width="3"  height="28" fill="rgba(255,255,255,0.42)"/>
          <rect x="57" y="164" width="34" height="5"  rx="2.5" fill="rgba(255,255,255,0.42)"/>
          <line x1="53" y1="190" x2="147" y2="190" stroke="rgba(0,0,0,0.07)" strokeWidth="1"/>

          {/* Body */}
          <rect x="57" y="191" width="86" height="72" rx="9" ry="9" fill="url(#gbBody)"/>
          <rect x="95" y="191" width="10" height="72" fill="url(#gbRib)" opacity="0.82"/>
          <rect x="98" y="191" width="3"  height="72" fill="rgba(255,255,255,0.38)"/>
          <path d="M63 198 Q62 237 64 258" stroke="rgba(255,255,255,0.52)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="100" cy="263" rx="34" ry="5.5" fill="rgba(175,148,215,0.13)"/>
        </motion.g>
      </svg>
    </motion.div>
  );
}

// ---- Baby bottle SVG ----
function BabyBottle({ isOpening }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={
        isOpening
          ? { y: -100, scale: 0.7, rotate: 18, opacity: 0 }
          : { y: [0, -9, 0], rotate: [0, -2, 2, 0] }
      }
      transition={
        isOpening
          ? { duration: 0.6, ease: "easeIn" }
          : { repeat: Infinity, duration: 3.8, ease: "easeInOut" }
      }
    >
      {/* Glow behind bottle */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,170,255,0.22) 0%, rgba(255,170,210,0.12) 50%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <svg width="88" height="172" viewBox="0 0 88 172" fill="none"
        style={{ filter: "drop-shadow(0 8px 24px rgba(180,140,255,0.28))" }}>
        <defs>
          <linearGradient id="btBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#e8f0ff" />
            <stop offset="30%"  stopColor="#f8fcff" />
            <stop offset="70%"  stopColor="#eef4ff" />
            <stop offset="100%" stopColor="#dce8ff" />
          </linearGradient>
          <linearGradient id="btMilk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fff8e0" />
            <stop offset="50%"  stopColor="#fffcee" />
            <stop offset="100%" stopColor="#fff4cc" />
          </linearGradient>
          <linearGradient id="btCollar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#e0d0ff" />
            <stop offset="100%" stopColor="#c0a8f8" />
          </linearGradient>
          <radialGradient id="btNipple" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#ffd8e8" />
            <stop offset="100%" stopColor="#ffaac8" />
          </radialGradient>
          <clipPath id="btBodyClip">
            <rect x="18" y="60" width="52" height="100" rx="14" ry="14" />
          </clipPath>
        </defs>

        {/* Nipple dome */}
        <ellipse cx="44" cy="18" rx="11" ry="16" fill="url(#btNipple)" />
        <ellipse cx="44" cy="6"  rx="4.5" ry="7"  fill="#ffbcd4" />
        <ellipse cx="42" cy="5"  rx="1.5" ry="2.5" fill="rgba(255,255,255,0.55)" />

        {/* Collar ring */}
        <rect x="24" y="30" width="40" height="12" rx="5" ry="5" fill="url(#btCollar)" />
        <rect x="26" y="31" width="36" height="5"  rx="2.5" fill="rgba(255,255,255,0.38)" />

        {/* Neck funnel */}
        <path d="M28 42 Q22 52 20 62 L68 62 Q66 52 60 42 Z" fill="url(#btBody)" />
        <path d="M29 43 Q24 51 22 60" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Bottle body */}
        <rect x="18" y="60" width="52" height="100" rx="14" ry="14" fill="url(#btBody)" />

        {/* Milk fill */}
        <rect x="18" y="95" width="52" height="67" fill="url(#btMilk)" clipPath="url(#btBodyClip)" />
        <path d="M18 95 Q30 91 44 95 Q58 99 70 95"
          stroke="rgba(255,240,180,0.7)" strokeWidth="2"
          fill="rgba(255,248,224,0.45)" clipPath="url(#btBodyClip)" />

        {/* Measurement marks */}
        {[100, 115, 130, 145].map((y, i) => (
          <g key={i}>
            <line x1="22" y1={y} x2="32" y2={y} stroke="rgba(160,130,220,0.28)" strokeWidth="1.2" />
            <line x1="56" y1={y} x2="66" y2={y} stroke="rgba(160,130,220,0.28)" strokeWidth="1.2" />
          </g>
        ))}

        {/* Left edge shine */}
        <path d="M23 68 Q22 110 24 148" stroke="rgba(255,255,255,0.6)"  strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M28 72 Q27 95  28 118" stroke="rgba(255,255,255,0.32)" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Shadow */}
        <ellipse cx="44" cy="161" rx="22" ry="4" fill="rgba(180,150,230,0.15)" />
      </svg>
    </motion.div>
  );
}

// ---- Baby lying down drinking from bottle (chibi — warm & premium) ----
function BabyScene({ isOpening }) {
  return (
    <motion.div
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
      animate={isOpening
        ? { y: -88, opacity: 0, rotate: 10 }
        : { y: [0, -8, 0] }
      }
      transition={isOpening
        ? { duration: 0.6, delay: 0.30, ease: "easeIn" }
        : { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
      }
    >
      {/* Warm golden glow */}
      <div style={{
        position: "absolute", width: 240, height: 150, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,200,130,0.28) 0%, rgba(255,170,100,0.10) 55%, transparent 75%)",
        pointerEvents: "none",
      }}/>
      <svg width="228" height="185" viewBox="0 0 228 185" fill="none"
        style={{ filter: "drop-shadow(0 8px 26px rgba(210,140,80,0.24))" }}>
        <defs>
          <radialGradient id="bsSkin" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffeac0"/><stop offset="100%" stopColor="#ffca88"/>
          </radialGradient>
          <linearGradient id="bsOnesie" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffdcc8"/><stop offset="100%" stopColor="#f8c0e0"/>
          </linearGradient>
          <linearGradient id="bsGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#edf4ff"/><stop offset="50%" stopColor="#f9fbff"/><stop offset="100%" stopColor="#ddeaff"/>
          </linearGradient>
          <linearGradient id="bsMilkG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffcee"/><stop offset="100%" stopColor="#fff0c0"/>
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="114" cy="179" rx="88" ry="6" fill="rgba(210,150,90,0.12)"/>

        {/* ── BODY (warm onesie) ── */}
        <ellipse cx="140" cy="152" rx="64" ry="24" fill="url(#bsOnesie)"/>
        {/* Collar crease */}
        <path d="M94 141 Q118 135 142 139" stroke="rgba(255,195,165,0.5)" strokeWidth="1.8" fill="none"/>
        {/* Snap dots */}
        <circle cx="142" cy="153" r="2.4" fill="rgba(255,185,148,0.65)"/>
        <circle cx="155" cy="153" r="2.4" fill="rgba(255,185,148,0.65)"/>

        {/* ── LEGS POINTING UP (classic baby-on-back pose) ── */}
        {/* Back leg */}
        <path d="M186 148 Q205 122 198 96"  stroke="#ffcc88" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="197" cy="92"  rx="13" ry="10" fill="#ffdaa8" transform="rotate(12 197 92)"/>
        {/* Front leg */}
        <path d="M170 148 Q188 118 183 90"  stroke="url(#bsSkin)" strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="182" cy="85"  rx="15" ry="12" fill="url(#bsSkin)" transform="rotate(8 182 85)"/>
        {/* Toes (front foot) */}
        <circle cx="190" cy="75" r="4.2" fill="#ffca88"/>
        <circle cx="194" cy="82" r="3.8" fill="#ffca88"/>
        <circle cx="194" cy="90" r="3.5" fill="#ffca88"/>

        {/* ── ARMS reaching up toward bottle ── */}
        <path d="M86 132 Q74 102 82 82"  stroke="url(#bsSkin)" strokeWidth="15" strokeLinecap="round" fill="none"/>
        <circle cx="82"  cy="79" r="11" fill="#ffeac0"/>
        <path d="M104 128 Q100 100 112 82" stroke="url(#bsSkin)" strokeWidth="13" strokeLinecap="round" fill="none"/>
        <circle cx="113" cy="79" r="10" fill="#ffeac0"/>

        {/* ── HEAD (chibi — big & round) ── */}
        <circle cx="52" cy="96" r="50" fill="url(#bsSkin)"/>

        {/* Ear */}
        <path d="M4  83 Q-5  96 4  110" stroke="#ffeac0" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M5  85 Q-1  96 5  108" stroke="#ffbb78" strokeWidth="6"  fill="none" strokeLinecap="round"/>

        {/* Hair wisps */}
        <path d="M28 50 Q44 36 64 44"  stroke="#c8845c" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M58 42 Q70 32 80 42"  stroke="#c8845c" strokeWidth="3"   fill="none" strokeLinecap="round"/>
        <path d="M42 44 Q50 30 60 36"  stroke="#b87040" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* Chibi cheeks — big & rosy */}
        <ellipse cx="16" cy="102" rx="18" ry="12" fill="rgba(255,120,100,0.24)"/>
        <ellipse cx="87" cy="100" rx="18" ry="12" fill="rgba(255,120,100,0.24)"/>

        {/* Eyes — big closed happy arcs + long lashes */}
        <path d="M20 82 Q35 70 50 82" stroke="#5c3018" strokeWidth="3"   fill="none" strokeLinecap="round"/>
        <line x1="22"  y1="82" x2="20"  y2="77" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>
        <line x1="35"  y1="72" x2="35"  y2="67" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>
        <line x1="48"  y1="82" x2="50"  y2="77" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>
        <path d="M58 80 Q73 68 88 80" stroke="#5c3018" strokeWidth="3"   fill="none" strokeLinecap="round"/>
        <line x1="60"  y1="80" x2="58"  y2="75" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>
        <line x1="73"  y1="70" x2="73"  y2="65" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>
        <line x1="86"  y1="80" x2="88"  y2="75" stroke="#5c3018" strokeWidth="2" strokeLinecap="round"/>

        {/* Soft eyebrows */}
        <path d="M22 74 Q35 66 48 74" stroke="#a06838" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
        <path d="M60 72 Q73 64 86 72" stroke="#a06838" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>

        {/* Nose */}
        <ellipse cx="52" cy="100" rx="4" ry="2.8" fill="rgba(185,108,72,0.28)"/>

        {/* Mouth — tiny 'o' drinking */}
        <circle cx="51" cy="114" r="6.5" fill="rgba(215,110,85,0.42)"/>
        <circle cx="51" cy="114" r="3.5" fill="rgba(188,80,62,0.32)"/>

        {/* ── BOTTLE — floats beside baby, moves to mouth on tap ── */}
        {/* Rotation pivot at bottle centre (120,80); idle = upper-right, open = at mouth */}
        <motion.g
          style={{ transformOrigin: "120px 80px" }}
          initial={{ x: 38, y: -25, rotate: -5 }}
          animate={isOpening
            ? { x: -14, y: 18, rotate: -22 }
            : { x: [38, 36, 38], y: [-25, -30, -25], rotate: -5 }
          }
          transition={isOpening
            ? { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
            : { repeat: Infinity, duration: 2.8, ease: "easeInOut" }
          }
        >
          {/* Body */}
          <rect x="68" y="65" width="110" height="30" rx="14" fill="url(#bsGlass)" opacity="0.94"/>
          {/* Milk */}
          <rect x="80" y="67" width="94"  height="26" rx="12" fill="url(#bsMilkG)" opacity="0.88"/>
          {/* Milk surface shimmer */}
          <path d="M80 67 Q118 63 174 67" stroke="rgba(255,240,175,0.65)" strokeWidth="1.5" fill="none"/>
          {/* Glass shines */}
          <path d="M74 71 Q73 81 75 88" stroke="rgba(255,255,255,0.75)" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
          <path d="M80 73 Q79 80 80 88" stroke="rgba(255,255,255,0.40)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          {/* Measure marks */}
          <line x1="104" y1="65" x2="104" y2="71" stroke="rgba(175,140,90,0.30)" strokeWidth="1"/>
          <line x1="126" y1="65" x2="126" y2="71" stroke="rgba(175,140,90,0.30)" strokeWidth="1"/>
          <line x1="148" y1="65" x2="148" y2="71" stroke="rgba(175,140,90,0.30)" strokeWidth="1"/>
          {/* Collar — warm peach */}
          <rect x="66" y="65" width="17" height="30" rx="8"  fill="rgba(255,185,148,0.78)"/>
          <rect x="67" y="66" width="14" height="13" rx="5"  fill="rgba(255,215,185,0.55)"/>
          {/* Nipple — warm blush */}
          <ellipse cx="61" cy="80" rx="7.5" ry="13" fill="rgba(255,178,195,0.90)"/>
          <ellipse cx="59" cy="74" rx="2.8" ry="4.5" fill="rgba(255,215,225,0.68)"/>
          {/* Right end cap */}
          <rect x="176" y="65" width="9" height="30" rx="4" fill="rgba(255,190,150,0.40)"/>
        </motion.g>
      </svg>
    </motion.div>
  );
}

// ---- Premium box color themes ----
const BOX_THEMES = [
  {
    name: "royal-purple",
    lid: "linear-gradient(160deg, #7a1ab0 0%, #5a0e88 50%, #3d0860 100%)",
    body: "linear-gradient(160deg, #650fa0 0%, #480a72 60%, #300548 100%)",
    shadow: "rgba(90,0,150,0.45)",
    shimmer: "rgba(210,150,255,0.18)",
    topLine: "rgba(200,140,255,0.5)",
    glow: "rgba(130,40,220,0.20)",
  },
  {
    name: "emerald",
    lid: "linear-gradient(160deg, #0e7845 0%, #086035 50%, #054022 100%)",
    body: "linear-gradient(160deg, #0a6038 0%, #084828 60%, #053018 100%)",
    shadow: "rgba(0,80,40,0.45)",
    shimmer: "rgba(80,255,150,0.14)",
    topLine: "rgba(60,220,110,0.45)",
    glow: "rgba(20,160,70,0.20)",
  },
  {
    name: "sapphire",
    lid: "linear-gradient(160deg, #1a35b0 0%, #0e2278 50%, #08124e 100%)",
    body: "linear-gradient(160deg, #152ca0 0%, #0c1e68 60%, #06103a 100%)",
    shadow: "rgba(0,30,130,0.45)",
    shimmer: "rgba(120,170,255,0.18)",
    topLine: "rgba(100,160,255,0.45)",
    glow: "rgba(40,90,220,0.20)",
  },
  {
    name: "burgundy",
    lid: "linear-gradient(160deg, #7b1040 0%, #5a0c2f 50%, #3d0820 100%)",
    body: "linear-gradient(160deg, #6a0d35 0%, #4a0823 60%, #300518 100%)",
    shadow: "rgba(120,0,40,0.45)",
    shimmer: "rgba(255,180,210,0.15)",
    topLine: "rgba(255,160,190,0.45)",
    glow: "rgba(200,30,80,0.20)",
  },
  {
    name: "midnight-teal",
    lid: "linear-gradient(160deg, #0e6875 0%, #085260 50%, #043848 100%)",
    body: "linear-gradient(160deg, #0a5868 0%, #074050 60%, #042838 100%)",
    shadow: "rgba(0,70,90,0.45)",
    shimmer: "rgba(60,230,250,0.14)",
    topLine: "rgba(50,210,230,0.45)",
    glow: "rgba(10,130,170,0.20)",
  },
];

// ---- Candle flame SVG ----
function CandleFlame({ isOpening }) {
  return (
    <div className="relative flex flex-col items-center">

      {/* Outer wide glow — room light */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 340,
          background: "radial-gradient(circle, rgba(200,80,0,0.10) 0%, transparent 70%)",
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={isOpening ? { opacity: 0 } : { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={isOpening ? { duration: 0.5 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />

      {/* Mid glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(255,120,0,0.22) 0%, transparent 70%)",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={isOpening ? { opacity: 0, scale: 3 } : { opacity: [0.7, 1, 0.7], scale: [1, 1.12, 1] }}
        transition={isOpening ? { duration: 0.6 } : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />

      {/* Inner tight glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 70,
          height: 70,
          background: "radial-gradient(circle, rgba(255,180,60,0.55) 0%, transparent 70%)",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={isOpening ? { opacity: 0, scale: 4 } : { opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }}
        transition={isOpening ? { duration: 0.4 } : { repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      />

      {/* Flame SVG */}
      <motion.svg
        width="32"
        height="52"
        viewBox="0 0 32 52"
        fill="none"
        animate={isOpening ? { opacity: 0, scaleY: 0, y: -10 } : { scaleX: [1, 0.82, 1], scaleY: [1, 1.1, 1] }}
        transition={isOpening ? { duration: 0.35, ease: "easeIn" } : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom center", filter: "drop-shadow(0 0 14px rgba(255,120,0,1))" }}
      >
        <path
          d="M16 2 C16 2, 28 18, 28 30 C28 42, 22 50, 16 50 C10 50, 4 42, 4 30 C4 18, 16 2, 16 2Z"
          fill="url(#flameGrad)"
        />
        <path
          d="M16 20 C16 20, 21 28, 21 34 C21 40, 18.5 46, 16 46 C13.5 46, 11 40, 11 34 C11 28, 16 20, 16 20Z"
          fill="url(#innerFlameGrad)"
        />
        <defs>
          <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="40%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#BF360C" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="innerFlameGrad" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </motion.svg>

      {/* Candle body — fades fast */}
      <motion.div
        animate={isOpening ? { opacity: 0, y: 8 } : { opacity: 1 }}
        transition={isOpening ? { duration: 0.4, ease: "easeIn" } : {}}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div
          style={{
            width: 18,
            height: 64,
            background: "linear-gradient(180deg, #f5f0e8 0%, #e8dcc8 100%)",
            borderRadius: "3px 3px 4px 4px",
            boxShadow: "inset -3px 0 8px rgba(0,0,0,0.15), 2px 0 4px rgba(255,200,100,0.3)",
          }}
        />
        <div
          style={{
            width: 22,
            height: 6,
            background: "linear-gradient(180deg, #e8dcc8, #d4c4a0)",
            borderRadius: "0 0 8px 8px",
            marginTop: -1,
          }}
        />
      </motion.div>
    </div>
  );
}

export default function IntroOverlay({ theme, onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const timerRef = useRef(null);
  // สุ่มสีกล่องทุกครั้งที่โหลด
  const [boxColor] = useState(() => BOX_THEMES[Math.floor(Math.random() * BOX_THEMES.length)]);

  const handleInteraction = () => {
    if (isOpening) return;
    setIsOpening(true);

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, theme === "funeral" ? 2200 : 1600);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* ==================== WEDDING ==================== */}
        {theme === "wedding" && (
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a0a10 50%, #0d0d0d 100%)" }}
            onClick={handleInteraction}
          >
            {/* Petals */}
            {Array.from({ length: 28 }).map((_, i) => (
              <Petal key={i} delay={i * 0.18} />
            ))}

            {/* Center light */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={isOpening ? { opacity: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 280,
                  height: 280,
                  background: "radial-gradient(circle, rgba(255,240,230,0.08) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Left curtain */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(255,240,245,0.06) 0%, rgba(255,200,220,0.04) 100%)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
              animate={isOpening ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Right curtain */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(255,240,245,0.06) 0%, rgba(255,200,220,0.04) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
              animate={isOpening ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Text */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.p
                    className="text-white/40 font-kanit font-light tracking-[0.35em] text-xs uppercase"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    แตะเพื่อเข้าร่วมงาน
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== FUNERAL ==================== */}
        {theme === "funeral" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer gap-10"
            style={{ background: "#060606" }}
            onClick={handleInteraction}
            animate={isOpening ? { opacity: 0 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Ambient glow from candle */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 300,
                height: 300,
                background: "radial-gradient(circle, rgba(180,80,0,0.12) 0%, transparent 70%)",
                top: "30%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />

            <CandleFlame isOpening={isOpening} />

            <motion.div
              className="flex flex-col items-center gap-2"
              animate={isOpening ? { opacity: 0 } : {}}
            >
              <p className="text-white/30 font-kanit font-light tracking-[0.4em] text-xs">
                ด้วยความรักและอาลัย
              </p>
              <motion.div
                style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }}
                animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
              <p className="text-white/15 font-kanit font-light tracking-[0.3em] text-[10px]">
                แตะเพื่อรำลึกถึง
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ==================== ANNIVERSARY / BIRTHDAY ==================== */}
        {(theme === "anniversary" || theme === "birthday") && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0e0800 0%, #1c1000 50%, #0e0800 100%)" }}
            onClick={handleInteraction}
          >
            {/* Gold dust particles */}
            {Array.from({ length: 48 }).map((_, i) => (
              <GoldDust key={i} delay={i * 0.1} />
            ))}

            {/* Ambient glow */}
            <motion.div className="absolute pointer-events-none rounded-full"
              style={{ width: 320, height: 320, top: "50%", left: "50%", transform: "translate(-50%,-60%)",
                background: "radial-gradient(circle, rgba(212,168,32,0.12) 0%, transparent 65%)" }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            {/* ── ENVELOPE ── */}
            <motion.div
              style={{ position: "relative", width: 240, height: 170 }}
              animate={isOpening ? { scale: [1, 1.05, 0.9], opacity: [1, 1, 0], y: [0, -10, 20] } : { y: [0, -8, 0] }}
              transition={isOpening ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <svg width="240" height="170" viewBox="0 0 240 170" fill="none">
                <defs>
                  <linearGradient id="envBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a1e08"/><stop offset="100%" stopColor="#1a1204"/>
                  </linearGradient>
                  <linearGradient id="envFlap" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3a2a0e"/><stop offset="100%" stopColor="#2a1e08"/>
                  </linearGradient>
                  <linearGradient id="envEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(212,168,32,0)"/>
                    <stop offset="50%" stopColor="rgba(212,168,32,0.6)"/>
                    <stop offset="100%" stopColor="rgba(212,168,32,0)"/>
                  </linearGradient>
                </defs>

                {/* Shadow */}
                <ellipse cx="120" cy="166" rx="90" ry="6" fill="rgba(0,0,0,0.4)"/>

                {/* Envelope body */}
                <rect x="10" y="50" width="220" height="110" rx="8" fill="url(#envBody)"
                  style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))" }}/>
                <rect x="10" y="50" width="220" height="110" rx="8" fill="none"
                  stroke="rgba(212,168,32,0.25)" strokeWidth="1"/>

                {/* Bottom V fold */}
                <path d="M10 160 L120 100 L230 160 Z" fill="rgba(212,168,32,0.06)"/>
                <path d="M10 160 L120 100" stroke="rgba(212,168,32,0.15)" strokeWidth="0.8"/>
                <path d="M230 160 L120 100" stroke="rgba(212,168,32,0.15)" strokeWidth="0.8"/>

                {/* Left side fold */}
                <path d="M10 50 L120 100 L10 160 Z" fill="rgba(212,168,32,0.04)"/>
                {/* Right side fold */}
                <path d="M230 50 L120 100 L230 160 Z" fill="rgba(212,168,32,0.04)"/>

                {/* Top flap — animates open */}
                <motion.path
                  d="M10 50 L120 108 L230 50 Z"
                  fill="url(#envFlap)"
                  stroke="rgba(212,168,32,0.3)" strokeWidth="1"
                  style={{ transformOrigin: "120px 50px" }}
                  animate={isOpening ? { rotateX: -160, opacity: 0 } : {}}
                  transition={isOpening ? { duration: 0.5, ease: [0.4, 0, 1, 1] } : {}}
                />

                {/* Edge shimmer */}
                <rect x="10" y="50" width="220" height="1" rx="0.5" fill="url(#envEdge)"/>

                {/* Wax seal */}
                <motion.g
                  style={{ transformOrigin: "120px 79px" }}
                  animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.04, 1] }}
                  transition={isOpening ? { duration: 0.3 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <circle cx="120" cy="79" r="22" fill="rgba(212,168,32,0.15)"/>
                  <circle cx="120" cy="79" r="18" fill="#b8800a"/>
                  <circle cx="120" cy="79" r="14" fill="none" stroke="rgba(255,230,100,0.4)" strokeWidth="1"/>
                  <text x="120" y="85" textAnchor="middle" fontSize="14" fill="rgba(255,230,100,0.9)"
                    fontFamily="Georgia, serif">✦</text>
                </motion.g>
              </svg>

              {/* Letter sliding out on open */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    style={{
                      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                      width: 180, height: 120,
                      background: "linear-gradient(160deg, #fdf8ee, #faf4e4)",
                      borderRadius: 6,
                      boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                      border: "1px solid rgba(212,168,32,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: -60, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span style={{ fontSize: 28, filter: "drop-shadow(0 2px 6px rgba(180,120,0,0.4))" }}>✉️</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Gold burst on open */}
            <AnimatePresence>
              {isOpening && (
                <>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <GoldRay key={i} angle={i * 30} delay={0.05 + i * 0.02} />
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <GoldSpark key={i} delay={0.05 + Math.random() * 0.15} />
                  ))}
                  <motion.div className="absolute pointer-events-none rounded-full"
                    style={{ border: "2px solid rgba(212,168,32,0.5)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                    initial={{ width: 20, height: 20, opacity: 1 }}
                    animate={{ width: 380, height: 380, opacity: 0 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                  />
                  <motion.div className="absolute pointer-events-none rounded-full"
                    style={{ border: "1px solid rgba(232,204,112,0.25)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                    initial={{ width: 20, height: 20, opacity: 1 }}
                    animate={{ width: 560, height: 560, opacity: 0 }}
                    transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
                  />
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(212,168,32,0.25) 0%, transparent 55%)" }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 1.8] }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                  />
                </>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isOpening && (
                <motion.div className="mt-10 flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <motion.p
                    style={{ fontSize: 11, letterSpacing: "0.08em",
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                      color: "rgba(212,168,32,0.5)" }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    มีจดหมายถึงคุณ
                  </motion.p>
                  <motion.p
                    className="font-kanit font-light tracking-[0.35em] text-xs"
                    style={{ color: "rgba(232,204,112,0.6)" }}
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    แตะเพื่อเปิด
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== BABY ==================== */}
        {theme === "baby" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fffaf4 0%, #fff0e4 50%, #fff8f4 100%)" }}
            onClick={handleInteraction}
          >
            {/* Floating pastel particles */}
            {Array.from({ length: 44 }).map((_, i) => (
              <BabyDust key={i} delay={i * 0.11} />
            ))}

            {/* Soft lavender/pink bg glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 320, height: 320,
                background: "radial-gradient(circle, rgba(255,200,145,0.18) 0%, rgba(255,165,110,0.10) 50%, transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -60%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.07, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            />

            {/* Floating mini balloons — corner decoration */}
            {[
              { color: "#e07858", light: "#ffd0b8", left: "12%", top: "16%", size: 26, delay: 0 },
              { color: "#d4a858", light: "#f8e0a0", left: "76%", top: "12%", size: 22, delay: 0.6 },
              { color: "#e05878", light: "#f8b8c8", left: "80%", top: "44%", size: 19, delay: 1.1 },
              { color: "#e0a840", light: "#f8e090", left: "8%",  top: "46%", size: 20, delay: 0.4 },
            ].map((b, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: b.left, top: b.top }}
                animate={isOpening ? { y: -90, opacity: 0 } : { y: [0, -7, 0] }}
                transition={
                  isOpening
                    ? { duration: 0.65, delay: i * 0.05 }
                    : { repeat: Infinity, duration: 3.2 + i * 0.5, delay: b.delay, ease: "easeInOut" }
                }
              >
                <svg width={b.size} height={Math.round(b.size * 1.28)} viewBox="0 0 30 38">
                  <defs>
                    <radialGradient id={`mbg${i}`} cx="35%" cy="28%" r="64%">
                      <stop offset="0%"   stopColor={b.light} />
                      <stop offset="100%" stopColor={b.color} />
                    </radialGradient>
                  </defs>
                  <ellipse cx="15" cy="14" rx="13" ry="14" fill={`url(#mbg${i})`} />
                  <ellipse cx="10" cy="9"  rx="4"  ry="5"  fill="rgba(255,255,255,0.38)" />
                  <path d="M12 28 L15 33 L18 28 Z" fill={b.color} />
                  <path d="M15 33 Q17 38 13 42" stroke="rgba(190,140,100,0.28)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}

            {/* Baby scene — center hero */}
            <div className="mb-2">
              <BabyScene isOpening={isOpening} />
            </div>

            {/* Confetti burst on open */}
            <AnimatePresence>
              {isOpening && (
                <>
                  {Array.from({ length: 44 }).map((_, i) => (
                    <BabySpark key={i} delay={i * 0.018} />
                  ))}

                  {/* Lavender shockwave */}
                  <motion.div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                      border: "2px solid rgba(225,138,88,0.45)",
                      top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                    initial={{ width: 20, height: 20, opacity: 1 }}
                    animate={{ width: 380, height: 380, opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />

                  {/* Second pink ring */}
                  <motion.div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                      border: "1px solid rgba(255,178,110,0.3)",
                      top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                    initial={{ width: 20, height: 20, opacity: 1 }}
                    animate={{ width: 530, height: 530, opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
                  />

                  {/* Core flash — pastel */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,210,155,0.40) 0%, transparent 55%)" }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 0.85, 0], scale: [0.3, 1.15, 1.9] }}
                    transition={{ duration: 0.95, ease: "easeOut" }}
                  />
                </>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isOpening && (
                <motion.p
                  className="font-kanit font-light tracking-[0.35em] text-xs"
                  style={{ color: "rgba(175, 105, 70, 0.72)" }}
                  animate={{ opacity: [0.35, 0.82, 0.35] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  แตะเพื่อต้อนรับน้องใหม่
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
