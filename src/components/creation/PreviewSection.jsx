import { useState } from "react";
import Image from "next/image";
import { THEMES } from "@/data/themes";
import { ArrowLeft, ArrowRight, Eye, Smartphone } from "lucide-react";

export default function PreviewSection({ themeKey, onBack, onNext }) {
    const [phase, setPhase] = useState(1); // 1 = Invitation, 2 = Memory
    const theme = THEMES.find((t) => t.key === themeKey);

    if (!theme) return null;

    // Mock Data based on theme
    const mockData = {
        title: themeKey === "wedding" ? "James & Pui Wedding" : themeKey === "funeral" ? "In Loving Memory of Grandfather" : "Happy Anniversary 10th Year",
        date: "12 December 2024",
        message: themeKey === "wedding"
            ? "ขอเชิญร่วมเป็นสักขีพยานในงานมงคลสมรสของเรา..."
            : themeKey === "funeral"
                ? "ด้วยความอาลัยรักยิ่ง..."
                : "ขอบคุณที่อยู่เคียงข้างกันมาตลอด 10 ปี...",
        image: theme.image
    };

    return (
        <div className="w-full max-w-5xl mx-auto animation-fadeIn">
            {/* Navigation & Title */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>ย้อนกลับ</span>
                </button>
                <h2 className="text-2xl font-bold font-kanit">ตัวอย่าง {theme.label}</h2>
                <div className="w-20"></div> {/* Spacer */}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Phone Preview Container */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
                        {/* Phase Switcher inside Phone UI */}
                        <div className="absolute top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md p-4 pt-12 text-center text-white">
                            <span className="text-sm font-medium tracking-wide opacity-80 uppercase">
                                {phase === 1 ? "Phase 1: Invitation" : "Phase 2: Memory Page"}
                            </span>
                        </div>

                        {/* Content Area */}
                        <div className={`w-full h-full overflow-y-auto ${themeKey === 'funeral' ? 'bg-zinc-900 text-white' : themeKey === 'wedding' ? 'bg-pink-50 text-pink-900' : 'bg-blue-50 text-blue-900'}`}>

                            {/* Hero Image */}
                            <div className="relative w-full h-64">
                                <Image src={mockData.image} alt="Cover" fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative -mt-10">
                                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg text-center">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">{mockData.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{mockData.date}</p>

                                    {phase === 1 ? (
                                        /* Phase 1 Content */
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-700 leading-relaxed">{mockData.message}</p>
                                            <button className={`w-full py-2 rounded-full text-sm font-bold text-white ${theme.ctaClass}`}>
                                                RSVP / ลงทะเบียน
                                            </button>
                                            <div className="text-xs text-gray-400 mt-2">
                                                *นี่คือตัวอย่างหน้าการ์ดเชิญ
                                            </div>
                                        </div>
                                    ) : (
                                        /* Phase 2 Content */
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                                                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                                                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                                            </div>
                                            <p className="text-sm text-gray-700">ขอบคุณแขกผู้มีเกียรติทุกท่าน...</p>

                                            {/* Comments Mockup */}
                                            <div className="bg-gray-50 p-3 rounded-xl text-left">
                                                <div className="flex gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                                                    <div className="text-xs bg-white p-2 rounded-lg shadow-sm w-full">
                                                        <span className="font-bold block">Guest Name</span>
                                                        งานสวยมากครับ ยินดีด้วยนะครับ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Side */}
                <div className="w-full lg:w-1/2 space-y-8 py-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Smartphone size={24} className="text-orange-500" />
                            ทดลองเปลี่ยนสถานะ
                        </h3>
                        <p className="text-gray-600 mb-6">
                            QR Code ของ TangYoo เป็นแบบ 2-Phase สามารถเปลี่ยนหน้าปลายทางได้ตลอดเวลา ลองกดสลับดูนะครับ
                        </p>

                        <div className="flex gap-4 p-1 bg-gray-100 rounded-full w-full">
                            <button
                                onClick={() => setPhase(1)}
                                className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all ${phase === 1
                                        ? 'bg-white shadow-md text-orange-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Phase 1: Invitation
                            </button>
                            <button
                                onClick={() => setPhase(2)}
                                className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all ${phase === 2
                                        ? 'bg-white shadow-md text-orange-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Phase 2: Memory
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={onNext}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            ใช้รูปแบบนี้ <ArrowRight />
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            คุณสามารถแก้ไขข้อมูลและรูปภาพทั้งหมดได้ในขั้นตอนถัดไป
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
