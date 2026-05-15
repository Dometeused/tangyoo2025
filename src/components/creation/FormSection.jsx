import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

export default function FormSection({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    message: "",
    image: null, // store data URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
      {/* Glass Card */}
      <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[32px] shadow-warm-xl border border-white/60">
        <h2 className="text-3xl font-bold mb-8 text-center font-kanit text-gray-800 tracking-tight">
          ใส่รายละเอียดของคุณ
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Image Upload - Hero Style */}
          <div className="flex flex-col items-center justify-center">
            <label className="w-full h-72 border-2 border-dashed border-orange-200/50 hover:border-orange-400 rounded-3xl cursor-pointer bg-white/50 hover:bg-orange-50/50 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner-sm">
              {formData.image ? (
                <>
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium backdrop-blur-sm">
                    เปลี่ยนรูปภาพ
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-orange-500 transition-colors">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <span className="font-semibold text-lg">คลิกเพื่ออัปโหลดรูปภาพ</span>
                  <span className="text-sm mt-1 opacity-70">รองรับ JPG, PNG (สูงสุด 10MB)</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                ชื่องาน / ชื่อหน้า (Title) <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="ตัวอย่าง: งานครบรอบ 10 ปี, อาลัยคุณตา..."
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm text-gray-700 placeholder:text-gray-300 font-medium"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                วันที่ (Date) <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm text-gray-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
              ข้อความในใจ (Message) <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="เขียนข้อความความทรงจำดีๆ ที่นี่..."
              className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-orange-300 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm text-gray-700 placeholder:text-gray-300 font-medium resize-none"
            />
          </div>

          {/* Intro Effect Toggle - Modern iOS Style */}
          <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">✨</div>
              <div>
                <label htmlFor="introEffect" className="text-gray-800 font-bold block cursor-pointer">
                  ลูกเล่นเปิดตัว (Intro Effect)
                </label>
                <p className="text-xs text-gray-500 font-normal">
                  แสดง Animation ต้อนรับ (กล่องของขวัญ/ดอกไม้)
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="introEffect"
                id="introEffect"
                checked={formData.introEffect !== false}
                onChange={(e) => setFormData(prev => ({ ...prev, introEffect: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 text-lg flex items-center justify-center gap-2"
          >
            ถัดไป <span className="text-xl">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
