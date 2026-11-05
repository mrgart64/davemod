import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "DaveMod — AI Moderator & Deteksi Penipuan Digital",
  description: "Aplikasi web berbasis AI edge ringan untuk mendeteksi penipuan online, lowongan kerja palsu, pinjol ilegal, dan pesan penipuan secara instan.",
  keywords: ["DaveMod", "AI Deteksi Penipuan", "Scam Detector", "BASIS-64", "Cloudflare Workers", "Next.js"],
  authors: [{ name: "Gabriel Ado Ramos Tukan", url: "https://gart.basis64.com" }],
  creator: "Gabriel Ado Ramos Tukan",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://davemoderator.vercel.app",
    title: "DaveMod — AI Moderator & Deteksi Penipuan Digital",
    description: "Lindungi diri dari penipuan online menggunakan analisis AI 100% sisi klien yang cepat, aman, dan privasi terjamin.",
    siteName: "DaveMod",
    images: [
      {
        url: "https://davemoderator.vercel.app/banner.jpg", // Ganti dengan path gambar thumbnail Anda di folder public
        width: 1200,
        height: 630,
        alt: "DaveMod — AI Moderator & Deteksi Penipuan Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DaveMod — AI Moderator & Deteksi Penipuan Digital",
    description: "Sistem moderasi dan deteksi penipuan online otomatis berbasis AI.",
    images: ["https://davemoderator.vercel.app/banner.jpg"], // Path gambar untuk preview Twitter/X
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jetbrainsMono.variable}>
      <body className={`${jetbrainsMono.className} bg-neutral-50 text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}