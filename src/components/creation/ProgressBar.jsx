// /components/creation/ProgressBar.jsx
const STEP_LABELS = ["เลือกประเภท", "ตัวอย่าง", "วิธีใช้", "กรอกข้อมูล", "ตรวจสอบ", "เข้าสู่ระบบ", "สำเร็จ"];

export default function ProgressBar({ step, total }) {
  const label = STEP_LABELS[step - 1] || "";
  const pct = Math.round((step / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-blue-600">{label}</span>
        <span className="text-xs text-gray-400">{step}/{total}</span>
      </div>
      <div className="bg-gray-200 h-2 rounded-full w-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
