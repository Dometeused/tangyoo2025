// /app/page.js (Landing Page)
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const THEMES = [
	{
		key: "funeral",
		label: "งานอาลัย",
		bg: "bg-zinc-900",
		text: "text-white",
		dot: "bg-zinc-400",
		ctaClass: "bg-zinc-900 hover:bg-zinc-800",
		image: "/images/funeral.png",
		title: "สร้างหน้าอาลัย บันทึกความทรงจำสุดท้าย",
		desc: "ให้ 'ตั้งอยู่' เก็บความหมายอาลัย ไม่ให้ความทรงจำหายไป",
		cta: "สร้างหน้าอาลัย",
		ctaLink: "/creation?theme=funeral",
		menuCTA: "สร้างหน้าอาลัย",
		middleSection: {
			image: "/images/qr2way-funeral.png",
			title: "เชื่อมโยงความทรงจำ… จากวันแรกถึงวันอาลัย",
			desc: "QR Code 2-Phase ของ 'ตั้งอยู่' จะอยู่กับคุณในทุกช่วงเวลา ไม่ว่าก่อนหรือหลังวันสำคัญ ความทรงจำจะไม่มีวันหายไป",
		},
		catalog: [
			{
				name: "กรอบรูปอาลัย",
				img: "/images/catalog-souvenir-funeral-1.png",
				link: "#",
			},
			{
				name: "ของชำร่วยอาลัย",
				img: "/images/catalog-souvenir-funeral-2.png",
				link: "#",
			},
			{
				name: "แก้วน้ำอาลัย",
				img: "/images/catalog-souvenir-funeral-3.png",
				link: "#",
			},
		],
	},
	{
		key: "anniversary",
		label: "งานครบรอบ/ของขวัญ",
		bg: "bg-blue-50",
		text: "text-blue-800",
		dot: "bg-blue-400",
		ctaClass: "bg-blue-500 hover:bg-blue-600",
		image: "/images/anniversary.png",
		title: "ของขวัญความทรงจำ สำหรับคนพิเศษ",
		desc: "ส่งต่อความรู้สึกดี ๆ ในวันสำคัญ ด้วยของขวัญที่มีเรื่องราว",
		cta: "สร้างของขวัญพิเศษ",
		ctaLink: "/creation?theme=anniversary",
		menuCTA: "สร้างของขวัญพิเศษ",
		middleSection: {
			image: "/images/anniversary-gift.png",
			title: "ของขวัญที่มีความหมาย… เฉพาะคุณ",
			desc: "ทุก Memory Page คือกล่องความทรงจำที่ออกแบบมาเพื่อวันสำคัญ ให้ความรู้สึกพิเศษที่ไม่มีใครเหมือน",
		},
		catalog: [
			{
				name: "เคสโทรศัพท์",
				img: "/images/catalog-souvenir-anniversary-1.png",
				link: "#",
			},
			{
				name: "กรอบรูปตั้งโต๊ะ",
				img: "/images/catalog-souvenir-anniversary-2.png",
				link: "#",
			},
			{
				name: "เสื้อคู่ความทรงจำ",
				img: "/images/catalog-souvenir-anniversary-3.png",
				link: "#",
			},
		],
	},
	{
		key: "wedding",
		label: "งานแต่ง",
		bg: "bg-pink-50",
		text: "text-pink-700",
		dot: "bg-pink-400",
		ctaClass: "bg-pink-500 hover:bg-pink-600",
		image: "/images/wedding.png",
		title: "เก็บทุกโมเมนต์แห่งความรัก",
		desc: "รวมภาพความประทับใจและคำอวยพรสำคัญในวันแต่งงาน",
		cta: "สร้างหน้าแต่งงาน",
		ctaLink: "/creation?theme=wedding",
		menuCTA: "สร้างหน้าแต่งงาน",
		middleSection: {
			image: "/images/qr2way-wedding.png",
			title: "เก็บความทรงจำทุกโมเมนต์แห่งความรัก",
			desc: "QR Code 2-Phase สำหรับงานแต่งงาน เก็บทั้งบรรยากาศงานและเรื่องราวหลังวันสำคัญ ให้ความรักยัง ‘ตั้งอยู่’ กับคุณเสมอ",
		},
		catalog: [
			{
				name: "ที่เปิดขวดที่ระลึก",
				img: "/images/catalog-souvenir-wedding-1.png",
				link: "#",
			},
			{
				name: "สมุดโน๊ตคู่รัก",
				img: "/images/catalog-souvenir-wedding-2.png",
				link: "#",
			},
			{
				name: "แก้วน้ำแต่งงาน",
				img: "/images/catalog-souvenir-wedding-3.png",
				link: "#",
			},
		],
	},
];

export default function Home() {
	const [themeIdx, setThemeIdx] = useState(2); // default "งานแต่ง"
	const theme = THEMES[themeIdx];

	return (
		<div
			className={`min-h-screen flex flex-col font-kanit transition-colors duration-500 ${theme.bg} ${theme.text}`}
		>
			{/* Hero Section */}
			<HeroSection
				current={themeIdx}
				onChange={setThemeIdx}
				THEMES={THEMES}
			/>

			

			{/* QR2Phase Feature (with CTA buttons under the box) */}
			<section className="flex flex-col md:flex-row gap-10 items-center justify-center my-8 px-6 max-w-5xl mx-auto">
				<div className="flex-1 flex justify-center">
					<Image
						src={theme.middleSection.image}
						alt="special"
						width={
							theme.key === "anniversary" ? 340 : 250
						}
						height={220}
						className="rounded-xl shadow-lg"
					/>
				</div>
				<div className="flex-1 max-w-xl text-left bg-white/80 rounded-xl shadow p-6">
					<h2 className="font-bold text-2xl mb-3 text-orange-700">
						{theme.middleSection.title}
					</h2>
					<p className="text-base md:text-lg leading-relaxed text-gray-700 font-medium mb-5">
						{theme.middleSection.desc}
					</p>
					<div className="flex gap-3 mt-2">
						<Link
							href="/features"
							className="flex-1 px-4 py-3 rounded-full font-bold shadow bg-orange-500 text-white hover:bg-orange-600 transition text-base text-center"
						>
							รู้จักฟีเจอร์ของเรา
						</Link>
						<Link
							href="/about"
							className="flex-1 px-4 py-3 rounded-full font-bold shadow bg-gray-100 text-gray-800 hover:bg-gray-200 transition text-base text-center"
						>
							About Us
						</Link>
					</div>
				</div>
			</section>

			{/* Catalog */}
			<section className="max-w-6xl mx-auto py-12 px-4">
				<h2 className="text-center font-bold text-2xl mb-8 text-orange-700">
					คาตาล็อคของขวัญ
				</h2>
				<div className="grid gap-6 sm:grid-cols-3">
					{theme.catalog.map((item, idx) => (
						<a
							key={idx}
							href="/catalog"
							className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-xl transition group border border-orange-50"
							style={{ textDecoration: "none" }}
						>
							<Image
								src={item.img}
								alt={item.name}
								width={140}
								height={140}
								className="rounded-lg mb-3 group-hover:scale-105 transition"
							/>
							<span className="font-bold text-lg mb-1 text-gray-900">
								{item.name}
							</span>
							<span className="mt-2 px-5 py-2 rounded-full bg-orange-500 text-white text-xs group-hover:bg-orange-600 transition cursor-pointer">
								ดูรายละเอียด
							</span>
						</a>
					))}
				</div>
			</section>

			{/* Painpoint */}
			<section className="flex flex-col items-center my-12">
				<Image
					src="/images/painpoint.png"
					alt="Pain Point"
					width={640}
					height={426}
					className="rounded-2xl shadow-lg"
					priority
				/>
			</section>

			{/* Early Access CTA */}
			<section className="bg-orange-50 py-14 mt-8">
				<div className="max-w-2xl mx-auto text-center px-4">
					<div className="text-4xl mb-4">✨</div>
					<h2 className="font-bold text-2xl mb-3 text-orange-700">
						เป็นคนแรกที่สร้างความทรงจำกับ TangYoo
					</h2>
					<p className="text-gray-600 mb-8 leading-relaxed">
						TangYoo กำลังเปิดให้ใช้งาน Early Access — ลองสร้างหน้างานแรกของคุณได้เลย
						ฟรี ไม่ต้องใช้บัตรเครดิต
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							href="/creation"
							className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-lg shadow-lg hover:bg-orange-600 transition"
						>
							สร้างหน้างานฟรี
						</Link>
						<Link
							href="/about"
							className="px-8 py-4 rounded-full bg-white border border-orange-200 text-orange-600 font-bold text-lg hover:bg-orange-50 transition"
						>
							เรียนรู้เพิ่มเติม
						</Link>
					</div>
					<div className="flex justify-center gap-8 mt-10 text-sm text-gray-500">
						<div className="flex flex-col items-center gap-1">
							<span className="text-2xl font-bold text-orange-600">3</span>
							<span>ประเภทงาน</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<span className="text-2xl font-bold text-orange-600">QR</span>
							<span>2-Phase</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<span className="text-2xl font-bold text-orange-600">∞</span>
							<span>ความทรงจำ</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
