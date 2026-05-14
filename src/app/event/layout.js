// /app/event/layout.js
// หน้า event ไม่แสดง Header/Footer ของ TangYoo
// แขกที่สแกน QR เห็นแค่หน้างานของเจ้าภาพอย่างเดียว
export default function EventLayout({ children }) {
  return <>{children}</>;
}
