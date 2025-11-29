"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlessingGiftButton() {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setCount(c => c + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 900);
  };

  return (
    <div className="flex flex-col items-center my-4 relative">
      <button
        className="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow transition transform hover:scale-110"
        onClick={handleClick}
      >
        🎁 ส่งของขวัญ
      </button>
      <div className="text-xs mt-1 text-blue-600">{count} ครั้ง</div>
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 2, 1.4, 1], opacity: [1, 0.7, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: "absolute",
              zIndex: 50,
              fontSize: "2.5em",
              top: "-30px"
            }}
          >
            🎁
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
