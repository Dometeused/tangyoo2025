// /components/creation/ThemeSelectionSection.jsx
export default function ThemeSelectionSection({ onNext }) {
  // ใส่ logic จริงทีหลัง
  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">เลือกประเภทงานที่ต้องการสร้าง</h1>
      <div className="flex gap-4 mb-4">
        <button className="px-4 py-2 bg-pink-100 rounded">งานแต่งงาน</button>
        <button className="px-4 py-2 bg-gray-100 rounded">งานรำลึก/อาลัย</button>
        <button className="px-4 py-2 bg-yellow-100 rounded">ของขวัญ/อื่นๆ</button>
      </div>
      <div className="mb-2 text-gray-600 italic">
        “ขอแสดงความยินดีด้วยค่ะ ขอให้วันนี้เป็นวันที่พิเศษและน่าจดจำ”
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onNext("wedding")}
      >
        ถัดไป
      </button>
    </div>
  );
}
