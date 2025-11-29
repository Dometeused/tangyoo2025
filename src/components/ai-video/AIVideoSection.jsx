// src/components/ai-video/VideoAISection.jsx

"use client";
import { useState } from "react";
import VideoAIPromptForm from "./VideoAIPromptForm";
import VideoAIResult from "./VideoAIResult";

export default function VideoAISection({ event, images = [] }) {
  // ถ้ามีวิดีโอจริง (จาก supabase) ให้แสดงเลย
  if (event.ai_video_url) {
    return (
      <div className="bg-white/90 rounded-2xl p-6 shadow-lg max-w-[420px] w-full mx-auto mb-6 border border-gray-100">
        <h3 className="font-bold text-xl mb-3 text-gray-800 text-center tracking-tight">
          วิดีโอ “ถ้อยคำสุดท้าย” (AI)
        </h3>
        <video
          src={event.ai_video_url}
          className="w-full rounded-xl border mb-3"
          style={{ aspectRatio: "9/16", maxHeight: 420, objectFit: "cover" }}
          controls
        />
        <div className="text-xs text-gray-400 mt-3 text-center">
          วิดีโอนี้สร้างเฉพาะครอบครัวนี้เท่านั้น <br />
          หากต้องการเปลี่ยนแปลง ติดต่อแอดมิน (Demo, ยังไม่ต่อ API จริง)
        </div>
      </div>
    );
  }

  // ถ้ายังไม่มีวิดีโอ → แสดงฟอร์ม
  // ------ mock เดิม ------
  const [step, setStep] = useState("form");
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit({ imageUrl, message }) {
    setStep("loading");
    setError("");
    setSelectedImage(imageUrl);
    setMessage(message);
    try {
      await new Promise(r => setTimeout(r, 1800));
      const video_url = "/demo-funeral-ai-video.mp4"; // mock video
      setVideoUrl(video_url);
      setStep("result");
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      setStep("error");
    }
  }

  function handleRetry() {
    setStep("form");
    setError("");
    setVideoUrl("");
    setSelectedImage(null);
    setMessage("");
  }

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-lg max-w-[420px] w-full mx-auto mb-6 border border-gray-100">
      <h3 className="font-bold text-xl mb-3 text-gray-800 text-center tracking-tight">
        วิดีโอ “ถ้อยคำสุดท้าย” (AI)
      </h3>
      {step === "form" && (
        <VideoAIPromptForm
          images={images}
          onSubmit={handleSubmit}
        />
      )}
      {step === "loading" && (
        <VideoAIResult loading />
      )}
      {step === "result" && (
        <VideoAIResult
          videoUrl={videoUrl}
          message={message}
          onRetry={handleRetry}
          portrait
        />
      )}
      {step === "error" && (
        <VideoAIResult
          error={error}
          onRetry={handleRetry}
        />
      )}
      <div className="text-xs text-gray-400 mt-3 text-center">
        หมายเหตุ: วิดีโอ AI สำหรับงานศพ<br />
        (Demo - ยังไม่ต่อ API จริง)
      </div>
    </div>
  );
}
