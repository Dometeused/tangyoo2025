"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay({ theme, onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [animationData, setAnimationData] = useState(null);

    // Load Lottie JSON for baby or anniversary theme
    useEffect(() => {
        let animationFile = null;
        if (theme === "baby") animationFile = "/animations/baby-born.json";
        if (theme === "anniversary" || theme === "birthday") animationFile = "/animations/gift-box.json";

        if (animationFile) {
            fetch(animationFile)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load animation");
                    return res.json();
                })
                .then((data) => setAnimationData(data))
                .catch((err) => console.error("Lottie Load Error:", err));
        }
    }, [theme]);

    const handleInteraction = () => {
        if (isOpening) return;
        setIsOpening(true);

        // Delay for animation before actually hiding
        setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 1500); // 1.5s transition time
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* ==================== BABY & ANNIVERSARY (LOTTIE) ==================== */}
                    {(theme === "baby" || theme === "anniversary" || theme === "birthday") && (
                        <div className={`absolute inset-0 flex items-center justify-center ${theme === 'baby' ? 'bg-blue-50' : 'bg-[#fff0f5]'}`}>
                            {animationData ? (
                                <div className="w-full max-w-md cursor-pointer relative" onClick={handleInteraction}>
                                    <Lottie
                                        animationData={animationData}
                                        loop={false}
                                        onComplete={handleInteraction} // Auto close when lottie finishes
                                    />
                                    {/* Tap Hint */}
                                    <p className="text-center mt-4 text-gray-500 animate-pulse font-kanit">
                                        {theme === 'baby' ? 'แตะเพื่อต้อนรับเบบี๋' : 'แตะเพื่อเปิดของขวัญ 🎁'}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-gray-400 animate-pulse" onClick={handleInteraction}>
                                    Loading Baby Animation...
                                </div>
                            )}
                        </div>
                    )}

                    {/* ==================== ANNIVERSARY (GIFT BOX - LOTTIE OR 3D CSS) ==================== */}
                    {(theme === "anniversary" || theme === "birthday") && (
                        <div
                            className="absolute inset-0 bg-orange-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                            onClick={handleInteraction}
                        >
                            {animationData ? (
                                /* Lottie Version (If file exists) */
                                <div className="w-full max-w-md relative">
                                    <Lottie
                                        animationData={animationData}
                                        loop={false}
                                        onComplete={handleInteraction}
                                    />
                                    <p className="text-center mt-4 text-orange-400 font-kanit animate-pulse">
                                        กำลังเปิดของขวัญ...
                                    </p>
                                </div>
                            ) : (
                                /* 3D CSS Version (Fallback) - BIGGER & SURPRISING */
                                <div className="relative group scale-125 md:scale-150">
                                    {/* Box Container */}
                                    <motion.div
                                        className="relative w-64 h-64"
                                        animate={isOpening ? { scale: [1, 1.1, 1.5] } : {}}
                                        transition={{ duration: 0.5 }}
                                    >

                                        {/* Lid Group */}
                                        <motion.div
                                            className="absolute top-0 left-0 w-full z-20"
                                            initial={{ y: 0 }}
                                            animate={isOpening ? { y: -100, rotateX: 140, opacity: 0 } : { y: [0, -8, 0] }}
                                            transition={isOpening ? { duration: 0.6 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            style={{ transformOrigin: "top" }}
                                        >
                                            {/* Lid Top */}
                                            <div className="h-16 w-full bg-orange-400 rounded-t-2xl relative shadow-md border-b-8 border-orange-600/20">
                                                {/* Ribbon Horizontal */}
                                                <div className="absolute left-1/2 -translate-x-1/2 h-full w-12 bg-red-500 shadow-sm"></div>
                                                {/* Bow */}
                                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl drop-shadow-2xl filter brightness-110">🎀</div>
                                            </div>
                                        </motion.div>

                                        {/* Box Body */}
                                        <div className="absolute top-12 left-0 w-full h-52 bg-orange-300 rounded-b-3xl shadow-2xl flex items-center justify-center overflow-hidden border-t border-orange-300">
                                            {/* Ribbon Vertical */}
                                            <div className="h-full w-12 bg-red-500/90 shadow-inner"></div>

                                            {/* Shadow/Depth inside */}
                                            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/20 to-transparent"></div>
                                        </div>

                                        {/* Confetti Explosion - MASSIVE */}
                                        <AnimatePresence>
                                            {isOpening && (
                                                <>
                                                    {[...Array(60)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full z-50"
                                                            style={{
                                                                backgroundColor: ["#FFD700", "#FF69B4", "#00BFFF", "#32CD32", "#FF4500"][i % 5],
                                                            }}
                                                            initial={{ scale: 0, x: 0, y: 0 }}
                                                            animate={{
                                                                scale: [0, 1.5, 0],
                                                                x: (Math.random() - 0.5) * 1000,
                                                                y: (Math.random() - 0.5) * 1000 - 200,
                                                                rotate: Math.random() * 720,
                                                            }}
                                                            transition={{ duration: 2, ease: "easeOut" }}
                                                        />
                                                    ))}
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                                        animate={{ opacity: 1, scale: 3, y: -100, rotate: [0, -10, 10, 0] }}
                                                        className="absolute top-0 left-1/2 -translate-x-1/2 z-40 text-6xl font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] whitespace-nowrap"
                                                    >
                                                        🎉 SURPRISE! 🎉
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>

                                        {/* Particles/Sparkles on active */}
                                        <AnimatePresence>
                                            {!isOpening && (
                                                <motion.div
                                                    className="absolute -inset-10 z-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    <div className="w-full h-full bg-orange-400/30 blur-3xl rounded-full animate-pulse"></div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.p
                                        className="mt-20 text-center text-orange-800 font-kanit text-2xl font-bold tracking-wide drop-shadow-sm"
                                        animate={{ opacity: [0.6, 1, 0.6], y: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        {isOpening ? "WOOOO!" : "แตะเพื่อเปิดของขวัญ"}
                                    </motion.p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ==================== WEDDING (FLOWER CURTAIN) ==================== */}
                    {theme === "wedding" && (
                        <div
                            className="absolute inset-0 pointer-events-auto cursor-pointer"
                            onClick={handleInteraction}
                        >
                            {/* Left Curtain */}
                            <motion.div
                                className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-pink-100 to-pink-200 border-r-4 border-pink-300 flex items-center justify-end pr-4"
                                animate={isOpening ? { x: "-100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            >
                                <span className="text-6xl filter drop-shadow-lg">🌹🌸</span>
                            </motion.div>

                            {/* Right Curtain */}
                            <motion.div
                                className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-pink-100 to-pink-200 border-l-4 border-pink-300 flex items-center justify-start pl-4"
                                animate={isOpening ? { x: "100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            >
                                <span className="text-6xl filter drop-shadow-lg transform scale-x-[-1]">🌹🌸</span>
                            </motion.div>

                            {!isOpening && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-pink-600 font-kanit text-lg shadow-xl animate-bounce">
                                        แตะเพื่อเข้างาน
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ==================== FUNERAL (CANDLE) ==================== */}
                    {theme === "funeral" && (
                        <motion.div
                            className="absolute inset-0 bg-black flex flex-col items-center justify-center cursor-pointer"
                            onClick={handleInteraction}
                            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            {/* Candle Glow */}
                            <div className="relative mb-6">
                                <div className="w-4 h-12 bg-orange-200 rounded-md mx-auto relative z-10 animate-pulse"></div>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl animate-bounce">🔥</div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
                            </div>

                            <p className="text-gray-400 font-kanit font-light tracking-widest text-sm mt-4">
                                แด่ความทรงจำ...
                            </p>
                        </motion.div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
