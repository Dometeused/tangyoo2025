// /components/creation/CreationPage.jsx
"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/creation/ProgressBar";
import ThemeSelectionSection from "@/components/creation/ThemeSelectionSection";
import ExampleSection from "@/components/creation/ExampleSection";
import HowToSection from "@/components/creation/HowToSection";
import FormSection from "@/components/creation/FormSection";
import LoginSection from "@/components/creation/LoginSection";
import SuccessSection from "@/components/creation/SuccessSection";
import HelpSection from "@/components/creation/HelpSection";
// import PreviewSection from "@/components/creation/PreviewSection"; // (optional)

export default function CreationPage() {
  // Step state (1–6)
  const [step, setStep] = useState(1);

  // Data state
  const [theme, setTheme] = useState("");
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  // ปรับตาม step ที่ใช้จริง
  const totalStep = 6;

  // Callback สำหรับแต่ละ section
  const handleThemeNext = (selectedTheme) => {
    setTheme(selectedTheme);
    setStep(2);
  };

  const handleExampleNext = () => setStep(3);

  const handleHowToNext = () => setStep(4);

  const handleFormNext = (data) => {
    setFormData(data);
    setStep(5);
  };

  const handleLoginSuccess = () => {
    setIsLogin(true);
    setStep(6);
  };

  const handleGoToMemory = () => {
    // logic ไป MemoryPage
    window.location.href = "/memory";
  };

  const handleGoToDashboard = () => {
    // logic ไป Dashboard
    window.location.href = "/dashboard";
  };

  // Render แต่ละ step
  return (
    <div className="max-w-xl mx-auto py-8 px-2">
      <ProgressBar step={step} total={totalStep} />

      {step === 1 && (
        <ThemeSelectionSection onNext={handleThemeNext} />
      )}

      {step === 2 && (
        <ExampleSection onNext={handleExampleNext} />
      )}

      {step === 3 && (
        <HowToSection onNext={handleHowToNext} />
      )}

      {step === 4 && (
        <FormSection onNext={handleFormNext} />
      )}

      {step === 5 && (
        <LoginSection onLogin={handleLoginSuccess} />
      )}

      {step === 6 && (
        <SuccessSection
          onGoToMemory={handleGoToMemory}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      <HelpSection />
    </div>
  );
}
