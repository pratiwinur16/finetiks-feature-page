"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChartLineUp,
  PiggyBank,
  Receipt,
  type Icon,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

type Stage = {
  id: string;
  Icon: Icon;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  color: string;
};

const STAGES: Record<"id" | "en", Stage[]> = {
  id: [
    {
      id: "record",
      Icon: Receipt,
      title: "Catat Semua Transaksimu",
      description:
        "Ngomong, jepret struk, atau input manual, semua transaksi otomatis rapi.",
      cta: "Mulai Mencatat",
      image: "/images/journey/record.jpg",
      imageAlt: "Mencatat transaksi harian di FINETIKS",
      color: "#ff7915",
    },
    {
      id: "saving",
      Icon: PiggyBank,
      title: "Menabung dengan Terarah",
      description: "Bikin Pocket buat tiap tujuan lewat FINETIKS VIP Save.",
      cta: "Kenalan sama VIP Save",
      image: "/images/journey/saving.jpg",
      imageAlt: "Menabung terarah dengan FINETIKS VIP Save",
      color: "#635bff",
    },
    {
      id: "invest",
      Icon: ChartLineUp,
      title: "Investasi buat Masa Depan",
      description: "Beli ETF dan saham AS langsung dari HP lewat FINETIKS Invest.",
      cta: "Cobain FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investasi lewat FINETIKS Invest",
      color: "#009377",
    },
  ],
  en: [
    {
      id: "record",
      Icon: Receipt,
      title: "Track Every Transaction",
      description: "Talk, snap a receipt, or enter it manually, all stays organized.",
      cta: "Start Tracking",
      image: "/images/journey/record.jpg",
      imageAlt: "Tracking daily transactions in FINETIKS",
      color: "#ff7915",
    },
    {
      id: "saving",
      Icon: PiggyBank,
      title: "Save With a Clear Plan",
      description: "Create a Pocket for every goal through FINETIKS VIP Save.",
      cta: "Meet VIP Save",
      image: "/images/journey/saving.jpg",
      imageAlt: "Saving with a clear plan via FINETIKS VIP Save",
      color: "#635bff",
    },
    {
      id: "invest",
      Icon: ChartLineUp,
      title: "Invest for Your Future",
      description: "Buy ETFs and US stocks straight from your phone with FINETIKS Invest.",
      cta: "Try FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investing through FINETIKS Invest",
      color: "#009377",
    },
  ],
};

const HEADER = {
  id: {
    title: "Nggak Perlu Lagi Aplikasi Sana-Sini.",
    subtitle: "Dari catat transaksi, nabung terarah, sampai investasi, dalam satu peta.",
  },
  en: {
    title: "No More Juggling Different Apps.",
    subtitle: "From tracking to focused saving to investing, mapped in one place.",
  },
};

function Connector({ orientation }: { orientation: "corner" | "vertical" }) {
  return (
    <div
      className={
        orientation === "corner"
          ? "flex h-12 items-center justify-center lg:h-auto lg:w-16"
          : "flex h-10 items-center justify-center"
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-text-tertiary">
        <ArrowRight
          weight="bold"
          className={orientation === "corner" ? "size-4 rotate-90 lg:rotate-0" : "size-4 rotate-90"}
        />
      </span>
    </div>
  );
}

function StageCard({
  stage,
  featured,
  reduceMotion,
}: {
  stage: Stage;
  featured?: boolean;
  reduceMotion: boolean;
}) {
  const StageIcon = stage.Icon;
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`group relative w-full overflow-hidden rounded-[28px] ${
        featured ? "min-h-[320px] lg:min-h-[624px]" : "min-h-[260px] lg:min-h-[300px]"
      }`}
    >
      <Image
        src={stage.image}
        alt={stage.imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${stage.color}f2 0%, ${stage.color}99 34%, ${stage.color}1a 68%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full min-h-[inherit] flex-col justify-end gap-3 p-7 lg:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25">
          <StageIcon weight="duotone" className="size-6" />
        </span>
        <h3
          className={`font-poppins font-bold leading-[1.12] text-white ${
            featured ? "text-[28px] sm:text-[36px]" : "text-[22px] sm:text-[26px]"
          }`}
        >
          {stage.title}
        </h3>
        <p className="max-w-[420px] font-poppins text-[15px] leading-relaxed text-white/85">
          {stage.description}
        </p>
        <a
          href="#"
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-poppins text-[14px] font-bold transition-transform duration-200 hover:scale-[1.04]"
          style={{ color: stage.color }}
        >
          {stage.cta}
          <ArrowRight weight="bold" className="size-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function JourneySectionV3() {
  const { lang } = useLanguage();
  const stages = STAGES[lang];
  const header = HEADER[lang];
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-12 lg:gap-16">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-4 text-center"
        >
          <h2 className="font-poppins text-[28px] font-bold leading-tight text-grape-dark sm:text-[40px] sm:leading-[54px]">
            {header.title}
          </h2>
          <p className="max-w-[320px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:max-w-[700px] sm:text-[18px]">
            {header.subtitle}
          </p>
        </motion.div>

        <div className="flex w-full flex-col items-stretch lg:flex-row">
          <div className="lg:flex-[7]">
            <StageCard stage={stages[0]} featured reduceMotion={reduceMotion} />
          </div>

          <Connector orientation="corner" />

          <div className="flex flex-col lg:flex-[5]">
            <StageCard stage={stages[1]} reduceMotion={reduceMotion} />
            <Connector orientation="vertical" />
            <StageCard stage={stages[2]} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
