import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

import { AppModeProvider } from "@/context/AppModeContext"; // ✅ เพิ่มตรงนี้

export const metadata = {
  title: "TangYoo",
  description: "ให้ความทรงจำ 'ตั้งอยู่' ตลอดไป",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-gray-50 text-gray-900">
        <AppModeProvider> {/* ✅ ครอบทุกอย่าง */}
          <Header />
          <main>{children}</main>
          <Footer />
        </AppModeProvider>
      </body>
    </html>
  );
}
