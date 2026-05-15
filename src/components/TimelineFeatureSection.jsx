"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// Helper to get theme-specific colors
const getThemeColors = (themeKey) => {
    switch (themeKey) {
        case 'wedding':
            return {
                line: '#ec4899', // pink-500
                glow: 'rgba(236, 72, 153, 0.5)',
                bg: 'bg-pink-50'
            };
        case 'funeral':
            return {
                line: '#52525b', // zinc-600
                glow: 'rgba(82, 82, 91, 0.5)',
                bg: 'bg-zinc-50'
            };
        case 'anniversary':
        default:
            return {
                line: '#3b82f6', // blue-500
                glow: 'rgba(59, 130, 246, 0.5)',
                bg: 'bg-indigo-50'
            };
    }
};

export default function TimelineFeatureSection({ theme }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth out the scroll progress
    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const colors = getThemeColors(theme.key);

    const steps = [
        {
            title: "เริ่มต้นง่ายๆ แค่สแกน",
            desc: "เพียงสแกน QR Code ก็เริ่มต้นสร้างพื้นที่เก็บความทรงจำได้ทันที ไม่ยุ่งยาก",
            icon: "📱",
            align: "left"
        },
        {
            title: "ร่วมสร้างความทรงจำ",
            desc: "แขกในงานสามารถส่งรูป เขียนคำอวยพร หรือแชร์โมเมนต์ประทับใจได้เรียลไทม์",
            icon: "✨",
            align: "right"
        },
        {
            title: "เก็บไว้ตลอดไป",
            desc: "ทุกภาพ ทุกข้อความ จะถูกจัดเก็บอย่างสวยงาม ให้คุณย้อนกลับมาดูได้ทุกเมื่อ",
            icon: "💖",
            align: "left"
        }
    ];

    return (
        <section ref={containerRef} className={`relative py-24 overflow-hidden ${colors.bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

                {/* Section Header */}
                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-warm leading-tight">
                        เส้นทางแห่งความทรงจำ
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        เปลี่ยนช่วงเวลาสำคัญให้กลายเป็นความทรงจำที่จับต้องได้ ด้วย 3 ขั้นตอนง่ายๆ
                    </p>
                </div>

                {/* Desktop SVG Line Background (Hidden on Mobile) */}
                <div className="absolute top-[200px] left-0 right-0 bottom-0 pointer-events-none hidden md:block">
                    <svg
                        className="w-full h-full absolute top-0 left-0"
                        viewBox="0 0 1200 800"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d="M 600 0 C 600 0, 600 150, 400 250 C 200 350, 400 450, 600 500 C 800 550, 1000 650, 600 800"
                            fill="none"
                            stroke={colors.line}
                            strokeWidth="4"
                            strokeDasharray="0 1"
                            style={{
                                pathLength: pathLength,
                                opacity: useTransform(pathLength, [0, 0.1], [0, 1])
                            }}
                        />
                        {/* Optional: Glow effect for the line */}
                        <motion.path
                            d="M 600 0 C 600 0, 600 150, 400 250 C 200 350, 400 450, 600 500 C 800 550, 1000 650, 600 800"
                            fill="none"
                            stroke={colors.glow}
                            strokeWidth="12"
                            strokeOpacity="0.3"
                            style={{
                                pathLength: pathLength,
                                opacity: useTransform(pathLength, [0, 0.1], [0, 0.5])
                            }}
                        />
                    </svg>
                </div>

                {/* Steps Container */}
                <div className="relative z-10 space-y-24 md:space-y-32">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-8 ${step.align === 'right' ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex-1 text-center md:text-left ${step.align === 'right' ? 'md:text-right' : ''
                                    }`}
                            >
                                <div className={`inline-block p-4 rounded-2xl bg-white shadow-warm-lg mb-6 text-4xl transform hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-neutral-600 leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </motion.div>

                            {/* Center Spacer for Desktop SVG Line */}
                            <div className="hidden md:block w-32 relative">
                                {/* Dot indicator on the line */}
                                <motion.div
                                    className="w-8 h-8 rounded-full border-4 border-white shadow-lg mx-auto bg-current"
                                    style={{ color: colors.line, scale: useTransform(scrollYProgress, [0.2 + index * 0.25, 0.3 + index * 0.25], [0.5, 1.2]) }}
                                />
                            </div>

                            {/* Image/Visual Placeholder */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex-1 w-full"
                            >
                                <div className="aspect-video rounded-3xl overflow-hidden glass-strong shadow-warm-lg border-2 border-white/50 relative group">
                                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br from-white to-${colors.bg}`} />
                                    {/* Placeholder for actual Step Image - using theme image as fallback for now or generic illustrations */}
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-light italic">
                                        Visual for Step {index + 1}
                                    </div>
                                    {/* You can replace the div above with actual Images later */}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
