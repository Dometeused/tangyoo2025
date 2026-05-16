"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumEnvelope({ theme, onOpen }) {
    const [isOpen, setIsOpen] = useState(false);

    // Theme Styles
    const styles = {
        wedding: {
            envelope: "bg-rose-50 border-rose-100",
            flap: "bg-rose-100 border-rose-200",
            seal: "bg-rose-500", // Pink Seal
            text: "text-rose-800",
            sealText: "Wedding",
        },
        anniversary: {
            envelope: "bg-amber-50 border-amber-100",
            flap: "bg-amber-100 border-amber-200",
            seal: "bg-amber-600", // Gold/Amber Seal
            text: "text-amber-900",
            sealText: "Memory",
        },
        baby: {
            envelope: "bg-purple-50 border-purple-100",
            flap: "bg-purple-100 border-purple-200",
            seal: "bg-purple-500",
            text: "text-purple-900",
            sealText: "Baby",
        },
        funeral: {
            envelope: "bg-gray-100 border-gray-200",
            flap: "bg-gray-200 border-gray-300",
            seal: "bg-gray-700",
            text: "text-gray-900",
            sealText: "In Memory",
        }
    };

    const currentStyle = styles[theme] || styles.wedding;

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Wait for animation to finish before calling onOpen
        setTimeout(onOpen, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            {/* 3D Envelope Container */}
            <motion.div
                className="relative w-full max-w-lg aspect-[4/3] perspective-1000"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{
                    scale: isOpen ? 1.5 : 1,
                    opacity: isOpen ? 0 : 1,
                    y: isOpen ? 100 : 0
                }}
                transition={{
                    scale: { duration: 1.5, ease: "easeInOut" },
                    opacity: { delay: 1, duration: 0.5 },
                    y: { delay: 0.5, duration: 1 }
                }}
            >

                {/* Envelope Body (Back) */}
                <div className={`absolute inset-0 rounded-lg shadow-2xl ${currentStyle.envelope} border-4`}></div>

                {/* Content Card (Hidden Inside) */}
                <motion.div
                    className="absolute inset-x-4 bottom-4 top-12 bg-white rounded-md shadow-inner flex flex-col items-center justify-center p-6 text-center"
                    initial={{ y: 0 }}
                    animate={{ y: isOpen ? -150 : 0 }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                >
                    <div className={`text-xl font-bold font-kanit ${currentStyle.text}`}>
                        {theme === 'wedding' ? 'คำเชิญล้ำค่า' : 'ความทรงจำที่คิดถึง'}
                    </div>
                    <div className="text-gray-400 text-sm mt-2">แตะที่ครั่งเพื่อเปิด</div>
                </motion.div>

                {/* Envelope Flap (Bottom - Static) */}
                <div className={`absolute bottom-0 left-0 right-0 h-1/2 rounded-b-lg border-t-2 border-dashed border-black/5 z-10 ${currentStyle.envelope}`}
                    style={{ clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)" }}>
                </div>

                {/* Envelope Flap (Left/Right - Static) */}
                <div className={`absolute inset-0 z-10 pointer-events-none opacity-50`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-black/5" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-black/5" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}></div>
                </div>


                {/* Top Flap (Animated) */}
                <motion.div
                    className={`absolute top-0 left-0 right-0 h-1/2 origin-top z-20 flex items-end justify-center ${currentStyle.flap} rounded-t-lg shadow-md`}
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        transformStyle: "preserve-3d"
                    }}
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Wax Seal Button (Attached to tip of flap) */}
                    <motion.button
                        onClick={handleOpen}
                        className={`absolute bottom-[10%] w-16 h-16 rounded-full shadow-xl flex items-center justify-center border-4 border-yellow-400/30 ${currentStyle.seal} text-white font-serif font-bold tracking-widest cursor-pointer z-30 group`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ opacity: isOpen ? 0 : 1 }}
                    >
                        <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-[10px]">
                            {currentStyle.sealText}
                        </div>
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    );
}
