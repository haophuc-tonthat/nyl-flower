import type { Metadata } from "next";
import {
  EB_Garamond,
  Inter
} from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import { LoadingProvider } from '@/contexts/LoadingContext';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export const metadata: Metadata = {
  metadataBase: new URL('https://sunflower-parisian.cloud'),
  title: "Tiệm hoa cinh NYL - Shop hoa tươi đẹp tại Quảng Nam - Đà Nẵng",
  description: "Tiệm hoa cinh NYL chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam - Đà Nẵng. Với hơn 10 năm kinh nghiệm trong ngành hoa tươi.",
  keywords: "hoa tươi, bó hoa, hoa chúc mừng, tiệm hoa Quảng Nam, tiệm hoa Đà Nẵng, hoa tươi đẹp",
  authors: [{ name: "Tiệm hoa cinh NYL" }],
  openGraph: {
    title: "Tiệm hoa cinh NYL - Shop hoa tươi đẹp tại Quảng Nam - Đà Nẵng",
    description: "Tiệm hoa cinh NYL chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam - Đà Nẵng",
    type: "website",
    locale: "vi_VN",
    siteName: "Tiệm hoa cinh NYL",
  },
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${garamond.variable} ${inter.className}`} suppressHydrationWarning>
      <body className={`aliased font-light`} suppressHydrationWarning>
        <LoadingProvider>
          <LoadingOverlay />
          {children}
        </LoadingProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
