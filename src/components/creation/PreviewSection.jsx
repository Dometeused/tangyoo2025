// /components/creation/PreviewSection.jsx
"use client";

const THEME_LABELS = {
  wedding: { label: "งานแต่งงาน", emoji: "💍" },
  funeral: { label: "งานรำลึก / อาลัย", emoji: "🕯️" },
  anniversary: { label: "วันครบรอบ / ของขวัญ", emoji: "🎉" },
};

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export default function PreviewSection({ theme, formData, onNext, onBack }) {
  const t = THEME_LABELS[theme] || { label: theme, emoji: "📋" };

  const dateLabel = formData.date
    ? new Date(formData.date).toLocaleString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">ตรวจสอบข้อมูล</h2>
      <p className="text-sm text-gray-500 mb-5">ตรวจสอบก่อนสร้างหน้างานของคุณ</p>

      <div className="bg-white rounded-xl border border-gray-200 px-4 py-2 mb-6 shadow-sm">
        <div className="flex items-center gap-2 py-3 border-b border-gray-100 mb-1">
          <span className="text-2xl">{t.emoji}</span>
          <span className="font-semibold text-gray-700">{t.label}</span>
        </div>
        <Row label="ชื่องาน" value={formData.name} />
        <Row label="วัน-เวลา" value={dateLabel} />
        <Row label="สถานที่" value={formData.place} />
        <Row label="เจ้าบ่าว" value={formData.groomName} />
        <Row label="เจ้าสาว" value={formData.brideName} />
        <Row label="ผู้ล่วงลับ" value={formData.deceasedName} />
        <Row label="คู่รัก / ผู้จัดงาน" value={formData.coupleNames} />
        <Row label="Dress Code" value={formData.dresscode} />
        <Row label="ข้อความ" value={formData.message} />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
        >
          ← แก้ไข
        </button>
        <button
          onClick={onNext}
          className="flex-grow px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold"
        >
          ยืนยัน →
        </button>
      </div>
    </div>
  );
}
