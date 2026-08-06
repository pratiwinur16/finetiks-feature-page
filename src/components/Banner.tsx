"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const COPY = {
  id: {
    title: "Bantu Kamu Kelola dan Maksimalkan Tabunganmu!",
    body: "Dari atur anggaran, beli dan bayar tagihan, sampai menabung, semuanya ada di ujung jarimu. Download aplikasi FINETIKS sekarang!",
  },
  en: {
    title: "Helping You Manage and Maximize Your Savings!",
    body: "From budgeting, buy and pay bills to savings, everything is right at your fingertips. Download the FINETIKS app now!",
  },
};

function AppStoreButton() {
  return (
    <a
      href="#"
      className="relative block h-[55px] w-[191px] shrink-0 overflow-hidden rounded-lg bg-black transition-transform duration-200 hover:scale-[1.03]"
    >
      <div className="absolute left-[18px] top-[13px] h-[29px] w-[29px]">
        <Image src="/images/appstore-icon.svg" alt="" fill className="object-contain" />
      </div>
      <div className="absolute left-[62px] top-[9px] h-[13px] w-[110px]">
        <Image src="/images/appstore-download-on-the.svg" alt="" fill className="object-contain" />
      </div>
      <div className="absolute left-[60px] top-[24px] h-[20px] w-[115px]">
        <Image src="/images/appstore-appstore-text.svg" alt="" fill className="object-contain" />
      </div>
    </a>
  );
}

function GooglePlayButton() {
  return (
    <a
      href="#"
      className="relative block h-[55px] w-[191px] shrink-0 transition-transform duration-200 hover:scale-[1.03]"
    >
      <Image src="/images/btn-googleplay.svg" alt="Get it on Google Play" fill className="object-contain" />
    </a>
  );
}

function BannerContent() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <>
      <h3 className="font-poppins text-[24px] font-bold leading-[1.3] text-text-primary sm:text-[32px] sm:leading-[43px]">
        {t.title}
      </h3>
      <p className="font-poppins text-base leading-[24px] text-text-primary sm:text-lg">
        {t.body}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <AppStoreButton />
        <GooglePlayButton />
      </div>
    </>
  );
}

export default function Banner() {
  return (
    <section className="w-full bg-white px-6 pb-16 sm:pb-24 lg:pb-[128px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-[1128px] overflow-hidden rounded-lg bg-[#F8FAFC] shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
      >
        {/* Desktop / tablet layout — absolute positioned to match the design 1:1 via an aspect-ratio box */}
        <div className="relative hidden aspect-[1127/410] w-full sm:block">
          <div
            className="absolute flex flex-col items-start gap-5"
            style={{ left: "5.1%", top: "18.5%", width: "47%" }}
          >
            <BannerContent />
          </div>

          {/* Swoosh — slow independent sway */}
          <motion.div
            className="absolute h-full"
            style={{ left: "41.7%", width: "40.5%" }}
            animate={{ x: [0, 6, 0, -6, 0], rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/banner-swoosh.png"
              alt=""
              fill
              className="object-contain"
              sizes="460px"
            />
          </motion.div>

          {/* Phones — gentle "flowing" float, sized to fill most of the card */}
          <motion.div
            className="absolute"
            style={{ left: "42%", top: "-30%", width: "72%", height: "190%" }}
            animate={{ y: [0, -12, 0, 8, 0], rotate: [0, 0.6, 0, -0.6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/banner-phones.png"
              alt="FINETIKS app screens"
              fill
              className="object-contain object-bottom"
              sizes="820px"
            />
          </motion.div>

          {/* Teal splash — subtle pulse */}
          <motion.div
            className="absolute aspect-square"
            style={{ left: "77.1%", top: "-12.8%", width: "24.7%", rotate: -30 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/banner-splash-blob.png"
              alt=""
              fill
              className="object-contain"
              sizes="280px"
            />
          </motion.div>
        </div>

        {/* Mobile layout — simple stacked flow */}
        <div className="flex flex-col items-start gap-5 p-6 sm:hidden">
          <BannerContent />
          <motion.div
            className="relative mx-auto h-[460px] w-full max-w-[460px]"
            animate={{ y: [0, -8, 0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/banner-phones.png"
              alt="FINETIKS app screens"
              fill
              className="object-contain"
              sizes="460px"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
