"use client";
import { useState, useCallback } from "react";
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
  const [modal, setModal] = useState({ open: false, field: "", label: "", value: "" });
  const [copied, setCopied] = useState(false);

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
      const title = event?.name || event?.title || "TangYoo Event";
      const details = (event?.bio ? event.bio.replace(/(<([^>]+)>)/gi, "") : "") || "ขอเชิญร่วมงาน";
      const location = event?.event_place || "";
      const start = formatGCalDate(event?.start_datetime);
      let end = event?.end_datetime ? formatGCalDate(event?.end_datetime) : "";
      if (!end && event?.start_datetime) {
        const dt = new Date(event.start_datetime);
        dt.setHours(dt.getHours() + 3);
        end = formatGCalDate(dt.toISOString());
      }
      window.open(buildGoogleCalendarUrl({ title, details, location, startDateTime: start, endDateTime: end }), "_blank");
      return;
    }
    if (action === "location") {
      if (isOwner) {
        handleEdit("event_place", "Google Maps URL", event.event_place);
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
      const url = `${window.location.origin}/event/${event.id}`;
      const title = event?.name || event?.title || "TangYoo Event";
      if (navigator.share) {
        navigator.share({ title, url });
      } else {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // ปุ่ม label ต่างตาม theme
  const rsvpLabel = theme === "funeral" ? "บันทึกวัน" : "เพิ่มในปฏิทิน";

  const allButtons = [
    { icon: <FiUserCheck />, label: rsvpLabel, action: "rsvp",     hideFor: ["anniversary"] },
    { icon: <FiMapPin />,    label: "แผนที่",  action: "location", hideFor: ["anniversary"] },
    { icon: <FiPhone />,     label: "ติดต่อ",  action: "contact",  hideFor: [] },
    { icon: <FiShare2 />,    label: copied ? "คัดลอกแล้ว!" : "แชร์", action: "share", hideFor: [] },
  ];
  const buttons = allButtons.filter(b => !b.hideFor.includes(theme));

  const hoverColor = theme === "funeral" ? "group-hover:text-stone-500 group-hover:border-stone-300"
    : theme === "anniversary" ? "group-hover:text-amber-600 group-hover:border-amber-200"
    : theme === "baby" ? "group-hover:text-purple-400 group-hover:border-purple-200"
    : "group-hover:text-rose-400 group-hover:border-rose-200";

  return (
    <>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 md:gap-6 bg-white/75 backdrop-blur-2xl border border-white/60 shadow-lg rounded-full px-5 py-2.5 transition-all duration-300">
        {buttons.map((btn, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center gap-0.5 group cursor-pointer"
            onClick={() => handleClick(btn.action)}
            title={btn.label}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-base
                text-gray-400 border border-transparent transition-all duration-200
                group-hover:bg-white group-hover:shadow-sm group-hover:-translate-y-0.5 ${hoverColor}`}
            >
              {btn.icon}
            </div>
            {/* Label — fades in under icon on hover */}
            <span className="text-[9px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors leading-none">
              {btn.label}
            </span>
          </div>
        ))}
      </div>

      {/* Modal สำหรับแก้ไข */}
      <EditModal
        open={modal.open}
        label={modal.label}
        value={modal.value}
        onSave={handleSave}
        onClose={() => setModal({ open: false, field: "", label: "", value: "" })}
      />
    </>
  );
}
