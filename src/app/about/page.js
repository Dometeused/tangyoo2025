import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "เกี่ยวกับเรา | TangYoo",
  description: "TangYoo เกิดจากความรู้สึกส่วนตัว — อยากเก็บความทรงจำของคุณย่าไว้ให้ลูกหลานได้รู้จัก",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero — big quote */}
      <section className="bg-orange-50 py-20 px-6 text-center">
        <p className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-4">
          เรื่องของเรา
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          &ldquo;ทำไมความทรงจำดีๆ<br className="hidden md:block" /> ต้องหายไปกับเวลา?&rdquo;
        </h1>
      </section>

      {/* Story */}
      <article className="max-w-2xl mx-auto px-6 py-16 space-y-10 text-gray-700 text-lg leading-relaxed">

        <p>
          TangYoo เกิดจากความรู้สึกส่วนตัวล้วนๆ
        </p>

        <p>
          วันที่คุณย่าจากไป สิ่งที่เหลืออยู่คือรูปในกล่องเก่า
          และเรื่องเล่าที่กระจัดกระจายอยู่ในความทรงจำของคนในครอบครัว
          ไม่มีที่เดียวที่เก็บทุกอย่างไว้ด้วยกัน
          ไม่มีที่ที่ลูกหลานจะกลับมาแล้ว <em>รู้จักท่านได้จริงๆ</em>
        </p>

        <blockquote className="border-l-4 border-orange-400 pl-6 text-orange-700 font-medium text-xl italic">
          &ldquo;เทคโนโลยีเรามาไกลขนาดนี้แล้ว<br />
          ทำไมเราจะต้องหลงลืมอดีต?&rdquo;
        </blockquote>

        <p>
          นี่คือคำถามที่ทำให้เกิด TangYoo
        </p>

        <p>
          เราอยากให้ทุกคนมีโอกาสเก็บและแบ่งปันเรื่องราวสำคัญในชีวิต
          ไม่ว่าจะเป็นวันแต่งงาน วันครบรอบ หรือวันอาลัยคนที่รัก
          ให้คนที่ไม่ได้อยู่ด้วยวันนั้นยังรู้สึกร่วมได้
          ให้รูปภาพและคำอวยพรจากแขกไม่หายไปในแชท
          ให้ความทรงจำมีบ้านที่แท้จริง
        </p>

        <p>
          ชื่อ <strong className="text-gray-900">TangYoo</strong> มาจากคำว่า &ldquo;ตั้งอยู่&rdquo;
          ซึ่งหมายถึงการดำรงอยู่ การคงอยู่ได้นานกว่าที่เราคิด
          เราเชื่อว่าความทรงจำที่ดีควร <em>ตั้งอยู่</em> ตลอดไป
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-10">
          <p className="text-base text-gray-500">
            TangYoo ยังอยู่ในช่วง Early Access — เราเปิดให้ใช้งานฟรีเพื่อเรียนรู้จากผู้ใช้จริง
            ถ้าคุณมีงานสำคัญที่อยากเก็บไว้ เราอยากเป็นส่วนหนึ่งในวันนั้น
          </p>
        </div>

      </article>

      {/* Video placeholder */}
      <section className="max-w-2xl mx-auto px-6 pb-10">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
          {/* ใส่ iframe YouTube เมื่อพร้อม */}
          <div className="text-center text-gray-400 space-y-2 px-8">
            <div className="text-4xl">▶</div>
            <p className="text-sm">วิดีโอเล่าเรื่องของเรา — เร็วๆ นี้</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-50 py-14 text-center px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          พร้อมเก็บความทรงจำวันสำคัญของคุณ?
        </h2>
        <p className="text-gray-500 mb-8">สร้างหน้างานได้ฟรี ใช้เวลาไม่ถึง 5 นาที</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/creation"
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-lg shadow hover:bg-orange-600 transition"
          >
            เริ่มสร้างหน้างาน
          </Link>
          <Link
            href="mailto:hello@tangyoo.com"
            className="px-8 py-4 rounded-full bg-white border border-orange-200 text-orange-600 font-bold text-lg hover:bg-orange-50 transition"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>

    </main>
  );
}
