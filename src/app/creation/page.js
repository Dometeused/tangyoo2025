// /app/creationpage/page.js
"use client";
export const dynamic = "force-dynamic";
import CreationPage from "@/components/creation/CreationPage";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
      <CreationPage />
    </main>
  );
}
