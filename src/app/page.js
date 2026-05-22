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
		case "baby":
			return {
				accent:      "#a78bfa",
				accentGlow:  "rgba(167,139,250,0.14)",
				dark:        "#1e1b4b",
				gradFrom:    "#7c3aed",
				gradTo:      "#a78bfa",
				cardBorder:  "border-purple-200/60",
				cardHoverBg: "group-hover:from-purple-100/30 group-hover:via-violet-100/20 group-hover:to-purple-50/30",
				imgBg:       "from-purple-50 via-violet-50 to-purple-50",
				ctaFrom:     "#8b5cf6",
				ctaTo:       "#7c3aed",
				ctaHoverFrom:"#7c3aed",
				ctaHoverTo:  "#6d28d9",
				testimonialBgFrom: "#faf5ff",
				testimonialBgVia:  "#f5f3ff",
				testimonialBgTo:   "#faf5ff",
				dotColor:    "rgba(167,139,250,0.14)",
				quoteColors: ["text-purple-300/35","text-violet-300/30","text-purple-200/35"],
				divBorders:  ["border-purple-100/60","border-violet-100/50","border-purple-200/40"],
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
	const [demoPhase, setDemoPhase] = useState("invitation");
	const theme = THEMES[themeIdx];
	const tv = getThemeVars(theme.key);
	const demoHref = `/demo/${theme.key}/${demoPhase}`;

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

			{/* ── Value Prop — "TangYoo คืออะไร" ──────────────────────────── */}
			<section className="py-20 px-4 sm:px-6 w-full">
				<div className="max-w-5xl mx-auto text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: tv.accent }}>
						แนวคิดของเรา
					</p>
					<h2 className="font-bold text-3xl md:text-5xl mb-6 leading-tight">
						ของชำร่วยธรรมดา<br />
						<span style={{ color: tv.accent }}>ที่สแกนแล้วได้ความทรงจำ</span>
					</h2>
					<p className={`text-lg md:text-xl max-w-2xl mx-auto mb-14 font-light leading-relaxed ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
						TangYoo เปลี่ยนของชำร่วยในงานสำคัญให้กลายเป็น<br className="hidden md:block" />
						หน้าเว็บความทรงจำที่เก็บได้ตลอดไป เพียงสแกน QR บนสินค้า
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{ icon: "📦", title: "รับของชำร่วย", desc: "แขกได้รับของที่ระลึกพร้อม QR code อยู่บนสินค้า" },
							{ icon: "📱", title: "สแกน QR", desc: "สแกนแล้วเปิดหน้าเว็บความทรงจำสวยงามทันที" },
							{ icon: "💾", title: "เก็บไว้ตลอดไป", desc: "รูป คำอวยพร ไทม์ไลน์ เก็บออนไลน์ไม่มีวันหาย" },
						].map((item, i) => (
							<div
								key={i}
								className="glass-strong rounded-3xl p-8 flex flex-col items-center text-center gap-4 border border-white/40"
								style={{ boxShadow: `0 4px 32px ${tv.accentGlow}` }}
							>
								<span className="text-5xl">{item.icon}</span>
								<h3 className="font-bold text-xl">{item.title}</h3>
								<p className={`text-sm leading-relaxed font-light ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Stats Bar ────────────────────────────────────────────────── */}
			<div
				className="py-10 px-4 w-full"
				style={{ background: `linear-gradient(135deg, ${tv.gradFrom}18, ${tv.gradTo}18)` }}
			>
				<div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
					{[
						{ num: "500+", label: "งานที่สร้างแล้ว" },
						{ num: "4",    label: "ธีมให้เลือก" },
						{ num: "10K+", label: "ความทรงจำที่เก็บไว้" },
					].map((s, i) => (
						<div key={i}>
							<div className="font-bold text-3xl md:text-4xl" style={{ color: tv.accent }}>{s.num}</div>
							<div className={`text-sm mt-1 font-light ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>{s.label}</div>
						</div>
					))}
				</div>
			</div>

			{/* ── Demo Preview ─────────────────────────────────────────────── */}
			<section className="py-24 px-4 sm:px-6 w-full">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-14">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: tv.accent }}>
							ตัวอย่างจริง
						</p>
						<h2 className="font-bold text-3xl md:text-5xl mb-4">
							ลองดูก่อนได้เลย
						</h2>
						<p className={`text-lg font-light mb-8 ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
							นี่คือหน้าเว็บความทรงจำจริงๆ ที่แขกจะเห็นเมื่อสแกน QR
						</p>
						{/* Phase Toggle */}
						<div className="inline-flex rounded-full border-2 p-1 gap-1" style={{ borderColor: `${tv.accent}40` }}>
							{[
								{ key: "invitation", label: "📩 ก่อนงาน" },
								{ key: "memory",     label: "💾 หลังงาน" },
							].map((p) => (
								<button
									key={p.key}
									onClick={() => setDemoPhase(p.key)}
									className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
									style={demoPhase === p.key
										? { background: `linear-gradient(to right, ${tv.gradFrom}, ${tv.gradTo})`, color: "#fff" }
										: { color: theme.key === "funeral" ? "#a8a29e" : "#737373" }
									}
								>
									{p.label}
								</button>
							))}
						</div>
					</div>

					<div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
						{/* Phone Mockup */}
						<div className="relative shrink-0">
							{/* Phone frame */}
							<div
								className="relative w-[300px] h-[620px] rounded-[3rem] border-[8px] overflow-hidden shadow-2xl"
								style={{
									borderColor: theme.key === "funeral" ? "#292524" : "#e7e5e3",
									boxShadow: `0 32px 80px ${tv.accentGlow}, 0 0 0 1px ${tv.accent}30`,
								}}
							>
								<iframe
									key={demoHref}
									src={demoHref}
									className="w-full h-full border-0 rounded-[2.4rem]"
									title={`TangYoo Demo — ${theme.label} (${demoPhase})`}
									loading="lazy"
								/>
								{/* Notch */}
								<div
									className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-10"
									style={{ background: theme.key === "funeral" ? "#292524" : "#e7e5e3" }}
								/>
							</div>
							{/* Glow behind phone */}
							<div
								className="absolute inset-0 -z-10 rounded-[3rem] blur-3xl opacity-30"
								style={{ background: `radial-gradient(circle, ${tv.accent}, transparent 70%)` }}
							/>
						</div>

						{/* Text beside phone */}
						<div className="max-w-sm text-center lg:text-left">
							<h3 className="font-bold text-2xl md:text-3xl mb-4">
								หน้าเว็บที่แขกเห็นทันที<br />
								<span style={{ color: tv.accent }}>เมื่อสแกน QR</span>
							</h3>
							<ul className={`space-y-3 mb-8 text-base font-light ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
								{[
									"รูปภาพสวยงาม พร้อมแกลเลอรี",
									"สมุดอวยพรออนไลน์",
									"ไทม์ไลน์เรื่องราว",
									"กำหนดการและแผนที่",
								].map((f, i) => (
									<li key={i} className="flex items-center gap-3 justify-center lg:justify-start">
										<span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white shrink-0" style={{ background: tv.accent }}>✓</span>
										{f}
									</li>
								))}
							</ul>
							<a
								href={demoHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
								style={{ background: `linear-gradient(to right, ${tv.gradFrom}, ${tv.gradTo})` }}
							>
								เปิดดูเต็มหน้าจอ →
							</a>
						</div>
					</div>
				</div>
			</section>

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

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								text: "แขกในงานประทับใจมากค่ะ หลายคนสแกน QR แล้วบอกว่าไม่เคยเห็นของชำร่วยแบบนี้มาก่อน ได้รูปและคำอวยพรกลับไปเก็บด้วย",
								name: "คุณแพร",
								role: "เจ้าของงานแต่งงาน",
								avatar: "👰🏻",
								stars: 5,
								theme: "wedding",
							},
							{
								text: "ครอบครัวรู้สึกซึ้งมากที่มีหน้าเว็บรวมรูปและคำไว้อาลัยให้สแกนดูได้ตลอด ไม่ต้องกังวลว่าความทรงจำจะหาย",
								name: "คุณวิชัย",
								role: "ครอบครัวงานอาลัย",
								avatar: "🙏",
								stars: 5,
								theme: "funeral",
							},
							{
								text: "ซื้อเป็นของขวัญวันครบรอบให้แฟน เขาชอบมากเลย แค่สแกน QR บนกล่องก็เห็น memory page ที่เราทำไว้ให้เขาเลย",
								name: "คุณโอ๊ต",
								role: "ของขวัญครบรอบ",
								avatar: "💑",
								stars: 5,
								theme: "anniversary",
							},
						].map((t, i) => (
							<div
								key={i}
								className="glass-strong p-7 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group flex flex-col"
								style={{ animationDelay: `${i * 0.1}s` }}
							>
								{/* Stars */}
								<div className="flex gap-1 mb-4">
									{Array(t.stars).fill(0).map((_, s) => (
										<span key={s} style={{ color: tv.accent }}>★</span>
									))}
								</div>
								<div className={`absolute top-4 right-5 text-5xl ${tv.quoteColors[i]} transition-colors font-serif`}>&quot;</div>
								<p className="relative mb-6 leading-relaxed text-base font-light flex-1" style={{ color: theme.key === "funeral" ? "#d6d3d1" : "#525252" }}>
									&quot;{t.text}&quot;
								</p>
								<div className={`flex items-center gap-3 pt-4 border-t-2 ${tv.divBorders[i]}`}>
									<span className="text-4xl">{t.avatar}</span>
									<div>
										<span className="block font-bold text-base" style={{ color: theme.key === "funeral" ? "#f5f5f4" : "#171717" }}>{t.name}</span>
										<span className="block text-xs mt-0.5 font-light" style={{ color: theme.key === "funeral" ? "#78716c" : "#737373" }}>{t.role}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Final CTA ────────────────────────────────────────────────── */}
			<section className="py-28 px-4 sm:px-6 w-full relative overflow-hidden">
				{/* Background gradient */}
				<div
					className="absolute inset-0 transition-all duration-700"
					style={{ background: `linear-gradient(135deg, ${tv.gradFrom}22, ${tv.gradTo}11)` }}
				/>
				{/* Glow orbs */}
				<div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: tv.accent }} />
				<div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: tv.gradFrom }} />

				<div className="relative max-w-3xl mx-auto text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: tv.accent }}>
						เริ่มต้นเลย
					</p>
					<h2 className="font-bold text-4xl md:text-6xl mb-6 leading-tight">
						สร้างความทรงจำ<br />
						<span style={{ color: tv.accent }}>ที่ไม่มีวันลืม</span>
					</h2>
					<p className={`text-lg md:text-xl mb-12 font-light max-w-xl mx-auto leading-relaxed ${theme.key === "funeral" ? "text-stone-400" : "text-neutral-500"}`}>
						เปลี่ยนงานสำคัญของคุณให้กลายเป็นความทรงจำดิจิทัลที่เข้าถึงได้ตลอดไป
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href={theme.ctaLink}
							className="px-10 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105 hover:opacity-90 shadow-warm-xl"
							style={{ background: `linear-gradient(to right, ${tv.gradFrom}, ${tv.gradTo})` }}
						>
							{theme.cta} →
						</Link>
						<a
							href={demoHref}
							target="_blank"
							rel="noopener noreferrer"
							className={`px-10 py-4 rounded-full font-semibold text-lg border-2 transition-all hover:scale-105 ${theme.key === "funeral" ? "border-stone-600 text-stone-300 hover:bg-stone-800" : "border-neutral-300 text-neutral-600 hover:bg-white"}`}
						>
							ดูตัวอย่างก่อน
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
