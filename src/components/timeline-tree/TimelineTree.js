// path: src/components/TimelineTree.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrashAlt, FaImage, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Modal from "@/components/Modal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAppMode } from "@/context/AppModeContext";

const TIMELINE_TITLE = {
    wedding: "การเดินทางของเรา",
    funeral: "เรื่องราวความทรงจำ",
    family: "ชีวิตครอบครัว",
};

export default function TimelineTree({ eventId, event, theme = "wedding" }) {
    const [milestones, setMilestones] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        year: "",
        text: "",
        emoji: "",
        image_url: "",
        detail: "",
    });
    const [showEmoji, setShowEmoji] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [showLightbox, setShowLightbox] = useState(null);

    const { role } = useAppMode();

    // Premium Theme Styles
    const getThemeStyles = () => {
        switch (theme) {
            case 'wedding':
                return {
                    line: "bg-rose-200",
                    dot: "bg-rose-500 border-rose-200",
                    accent: "text-rose-600",
                    button: "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200",
                    emojiBg: "bg-rose-50 border-rose-100"
                };
            case 'funeral':
                return {
                    line: "bg-stone-300",
                    dot: "bg-stone-600 border-stone-300",
                    accent: "text-stone-700",
                    button: "bg-stone-700 hover:bg-stone-800 text-white shadow-lg shadow-stone-200",
                    emojiBg: "bg-stone-50 border-stone-200"
                };
            default: // family, annuity etc
                return {
                    line: "bg-indigo-200",
                    dot: "bg-indigo-500 border-indigo-200",
                    accent: "text-indigo-600",
                    button: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200",
                    emojiBg: "bg-indigo-50 border-indigo-100"
                };
        }
    };

    const styles = getThemeStyles();

    // Load milestone
    useEffect(() => {
        if (!eventId) return;
        setLoading(true);
        fetch(`/api/milestones?event_id=${eventId}`)
            .then((res) => res.json())
            .then(({ data }) => setMilestones(data || []))
            .finally(() => setLoading(false));
    }, [eventId]);

    // Final card logic
    const finalCard = {
        isFinal: true,
        year: event?.date ? event.date.slice(0, 4) : "",
        text: theme === "wedding" ? "Our Wedding Day" : "Funeral Day",
        emoji: theme === "wedding" ? "💒" : "🕯️",
        detail: theme === "wedding"
            ? "วันที่สองหัวใจได้มาบรรจบกัน"
            : "วันแห่งการรำลึกและขอบคุณสำหรับทุกความทรงจำ",
    };

    const sorted = [...milestones].sort((a, b) => a.year > b.year ? 1 : -1);
    const timelineCards = [...sorted, finalCard];

    // Handlers
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmojiPick = (emoji) => {
        setForm((prev) => ({ ...prev, emoji: emoji.emoji }));
        setShowEmoji(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        setForm((prev) => ({ ...prev, image_url: preview }));
    };

    const handleAddMilestone = async (e) => {
        e.preventDefault();
        if (!form.year || !form.text) return;
        setLoading(true);
        try {
            const res = await fetch("/api/milestones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, event_id: eventId }),
            });
            const { data } = await res.json();
            if (data) setMilestones((prev) => [...prev, data]);

            setForm({ year: "", text: "", emoji: "", image_url: "", detail: "" });
            setImagePreview(null);
            setShowForm(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("ยืนยันการลบ?")) return;
        setLoading(true);
        try {
            await fetch(`/api/milestones?id=${id}`, { method: "DELETE" });
            setMilestones((prev) => prev.filter((m) => m.id !== id));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16 relative w-full overflow-hidden">
            {/* Central Timeline Line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] z-0 ${styles.line}`} />

            {/* Header */}
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-20 relative z-10 ${styles.accent} font-kanit drop-shadow-sm`}>
                {TIMELINE_TITLE[theme]}
            </h2>

            {/* Cards Container */}
            <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col gap-16">
                {timelineCards.map((m, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isFinal = m.isFinal;

                    return (
                        <motion.div
                            key={m.id || `card-${idx}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`flex w-full md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"
                                }`}
                        >
                            {/* Wrapper */}
                            <div className={`
                                relative pl-20 md:pl-0 w-full md:w-[45%] 
                                ${isLeft ? "md:mr-auto md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"}
                            `}>
                                {/* Connector Dot - Clean & Minimal */}
                                <div className={`
                                    absolute top-8 w-5 h-5 rounded-full z-20 shadow-md ring-4 ring-white
                                    left-[31px] -translate-x-1/2  /* Mobile */
                                    md:left-auto md:translate-x-0 /* Desktop */
                                    ${styles.dot}
                                `}
                                    style={{
                                        ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? {
                                            [isLeft ? 'right' : 'left']: '-65px'
                                        } : {})
                                    }}></div>

                                {/* Desktop Dot Connector Line */}
                                <div className={`hidden md:block absolute top-[42px] h-[2px] w-16 bg-gray-200 z-0
                                     ${isLeft ? "right-0" : "left-0"}
                                `}></div>


                                {/* GLASS CARD */}
                                <div className={`
                                    relative glass-card p-8 transition-all duration-500 group
                                    flex flex-col ${isLeft ? "md:items-end" : "md:items-start"}
                                    border border-white/40
                                `}>
                                    {/* Emoji Floating Badge */}
                                    <div className={`
                                        absolute -top-6 ${isLeft ? "md:-right-6 right-auto left-6" : "md:-left-6 left-6"}
                                        w-14 h-14 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-300
                                        flex items-center justify-center text-3xl shadow-lg border-2 border-white
                                        ${styles.emojiBg}
                                    `}>
                                        {m.emoji || "✨"}
                                    </div>

                                    {/* Content */}
                                    <span className={`text-4xl font-bold font-script mb-2 block ${styles.accent} opacity-80`}>
                                        {m.year}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-2 font-kanit">
                                        {m.text}
                                    </h3>

                                    {m.detail && (
                                        <p className="text-gray-600 text-base font-light leading-relaxed">
                                            {m.detail}
                                        </p>
                                    )}

                                    {/* Image Attachment */}
                                    {m.image_url && !isFinal && (
                                        <div
                                            className="mt-4 relative w-full h-48 rounded-xl overflow-hidden cursor-pointer shadow-md"
                                            onClick={() => setShowLightbox(m.image_url)}
                                        >
                                            <img
                                                src={m.image_url}
                                                alt={m.text}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {role === "owner" && !isFinal && (
                                            <button
                                                onClick={() => handleDelete(m.id)}
                                                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-red-50"
                                            >
                                                <FaTrashAlt size={12} /> ลบ
                                            </button>
                                        )}
                                    </div>

                                    {/* Final Card Add Button */}
                                    {role === "owner" && isFinal && (
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className={`mt-6 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-transform active:scale-95 ${styles.button}`}
                                        >
                                            <FaPlus /> เพิ่มความทรงจำ
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox & Modal (Existing code reused) */}
            {showLightbox && (
                <Modal onClose={() => setShowLightbox(null)}>
                    <img src={showLightbox} className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" alt="Preview" />
                </Modal>
            )}

            {showForm && (
                <Modal onClose={() => setShowForm(false)}>
                    {/* Reusing existing form logic but wrapping in cleaner container if needed */}
                    <form onSubmit={handleAddMilestone} className="w-[90vw] max-w-sm bg-white p-8 rounded-[32px] shadow-2xl relative">
                        <h3 className={`text-2xl font-bold mb-6 text-center ${styles.accent}`}>เพิ่มความทรงจำ</h3>
                        {/* ... (Existing inputs remain similar but can be styled via globals) ... */}
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    name="year"
                                    value={form.year}
                                    onChange={handleFormChange}
                                    placeholder="ปี (Ex. 2024)"
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all font-bold text-gray-700"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className="p-4 bg-gray-100 rounded-2xl text-2xl hover:bg-gray-200 transition-colors"
                                >
                                    {form.emoji || "😊"}
                                </button>
                            </div>

                            {/* Emoji Picker Logic */}
                            {showEmoji && (
                                <div className="absolute z-50 top-20 right-0 shadow-xl rounded-2xl overflow-hidden animate-fade-in-up">
                                    <EmojiPicker onEmojiClick={handleEmojiPick} width={300} height={350} searchDisabled />
                                </div>
                            )}

                            <input
                                name="text"
                                value={form.text}
                                onChange={handleFormChange}
                                placeholder="ชื่อเหตุการณ์"
                                className="w-full p-4 bg-gray-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all font-medium"
                                required
                            />

                            <textarea
                                name="detail"
                                value={form.detail}
                                onChange={handleFormChange}
                                placeholder="รายละเอียด..."
                                rows={3}
                                className="w-full p-4 bg-gray-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all resize-none"
                            />

                            {/* Image Upload Box */}
                            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                {imagePreview ? (
                                    <div className="relative h-40 w-full">
                                        <img src={imagePreview} className="w-full h-full object-cover rounded-xl shadow-sm" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                            เปลี่ยนรูป
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <FaImage size={28} className="mb-2 text-gray-300 group-hover:text-rose-400 transition-colors" />
                                        <span className="text-sm font-medium">อัปโหลดรูปภาพ</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-8 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all ${styles.button}`}
                        >
                            {loading ? "กำลังบันทึก..." : "บันทึกความทรงจำ"}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
