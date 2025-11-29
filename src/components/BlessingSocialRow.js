"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAppMode } from "@/context/AppModeContext";
import SocialMediaButton from "@/components/SocialMediaButton";

const BTN_THEME = {
  wedding: "bg-pink-400 hover:bg-pink-300 text-white",
  funeral: "bg-gray-400 hover:bg-gray-500 text-white",
  anniversary: "bg-yellow-400 hover:bg-yellow-300 text-white",
};

export default function BlessingSocialRow({ socialProps = {} }) {
  const { theme } = useAppMode();
  const [showEffect, setShowEffect] = useState(false);

  // DEBUG: log socialProps ทุกครั้งที่ render
  console.log("[BlessingSocialRow] socialProps =", socialProps);

  const handleClick = () => {
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 800);
  };

  const emoji = theme === "wedding" ? "💖" : theme === "funeral" ? "🕯️" : "🎁";
  const label =
    theme === "wedding"
      ? "ส่งหัวใจ"
      : theme === "funeral"
      ? "จุดเทียนไว้อาลัย"
      : "ส่งของขวัญ";

  const btnClass = BTN_THEME[theme] || BTN_THEME["wedding"];

  return (
    <div className="flex flex-col items-center gap-2 my-4">
      {/* ปุ่มหัวใจ/ไว้อาลัย/ของขวัญ */}
      <div className="relative flex flex-col items-center">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          className={`px-6 py-2 rounded-xl font-semibold text-lg shadow ${btnClass}`}
        >
          {emoji} {label}
        </motion.button>

        <AnimatePresence>
          {showEffect && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: [1, 0.7, 0],
                scale: [1.2, 2, 2.4],
                y: -80,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 text-4xl"
            >
              {emoji}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SocialMediaButton */}
      <div className="flex gap-4 mt-2">
        <SocialMediaButton {...socialProps} />
      </div>
    </div>
  );
}
