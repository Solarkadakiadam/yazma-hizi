import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yazma Hızı Testi - Türkçe",
  description: "Türkçe yazma hızınızı test edin ve geliştirin. Ücretsiz online yazma hızı testi uygulaması.",
  keywords: "yazma hızı, typing speed, türkçe, test, klavye, hız testi",
  authors: [{ name: "Yazma Hızı Testi" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Yazma Hızı Testi - Türkçe",
    description: "Türkçe yazma hızınızı test edin ve geliştirin. Ücretsiz online yazma hızı testi uygulaması.",
    type: "website",
    locale: "tr_TR",
    siteName: "Yazma Hızı Testi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazma Hızı Testi - Türkçe", 
    description: "Türkçe yazma hızınızı test edin ve geliştirin. Ücretsiz online yazma hızı testi uygulaması.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
