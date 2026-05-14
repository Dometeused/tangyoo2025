// /components/creation/CreationPage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ProgressBar from "@/components/creation/ProgressBar";
import ThemeSelectionSection from "@/components/creation/ThemeSelectionSection";
import ExampleSection from "@/components/creation/ExampleSection";
import HowToSection from "@/components/creation/HowToSection";
import FormSection from "@/components/creation/FormSection";
import PreviewSection from "@/components/creation/PreviewSection";
import LoginSection from "@/components/creation/LoginSection";
import SuccessSection from "@/components/creation/SuccessSection";
import HelpSection from "@/components/creation/HelpSection";

const STORAGE_KEY = "creation_draft";
const TOTAL_STEPS = 7;

export default function CreationPage() {
  const supabase = createClientComponentClient();

  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState("");
  const [formData, setFormData] = useState({});
  const [createdEvent, setCreatedEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // After Google OAuth redirect, resume and auto-submit
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("resume")) return;

    const draft = sessionStorage.getItem(STORAGE_KEY);
    if (!draft) return;

    try {
      const { theme: t, formData: fd } = JSON.parse(draft);
      setTheme(t);
      setFormData(fd);
      // Check if user is now authenticated, then submit
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          submitEvent(t, fd);
        } else {
          setStep(6);
        }
      });
    } catch {
      setStep(1);
    }
  }, []);

  async function submitEvent(t, fd) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.name,
          date: fd.date,
          place: fd.place,
          theme: t,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "สร้าง event ไม่สำเร็จ");
      sessionStorage.removeItem(STORAGE_KEY);
      setCreatedEvent(json.data);
      setStep(7);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Step handlers
  const handleThemeNext = (selectedTheme) => { setTheme(selectedTheme); setStep(2); };
  const handleExampleNext = () => setStep(3);
  const handleHowToNext = () => setStep(4);
  const handleFormNext = (data) => { setFormData(data); setStep(5); };
  const handlePreviewNext = () => setStep(6);

  const handleLoginSuccess = () => {
    submitEvent(theme, formData);
  };

  const handleLoginMount = () => {
    // Save draft before OAuth redirect clears state
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, formData }));
  };

  if (submitting) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">กำลังสร้างหน้างานของคุณ...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          ⚠️ {submitError}
          <button
            className="ml-2 underline"
            onClick={() => submitEvent(theme, formData)}
          >
            ลองใหม่
          </button>
        </div>
      )}

      {step === 1 && (
        <ThemeSelectionSection onNext={handleThemeNext} />
      )}

      {step === 2 && (
        <ExampleSection
          onNext={handleExampleNext}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <HowToSection
          onNext={handleHowToNext}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <FormSection
          theme={theme}
          initialData={formData}
          onNext={handleFormNext}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <PreviewSection
          theme={theme}
          formData={formData}
          onNext={handlePreviewNext}
          onBack={() => setStep(4)}
        />
      )}

      {step === 6 && (
        <LoginSection
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setStep(5)}
          onMount={handleLoginMount}
        />
      )}

      {step === 7 && (
        <SuccessSection
          eventData={createdEvent}
          onGoToDashboard={() => { window.location.href = "/dashboard"; }}
        />
      )}

      <HelpSection />
    </div>
  );
}
