import MobileContainer from "@/components/mobile-container";
import { Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";

const arabic = Scheherazade_New({
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
});

const latin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Alquran",
    default: "Alquran",
  },
  description: "Alquran",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${arabic.variable} ${latin.variable} antialiased bg-gradient-to-br from-green-50 to-blue-50`}
      >
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
