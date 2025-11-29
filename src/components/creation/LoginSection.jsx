// /components/creation/LoginSection.jsx
export default function LoginSection({ onLogin }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">เข้าสู่ระบบเพื่อบันทึกหน้า</h2>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={onLogin}
      >
        เข้าสู่ระบบด้วย Google
      </button>
      <p className="mt-2 text-gray-400 text-sm">ข้อมูลของคุณจะถูกจัดเก็บอย่างปลอดภัย</p>
    </div>
  );
}
