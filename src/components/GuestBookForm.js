"use client";
import { useState, useEffect } from "react";
import { useAppMode } from "@/context/AppModeContext";

// PROMPT 10 ข้อต่อธีม
const PROMPT_BY_THEME = {
  wedding: [
    "💌 โมเมนต์สุดประทับใจของคุณกับคู่บ่าวสาว?",
    "🎉 มีอะไรอยากอวยพรให้กับทั้งสองคน?",
    "💑 คุณรู้จักเจ้าบ่าวเจ้าสาวได้ยังไง?",
    "📸 อัปโหลดรูปคู่ หรือรูปที่คุณชอบ",
    "🌸 คุณรู้สึกอย่างไรในงานนี้?",
    "👰 ความทรงจำสนุกๆ ที่เคยมีด้วยกัน?",
    "💖 เหตุการณ์ที่คุณซึ้งใจเกี่ยวกับคู่รักนี้",
    "🌺 เพลง/หนัง/สิ่งที่ทำให้นึกถึงบ่าวสาว?",
    "🍰 เมนูเด็ดในงานวันนี้ที่ชอบ?",
    "✍️ ฝากข้อคิดหรือแง่คิดดี ๆ ถึงชีวิตคู่",
  ],
  funeral: [
    "🕯️ ความทรงจำดี ๆ ที่อยากฝากถึงผู้วายชนม์",
    "🌿 มีคำลาส่งท้ายหรือคำขอบคุณไหม?",
    "🙏 คุณอยากให้กำลังใจครอบครัวหรือเพื่อน ๆ อย่างไร?",
    "📸 แชร์ภาพหรือเหตุการณ์ลึกซึ้ง",
    "💬 มีเรื่องเล่าเกี่ยวกับผู้วายชนม์ที่อยากแบ่งปันไหม?",
    "🪔 สิ่งที่คุณจะจดจำตลอดไปเกี่ยวกับท่าน",
    "🌻 คุณอยากบอกอะไรกับผู้วายชนม์ถ้าเขาได้ยิน",
    "🤍 สิ่งดี ๆ ที่เคยได้รับจากท่าน",
    "📖 คำสอนหรือข้อคิดที่คุณได้จากผู้วายชนม์",
    "🫂 ช่วงเวลาที่ท่านช่วยเหลือ/ให้กำลังใจคุณ",
  ],
  family: [
    "🎈 ความสุขที่ได้อยู่กับเจ้าของวันเกิด?",
    "🥳 เรื่องขำ ๆ หรือประทับใจที่อยากเล่า",
    "🎂 มีคำอวยพรหรือความในใจไหม?",
    "📸 อัปโหลดรูป/วิดีโอโมเมนต์น่ารัก ๆ",
    "🌟 ความรู้สึกในวันนี้เป็นยังไง?",
    "🎁 ของขวัญในใจที่อยากมอบให้ (ไม่ต้องเป็นของจริงก็ได้!)",
    "👨‍👩‍👧‍👦 กิจกรรมในครอบครัวที่ชอบที่สุด?",
    "🍽️ เมนูที่ทำให้นึกถึงเจ้าของวันเกิด",
    "💬 ถ้าจะบอกอะไรกับเจ้าของวันเกิด 1 ประโยค จะพูดว่าอะไร?",
    "📝 เล่าเหตุการณ์น่าประทับใจที่เคยเกิดร่วมกัน",
  ],
};

const themeStyleMap = {
  wedding: {
    btn: "bg-pink-500 hover:bg-pink-600 text-white",
    border: "border-pink-200",
  },
  funeral: {
    btn: "bg-gray-700 hover:bg-gray-800 text-white",
    border: "border-gray-600",
  },
  family: {
    btn: "bg-yellow-400 hover:bg-yellow-500 text-white",
    border: "border-yellow-300",
  },
};

export default function GuestBookForm({ theme, memoryId, onSubmitSuccess }) {
  const { role } = useAppMode();
  if (role !== "guest" && role !== "owner") return null;

  const PROMPTS = PROMPT_BY_THEME[theme] || PROMPT_BY_THEME["wedding"];
  const style = themeStyleMap[theme] || themeStyleMap["wedding"];

  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPrompt(PROMPTS[0]);
  }, [theme]);

  const handleRandomPrompt = () => {
    const otherPrompts = PROMPTS.filter((p) => p !== prompt);
    setPrompt(otherPrompts[Math.floor(Math.random() * otherPrompts.length)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        uploadedUrl = json.url;
      }

      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memoryId,
          name,
          message,
          prompt,
          imageUrl: uploadedUrl,
        }),
      });

      alert("ขอบคุณที่ฝาก Guest Book 💖");
      setName("");
      setPrompt(PROMPTS[0]);
      setMessage("");
      setImageFile(null);
      setImageUrl("");

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการส่งข้อความ");
      console.error(err);
    }

    setSubmitting(false);
  };

  const filePreview = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto space-y-4 border ${style.border}`}
    >
      <h2 className="text-2xl font-extrabold text-center text-gray-700 mb-3">Guest Book</h2>

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
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
        className={`${style.btn} font-bold px-6 py-3 rounded-2xl shadow flex items-center justify-center gap-2 text-lg`}
      >
        ฝาก Guest Book
      </button>
    </form>
  );
}
