"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// TODO: swap for the real icon once the asset is provided.
function PlaceholderIcon({ className }: { className?: string }) {
  return <span className={`inline-block shrink-0 rounded-full bg-grape-tint-3/50 ${className ?? ""}`} />;
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.5 6.44 11.86 6.72 12.13a1.13 1.13 0 0 0 1.56 0C13.06 21.36 19.5 15 19.5 9.5 19.5 5.36 16.14 2 12 2Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9.5" r="2.75" fill="white" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.5a.6.6 0 0 1-.98-.46V16h-.32A2.5 2.5 0 0 1 4 13.5v-8Z"
        fill="currentColor"
      />
      <rect x="7" y="7.2" width="10" height="1.4" rx="0.7" fill="white" />
      <rect x="7" y="10.2" width="7" height="1.4" rx="0.7" fill="white" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="13" rx="3" fill="currentColor" />
      <path
        d="M4.2 8 11.35 13.1a1 1 0 0 0 1.16 0L19.8 8"
        stroke="white"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="5.5" r="3" fill="currentColor" stroke="white" strokeWidth="1" />
    </svg>
  );
}

const SOCIAL_ICON_PATHS: Record<string, { offset: number; paths: string[] }> = {
  Instagram: {
    offset: 0,
    paths: [
      "M31.4272 9.76562H16.5747C12.4714 9.76562 9.1333 13.1037 9.1333 17.207V30.795C9.1333 34.8982 12.4714 38.2364 16.5747 38.2364H31.4272C35.5305 38.2364 38.8687 34.8982 38.8687 30.795V17.207C38.8687 13.1037 35.5305 9.76562 31.4272 9.76562ZM11.7584 17.207C11.7584 14.5517 13.9193 12.3907 16.5747 12.3907H31.4272C34.0826 12.3907 36.2436 14.5517 36.2436 17.207V30.795C36.2436 33.4503 34.0826 35.6113 31.4272 35.6113H16.5747C13.9193 35.6113 11.7584 33.4503 11.7584 30.795V17.207Z",
      "M24.0009 30.9207C27.8166 30.9207 30.9226 27.8163 30.9226 23.9989C30.9226 20.1815 27.8183 17.0771 24.0009 17.0771C20.1835 17.0771 17.0791 20.1815 17.0791 23.9989C17.0791 27.8163 20.1835 30.9207 24.0009 30.9207ZM24.0009 19.7039C26.3704 19.7039 28.2975 21.6311 28.2975 24.0006C28.2975 26.3701 26.3704 28.2973 24.0009 28.2973C21.6314 28.2973 19.7042 26.3701 19.7042 24.0006C19.7042 21.6311 21.6314 19.7039 24.0009 19.7039Z",
      "M31.5632 18.1948C32.5907 18.1948 33.4282 17.359 33.4282 16.3298C33.4282 15.3007 32.5924 14.4648 31.5632 14.4648C30.534 14.4648 29.6982 15.3007 29.6982 16.3298C29.6982 17.359 30.534 18.1948 31.5632 18.1948Z",
    ],
  },
  LinkedIn: {
    offset: 82,
    paths: [
      "M93.4473 15.9539C92.8149 15.367 92.5005 14.6406 92.5005 13.7762C92.5005 12.9118 92.8166 12.1534 93.4473 11.5648C94.0796 10.9779 94.8935 10.6836 95.8907 10.6836C96.888 10.6836 97.6699 10.9779 98.3006 11.5648C98.9329 12.1517 99.2473 12.89 99.2473 13.7762C99.2473 14.6624 98.9312 15.367 98.3006 15.9539C97.6683 16.5409 96.8661 16.8351 95.8907 16.8351C94.9154 16.8351 94.0796 16.5409 93.4473 15.9539ZM98.7159 19.3207V37.3146H93.0302V19.3207H98.7159Z",
      "M117.643 21.0981C118.883 22.4434 119.502 24.2899 119.502 26.6409V36.9966H114.102V27.3707C114.102 26.1852 113.794 25.2636 113.18 24.6077C112.566 23.9519 111.739 23.6223 110.703 23.6223C109.667 23.6223 108.84 23.9502 108.226 24.6077C107.612 25.2636 107.304 26.1852 107.304 27.3707V36.9966H101.873V19.2701H107.304V21.6211C107.854 20.8374 108.596 20.2186 109.528 19.7628C110.459 19.3071 111.507 19.0801 112.672 19.0801C114.747 19.0801 116.406 19.7527 117.643 21.0964V21.0981Z",
    ],
  },
  YouTube: {
    offset: 164,
    paths: [
      "M203.112 19.0288C202.924 17.2057 202.517 15.1904 201.021 14.1313C199.863 13.31 198.34 13.2796 196.918 13.2813C193.913 13.2813 190.906 13.2864 187.901 13.2881C185.01 13.2914 182.119 13.2931 179.229 13.2965C178.021 13.2965 176.847 13.2037 175.726 13.7265C174.763 14.1751 174.009 15.0285 173.556 15.978C172.926 17.2985 172.795 18.7944 172.719 20.2548C172.579 22.9144 172.594 25.5807 172.761 28.2385C172.884 30.178 173.196 32.3214 174.696 33.5576C176.025 34.6521 177.9 34.7061 179.623 34.7078C185.094 34.7128 190.567 34.7179 196.039 34.7213C196.741 34.723 197.473 34.7095 198.188 34.6319C199.594 34.4801 200.935 34.077 201.839 33.0348C202.752 31.9841 202.986 30.522 203.124 29.1374C203.462 25.778 203.458 22.3865 203.112 19.0288ZM184.737 28.7107V19.2919L192.893 24.0005L184.737 28.7107Z",
    ],
  },
  TikTok: {
    offset: 246,
    paths: [
      "M281.603 17.3649V21.897C280.811 21.8196 279.782 21.6397 278.643 21.2226C277.157 20.6778 276.05 19.9328 275.325 19.356V28.516L275.307 28.4874C275.319 28.6691 275.325 28.8541 275.325 29.0407C275.325 33.5896 271.624 37.2927 267.073 37.2927C262.523 37.2927 258.821 33.5896 258.821 29.0407C258.821 24.4918 262.523 20.7871 267.073 20.7871C267.519 20.7871 267.956 20.8224 268.383 20.8913V25.3579C267.973 25.2115 267.532 25.1325 267.073 25.1325C264.919 25.1325 263.165 26.8848 263.165 29.0407C263.165 31.1966 264.919 32.9489 267.073 32.9489C269.227 32.9489 270.981 31.1949 270.981 29.0407C270.981 28.96 270.98 28.8793 270.975 28.7986V10.998H275.503C275.52 11.3815 275.535 11.7683 275.552 12.1517C275.583 12.9067 275.852 13.6316 276.321 14.2252C276.871 14.9231 277.683 15.7336 278.823 16.3811C279.891 16.9848 280.893 17.2455 281.603 17.3682V17.3649Z",
    ],
  },
  WhatsApp: {
    offset: 328,
    paths: [
      "M356.103 30.8791C350.083 30.8791 345.185 25.9796 345.184 19.9594C345.185 18.4333 346.428 17.1924 347.951 17.1924C348.107 17.1924 348.262 17.2056 348.41 17.2319C348.737 17.2863 349.047 17.3967 349.332 17.5632C349.373 17.5879 349.401 17.6275 349.407 17.6736L350.044 21.6832C350.052 21.7293 350.037 21.7771 350.006 21.8118C349.655 22.2007 349.206 22.4808 348.707 22.6209L348.466 22.6885L348.557 22.9209C349.378 25.0105 351.049 26.68 353.14 27.504L353.373 27.5963L353.44 27.3556C353.58 26.8563 353.86 26.408 354.249 26.057C354.277 26.0306 354.315 26.0175 354.353 26.0175C354.361 26.0175 354.37 26.0175 354.379 26.0191L358.389 26.6552C358.437 26.6635 358.476 26.6898 358.501 26.731C358.666 27.0162 358.776 27.3276 358.832 27.6539C358.859 27.799 358.87 27.9522 358.87 28.1121C358.87 29.6365 357.629 30.8774 356.103 30.8791Z",
      "M366.779 22.6788C366.454 19.0104 364.773 15.6072 362.046 13.0973C359.302 10.5726 355.742 9.18164 352.019 9.18164C343.849 9.18164 337.201 15.8297 337.201 24.0005C337.201 26.7428 337.957 29.4142 339.389 31.7412L336.195 38.8112L346.421 37.7218C348.199 38.4502 350.081 38.8194 352.018 38.8194C352.527 38.8194 353.049 38.793 353.574 38.7386C354.035 38.6892 354.501 38.6167 354.96 38.5244C361.802 37.1417 366.797 31.0688 366.837 24.0796V24.0005C366.837 23.5556 366.817 23.1106 366.777 22.6805L366.779 22.6788ZM346.815 34.6186L341.157 35.2218L342.847 31.4792L342.509 31.026C342.484 30.993 342.459 30.9601 342.431 30.9222C340.965 28.8968 340.19 26.5038 340.19 24.0022C340.19 17.4794 345.497 12.1728 352.019 12.1728C358.13 12.1728 363.31 16.9405 363.809 23.0265C363.836 23.3529 363.851 23.6808 363.851 24.0038C363.851 24.0961 363.849 24.1867 363.847 24.284C363.722 29.7405 359.91 34.3747 354.577 35.5547C354.17 35.6453 353.753 35.7146 353.338 35.759C352.906 35.8085 352.463 35.8332 352.023 35.8332C350.456 35.8332 348.933 35.53 347.494 34.9301C347.334 34.8658 347.178 34.7966 347.031 34.7257L346.817 34.6219L346.815 34.6186Z",
    ],
  },
};

function SocialIcon({ label, className }: { label: string; className?: string }) {
  const icon = SOCIAL_ICON_PATHS[label];
  if (!icon) return <PlaceholderIcon className={className} />;
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <g transform={`translate(${-icon.offset} 0)`}>
        {icon.paths.map((d, i) => (
          <path key={i} d={d} fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}

const FOOTER_LINKS = {
  id: {
    produk: { title: "Produk", links: ["VIP Save", "Manage Money", "Buy & Pay", "FINETIKS Invest"] },
    informasi: { title: "Informasi", links: ["Tentang Kami", "Keamanan", "Blog", "Karier", "Berita"] },
    lainnya: { title: "Lainnya", links: ["FAQ", "Syarat & Ketentuan", "Kebijakan Privasi"] },
  },
  en: {
    produk: { title: "Products", links: ["VIP Save", "Manage Money", "Buy & Pay", "FINETIKS Invest"] },
    informasi: { title: "Information", links: ["About Us", "Security", "Blog", "Careers", "News"] },
    lainnya: { title: "More", links: ["FAQ", "Terms & Conditions", "Privacy Policy"] },
  },
};

const SOCIALS = ["Instagram", "LinkedIn", "YouTube", "TikTok", "WhatsApp"];

const COPY = {
  id: {
    companyName: "PT FINETIKS Inovasi Indonesia",
    addressStrong: "One Pacific Place, Lantai 15",
    addressRest: "Jl. Jenderal Sudirman Kav 52-53 Jakarta 12190",
    phone: "+6285179912745 (khusus WhatsApp)",
    email: "support@finetiks.com",
    registeredLabel: "Terdaftar dan diawasi:",
    memberLabel: "Tergabung dan tersertifikasi:",
    downloadLabel: "Unduh Aplikasi Kami",
    socialCta: "Temukan, ikuti Media Sosial kami, dan bergabung di Komunitas WhatsApp kami:",
    copyright: "Copyright © 2026. Semua hak dilindungi undang-undang.",
    legalPart1: "PT Finetiks Inovasi Indonesia adalah anak perusahaan dari Finetiks Pty Ltd (Australia).",
    legalPart2:
      "PT Finetiks Inovasi Indonesia terdaftar dan diawasi oleh Otoritas Jasa Keuangan Republik Indonesia (OJK) dengan Surat Tanda Terdaftar No. S-516/IK.01/2024 sebagai Penyelenggara Layanan Penyedia Informasi Produk dan Layanan Keuangan.",
    aboutToggle: "Tentang FINETIKS",
  },
  en: {
    companyName: "PT FINETIKS Inovasi Indonesia",
    addressStrong: "One Pacific Place, 15th Floor",
    addressRest: "Jl. Jenderal Sudirman Kav 52-53 Jakarta 12190",
    phone: "+6285179912745 (WhatsApp only)",
    email: "support@finetiks.com",
    registeredLabel: "Registered and supervised by:",
    memberLabel: "Member and certified by:",
    downloadLabel: "Download Our App",
    socialCta: "Find us, follow our Social Media, and join our WhatsApp Community:",
    copyright: "Copyright © 2026. All rights reserved.",
    legalPart1: "PT Finetiks Inovasi Indonesia is a subsidiary of Finetiks Pty Ltd (Australia).",
    legalPart2:
      "PT Finetiks Inovasi Indonesia is registered with and supervised by the Financial Services Authority of the Republic of Indonesia (OJK) under Registration Letter No. S-516/IK.01/2024 as a Provider of Financial Product and Service Information Services.",
    aboutToggle: "About FINETIKS",
  },
};

const ABOUT_PARAGRAPHS = {
  id: [
    "FINETIKS adalah aplikasi tabungan digital dan pengelolaan keuangan pribadi yang dirancang khusus untuk membantu masyarakat Indonesia, termasuk generasi sandwich, mengatur keuangan, membuat anggaran, dan mencapai kebebasan finansial.",
    "Dengan teknologi Artificial Intelligence (AI), aktivitas seperti pencatatan pengeluaran, pengelolaan keuangan, dan pemantauan anggaran dari berbagai akun bisa dilakukan lebih sistematis, semua dalam satu aplikasi.",
    "Bekerja sama dengan Bank Victoria, FINETIKS menghadirkan VIP Save, produk tabungan unggulan dengan bunga yang kompetitif dan menarik, bebas biaya admin, gratis transfer antar bank, serta bonus asuransi jiwa sebagai perlindungan tambahan.",
    "Lebih dari sekadar aplikasi tabungan digital biasa, FINETIKS berkomitmen membangun wealth mindset dan meningkatkan literasi keuangan melalui fitur edukasi dan perencanaan keuangan yang komprehensif — mencakup dana darurat, investasi, hingga perencanaan pensiun.",
    "Sebagai bagian dari ekosistem inovasi Indonesia di industri jasa keuangan berbasis teknologi (FinTech), FINETIKS terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK), Bank Indonesia, Kominfo (Komdigi), dan Asosiasi Fintech Indonesia (AFTECH), serta telah tersertifikasi ISO 27001.",
    "Bagi FINETIKS, perlindungan data, keamanan, dan kenyamanan bertransaksi adalah prioritas utama. Karena itu, FINETIKS menerapkan teknologi keamanan tingkat tinggi, termasuk enkripsi AES-256, autentikasi multifaktor, dan verifikasi terintegrasi.",
    "Saatnya mulai mengelola uangmu lebih cerdas dan menabung lebih menguntungkan bersama FINETIKS!",
  ],
  en: [
    "FINETIKS is a digital savings and personal finance management app built specifically to help Indonesians, including the sandwich generation, organize their finances, build a budget, and achieve financial freedom.",
    "With Artificial Intelligence (AI) technology, activities like expense tracking, money management, and monitoring budgets across different accounts can be done more systematically, all in one app.",
    "In partnership with Bank Victoria, FINETIKS offers VIP Save, a premium savings product with competitive, attractive interest rates, no admin fees, free interbank transfers, and a life insurance bonus for extra protection.",
    "More than just a digital savings app, FINETIKS is committed to building a wealth mindset and improving financial literacy through comprehensive education and financial planning features, covering emergency funds, investing, and retirement planning.",
    "As part of Indonesia's innovation ecosystem in technology-based financial services (FinTech), FINETIKS is registered with and supervised by the Financial Services Authority (OJK), Bank Indonesia, the Ministry of Communication and Digital Affairs (Komdigi), and the Indonesian Fintech Association (AFTECH), and is ISO 27001 certified.",
    "For FINETIKS, data protection, security, and a safe transaction experience are top priorities. That's why FINETIKS applies high-level security technology, including AES-256 encryption, multi-factor authentication, and integrated verification.",
    "It's time to start managing your money smarter and saving more rewardingly with FINETIKS!",
  ],
};

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-poppins text-[15px] font-bold text-text-primary">{title}</h4>
      <ul className="flex flex-col gap-3.5">
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              className="font-poppins text-[14.5px] text-text-secondary transition-colors duration-200 hover:text-grape"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { lang } = useLanguage();
  const t = COPY[lang];
  const links = FOOTER_LINKS[lang];
  const aboutParagraphs = ABOUT_PARAGRAPHS[lang];

  return (
    <footer className="w-full bg-white px-6 pb-10 pt-16 sm:pt-[72px]">
      <div className="mx-auto flex max-w-[1128px] flex-col">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/" aria-label="FINETIKS" className="relative mb-12 inline-block h-[30px] w-[158px]">
            <Image src="/images/logo-finetiks-blue.svg" alt="FINETIKS" fill className="object-contain object-left" />
          </Link>

          <div className="grid grid-cols-1 gap-9 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
            <div className="flex flex-col gap-[22px] sm:col-span-2 lg:col-span-1">
              <h3 className="font-poppins text-xl font-bold text-text-primary">{t.companyName}</h3>
              <div className="flex items-center gap-3">
                <LocationIcon className="h-8 w-8 shrink-0 text-[#93B0CC]" />
                <p className="font-poppins text-[14.5px] leading-relaxed text-text-secondary">
                  <strong className="font-semibold text-text-primary">{t.addressStrong}</strong>
                  <br />
                  {t.addressRest}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ChatIcon className="h-8 w-8 shrink-0 text-[#93B0CC]" />
                <p className="font-poppins text-[14.5px] text-text-secondary">
                  <strong className="font-semibold text-text-primary">{t.phone}</strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-8 w-8 shrink-0 text-[#93B0CC]" />
                <p className="font-poppins text-[14.5px] text-text-secondary">
                  <strong className="font-semibold text-text-primary">{t.email}</strong>
                </p>
              </div>
            </div>

            <FooterLinkColumn title={links.produk.title} links={links.produk.links} />
            <FooterLinkColumn title={links.informasi.title} links={links.informasi.links} />
            <FooterLinkColumn title={links.lainnya.title} links={links.lainnya.links} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap items-start justify-between gap-10 border-y border-grape/10 py-10"
        >
          <div className="flex flex-col gap-3.5">
            <p className="font-poppins text-[13.5px] font-semibold text-text-tertiary">{t.registeredLabel}</p>
            <div className="flex flex-wrap items-center gap-6">
              <Image
                src="/images/badge-komdigi.svg"
                alt="Komdigi"
                width={90}
                height={78}
                className="h-[62px] w-auto object-contain sm:h-20"
              />
              <Image
                src="/images/logo-ojk.svg"
                alt="OJK"
                width={140}
                height={62}
                className="h-[50px] w-auto object-contain sm:h-16"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="font-poppins text-[13.5px] font-semibold text-text-tertiary">{t.memberLabel}</p>
            <div className="flex flex-wrap items-center gap-6">
              <Image
                src="/images/badge-fintech-indonesia.svg"
                alt="Fintech Indonesia (AFTECH)"
                width={160}
                height={80}
                className="h-[70px] w-auto object-contain sm:h-24"
              />
              <Image
                src="/images/badge-iso27001-cert.webp"
                alt="ISO 27001"
                width={90}
                height={90}
                className="h-[70px] w-auto object-contain sm:h-24"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="font-poppins text-[13.5px] font-semibold text-text-tertiary">{t.downloadLabel}</p>
            <div className="flex flex-wrap items-center gap-2.5">
              <a href="#" className="flex h-11 items-center gap-[9px] rounded-[9px] border border-white/20 bg-black px-3.5">
                <span className="relative h-[18px] w-[18px]">
                  <Image src="/images/appstore-icon.svg" alt="" fill className="object-contain" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="relative h-2 w-[70px]">
                    <Image src="/images/appstore-download-on-the.svg" alt="" fill className="object-contain" />
                  </span>
                  <span className="relative h-[17px] w-[80px]">
                    <Image src="/images/appstore-appstore-text.svg" alt="Download on the App Store" fill className="object-contain" />
                  </span>
                </span>
              </a>
              <a href="#" className="relative h-11 w-[130px]">
                <Image src="/images/btn-googleplay.svg" alt="Get it on Google Play" fill className="object-contain" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-5 py-8"
        >
          <p className="max-w-[480px] font-poppins text-[14.5px] font-semibold text-text-secondary">
            {t.socialCta}
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-grape to-grape-dark text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <SocialIcon label={label} className="h-7 w-7" />
              </a>
            ))}
          </div>
        </motion.div>

        <hr className="h-px w-full border-none bg-grape/10" />

        <div className="pt-8">
          <div className="relative mb-[18px] h-[22px] w-[116px]">
            <Image src="/images/logo-finetiks-blue.svg" alt="FINETIKS" fill className="object-contain object-left" />
          </div>
          <p className="mb-4 font-poppins text-sm font-medium text-text-secondary">
            {t.copyright}
          </p>
          <p className="mb-5 max-w-[820px] font-poppins text-[13px] leading-relaxed text-text-tertiary">
            {t.legalPart1}
            <br />
            <br />
            {t.legalPart2}
          </p>

          <div className="w-full">
            <button
              type="button"
              onClick={() => setAboutOpen((v) => !v)}
              aria-expanded={aboutOpen}
              className="inline-flex items-center gap-3 font-poppins text-[14.5px] font-semibold text-text-primary"
            >
              {t.aboutToggle}
              <span className="text-text-primary/70">
                <ChevronIcon open={aboutOpen} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {aboutOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex max-w-[820px] flex-col gap-4 pt-4">
                    {aboutParagraphs.map((paragraph, i) => (
                      <p key={i} className="font-poppins text-[13.5px] leading-relaxed text-text-tertiary">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
