"use client";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export default function MessageBubble({ message, isAi }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full mb-4 ${isAi ? "justify-start" : "justify-end"}`}
        >
            <div className={`flex max-w-[80%] md:max-w-[70%] items-end gap-2 ${isAi ? "flex-row" : "flex-row-reverse"}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isAi ? "bg-gradient-to-tr from-blue-400 to-purple-400 shadow-md" : "bg-gray-200"
                    }`}>
                    {isAi ? <Bot size={16} className="text-white" /> : <User size={16} className="text-gray-500" />}
                </div>

                {/* Bubble */}
                <div
                    className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${isAi
                            ? "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                        }`}
                >
                    {message.text}
                </div>
            </div>
        </motion.div>
    );
}
