// /pages/features.js
import Link from "next/link";

const features = [
  {
    key: "memory",
    title: "Memory Page",
    desc: "เก็บเรื่องราว รูปภาพ และความทรงจำของงานในหน้าเดียว แชร์ง่ายผ่าน QR Code.",
    img: "/mockup-memory-generic.png", // ใส่เป็น placeholder ก่อนได้
    demoLink: "/demo/memory", // หน้า demo ตัวอย่าง (ใส่ route ตามจริง)
  },
  {
    key: "invitation",
    title: "Invitation Page",
    desc: "เชิญแขกร่วมงานและแจ้งรายละเอียดผ่าน QR Code เดียว สะดวก ครบจบ.",
    img: "/mockup-invitation-generic.png",
    demoLink: "/demo/invitation",
  },
  {
    key: "qr2phase",
    title: "QR Code 2-Phase",
    desc: "QR เดียวใช้งานได้ทั้งก่อนและหลังงาน เปลี่ยนหน้าที่อัตโนมัติตามเวลา.",
    img: "/mockup-qr2phase-generic.png",
  },
  {
    key: "souvenir",
    title: "ของชำร่วยที่มีความหมาย",
    desc: "ของที่ระลึกงานสำคัญ ติด QR Code ให้เข้าถึงความทรงจำได้ตลอดเวลา.",
    img: "/mockup-souvenir-generic.png",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">TangYoo Features</h1>
          <p className="text-center text-gray-500 mb-8">
            ฟีเจอร์หลักที่จะเปลี่ยนของชำร่วยให้กลายเป็นความทรงจำดิจิทัลที่เข้าถึงได้ทุกที่
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div
                key={f.key}
                className="rounded-2xl bg-white p-6 shadow-lg flex flex-col items-center"
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="rounded-xl w-48 h-32 object-cover mb-3 border"
                  loading="lazy"
                />
                <h2 className="font-bold text-lg mb-1">{f.title}</h2>
                <p className="text-gray-600 text-center mb-4">{f.desc}</p>
                {f.demoLink && (
                  <div className="flex flex-col items-center gap-2 w-full">
                    {/* QR code placeholder */}
                    <Link href={f.demoLink}>
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-xl mb-1 cursor-pointer hover:ring-2 hover:ring-blue-300 transition">
                        <span className="text-xs text-gray-400">QR</span>
                      </div>
                    </Link>
                    <Link
                      href={f.demoLink}
                      className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow text-sm hover:bg-gray-800 transition"
                    >
                      ดูตัวอย่าง
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
