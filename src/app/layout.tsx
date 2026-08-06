import type { Metadata } from "next";
import { Poppins, Manrope, Montserrat } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FINETIKS — Satu Aplikasi untuk Semua Keuanganmu",
  description:
    "FINETIKS bantu kamu kelola keuangan, perbaiki kebiasaan pengeluaran, dan capai tujuan finansial, semua dalam satu aplikasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FEFEFE] font-poppins">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
