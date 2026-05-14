// /app/terms/page.js
import Link from "next/link";

export const metadata = {
  title: "ข้อกำหนดการใช้งาน | TangYoo",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการ TangYoo",
};

const LAST_UPDATED = "14 พฤษภาคม 2568";

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-2 text-sm">
        {children}
      </div>
    </section>
  );
}

function Li({ children }) {
  return (
    <li className="flex gap-2">
      <span className="text-orange-400 mt-0.5 shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <img src="/logo-tangyoo.png" alt="TangYoo" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">ข้อกำหนดการใช้งาน</h1>
          <p className="text-sm text-gray-400 mt-1">อัปเดตล่าสุด: {LAST_UPDATED}</p>
        </div>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          กรุณาอ่านข้อกำหนดการใช้งานเหล่านี้อย่างละเอียดก่อนใช้บริการ TangYoo
          การใช้บริการถือว่าท่านยอมรับข้อกำหนดทั้งหมดด้านล่าง
        </p>

        <Section title="1. การยอมรับข้อกำหนด">
          <p>
            เมื่อท่านลงทะเบียน เข้าสู่ระบบ หรือใช้บริการ TangYoo ไม่ว่าในรูปแบบใด
            ถือว่าท่านยอมรับข้อกำหนดการใช้งานฉบับนี้และ
            <a href="/privacy" className="text-orange-500 underline ml-1">นโยบายความเป็นส่วนตัว</a>
            ของเรา
          </p>
        </Section>

        <Section title="2. บริการที่ให้">
          <p>TangYoo ให้บริการ:</p>
          <ul className="space-y-1.5 mt-2">
            <Li>สร้างหน้างานดิจิทัลสำหรับงานแต่งงาน งานรำลึก และงานครบรอบ</Li>
            <Li>แชร์ QR Code ให้แขกเข้าร่วมงาน อัปโหลดรูปภาพ และเขียนข้อความอวยพร</Li>
            <Li>เก็บรักษาความทรงจำในรูปแบบดิจิทัลผ่าน Memory Page</Li>
            <Li>บริการสั่งซื้อของชำร่วยที่ระลึก (ในอนาคต)</Li>
          </ul>
        </Section>

        <Section title="3. การลงทะเบียนและบัญชีผู้ใช้">
          <ul className="space-y-1.5">
            <Li>ท่านต้องมีอายุ 18 ปีขึ้นไปจึงจะสามารถลงทะเบียนได้</Li>
            <Li>ข้อมูลที่ใช้ลงทะเบียนต้องเป็นข้อมูลจริงและถูกต้อง</Li>
            <Li>ท่านรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นในบัญชีของท่าน</Li>
            <Li>ห้ามแชร์รหัสผ่านหรืออนุญาตให้ผู้อื่นใช้บัญชีของท่าน</Li>
          </ul>
        </Section>

        <Section title="4. เนื้อหาที่ผู้ใช้อัปโหลด">
          <p>ท่านรับผิดชอบต่อเนื้อหาที่อัปโหลดทั้งหมด และรับรองว่า:</p>
          <ul className="space-y-1.5 mt-2">
            <Li>เนื้อหาไม่ละเมิดลิขสิทธิ์ สิทธิ์ความเป็นส่วนตัว หรือสิทธิ์ของบุคคลที่สาม</Li>
            <Li>เนื้อหาไม่มีสื่อลามก ความรุนแรง หรือเนื้อหาที่ผิดกฎหมาย</Li>
            <Li>ท่านมีสิทธิ์เผยแพร่รูปภาพและข้อความที่อัปโหลด</Li>
            <Li>เนื้อหาไม่มีไวรัส มัลแวร์ หรือโค้ดที่เป็นอันตราย</Li>
          </ul>
          <p className="mt-3">
            TangYoo ขอสงวนสิทธิ์ในการลบเนื้อหาที่ละเมิดข้อกำหนดเหล่านี้
            โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
          </p>
        </Section>

        <Section title="5. ทรัพย์สินทางปัญญา">
          <ul className="space-y-1.5">
            <Li>โลโก้ ชื่อ TangYoo และทรัพย์สินทางปัญญาทั้งหมดเป็นของ TangYoo</Li>
            <Li>เนื้อหาที่ท่านอัปโหลดยังคงเป็นของท่าน — เราไม่อ้างสิทธิ์ความเป็นเจ้าของ</Li>
            <Li>ท่านให้สิทธิ์ TangYoo ในการแสดงเนื้อหาบนแพลตฟอร์มเพื่อให้บริการ</Li>
          </ul>
        </Section>

        <Section title="6. สิ่งที่ห้ามทำ">
          <ul className="space-y-1.5">
            <Li>ใช้บริการเพื่อวัตถุประสงค์ที่ผิดกฎหมาย</Li>
            <Li>พยายาม hack เจาะระบบ หรือเข้าถึงข้อมูลของผู้ใช้รายอื่น</Li>
            <Li>ส่ง spam หรือเนื้อหาโฆษณาที่ไม่ได้รับอนุญาต</Li>
            <Li>ใช้ bot หรือ automation เพื่อสร้างบัญชีหรือ event จำนวนมาก</Li>
            <Li>ปลอมแปลงตัวตนหรือสร้างหน้างานในนามของบุคคลอื่นโดยไม่ได้รับอนุญาต</Li>
          </ul>
        </Section>

        <Section title="7. การระงับและยกเลิกบัญชี">
          <ul className="space-y-1.5">
            <Li>ท่านสามารถยกเลิกบัญชีได้ทุกเวลาโดยติดต่อเรา</Li>
            <Li>TangYoo ขอสงวนสิทธิ์ระงับหรือยกเลิกบัญชีที่ละเมิดข้อกำหนด</Li>
            <Li>เมื่อยกเลิกบัญชี ข้อมูลและ event ทั้งหมดจะถูกลบภายใน 30 วัน</Li>
          </ul>
        </Section>

        <Section title="8. ข้อจำกัดความรับผิด">
          <p>
            TangYoo ให้บริการ &ldquo;ตามสภาพที่เป็น&rdquo; (as-is) และไม่รับประกันว่า
            บริการจะไม่มีการหยุดชะงัก ปราศจากข้อผิดพลาด หรือตรงตามความต้องการของท่านทุกประการ
          </p>
          <p className="mt-2">
            TangYoo ไม่รับผิดชอบต่อความเสียหายทางอ้อม ที่เกิดจากการใช้หรือไม่สามารถใช้บริการ
            รวมถึงการสูญหายของข้อมูลหรือความทรงจำดิจิทัล
          </p>
        </Section>

        <Section title="9. การเปลี่ยนแปลงข้อกำหนด">
          <p>
            เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว
            หากมีการเปลี่ยนแปลงสำคัญ เราจะแจ้งให้ท่านทราบล่วงหน้า 7 วันทางอีเมล
            การใช้บริการต่อไปหลังจากวันที่มีผล ถือว่าท่านยอมรับข้อกำหนดที่อัปเดต
          </p>
        </Section>

        <Section title="10. กฎหมายที่บังคับใช้">
          <p>
            ข้อกำหนดนี้อยู่ภายใต้กฎหมายแห่งราชอาณาจักรไทย
            ข้อพิพาทใดๆ จะถูกพิจารณาโดยศาลที่มีเขตอำนาจในประเทศไทย
          </p>
        </Section>

        {/* Contact */}
        <Section title="11. ช่องทางติดต่อ">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-1.5">
            <p><strong>TangYoo</strong></p>
            <p>อีเมล: <a href="mailto:hello@tangyoo.com" className="text-orange-600 underline">hello@tangyoo.com</a></p>
            <p>Line OA: <a href="https://lin.ee/yourline" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">lin.ee/yourline</a></p>
          </div>
        </Section>

        <div className="flex gap-4 justify-center mt-8 pt-6 border-t border-gray-100">
          <Link href="/privacy" className="text-sm text-orange-500 underline">นโยบายความเป็นส่วนตัว</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-sm text-gray-400 underline">กลับหน้าแรก</Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          © {new Date().getFullYear()} TangYoo — ให้ความทรงจำ &lsquo;ตั้งอยู่&rsquo; ตลอดไป
        </p>
      </div>
    </main>
  );
}
