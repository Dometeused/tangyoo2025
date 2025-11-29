// /components/creation/HowToSection.jsx
export default function HowToSection({ onNext }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">วิธีใช้งาน (How-to)</h2>
      <ol className="space-y-3 text-base">
        <li>1. สร้างเพจของคุณ</li>
        <li>2. แชร์ QR กับแขก</li>
        <li>3. เก็บความทรงจำ</li>
      </ol>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onNext}
      >
        เริ่มกรอกข้อมูล
      </button>
    </div>
  );
}
