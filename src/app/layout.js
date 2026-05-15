import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import { Kanit } from 'next/font/google';
import { AppModeProvider } from "@/context/AppModeContext";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
});

export const metadata = {
  title: "TangYoo",
  description: "ให้ความทรงจำ 'ตั้งอยู่' ตลอดไป",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`bg-gray-50 text-gray-900 ${kanit.className}`}>
        <AppModeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppModeProvider>
      </body>
    </html>
  );
}
