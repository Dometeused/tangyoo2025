"use client";
export const dynamic = "force-dynamic";
;
import React, { useState, useRef, useEffect } from 'react';
import ChatPanel from './components/ChatPanel';
import DraftPanel from './components/DraftPanel';

export default function RealtimeCreationPage() {
    // State for Chat
    const [messages, setMessages] = useState([
        { text: "สวัสดีครับ มีอะไรให้ผมช่วยบันทึกวันนี้ครับ?", sender: "ai" }
    ]);
    const [isStreaming, setIsStreaming] = useState(false);

    // State for Draft (The "Realtime" part)
    const [draftData, setDraftData] = useState({
        readyToCreate: false,
        name: "",
        date: "",
        place: "",
        theme: "",
        gallery: {} // Store gallery assignments
    });

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem('tangyoo_chat_history');
        const savedDraft = localStorage.getItem('tangyoo_draft_data');

        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) { console.error("Failed to load chat history", e); }
        }

        if (savedDraft) {
            try {
                setDraftData(JSON.parse(savedDraft));
            } catch (e) { console.error("Failed to load draft data", e); }
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (messages.length > 1) { // Don't save if only initial message
            localStorage.setItem('tangyoo_chat_history', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (draftData.name || draftData.date) { // Save only if there's some data
            localStorage.setItem('tangyoo_draft_data', JSON.stringify(draftData));
        }
    }, [draftData]);

    const clearHistory = () => {
        if (confirm("ลบประวัติการแชททั้งหมด?")) {
            localStorage.removeItem('tangyoo_chat_history');
            localStorage.removeItem('tangyoo_draft_data');
            window.location.reload();
        }
    };

    const processAIResponse = async (userMessage) => {
        // 1. Add User Message
        const newMessages = [...messages, { text: userMessage, sender: "user" }];
        setMessages(newMessages);
        setIsStreaming(true);

        try {
            // 2. Add Placeholder for AI Message
            setMessages(prev => [...prev, { text: "", sender: "ai" }]);

            // 3. Call Streaming API
            const response = await fetch('/api/ai-chat/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("API Error:", response.status, errText);
                throw new Error(`Stream failed: ${response.status} ${errText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;

                // Update UI with current text
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1].text = accumulatedText;
                    return updated;
                });

                // Real-time Parsing for JSON
                extractDraftData(accumulatedText);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { text: "ขออภัยครับ ระบบมีปัญหาเล็กน้อย", sender: "ai" }]);
        } finally {
            setIsStreaming(false);
        }
    };

    const extractDraftData = (text) => {
        // Look for JSON block ```json ... ```
        const jsonMatch = text.match(/```json([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                const data = JSON.parse(jsonMatch[1]);

                // Handle Gallery Updates
                // Merge gallery slots if present

                // Handle Generation Trigger
                if (data.gen_image?.trigger && !draftData.isGenerating) {
                    // Check if we already started or finished to prevent loops
                    // For MVP: Toggle a flag
                    setDraftData(prev => {
                        if (prev.isGenerating || prev.generatedImage) return prev; // Already handled

                        // Start Simulation
                        setTimeout(() => {
                            setDraftData(d => ({
                                ...d,
                                isGenerating: false,
                                // Mock Result - normally this comes from Banana API
                                generatedImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
                            }));
                        }, 3000);

                        return { ...prev, ...data, isGenerating: true };
                    });
                } else {
                    // Standard update (info + gallery)
                    // Standard update (info + gallery)
                    setDraftData(prev => {
                        const next = { ...prev, ...data };

                        // Map 'poster' object to flat fields if present
                        if (data.poster) {
                            next.poster_name = data.poster.name;
                            next.poster_caption = data.poster.caption;
                            next.living = data.poster.years;
                            next.word = data.poster.word;
                        }

                        if (data.gallery) {
                            // If AI assigns a slot, check if it implies the *just uploaded* image
                            // For MVP, if user just uploaded an image and AI updates gallery immediately, 
                            // we assume the AI is assigning THAT image to the slot.

                            const newGallery = { ...prev.gallery };

                            Object.keys(data.gallery).forEach(key => {
                                // If the AI returns a value, use it.
                                // But if we have a lastUploadedImage and the AI is reacting to it, 
                                // we might want to inject it.
                                // Heuristic: If value is "UPLOADED" or similar placeholder, or just simply if we have one.
                                // Simplified Logic: If `lastUploadedImage` exists, and AI assigns a slot, verify? 
                                // No, usually AI will just echo back. Since AI can't "see" the blob URL, it might send "..." or empty.

                                // FORCE: If we have `lastUploadedImage`, and AI updates ANY gallery slot, assign it there and clear buffer.
                                if (prev.lastUploadedImage) {
                                    newGallery[key] = prev.lastUploadedImage;
                                    // Clear it so it doesn't get assigned to everything
                                    next.lastUploadedImage = null;
                                } else {
                                    newGallery[key] = data.gallery[key];
                                }
                            });

                            next.gallery = newGallery;
                        }
                        return next;
                    });
                }

            } catch (e) {
                // Incomplete JSON or parsing error is expected during streaming
                // We just ignore it until it's valid
            }
        }
    };

    // Mobile Tab State
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'preview'

    return (
        <main className="flex flex-col md:flex-row h-screen w-full bg-gray-900 text-white overflow-hidden relative">

            {/* Mobile Tab Switcher (Floating Top) */}
            <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-50 flex bg-gray-800/90 backdrop-blur-md rounded-full p-1 shadow-2xl border border-gray-700">
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Chat
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Preview
                    {/* Tiny dot to show update */}
                    {draftData.name && activeTab !== 'preview' && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                </button>
            </div>

            {/* Left: Chat Sidebar */}
            <div className={`
                w-full md:w-[400px] lg:w-[450px] h-full border-r border-[#333] flex flex-col transition-transform duration-300 absolute md:relative z-20 shadow-2xl
                ${activeTab === 'chat' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <ChatPanel
                    messages={messages}
                    onSendMessage={processAIResponse}
                    isStreaming={isStreaming}
                    onClear={clearHistory}
                    onImageSelected={(imgSrc) => {
                        // 1. Send the image as a message to the AI context so it "knows"
                        // For MVP: We send a text marker. In a real multimodal app, we'd send the image bytes.
                        processAIResponse(`[IMAGE UPLOADED]`);

                        // 2. Also set it as "last uploaded" in draft data so we can assign it later if AI decides?
                        // Actually, for this flow, let's just let the AI decide where to put it or just use it as 'cover' default if unnamed.
                        setDraftData(prev => ({
                            ...prev,
                            lastUploadedImage: imgSrc
                        }));
                    }}
                />
            </div>

            {/* Right: Preview / Draft Main Area */}
            <div className={`
                flex-1 h-full bg-[#0a0a0a] relative transition-transform duration-300 absolute md:relative z-10
                ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
                <DraftPanel data={draftData} />
            </div>
        </main>
    );
}
