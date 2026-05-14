// /app/privacy/page.js
export const metadata = {
  title: "นโยบายความเป็นส่วนตัว | TangYoo",
  description: "นโยบายความเป็นส่วนตัวของ TangYoo — การเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของท่าน",
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <img src="/logo-tangyoo.png" alt="TangYoo" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-sm text-gray-400 mt-1">อัปเดตล่าสุด: {LAST_UPDATED}</p>
        </div>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          TangYoo (&ldquo;บริษัท&rdquo;, &ldquo;เรา&rdquo;) ให้ความสำคัญกับความเป็นส่วนตัวของท่านอย่างยิ่ง
          นโยบายนี้อธิบายว่าเราเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของท่านอย่างไร
          ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </p>

        {/* 1 */}
        <Section title="1. ข้อมูลที่เราเก็บรวบรวม">
          <p>เราเก็บรวบรวมข้อมูลส่วนบุคคลดังต่อไปนี้เมื่อท่านใช้บริการ TangYoo</p>
          <ul className="space-y-1.5 mt-2">
            <Li><strong>ข้อมูลบัญชี:</strong> ชื่อ อีเมล และรูปโปรไฟล์ที่ได้รับจาก Google เมื่อท่านลงทะเบียนหรือเข้าสู่ระบบ</Li>
            <Li><strong>ข้อมูลงาน:</strong> ชื่องาน วัน-เวลา สถานที่ ประเภทงาน และข้อความที่ท่านกรอกเมื่อสร้างหน้างาน</Li>
            <Li><strong>รูปภาพและสื่อ:</strong> รูปภาพที่ท่านหรือแขกของท่านอัปโหลดลงในแกลเลอรี่ของงาน</Li>
            <Li><strong>ข้อความสมุดเยี่ยม:</strong> ชื่อและข้อความที่แขกเขียนฝากไว้ในงานของท่าน</Li>
            <Li><strong>ข้อมูลการใช้งาน:</strong> Log การเข้าใช้งาน และข้อมูลอุปกรณ์เพื่อความปลอดภัยของระบบ</Li>
          </ul>
        </Section>

        {/* 2 */}
        <Section title="2. วัตถุประสงค์ในการใช้ข้อมูล">
          <ul className="space-y-1.5">
            <Li>เพื่อสร้างและแสดงหน้างานของท่าน (Memory Page / Invitation Page)</Li>
            <Li>เพื่อให้แขกของท่านสามารถอัปโหลดรูปภาพและเขียนข้อความอวยพรได้</Li>
            <Li>เพื่อส่ง QR Code และลิงก์งานให้ท่าน</Li>
            <Li>เพื่อปรับปรุงคุณภาพและความปลอดภัยของบริการ</Li>
            <Li>เพื่อติดต่อท่านในกรณีที่จำเป็น เช่น แจ้งการเปลี่ยนแปลงนโยบาย</Li>
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            เราจะไม่ใช้ข้อมูลของท่านเพื่อวัตถุประสงค์อื่นนอกเหนือจากที่ระบุข้างต้น
            โดยไม่ได้รับความยินยอมจากท่านก่อน
          </p>
        </Section>

        {/* 3 */}
        <Section title="3. การเปิดเผยข้อมูลแก่บุคคลที่สาม">
          <p>เราไม่ขาย ไม่แลกเปลี่ยน และไม่โอนข้อมูลส่วนบุคคลของท่านให้แก่บุคคลภายนอก ยกเว้น</p>
          <ul className="space-y-1.5 mt-2">
            <Li>
              <strong>Supabase:</strong> ผู้ให้บริการฐานข้อมูลและพื้นที่จัดเก็บไฟล์ที่เราใช้
              ข้อมูลถูกจัดเก็บบน Infrastructure ที่ปลอดภัยตามมาตรฐาน SOC 2
            </Li>
            <Li>
              <strong>Google:</strong> ใช้สำหรับการยืนยันตัวตน (OAuth) เท่านั้น
              เราไม่มีการเข้าถึงรหัสผ่านของท่านในทุกกรณี
            </Li>
            <Li>
              <strong>กฎหมาย:</strong> ในกรณีที่มีคำสั่งศาลหรือหน่วยงานรัฐที่มีอำนาจตามกฎหมาย
            </Li>
          </ul>
        </Section>

        {/* 4 */}
        <Section title="4. ระยะเวลาเก็บรักษาข้อมูล">
          <ul className="space-y-1.5">
            <Li>ข้อมูลบัญชีและข้อมูลงาน: เก็บไว้ตลอดระยะเวลาที่ท่านมีบัญชีกับเรา</Li>
            <Li>รูปภาพในแกลเลอรี่: เก็บไว้จนกว่าท่านจะลบหรือปิดบัญชี</Li>
            <Li>ข้อความสมุดเยี่ยม: เก็บไว้จนกว่าเจ้าของงานจะลบหรือปิดบัญชี</Li>
            <Li>เมื่อท่านลบบัญชี ข้อมูลทั้งหมดจะถูกลบภายใน 30 วัน</Li>
          </ul>
        </Section>

        {/* 5 */}
        <Section title="5. สิทธิ์ของท่านในฐานะเจ้าของข้อมูล (PDPA)">
          <p>ภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิ์ดังนี้</p>
          <ul className="space-y-1.5 mt-2">
            <Li><strong>สิทธิ์เข้าถึง:</strong> ขอดูข้อมูลส่วนบุคคลที่เราเก็บไว้</Li>
            <Li><strong>สิทธิ์แก้ไข:</strong> ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่ครบถ้วน</Li>
            <Li><strong>สิทธิ์ลบ:</strong> ขอให้ลบข้อมูลส่วนบุคคลของท่าน</Li>
            <Li><strong>สิทธิ์คัดค้าน:</strong> คัดค้านการประมวลผลข้อมูลของท่านในบางกรณี</Li>
            <Li><strong>สิทธิ์โอนย้ายข้อมูล:</strong> ขอรับข้อมูลของท่านในรูปแบบที่อ่านได้</Li>
            <Li><strong>สิทธิ์ถอนความยินยอม:</strong> ถอนความยินยอมที่เคยให้ไว้ได้ตลอดเวลา</Li>
          </ul>
          <p className="mt-3">
            หากต้องการใช้สิทธิ์ใดๆ กรุณาติดต่อเราผ่านช่องทางด้านล่าง
            เราจะดำเนินการภายใน <strong>30 วัน</strong>
          </p>
        </Section>

        {/* 6 */}
        <Section title="6. คุกกี้ (Cookies)">
          <p>เราใช้คุกกี้เพื่อ</p>
          <ul className="space-y-1.5 mt-2">
            <Li><strong>Session Cookie:</strong> จำสถานะการเข้าสู่ระบบของท่าน (จำเป็นต่อการใช้งาน)</Li>
            <Li><strong>Preference Cookie:</strong> จำการตั้งค่าธีมและภาษา</Li>
          </ul>
          <p className="mt-2">
            เราไม่ใช้คุกกี้เพื่อการโฆษณาหรือติดตามพฤติกรรมจากเว็บไซต์อื่น
          </p>
        </Section>

        {/* 7 */}
        <Section title="7. ความปลอดภัยของข้อมูล">
          <ul className="space-y-1.5">
            <Li>การส่งข้อมูลทั้งหมดเข้ารหัสด้วย HTTPS / TLS</Li>
            <Li>รหัสผ่านไม่ถูกจัดเก็บในระบบเรา (ใช้ Google OAuth เท่านั้น)</Li>
            <Li>การเข้าถึงฐานข้อมูลจำกัดเฉพาะทีมงานที่ได้รับอนุญาต</Li>
            <Li>มีการ Audit Log ทุกการเข้าถึงข้อมูลสำคัญ</Li>
          </ul>
        </Section>

        {/* 8 */}
        <Section title="8. การเปลี่ยนแปลงนโยบาย">
          <p>
            เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว หากมีการเปลี่ยนแปลงสำคัญ
            เราจะแจ้งให้ท่านทราบผ่านอีเมลหรือแจ้งเตือนบนหน้าเว็บไซต์ก่อนการเปลี่ยนแปลงมีผล
            การใช้บริการต่อไปหลังจากวันที่มีผล ถือว่าท่านยอมรับนโยบายที่อัปเดต
          </p>
        </Section>

        {/* 9 Contact */}
        <Section title="9. ช่องทางติดต่อ">
          <p>หากมีข้อสงสัยหรือต้องการใช้สิทธิ์ใดๆ กรุณาติดต่อ</p>
          <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-1.5">
            <p><strong>TangYoo</strong></p>
            <p>อีเมล: <a href="mailto:hello@tangyoo.com" className="text-orange-600 underline">hello@tangyoo.com</a></p>
            <p>Line OA: <a href="https://lin.ee/yourline" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">lin.ee/yourline</a></p>
            <p className="text-xs text-gray-400 pt-1">เราจะตอบกลับภายใน 3 วันทำการ</p>
          </div>
        </Section>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-8 pt-6 border-t border-gray-100">
          นโยบายนี้มีผลบังคับใช้ตั้งแต่วันที่ {LAST_UPDATED}<br />
          © {new Date().getFullYear()} TangYoo — ให้ความทรงจำ &lsquo;ตั้งอยู่&rsquo; ตลอดไป
        </p>
      </div>
    </main>
  );
}
