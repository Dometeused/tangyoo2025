"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Mic } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function AIChatWindow({ isOpen, onClose, onComplete }) {
    const [listenError, setListenError] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "สวัสดีครับ! ผมคือ TangYoo AI ผู้ช่วยเก็บความทรงจำของคุณครับ 🤖✨", isAi: true },
        { id: 2, text: "วันนี้คุณอยากจะสร้างพื้นที่ความทรงจำสำหรับโอกาสพิเศษอะไรครับ? (เช่น วันครบรอบ, วันเกิด, หรือบันทึกการเติบโตของลูกน้อย)", isAi: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // User Message
        const newUserMsg = { id: Date.now(), text: inputValue, isAi: false };
        const updatedMessages = [...messages, newUserMsg];
        setMessages(updatedMessages);
        setInputValue("");
        setIsTyping(true);

        try {
            // Call Real AI
            const res = await fetch("/api/ai-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });
            const data = await res.json();

            if (data.success) {
                const aiResponseText = data.reply;
                const newAiMsg = { id: Date.now() + 1, text: aiResponseText, isAi: true };
                setMessages(prev => [...prev, newAiMsg]);

                // EXTRACT MAGIC JSON RESPONSE
                const jsonMatch = aiResponseText.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch && jsonMatch[1]) {
                    try {
                        const extractedData = JSON.parse(jsonMatch[1]);
                        if (extractedData.readyToCreate) {
                            if (onComplete) onComplete(extractedData);
                        }
                    } catch {
                        // Silently ignore JSON parse errors
                    }
                }

            } else {
                const newAiMsg = { id: Date.now() + 1, text: "ขออภัยครับ ระบบขัดข้องเล็กน้อย (กรุณาเช็ค API Key) 😅", isAi: true };
                setMessages(prev => [...prev, newAiMsg]);
            }
        } catch {
            const newAiMsg = { id: Date.now() + 1, text: "เกิดข้อผิดพลาดในการเชื่อมต่อครับ", isAi: true };
            setMessages(prev => [...prev, newAiMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    // Voice Typing
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            setListenError("เบราว์เซอร์ของคุณไม่รองรับการพิมพ์ด้วยเสียง (แนะนำ Google Chrome)");
            setTimeout(() => setListenError(""), 3000);
            return;
        }
        setListenError("");
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'th-TH'; // Lang Support
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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-2xl bg-[#F8F9FC] rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[80vh] border border-white/50"
                >
                    {/* Header */}
                    <div className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-kanit font-bold text-lg text-gray-800">
                                    TangYoo AI Storyteller
                                    {isListening && <span className="ml-2 text-red-500 text-xs animate-pulse">● กำลังฟัง...</span>}
                                </h3>
                                <p className="text-xs text-blue-500 font-medium">กำลังรับฟังคุณอยู่...</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-400 hover:text-gray-600" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-[url('/grid-pattern.svg')]">
                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} isAi={msg.isAi} />
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 text-gray-400 text-sm ml-12 animate-pulse">
                                <span>กำลังพิมพ์...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Listen Error */}
                    {listenError && (
                        <div className="px-4 py-1 bg-red-50 text-red-500 text-xs text-center border-t border-red-100">
                            {listenError}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="relative flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-inner">
                            <button
                                onClick={startListening}
                                className={`p-2 transition-all rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-blue-500'}`}
                            >
                                <Mic size={20} />
                            </button>
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 font-kanit placeholder-gray-400"
                                placeholder={isListening ? "พูดได้เลยครับ..." : "เล่าเรื่องราวของคุณที่นี่..."}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all transform active:scale-95"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-gray-400 mt-2 font-kanit">
                            AI อาจมีข้อผิดพลาด โปรดตรวจสอบความถูกต้องของข้อมูล
                        </p>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
