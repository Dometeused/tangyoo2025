"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function EditEventForm({ eventData }) {
  const [name, setName] = useState(eventData.name || "");
  const [date, setDate] = useState(eventData.date || "");
  const [place, setPlace] = useState(eventData.place || "");
  const [bio, setBio] = useState(eventData.bio || "");

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("events")
      .update({ name, date, place, bio })
      .eq("id", eventData.id);

    if (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } else {
      alert("บันทึกเรียบร้อยแล้ว");
      router.push(`/event/${eventData.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">แก้ไขข้อมูลอีเวนต์</h2>

      <input
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่ออีเวนต์"
        required
      />

      <input
        className="w-full p-2 border rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        className="w-full p-2 border rounded"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="สถานที่จัดงาน"
        required
      />

      <textarea
        className="w-full p-2 border rounded"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="คำอธิบาย / bio"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        💾 บันทึกการเปลี่ยนแปลง
      </button>
    </form>
  );
}
