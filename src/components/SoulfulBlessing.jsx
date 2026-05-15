"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THEME_CONFIG = {
  funeral: {
    emoji: "🕯️",
    particles: ["✨", "🕯️", "🕊️", "🤍", "🌸"],
    label: "จุดเทียนไว้อาลัย",
    buttonClass: "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg shadow-orange-500/20",
    glowColor: "rgba(255, 165, 0, 0.35)",
    countColor: "text-amber-400",
    countLabel: "ดวงเทียน",
  },
  wedding: {
    emoji: "💖",
    particles: ["💖", "💗", "💕", "✨", "🌸", "💓", "💞"],
    label: "ส่งหัวใจยินดี",
    buttonClass: "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg shadow-pink-500/30",
    glowColor: "rgba(236, 72, 153, 0.4)",
    countColor: "text-pink-500",
    countLabel: "หัวใจ",
  },
  anniversary: {
    emoji: "🥂",
    particles: ["✨", "🎉", "🥂", "💫", "⭐", "🌟"],
    label: "ร่วมฉลองครบรอบ",
    buttonClass: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.4)",
    countColor: "text-amber-500",
    countLabel: "คนร่วมฉลอง",
  },
  baby: {
    emoji: "🍼",
    particles: ["🍼", "⭐", "🌟", "💛", "🌈"],
    label: "ส่งความปรารถนาดี",
    buttonClass: "bg-gradient-to-r from-yellow-300 to-orange-300 text-white shadow-lg shadow-yellow-400/30",
    glowColor: "rgba(252, 211, 77, 0.4)",
    countColor: "text-yellow-500",
    countLabel: "ความปรารถนาดี",
  },
};

// --- Particle that floats up and fades ---
function Particle({ emoji, startX, onComplete }) {
  const xOffset = (Math.random() - 0.5) * 120;
  const duration = 1.2 + Math.random() * 1;
  const size = 1 + Math.random() * 1.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: startX, scale: 0.4 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -(130 + Math.random() * 100),
        x: startX + xOffset,
        scale: [0.4, size, size * 0.8],
        rotate: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="fixed pointer-events-none select-none z-[9999] text-2xl"
      style={{ top: "50%", left: "50%" }}
    >
      {emoji}
    </motion.div>
  );
}

// --- Ripple burst on click ---
function RippleBurst({ onComplete }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
      style={{ background: "rgba(255,255,255,0.3)" }}
    />
  );
}

export default function SoulfulBlessing({ theme = "wedding", eventId }) {
  const config = THEME_CONFIG[theme] || THEME_CONFIG.wedding;
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [heartCount, setHeartCount] = useState(null); // null = loading
  const [justBumped, setJustBumped] = useState(false);
  const particleIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  // Load heart count on mount
  useEffect(() => {
    if (!eventId || eventId === "preview") return;
    fetch(`/api/events/heart?eventId=${eventId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setHeartCount(d.count); })
      .catch(() => {});
  }, [eventId]);

  const handleClick = useCallback(async () => {
    // Spawn 8-12 particles
    const count = 8 + Math.floor(Math.random() * 5);
    const newParticles = Array.from({ length: count }, () => {
      const id = particleIdRef.current++;
      const emoji = config.particles[Math.floor(Math.random() * config.particles.length)];
      const startX = (Math.random() - 0.5) * 80;
      return { id, emoji, startX };
    });
    setParticles(prev => [...prev, ...newParticles]);

    // Ripple
    const rid = rippleIdRef.current++;
    setRipples(prev => [...prev, rid]);

    // Bump counter optimistically
    setHeartCount(c => (c ?? 0) + 1);
    setJustBumped(true);
    setTimeout(() => setJustBumped(false), 600);

    // Save to DB
    if (eventId && eventId !== "preview") {
      try {
        const res = await fetch("/api/events/heart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        });
        const d = await res.json();
        if (d.success) setHeartCount(d.count);
      } catch {}
    }
  }, [config, eventId]);

  const removeParticle = (id) => setParticles(p => p.filter(x => x.id !== id));
  const removeRipple = (id) => setRipples(p => p.filter(x => x !== id));

  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Floating particles */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} emoji={p.emoji} startX={p.startX} onComplete={() => removeParticle(p.id)} />
        ))}
      </AnimatePresence>

      {/* The Button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.06 }}
        onClick={handleClick}
        className={`relative z-10 px-8 py-3 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 overflow-hidden ${config.buttonClass}`}
        style={{ boxShadow: `0 0 24px ${config.glowColor}, inset 0 0 10px rgba(255,255,255,0.15)` }}
      >
        {/* Ripple overlay */}
        <AnimatePresence>
          {ripples.map(rid => (
            <RippleBurst key={rid} onComplete={() => removeRipple(rid)} />
          ))}
        </AnimatePresence>

        <motion.span
          className="text-2xl filter drop-shadow z-10 relative"
          animate={justBumped ? { scale: [1, 1.6, 1], rotate: [0, -15, 15, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {config.emoji}
        </motion.span>
        <span className="tracking-wide z-10 relative">{config.label}</span>

        {/* Breathing glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white pointer-events-none"
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.button>

      {/* Heart count */}
      {heartCount !== null && heartCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-1 text-sm font-medium ${config.countColor}`}
        >
          <motion.span
            animate={justBumped ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {config.emoji}
          </motion.span>
          <motion.span
            key={heartCount}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="tabular-nums font-bold"
          >
            {heartCount.toLocaleString()}
          </motion.span>
          <span className="opacity-70">{config.countLabel}</span>
        </motion.div>
      )}
    </div>
  );
}
