"use client";
import RomanticMessageBox from "@/components/welcomepage/RomanticMessageBox";

export default function TestPage() {
  return (
    <div style={{ background: "#FFC568", minHeight: "100vh", position: "relative" }}>
      <RomanticMessageBox
        message="test: RomanticMessageBox ต้องเห็น!"
        style={{ border: "2px solid red", top: 80, zIndex: 9999 }}
      />
    </div>
  );
}
