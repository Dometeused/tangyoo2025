"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/creation/ProgressBar";
import ThemeSelectionSection from "@/components/creation/ThemeSelectionSection";
import PreviewSection from "@/components/creation/PreviewSection";
import SuccessSection from "@/components/creation/SuccessSection";
import HelpSection from "@/components/creation/HelpSection";

export default function CreationPage() {
  const [step, setStep] = useState(1);
  const [themeKey, setThemeKey] = useState("");
  const [memoryId, setMemoryId] = useState("");
  const [memorySlug, setMemorySlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const totalStep = 3;

  const handleThemeNext = (selectedThemeKey) => {
    setThemeKey(selectedThemeKey);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePreviewBack = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handlePreviewNext = async (formData) => {
    setCreating(true);
    setCreateError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          date: formData.date,
          place: formData.place,
          theme: themeKey,
          introEffect: true,
        }),
      });
      if (res.status === 401) {
        window.location.href = "/login?redirect=/creation";
        return;
      }
      const json = await res.json();
      if (json.success && json.data?.id) {
        setMemoryId(json.data.id);
        setMemorySlug(json.data.slug || "");
        setStep(3);
        window.scrollTo(0, 0);
      } else {
        setCreateError(`สร้าง Event ไม่สำเร็จ: ${json.error || "กรุณาลองใหม่"}`);
      }
    } catch (err) {
      setCreateError(`เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12 max-w-xl mx-auto">
        <ProgressBar step={step} total={totalStep} />
      </div>

      {step === 1 && (
        <div className="animate-fadeIn">
          <ThemeSelectionSection onNext={handleThemeNext} />
        </div>
      )}

      {step === 2 && (
        <div className="animate-fadeIn">
          <PreviewSection
            themeKey={themeKey}
            onBack={handlePreviewBack}
            onNext={handlePreviewNext}
            loading={creating}
          />
          {createError && (
            <p className="text-center text-red-500 text-sm mt-4">{createError}</p>
          )}
        </div>
      )}

      {step === 3 && (
        <SuccessSection
          memoryId={memoryId}
          slug={memorySlug}
          themeKey={themeKey}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      <div className="mt-16 border-t pt-8">
        <HelpSection />
      </div>
    </div>
  );
}
