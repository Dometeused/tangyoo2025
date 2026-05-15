"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageCircle, Mic } from "lucide-react"; // Added Mic
import MessageBubble from "./MessageBubble";

export default function AIGuideBubble({ event }) {
    const [isOpen, setIsOpen] = useState(false);
    // ... existing state ...
    const [messages, setMessages] = useState([
        { id: 1, text: `สวัสดีครับ ผมคือผู้ดูแลความทรงจำของ "${event?.name || 'งานนี้'}" มีเรื่องราวไหนอยากให้ผมเล่าให้ฟังไหมครับ?`, isAi: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [isListening, setIsListening] = useState(false); // Added State

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("ขออภัยครับ เบราว์เซอร์ของคุณไม่รองรับการพิมพ์ด้วยเสียง (แนะนำ Google Chrome)");
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'th-TH';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(prev => prev + " " + transcript);
        };
        recognition.start();
    };

    const getSuggestions = (theme) => {
        switch (theme) {
            case 'wedding':
                return ["ขอเพลงหน่อย", "ดูรูปพรีเว็ดดิ้ง", "เขียนคำอวยพร", "กำหนดการช่วงเช้า"];
            case 'funeral':
                return ["กำหนดการสวด", "ส่งพวงหรีด", "ร่วมทำบุญ", "แผนที่วัด"];
            case 'anniversary':
                return ["ดูวิดีโอครบรอบ", "เขียนโน้ตถึงกัน", "ดูรูปวันแรก"];
            default:
                return ["ถามกำหนดการ", "ดูรูปภาพ", "เขียนคำอวยพร"];
        }
    };

    const handleSend = async (manualText = "") => {
        const text = manualText || inputValue;
        if (!text.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), text, isAi: false };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Call API
            const res = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages.map(m => ({ role: m.isAi ? 'model' : 'user', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text }] }],
                    eventId: event?.id,
                    theme: event?.theme
                })
            });

            if (!res.ok) throw new Error("Failed");

            const data = await res.json();
            const aiMsg = { id: Date.now() + 1, text: data.reply, isAi: true };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "ขออภัยครับ ระบบขัดข้องเล็กน้อย ลองใหม่นะครับ", isAi: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border border-pink-100 group"
                >
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <MessageCircle size={28} className="text-pink-500 group-hover:text-pink-600" />
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                        ถามไกด์
                    </span>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[60] w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <Sparkles size={16} className="text-pink-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-gray-700">Memory Keeper</h3>
                                    <p className="text-[10px] text-gray-500">ผู้ดูแลความทรงจำ</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} isAi={msg.isAi} />
                            ))}
                            {isTyping && <div className="text-xs text-gray-400 ml-2 animate-pulse">กำลังเรียบเรียง...</div>}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Chips */}
                        <div className="px-4 pb-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
                            {getSuggestions(event?.theme).map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setInputValue(q); handleSend(q); }}
                                    className="whitespace-nowrap px-3 py-1 bg-gray-100 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 border border-transparent rounded-full text-xs text-gray-600 transition-all"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
                            <button
                                onClick={startListening}
                                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-pink-500'}`}
                            >
                                <Mic size={18} />
                            </button>
                            <input
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-300"
                                placeholder={isListening ? "พูดได้เลยครับ..." : "ถามเกี่ยวกับงานนี้..."}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
