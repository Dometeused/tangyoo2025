// /components/creation/SuccessSection.jsx
export default function SuccessSection({ onGoToMemory, onGoToDashboard }) {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-3">สร้างหน้า Thank-Yoo เสร็จแล้ว!</h2>
      <p className="mb-5">แชร์ลิงก์หรือ QR code ให้แขกใช้งานได้ทันที</p>
      <button
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onGoToMemory}
      >
        ไปหน้า MemoryPage
      </button>
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
        onClick={onGoToDashboard}
      >
        กลับสู่ Dashboard
      </button>
    </div>
  );
}
