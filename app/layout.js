import MobileContainer from '@/components/mobile-container';
import { Inter, Scheherazade_New } from 'next/font/google';
import './globals.css';

const arabic = Scheherazade_New({
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
});

const latin = Inter({
  variable: '--font-latin',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    template: '%s | Nur Quran',
    default: 'Nur Quran',
  },
  description: 'Teman ibadah harian untuk membaca, mendengar, dan menghayati Al-Quran.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='id'>
      <body
        className={`${arabic.variable} ${latin.variable} antialiased`}
      >
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
