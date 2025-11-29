// pages/index.js (Landing Page)
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import DotThemeSwitcher from "@/components/DotThemeSwitcher";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const THEMES = [
	{
		key: "funeral",
		label: "งานอาลัย",
		bg: "bg-zinc-900",
		text: "text-white",
		dot: "bg-zinc-800",
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
	const [themeIdx, setThemeIdx] = useState(1); // default "งานครบรอบ"
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

			{/* Testimonial */}
			<section className="bg-orange-50 py-12 mt-8">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="font-bold text-2xl mb-6 text-orange-700">
						เสียงจากผู้ใช้บริการ
					</h2>
					<div className="flex flex-col gap-8">
						{/* Testimonial Item */}
						<div className="bg-white p-6 rounded-xl shadow-md">
							<p className="text-gray-900 mb-4">
								"บริการของ TangYoo ช่วยให้การจัดงานอาลัยเป็นเรื่องง่ายและมีความหมาย ลูกเล่น QR Code ทำให้สามารถเก็บความทรงจำได้อย่างครบถ้วน"
							</p>
							<div className="flex items-center justify-center gap-4">
								<span className="text-4xl">🧑‍🦳</span>
								<div className="text-left">
									<span className="block font-semibold text-gray-900">
										คุณสมชาย ใจดี
									</span>
									<span className="block text-sm text-gray-500">
										ผู้ใช้บริการงานอาลัย
									</span>
								</div>
							</div>
						</div>
						{/* Testimonial Item */}
						<div className="bg-white p-6 rounded-xl shadow-md">
							<p className="text-gray-900 mb-4">
								"ของขวัญจาก TangYoo ทำให้วันครบรอบของเราพิเศษยิ่งขึ้น การออกแบบกรอบรูปและสมุดโน๊ตคู่รักทำได้ดีมาก ๆ ค่ะ"
							</p>
							<div className="flex items-center justify-center gap-4">
								<span className="text-4xl">👩🏻‍🦰</span>
								<div className="text-left">
									<span className="block font-semibold text-gray-900">
										คุณหญิง สวยงาม
									</span>
									<span className="block text-sm text-gray-500">
										ผู้ใช้บริการงานครบรอบ
									</span>
								</div>
							</div>
						</div>
						{/* Testimonial Item */}
						<div className="bg-white p-6 rounded-xl shadow-md">
							<p className="text-gray-900 mb-4">
								"งานแต่งงานของเราเต็มไปด้วยความทรงจำที่สวยงาม ขอบคุณ TangYoo ที่ทำให้เราสามารถเก็บทุกโมเมนต์ได้อย่างมีค่า"
							</p>
							<div className="flex items-center justify-center gap-4">
								<span className="text-4xl">👩🏻‍❤️‍👨🏼</span>
								<div className="text-left">
									<span className="block font-semibold text-gray-900">
										คุณเจมส์ และ คุณปุ้ย
									</span>
									<span className="block text-sm text-gray-500">
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
