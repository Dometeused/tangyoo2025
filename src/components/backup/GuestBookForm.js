"use client";
import { useState } from "react";

// Prompt สำหรับแต่ละธีม
const PROMPT_BY_THEME = {
  wedding: [
    "💌 โมเมนต์สุดประทับใจของคุณกับคู่บ่าวสาว?",
    "🎉 มีอะไรอยากอวยพรให้กับทั้งสองคน?",
    "💑 รู้จักกันได้ยังไง?",
    "📸 อัปโหลดรูปคู่ หรือรูปที่คุณชอบ",
    "🌸 คุณรู้สึกอย่างไรในงานนี้?",
  ],
  funeral: [
    "🕯️ ความทรงจำดี ๆ ที่อยากฝากถึงผู้วายชนม์",
    "🌿 มีคำลาส่งท้ายหรือคำขอบคุณไหม?",
    "🙏 คุณอยากให้กำลังใจครอบครัวหรือเพื่อน ๆ อย่างไร?",
    "📸 แชร์ภาพหรือเหตุการณ์ลึกซึ้ง",
    "💬 มีเรื่องเล่าเกี่ยวกับผู้วายชนม์ที่อยากแบ่งปันไหม?",
  ],
  family: [
    "🎈 ความสุขที่ได้อยู่กับเจ้าของวันเกิด?",
    "🥳 เรื่องขำ ๆ หรือประทับใจที่อยากเล่า",
    "🎂 มีคำอวยพรหรือความในใจไหม?",
    "📸 อัปโหลดรูป/วิดีโอโมเมนต์น่ารัก ๆ",
    "🌟 ความรู้สึกในวันนี้เป็นยังไง?",
  ],
};

export default function GuestBookForm({ theme = "wedding" }) {
  const PROMPTS = PROMPT_BY_THEME[theme] || PROMPT_BY_THEME["wedding"];
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // เปลี่ยน prompt แบบสุ่ม
  const handleRandomPrompt = () => {
    const otherPrompts = PROMPTS.filter((p) => p !== prompt);
    setPrompt(otherPrompts[Math.floor(Math.random() * otherPrompts.length)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("ขอบคุณที่ฝาก Guest Book 💖");
      setName("");
      setPrompt(PROMPTS[0]);
      setMessage("");
      setFile(null);
      setSubmitting(false);
    }, 1000);
  };

  const filePreview = file ? URL.createObjectURL(file) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto space-y-4 border border-gray-100"
    >
      <h2 className="text-2xl font-extrabold text-center text-gray-700 mb-3">
        Guest Book
      </h2>

      <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-200">
        <span className="font-semibold text-indigo-600">{prompt}</span>
        <button
          type="button"
          className="ml-auto text-blue-500 underline text-xs"
          onClick={handleRandomPrompt}
        >
          สุ่มคำถาม
        </button>
      </div>

      <div>
        <label className="block font-bold mb-1 text-gray-600">ชื่อ/นามแฝง</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:border-blue-400 focus:outline-none"
          type="text"
          placeholder="เช่น พลอย, Anonymous"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-bold mb-1 text-gray-600">ข้อความ</label>
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:border-blue-400 focus:outline-none font-sans"
          rows={4}
          placeholder="หากไม่รู้จะเขียนอะไร ลองตอบคำถามข้างบนก็ได้!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-bold mb-1 text-gray-600">อัปโหลดรูป (ถ้ามี)</label>
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className="mt-3 max-h-40 rounded-xl border border-gray-200 shadow"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow flex items-center justify-center gap-2 text-lg"
      >
        ฝาก Guest Book
      </button>
    </form>
  );
}
