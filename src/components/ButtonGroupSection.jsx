"use client";
import { useState } from "react";
import { useAppMode } from "@/context/AppModeContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiUserCheck, FiMapPin, FiPhone, FiShare2 } from "react-icons/fi";

// Helper สำหรับ Google Calendar
function buildGoogleCalendarUrl({ title, details, location, startDateTime, endDateTime }) {
  const base = "https://www.google.com/calendar/render?action=TEMPLATE";
  const params = [
    `text=${encodeURIComponent(title)}`,
    `details=${encodeURIComponent(details)}`,
    `location=${encodeURIComponent(location)}`,
    `dates=${startDateTime}/${endDateTime}`,
  ].join("&");
  return `${base}&${params}`;
}

// Helper แปลง ISO date เป็น format Google Calendar
function formatGCalDate(iso) {
  if (!iso) return "";
  // รับ "2025-06-28T18:00:00Z" → "20250628T180000Z"
  return iso.replace(/[-:]/g, "").slice(0, 15) + "Z";
}

function EditModal({ open, label, value, onSave, onClose }) {
  const [input, setInput] = useState(value || "");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
        <h2 className="font-bold text-lg mb-2">แก้ไข {label}</h2>
        <input
          className="border rounded w-full p-2 mb-4"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`ใส่${label}ใหม่`}
        />
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="bg-gray-100 px-3 py-1 rounded">ยกเลิก</button>
          <button
            className="bg-black text-white px-3 py-1 rounded"
            onClick={() => onSave(input)}
            disabled={input.trim() === ""}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ButtonGroupSection({ event, isOwner, onEventUpdate }) {
  const { theme } = useAppMode();
  const supabase = createClientComponentClient();

  const THEME_GLOW = {
    wedding: "ring-2 ring-pink-300 shadow-pink-200",
    funeral: "ring-2 ring-gray-400 shadow-gray-500",
    anniversary: "ring-2 ring-yellow-300 shadow-yellow-200",
  };

  const [modal, setModal] = useState({ open: false, field: "", label: "", value: "" });

  const handleEdit = (field, label, value) => {
    setModal({ open: true, field, label, value });
  };

  const handleSave = async (newValue) => {
    // อัปเดต Supabase
    const updateObj = { [modal.field]: newValue };
    await supabase.from("events").update(updateObj).eq("id", event.id);
    setModal({ open: false, field: "", label: "", value: "" });
    if (onEventUpdate) onEventUpdate(modal.field, newValue);
  };

  const handleClick = (action) => {
    if (action === "rsvp") {
      // == RSVP: เพิ่มใน Google Calendar ==
      const title = event?.title || "Wedding Invitation";
      const details = (event?.bio ? event.bio.replace(/(<([^>]+)>)/gi, "") : "") || "ขอเชิญร่วมงาน...";
      const location = event?.event_place || "";
      const start = formatGCalDate(event?.start_datetime);
      // ถ้าไม่มีเวลา end ให้ +3 ชั่วโมงอัตโนมัติ
      let end = event?.end_datetime ? formatGCalDate(event?.end_datetime) : "";
      if (!end && event?.start_datetime) {
        const dt = new Date(event.start_datetime);
        dt.setHours(dt.getHours() + 3);
        end = formatGCalDate(dt.toISOString());
      }
      const gcalUrl = buildGoogleCalendarUrl({
        title,
        details,
        location,
        startDateTime: start,
        endDateTime: end,
      });
      window.open(gcalUrl, "_blank");
      return;
    }
    if (action === "location") {
      if (isOwner) {
        handleEdit("event_place", "แผนที่ (Google Maps URL)", event.event_place);
      } else if (event?.event_place) {
        window.open(event.event_place, "_blank");
      }
    }
    if (action === "contact") {
      if (isOwner) {
        handleEdit("event_phone", "เบอร์โทร", event.event_phone);
      } else if (event?.event_phone) {
        window.open(`tel:${event.event_phone}`, "_self");
      }
    }
    if (action === "share") {
      // == แชร์ลิงก์งาน (ใช้ Web Share API บนมือถือ) ==
      const url = `${window.location.origin}/event/${event.id}`;
      const title = event?.title || "เชิญร่วมงาน";
      if (navigator.share) {
        navigator.share({ title, url });
      } else {
        // fallback: คัดลอกลิงก์
        navigator.clipboard.writeText(url);
        alert("คัดลอกลิงก์เรียบร้อย:\n" + url);
      }
    }
  };

  const buttons = [
    { icon: <FiUserCheck />, label: "เพิ่มลงในปฏิทิน", action: "rsvp", desc: "RSVP / Calendar" },
    { icon: <FiMapPin />, label: "แผนที่", action: "location", desc: "Location" },
    { icon: <FiPhone />, label: "ติดต่อ", action: "contact", desc: "Contact" },
    { icon: <FiShare2 />, label: "แชร์", action: "share", desc: "Share" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 my-6">
      {buttons.map((btn, i) => (
        <div key={i} className="flex flex-col items-center">
          <button
            className={`group w-16 h-16 rounded-full bg-white flex items-center justify-center 
              text-gray-700 text-xl transition-all duration-200
              hover:scale-110 hover:${THEME_GLOW[theme]}
              shadow-md`}
            title={btn.label}
            onClick={() => handleClick(btn.action)}
          >
            {btn.icon}
          </button>
          <div className="text-xs text-gray-500 mt-2 select-none">{btn.label}</div>
        </div>
      ))}
      {/* Modal สำหรับแก้ไข */}
      <EditModal
        open={modal.open}
        label={modal.label}
        value={modal.value}
        onSave={handleSave}
        onClose={() => setModal({ open: false, field: "", label: "", value: "" })}
      />
    </div>
  );
}
