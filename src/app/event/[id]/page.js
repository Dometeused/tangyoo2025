import EventPageRouter from "@/components/EventPageRouter";
import { getEventById } from "@/lib/server-events";

// แปลงวันที่เป็นภาษาไทย (ตัวอย่าง: 9 ก.ค. 2567)
function formatDateThai(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const months = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${d.getDate()} ${months[d.getMonth() + 1]} ${d.getFullYear() + 543}`;
}

export async function generateMetadata(props) {
  const { id: eventId } = await props.params;  // ⭐️ ต้อง await!
  const event = await getEventById(eventId);

  const theme = event?.theme || "wedding";
  const name = event?.name || "เจ้าภาพ";
  // สร้าง description: วันที่ + สถานที่ (เช่น "9 ก.ค. 2567 | สวนรถไฟ")
  const eventDate = event?.date ? formatDateThai(event.date) : "";
  const eventPlace = event?.place || event?.event_place || "";
  const description = [eventDate, eventPlace].filter(Boolean).join(" | ");

  // เลือกรูป cover ตามลำดับความสำคัญ
  const cover =
    event?.cover_url ||
    event?.feature_image_1 ||
    event?.profile_url ||
    "https://tangyoo.com/default-cover.jpg";

  // สร้าง title ตามประเภทงาน
  let title = `${name} | TangYoo`;
  if (theme === "wedding") {
    title = `งานแต่งงาน ${name} | TangYoo`;
  } else if (theme === "funeral") {
    title = `ร่วมไว้อาลัย ${name} | TangYoo`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [cover],
      url: `https://tangyoo.com/event/${eventId}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default function Page(props) {
  return <EventPageRouter {...props} />;
}
