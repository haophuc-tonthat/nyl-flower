import type { Metadata } from "next";
import {
  EB_Garamond,
  Inter
} from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import { LoadingProvider } from '@/contexts/LoadingContext';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { generateMetadata } from "@/components/DynamicMetadata";

export { generateMetadata };

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
