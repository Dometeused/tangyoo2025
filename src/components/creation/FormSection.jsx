// /components/creation/FormSection.jsx
"use client";
import { useState } from "react";
import { THEME_DRESSCODE } from "@/constants/theme";

const THEME_LABELS = {
  wedding: "งานแต่งงาน",
  funeral: "งานรำลึก / อาลัย",
  anniversary: "วันครบรอบ / ของขวัญ",
};

export default function FormSection({ onNext, onBack, theme, initialData = {} }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    date: initialData.date || "",
    place: initialData.place || "",
    message: initialData.message || "",
    groomName: initialData.groomName || "",
    brideName: initialData.brideName || "",
    dresscode: initialData.dresscode || "",
    deceasedName: initialData.deceasedName || "",
    coupleNames: initialData.coupleNames || "",
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "กรุณากรอกชื่องาน";
    if (!form.date.trim()) e.date = "กรุณาระบุวัน-เวลา";
    if (!form.place.trim()) e.place = "กรุณาระบุสถานที่";
    if (theme === "wedding" && !form.groomName.trim()) e.groomName = "กรุณากรอกชื่อเจ้าบ่าว";
    if (theme === "wedding" && !form.brideName.trim()) e.brideName = "กรุณากรอกชื่อเจ้าสาว";
    if (theme === "funeral" && !form.deceasedName.trim()) e.deceasedName = "กรุณากรอกชื่อผู้ล่วงลับ";
    if (theme === "anniversary" && !form.coupleNames.trim()) e.coupleNames = "กรุณากรอกชื่อ";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext(form);
  }

  const field = (label, name, type = "text", required = false) => (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        type={type}
        value={form[name]}
        onChange={set(name)}
        className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          errors[name] ? "border-red-400" : "border-gray-300"
        }`}
      />
      {errors[name] && <span className="text-xs text-red-500">{errors[name]}</span>}
    </label>
  );

  const dresscodeOptions = THEME_DRESSCODE[theme] || [];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">กรอกข้อมูลงาน</h2>
        <p className="text-sm text-gray-500">{THEME_LABELS[theme]}</p>
      </div>

      {field("ชื่องาน / ชื่อหน้า", "name", "text", true)}
      {field("วัน-เวลาจัดงาน", "date", "datetime-local", true)}
      {field("สถานที่จัดงาน", "place", "text", true)}

      {theme === "wedding" && (
        <>
          {field("ชื่อเจ้าบ่าว", "groomName", "text", true)}
          {field("ชื่อเจ้าสาว", "brideName", "text", true)}
        </>
      )}

      {theme === "funeral" && field("ชื่อผู้ล่วงลับ", "deceasedName", "text", true)}

      {theme === "anniversary" && field("ชื่อคู่รัก / ผู้จัดงาน", "coupleNames", "text", true)}

      {dresscodeOptions.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Dress Code</span>
          <div className="flex flex-wrap gap-2">
            {dresscodeOptions.map((dc) => (
              <button
                key={dc.label}
                type="button"
                onClick={() => setForm((f) => ({ ...f, dresscode: dc.label }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border-2 transition-all ${
                  form.dresscode === dc.label
                    ? "border-gray-700 font-semibold"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full inline-block border border-gray-300"
                  style={{ backgroundColor: dc.color }}
                />
                {dc.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">ข้อความเชิญ / ข้อความรำลึก</span>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          placeholder="ข้อความที่แสดงบนหน้างาน (ไม่บังคับ)"
        />
      </label>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
        >
          ← ย้อนกลับ
        </button>
        <button
          type="submit"
          className="flex-2 flex-grow px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold"
        >
          ถัดไป
        </button>
      </div>
    </form>
  );
}
