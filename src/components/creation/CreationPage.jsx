"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ProgressBar from "@/components/creation/ProgressBar";
import ThemeSelectionSection from "@/components/creation/ThemeSelectionSection";
import PreviewSection from "@/components/creation/PreviewSection";
import SuccessSection from "@/components/creation/SuccessSection";
import HelpSection from "@/components/creation/HelpSection";

export default function CreationPage() {
  const [step, setStep] = useState(1);
  const [themeKey, setThemeKey] = useState("");
  const [memoryId, setMemoryId] = useState("");

  // Simplified to 3 steps: Theme -> Preview -> Success
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

  const handlePreviewNext = () => {
    // Generate ID and move to success
    const newId = uuidv4();
    setMemoryId(newId);

    // In a real app, we would create the initial record here
    console.log("Initializing memory page:", { id: newId, theme: themeKey });

    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleGoToDashboard = () => {
    window.location.href = "/";
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
          />
        </div>
      )}

      {step === 3 && (
        <SuccessSection
          memoryId={memoryId}
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
