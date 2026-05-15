"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { THEMES } from "@/data/themes";
import TimelineFeatureSection from "@/components/TimelineFeatureSection";

export default function Home() {
	const [themeIdx, setThemeIdx] = useState(1); // default "งานครบรอบ"
	const theme = THEMES[themeIdx];

	return (
		<div className={`min-h-screen flex flex-col font-kanit transition-colors duration-500 ${theme.bg} ${theme.text}`}>
			{/* Hero Section */}
			<HeroSection
				current={themeIdx}
				onChange={setThemeIdx}
				THEMES={THEMES}
			/>

			{/* Timeline Feature Section (New Interactive Map) */}
			<TimelineFeatureSection theme={theme} />

			{/* Catalog Section */}
			<section className="py-20 px-4 sm:px-6 w-full">
				<div className="max-w-7xl mx-auto">
					{/* Section Header */}
					<div className="text-center mb-16">
						<h2 className="font-bold text-4xl md:text-5xl mb-4 text-gradient-warm">
							คาตาล็อคของขวัญ
						</h2>
						<p className="text-neutral-600 text-lg max-w-2xl mx-auto">
							ของขวัญพิเศษที่ออกแบบมาเพื่อความทรงจำที่ไม่รู้ลืม
						</p>
						<div className="divider-warm w-32 mx-auto mt-6" />
					</div>

					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{theme.catalog.map((item, idx) => (
							<Link
								key={idx}
								href="/catalog"
								className="glass-strong rounded-3xl shadow-warm-lg p-8 flex flex-col items-center card-hover group border-2 border-orange-100/50 overflow-hidden relative"
								style={{ animationDelay: `${idx * 0.1}s` }}
							>
								{/* Background Glow on Hover */}
								<div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 via-orange-100/0 to-rose-100/0 group-hover:from-orange-100/30 group-hover:via-rose-100/20 group-hover:to-amber-100/30 transition-all duration-500" />

								<div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 shadow-warm">
									<Image
										src={item.img}
										alt={item.name}
										width={250}
										height={250}
										loading="lazy"
										className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
									/>
								</div>

								<span className="relative font-bold text-xl mb-5 text-neutral-800 text-center group-hover:text-orange-700 transition-colors">
									{item.name}
								</span>

								<span className="relative px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-semibold group-hover:from-orange-600 group-hover:to-rose-600 transition-all duration-300 cursor-pointer shadow-warm-lg group-hover:shadow-warm-xl">
									ดูรายละเอียด
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Painpoint Section */}
			<section className="py-20 px-4 sm:px-6 w-full">
				<div className="max-w-6xl mx-auto">
					<div className="relative group">
						{/* Glow Effect */}
						<div className="absolute -inset-6 bg-gradient-to-r from-orange-300/20 via-rose-300/20 to-amber-300/20 rounded-[2.5rem] blur-3xl group-hover:blur-[4rem] transition-all duration-700" />

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

			{/* Testimonial Section */}
			<section className="relative py-24 mt-12 overflow-hidden w-full">
				{/* Gradient Background with Pattern */}
				<div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50" />
				<div className="absolute inset-0 opacity-40" style={{
					backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 146, 60, 0.15) 1px, transparent 0)',
					backgroundSize: '48px 48px'
				}} />

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6">
					{/* Section Header */}
					<div className="text-center mb-16">
						<h2 className="font-bold text-4xl md:text-5xl mb-4 text-gradient-warm">
							เสียงจากผู้ใช้บริการ
						</h2>
						<p className="text-neutral-600 text-lg max-w-2xl mx-auto">
							ความประทับใจจากผู้ที่ไว้วางใจให้เราเก็บรักษาความทรงจำ
						</p>
						<div className="divider-warm w-32 mx-auto mt-6" />
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Testimonial 1 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group">
							{/* Quote Icon */}
							<div className="absolute top-4 right-4 text-6xl text-orange-200/30 group-hover:text-orange-300/40 transition-colors">"</div>

							<p className="relative text-neutral-700 mb-6 leading-relaxed text-base font-light">
								"บริการของ TangYoo ช่วยให้การจัดงานอาลัยเป็นเรื่องง่ายและมีความหมาย ลูกเล่น QR Code ทำให้สามารถเก็บความทรงจำได้อย่างครบถ้วน"
							</p>
							<div className="flex items-center gap-4 pt-4 border-t-2 border-orange-100/50">
								<span className="text-5xl">🧑‍🦳</span>
								<div>
									<span className="block font-bold text-neutral-900 text-lg">
										คุณสมชาย ใจดี
									</span>
									<span className="block text-sm text-neutral-500 mt-1">
										ผู้ใช้บริการงานอาลัย
									</span>
								</div>
							</div>
						</div>

						{/* Testimonial 2 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group" style={{ animationDelay: '0.1s' }}>
							<div className="absolute top-4 right-4 text-6xl text-rose-200/30 group-hover:text-rose-300/40 transition-colors">"</div>

							<p className="relative text-neutral-700 mb-6 leading-relaxed text-base font-light">
								"ของขวัญจาก TangYoo ทำให้วันครบรอบของเราพิเศษยิ่งขึ้น การออกแบบกรอบรูปและสมุดโน๊ตคู่รักทำได้ดีมาก ๆ ค่ะ"
							</p>
							<div className="flex items-center gap-4 pt-4 border-t-2 border-rose-100/50">
								<span className="text-5xl">👩🏻‍🦰</span>
								<div>
									<span className="block font-bold text-neutral-900 text-lg">
										คุณหญิง สวยงาม
									</span>
									<span className="block text-sm text-neutral-500 mt-1">
										ผู้ใช้บริการงานครบรอบ
									</span>
								</div>
							</div>
						</div>

						{/* Testimonial 3 */}
						<div className="glass-strong p-8 rounded-3xl shadow-warm-lg card-hover border-2 border-white/50 relative overflow-hidden group md:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
							<div className="absolute top-4 right-4 text-6xl text-amber-200/30 group-hover:text-amber-300/40 transition-colors">"</div>

							<p className="relative text-neutral-700 mb-6 leading-relaxed text-base font-light">
								"งานแต่งงานของเราเต็มไปด้วยความทรงจำที่สวยงาม ขอบคุณ TangYoo ที่ทำให้เราสามารถเก็บทุกโมเมนต์ได้อย่างมีค่า"
							</p>
							<div className="flex items-center gap-4 pt-4 border-t-2 border-amber-100/50">
								<span className="text-5xl">👩🏻‍❤️‍👨🏼</span>
								<div>
									<span className="block font-bold text-neutral-900 text-lg">
										คุณเจมส์ และ คุณปุ้ย
									</span>
									<span className="block text-sm text-neutral-500 mt-1">
										คู่บ่าวสาวผู้ใช้บริการ
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}