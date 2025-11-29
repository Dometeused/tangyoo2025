// /components/creation/FormSection.jsx
export default function FormSection({ onNext }) {
  // เพิ่ม useState/validation ทีหลัง
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onNext({
          name: e.target.name.value,
          date: e.target.date.value,
          message: e.target.message.value,
        });
      }}
      className="flex flex-col gap-3"
    >
      <label>
        ชื่องาน/ชื่อหน้า*
        <input name="name" required className="border px-2 py-1 rounded w-full" />
      </label>
      <label>
        วัน-เวลา*
        <input name="date" required className="border px-2 py-1 rounded w-full" />
      </label>
      <label>
        ข้อความเชิญ/ข้อความรำลึก*
        <textarea name="message" required className="border px-2 py-1 rounded w-full" />
      </label>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        ถัดไป
      </button>
    </form>
  );
}
