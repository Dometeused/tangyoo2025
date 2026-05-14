// /components/creation/HowToSection.jsx
export default function HowToSection({ onNext, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">วิธีใช้งาน</h2>
      <ol className="space-y-4 text-base mb-6">
        <li className="flex gap-3 items-start">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</span>
          <div><div className="font-medium">สร้างเพจของคุณ</div><div className="text-sm text-gray-500">กรอกข้อมูลงานและเลือกธีมที่ต้องการ</div></div>
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</span>
          <div><div className="font-medium">แชร์ QR กับแขก</div><div className="text-sm text-gray-500">แขกสแกน QR เพื่อเข้าหน้างาน อัปโหลดภาพ และส่งคำอวยพร</div></div>
        </li>
        <li className="flex gap-3 items-start">
          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</span>
          <div><div className="font-medium">เก็บความทรงจำ</div><div className="text-sm text-gray-500">ภาพและข้อความถูกเก็บไว้ให้คุณย้อนดูได้ตลอด</div></div>
        </li>
      </ol>
      <div className="flex gap-2">
        <button
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
          onClick={onBack}
        >
          ← ย้อนกลับ
        </button>
        <button
          className="flex-grow px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold"
          onClick={onNext}
        >
          เริ่มกรอกข้อมูล
        </button>
      </div>
    </div>
  );
}
