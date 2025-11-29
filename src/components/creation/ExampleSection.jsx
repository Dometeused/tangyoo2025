// /components/creation/ExampleSection.jsx
export default function ExampleSection({ onNext }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">ตัวอย่างหน้าสำเร็จ</h2>
      <div className="flex flex-col gap-2 items-center">
        <img src="/example-invitation.png" alt="invitation example" className="w-52 rounded shadow" />
        <button className="text-blue-500 underline">ดูตัวอย่างเต็ม</button>
        <img src="/example-memory.png" alt="memory example" className="w-52 rounded shadow" />
        <button className="text-blue-500 underline">ดูตัวอย่างเต็ม</button>
      </div>
      <p className="mt-2 text-gray-500 text-sm">นี่คือตัวอย่างหน้าสำเร็จที่คุณจะได้รับ</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onNext}
      >
        ถัดไป
      </button>
    </div>
  );
}
