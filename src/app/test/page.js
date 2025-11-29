"use client";

import RomanticMessageBox from "@/components/welcomepage/RomanticMessageBox";
import RomanticCoverImage from "@/components/welcomepage/RomanticCoverImage";
import { useRouter } from "next/navigation";

export default function RomanticDemoPage() {
  const coverUrl = "/cover-mock.jpg";
  const router = useRouter();

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw", background: "#FFC568" }}>
      {/* TEST: Render MessageBox เดี่ยว ๆ ไม่ต้องรอเงื่อนไข */}
      <RomanticMessageBox
        message="ขอบคุณสำหรับความรักของเราที่ผ่านมา...นะแตง 💌"
        buttonText="ไปหน้า Memory Page"
        onButtonClick={() => router.push("/memorypage")}
      />
      <RomanticCoverImage coverUrl={coverUrl} />
    </div>
  );
}
