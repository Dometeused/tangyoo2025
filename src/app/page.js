"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { THEMES } from "@/data/themes";
import TimelineFeatureSection from "@/components/TimelineFeatureSection";

/* ─── Per-theme colour maps ─────────────────────────────────────────── */
function getThemeVars(key) {
	switch (key) {
		case "funeral":
			return {
				accent:      "#f97316",
				accentGlow:  "rgba(249,115,22,0.14)",
				dark:        "#0c0a09",
				gradFrom:    "#9a3412",
				gradTo:      "#ea580c",
				/* catalog */
				cardBorder:  "border-orange-800/40",
				cardHoverBg: "group-hover:from-orange-900/30 group-hover:via-amber-900/20 group-hover:to-orange-900/30",
				imgBg:       "from-stone-800 via-stone-900 to-stone-800",
				ctaFrom:     "#ea580c",
				ctaTo:       "#c2410c",
				ctaHoverFrom:"#f97316",
				ctaHoverTo:  "#ea580c",
				/* testimonials */
				testimonialBgFrom: "#1c1917",  // stone-900
				testimonialBgVia:  "#292524",  // stone-800
				testimonialBgTo:   "#1c1917",
				dotColor:    "rgba(249,115,22,0.18)",
				/* text */
				quoteColors: ["text-orange-400/25","text-amber-400/25","text-orange-300/25"],
				divBorders:  ["border-orange-900/40","border-amber-900/30","border-orange-800/30"],
			};
		case "wedding":
			return {
				accent:      "#f43f7e",
				accentGlow:  "rgba(244,63,126,0.14)",
				dark:        "#1a000f",
				gradFrom:    "#9d174d",
				gradTo:      "#f43f7e",
				/* catalog */
				cardBorder:  "border-pink-100/60",
				cardHoverBg: "group-hover:from-pink-100/30 group-hover:via-rose-100/20 group-hover:to-pink-50/30",
				imgBg:       "from-pink-50 via-rose-50 to-pink-50",
				ctaFrom:     "#ec4899",
				ctaTo:       "#f43f7e",
				ctaHoverFrom:"#db2777",
				ctaHoverTo:  "#e11d48",
				/* testimonials */
				testimonialBgFrom: "#fdf2f8",
				testimonialBgVia:  "#fff1f2",
				testimonialBgTo:   "#fdf2f8",
				dotColor:    "rgba(244,63,126,0.14)",
				/* text */
				quoteColors: ["text-pink-200/40","text-rose-200/35","text-pink-300/30"],
				divBorders:  ["border-pink-100/60","border-rose-100/50","border-pink-200/40"],
			};
		default: /* anniversary */
			return {
				accent:      "#f59e0b",
				accentGlow:  "rgba(245,158,11,0.14)",
				dark:        "#1c0a00",
				gradFrom:    "#b45309",
				gradTo:      "#d97706",
				/* catalog */
				cardBorder:  "border-amber-100/60",
				cardHoverBg: "group-hover:from-amber-100/30 group-hover:via-orange-100/20 group-hover:to-yellow-50/30",
				imgBg:       "from-amber-50 via-yellow-50 to-orange-50",
				ctaFrom:     "#f59e0b",
				ctaTo:       "#d97706",
				ctaHoverFrom:"#d97706",
				ctaHoverTo:  "#b45309",
				/* testimonials */
				testimonialBgFrom: "#fffbeb",
				testimonialBgVia:  "#fff7ed",
				testimonialBgTo:   "#fefce8",
				dotColor:    "rgba(245,158,11,0.14)",
				/* text */
				quoteColors: ["text-orange-200/35","text-rose-200/30","text-amber-200/35"],
				divBorders:  ["border-orange-100/50","border-rose-100/50","border-amber-100/50"],
			};
	}
}

export default function Home() {
	const [themeIdx, setThemeIdx] = useState(1); // default "งานครบรอบ"
	const theme = THEMES[themeIdx];
	const tv = getThemeVars(theme.key);

	/* ── Sync CSS variables + data-attribute so Footer/Header pick them up ── */
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty("--landing-accent",      tv.accent);
		root.style.setProperty("--landing-accent-glow", tv.accentGlow);
		root.style.setProperty("--landing-dark",        tv.dark);
		root.style.setProperty("--landing-grad-from",   tv.gradFrom);
		root.style.setProperty("--landing-grad-to",     tv.gradTo);
		// data attribute for Header MutationObserver (more reliable than style watch)
		document.body.setAttribute("data-landing-theme", theme.key);
	}, [theme.key, tv.accent, tv.accentGlow, tv.dark, tv.gradFrom, tv.gradTo]);

	return (
		<div
			className={`min-h-screen flex flex-col font-kanit transition-colors duration-500 ${theme.bg} ${theme.text}`}
		>
			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<HeroSection current={themeIdx} onChange={setThemeIdx} THEMES={THEMES} />

			{/* ── Timeline Feature Section ─────────────────────────────────── */}
			<TimelineFeatureSection theme={theme} />

			{/* ── Catalog Section ──────────────────────────────────────────── */}
			<section className="py-20 px-4 sm:px-6 w-full">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="font-bold text-4xl md:text-5xl mb-4 text-gradient-warm">
							คาตาล็อคของขวัญ
						</h2>
						<p className={`text-lg max-w-2xl mx-auto ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
							ของขวัญพิเศษที่ออกแบบมาเพื่อความทรงจำที่ไม่รู้ลืม
						</p>
						<div className="divider-warm w-32 mx-auto mt-6" />
					</div>

					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{theme.catalog.map((item, idx) => (
							<Link
								key={idx}
								href="/catalog"
								className={`glass-strong rounded-3xl shadow-warm-lg p-8 flex flex-col items-center card-hover border-2 ${tv.cardBorder} overflow-hidden relative group`}
								style={{ animationDelay: `${idx * 0.1}s` }}
							>
								{/* Hover glow overlay */}
								<div
									className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent ${tv.cardHoverBg} transition-all duration-500`}
								/>

								{/* Item image */}
								<div
									className={`relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-gradient-to-br ${tv.imgBg} shadow-warm`}
								>
									<Image
										src={item.img}
										alt={item.name}
										width={250}
										height={250}
										loading="lazy"
										className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
									/>
								</div>

								{/* Name */}
								<span
									className="relative font-bold text-xl mb-5 text-center transition-colors"
									style={{ color: theme.key === "funeral" ? "#e7e5e4" : "#1c1917" }}
								>
									{item.name}
								</span>

								{/* CTA pill */}
								<span
									className="relative px-8 py-3 rounded-full text-white text-base font-semibold transition-all duration-300 cursor-pointer shadow-warm-lg group-hover:shadow-warm-xl group-hover:scale-105"
									style={{
										background: `linear-gradient(to right, ${tv.ctaFrom}, ${tv.ctaTo})`,
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background = `linear-gradient(to right, ${tv.ctaHoverFrom}, ${tv.ctaHoverTo})`)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = `linear-gradient(to right, ${tv.ctaFrom}, ${tv.ctaTo})`)
									}
								>
									ดูรายละเอียด
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── Painpoint Section ────────────────────────────────────────── */}
			<section className="py-20 px-4 sm:px-6 w-full">
				<div className="max-w-6xl mx-auto">
					<div className="relative group">
						<div
							className="absolute -inset-6 rounded-[2.5rem] blur-3xl group-hover:blur-[4rem] transition-all duration-700"
							style={{
								background: `linear-gradient(135deg, ${tv.accentGlow}, transparent, ${tv.accentGlow})`,
							}}
						/>
						<Image
							src="/images/painpoint.png"
							alt="Pain Point"
							width={1200}
							height={800}
							loading="lazy"
							className="relative rounded-[2rem] shadow-warm-2xl w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
						/>
					</div>
				</div>
			</section>

			{/* ── Testimonials Section ─────────────────────────────────────── */}
			<section className="relative py-24 mt-12 overflow-hidden w-full">
				{/* Theme-aware gradient background */}
				<div
					className="absolute inset-0 transition-all duration-700"
					style={{
						background: `linear-gradient(135deg, ${tv.testimonialBgFrom}, ${tv.testimonialBgVia}, ${tv.testimonialBgTo})`,
					}}
				/>
				{/* Dot pattern */}
				<div
					className="absolute inset-0 opacity-50"
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, ${tv.dotColor} 1px, transparent 0)`,
						backgroundSize: "48px 48px",
					}}
				/>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="font-bold text-4xl md:text-5xl mb-4 text-gradient-warm">
							เสียงจากผู้ใช้บริการ
						</h2>
						<p
							className="text-lg max-w-2xl mx-auto"
							style={{ color: theme.key === "funeral" ? "#a8a29e" : "#737373" }}
						>
							ความประทับใจจากผู้ที่ไว้วางใจให้เราเก็บรักษาความทรงจำ
						</p>
						<div className="divider-warm w-32 mx-auto mt-6" />
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Testimonial 1 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group">
							<div className={`absolute top-4 right-4 text-6xl ${tv.quoteColors[0]} transition-colors`}>&quot;</div>
							<p className="relative mb-6 leading-relaxed text-base font-light" style={{ color: theme.key === "funeral" ? "#d6d3d1" : "#525252" }}>
								&quot;บริการของ TangYoo ช่วยให้การจัดงานอาลัยเป็นเรื่องง่ายและมีความหมาย ลูกเล่น QR Code ทำให้สามารถเก็บความทรงจำได้อย่างครบถ้วน&quot;
							</p>
							<div className={`flex items-center gap-4 pt-4 border-t-2 ${tv.divBorders[0]}`}>
								<span className="text-5xl">🧑‍🦳</span>
								<div>
									<span className="block font-bold text-lg" style={{ color: theme.key === "funeral" ? "#f5f5f4" : "#171717" }}>คุณสมชาย ใจดี</span>
									<span className="block text-sm mt-1" style={{ color: theme.key === "funeral" ? "#78716c" : "#737373" }}>ผู้ใช้บริการงานอาลัย</span>
								</div>
							</div>
						</div>

						{/* Testimonial 2 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group" style={{ animationDelay: "0.1s" }}>
							<div className={`absolute top-4 right-4 text-6xl ${tv.quoteColors[1]} transition-colors`}>&quot;</div>
							<p className="relative mb-6 leading-relaxed text-base font-light" style={{ color: theme.key === "funeral" ? "#d6d3d1" : "#525252" }}>
								&quot;ของขวัญจาก TangYoo ทำให้วันครบรอบของเราพิเศษยิ่งขึ้น การออกแบบกรอบรูปและสมุดโน๊ตคู่รักทำได้ดีมาก ๆ ค่ะ&quot;
							</p>
							<div className={`flex items-center gap-4 pt-4 border-t-2 ${tv.divBorders[1]}`}>
								<span className="text-5xl">👩🏻‍🦰</span>
								<div>
									<span className="block font-bold text-lg" style={{ color: theme.key === "funeral" ? "#f5f5f4" : "#171717" }}>คุณหญิง สวยงาม</span>
									<span className="block text-sm mt-1" style={{ color: theme.key === "funeral" ? "#78716c" : "#737373" }}>ผู้ใช้บริการงานครบรอบ</span>
								</div>
							</div>
						</div>

						{/* Testimonial 3 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group md:col-span-2 lg:col-span-1" style={{ animationDelay: "0.2s" }}>
							<div className={`absolute top-4 right-4 text-6xl ${tv.quoteColors[2]} transition-colors`}>&quot;</div>
							<p className="relative mb-6 leading-relaxed text-base font-light" style={{ color: theme.key === "funeral" ? "#d6d3d1" : "#525252" }}>
								&quot;งานแต่งงานของเราเต็มไปด้วยความทรงจำที่สวยงาม ขอบคุณ TangYoo ที่ทำให้เราสามารถเก็บทุกโมเมนต์ได้อย่างมีค่า&quot;
							</p>
							<div className={`flex items-center gap-4 pt-4 border-t-2 ${tv.divBorders[2]}`}>
								<span className="text-5xl">👩🏻‍❤️‍👨🏼</span>
								<div>
									<span className="block font-bold text-lg" style={{ color: theme.key === "funeral" ? "#f5f5f4" : "#171717" }}>คุณเจมส์ และ คุณปุ้ย</span>
									<span className="block text-sm mt-1" style={{ color: theme.key === "funeral" ? "#78716c" : "#737373" }}>คู่บ่าวสาวผู้ใช้บริการ</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
