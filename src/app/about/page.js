// /src/app/about/page.js
export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto py-16 px-6 text-center">
      <img src="/logo-tangyoo.png" alt="TangYoo logo" className="mx-auto h-16 mb-6" />
      <h1 className="text-3xl font-bold mb-3">TangYoo — ให้ความทรงจำ ‘ตั้งอยู่’ ตลอดไป</h1>
      
      {/* วิดีโอ embed — ถ้ายังไม่มีใส่ div สีเทาไว้ก่อน */}
      <div className="mb-6">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
          {/* ถ้ามี YouTube ใส่ iframe ได้เลย */}
          {/* <iframe src="https://www.youtube.com/embed/xxxx" ... ></iframe> */}
          <span className="text-gray-400">[ วิดีโอเล่าเรื่องของเรา ใส่ทีหลังได้ ]</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-lg mb-6">
        TangYoo เกิดจากความรู้สึกส่วนตัวล้วนๆ <br />
        อยากเก็บความทรงจำของคุณย่าเอาไว้ให้ลูกชาย ลูกสาว หลานๆ ได้รู้จัก  
        เทคโนโลยีเรามาไกลขนาดนี้แล้ว ทำไมเราจะต้องหลงลืมอดีต... <br />
        ความทรงจำที่ดีเหล่านี้ควรจะ "ตั้งอยู่" <br /><br />
        นี่คือเหตุผลที่สร้าง TangYoo  
        เพื่อให้ทุกคนมีโอกาสเก็บและแบ่งปันเรื่องราวสำคัญในชีวิตให้คนที่เรารัก
      </p>
    </section>
  );
}
