// /components/creation/ExampleSection.jsx
export default function ExampleSection({ onNext, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">ตัวอย่างหน้าสำเร็จ</h2>
      <div className="flex flex-col gap-2 items-center">
        <img src="/example-invitation.png" alt="invitation example" className="w-52 rounded shadow" />
        <img src="/example-memory.png" alt="memory example" className="w-52 rounded shadow" />
      </div>
      <p className="mt-2 text-gray-500 text-sm">นี่คือตัวอย่างหน้าสำเร็จที่คุณจะได้รับ</p>
      <div className="flex gap-2 mt-4">
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
          ถัดไป
        </button>
      </div>
    </div>
  );
}
