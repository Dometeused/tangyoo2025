"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SuccessSection from "@/components/creation/SuccessSection";

function QrCodeSuccessContent() {
  const params = useSearchParams();
  const id = params.get("id");

  if (!id) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-gray-500">ไม่พบ Event ID</p>
        <a href="/creation" className="mt-4 text-blue-600 underline">สร้างงานใหม่</a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center py-12 px-4">
      <SuccessSection memoryId={id} />
    </main>
  );
}

export default function QrCodeSuccess() {
  return (
    <Suspense>
      <QrCodeSuccessContent />
    </Suspense>
  );
}
