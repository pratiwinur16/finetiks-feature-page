"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChartLineUp, Receipt, Vault, type Icon } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

type Stage = {
  id: string;
  Icon: Icon;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  bg: string;
};

const STAGES: Record<"id" | "en", Stage[]> = {
  id: [
    {
      id: "record",
      Icon: Receipt,
      title: "Catat Semua Transaksimu",
      description:
        "Ngomong, jepret struk, atau input manual, semua transaksi otomatis rapi. Ini pondasi paling penting sebelum melangkah lebih jauh.",
      cta: "Mulai Mencatat",
      image: "/images/journey/record.jpg",
      imageAlt: "Mencatat transaksi harian di FINETIKS",
      bg: "#2cb9e4",
    },
    {
      id: "saving",
      Icon: Vault,
      title: "Mulai Menabung dengan Terarah",
      description:
        "Bikin Pocket buat tiap tujuan, atur Budget bulanan, sampai sisihkan buat bayar cicilan, semua lewat FINETIKS VIP Save.",
      cta: "Kenalan sama VIP Save",
      image: "/images/journey/saving.jpg",
      imageAlt: "Menabung terarah dengan FINETIKS VIP Save",
      bg: "#635bff",
    },
    {
      id: "invest",
      Icon: ChartLineUp,
      title: "Investasi buat Masa Depan",
      description:
        "Lewat FINETIKS Invest yang kerja sama dengan Gotrade, kamu bisa beli ETF dan saham AS langsung dari HP.",
      cta: "Cobain FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investasi lewat FINETIKS Invest",
      bg: "#009377",
    },
  ],
  en: [
    {
      id: "record",
      Icon: Receipt,
      title: "Track Every Transaction",
      description:
        "Talk, snap a receipt, or enter it manually, and every transaction stays neatly organized. It's the foundation before you go any further.",
      cta: "Start Tracking",
      image: "/images/journey/record.jpg",
      imageAlt: "Tracking daily transactions in FINETIKS",
      bg: "#2cb9e4",
    },
    {
      id: "saving",
      Icon: Vault,
      title: "Start Saving With a Clear Plan",
      description:
        "Create a Pocket for every goal, set a monthly Budget, even set aside money for installments, all through FINETIKS VIP Save.",
      cta: "Meet VIP Save",
      image: "/images/journey/saving.jpg",
      imageAlt: "Saving with a clear plan via FINETIKS VIP Save",
      bg: "#635bff",
    },
    {
      id: "invest",
      Icon: ChartLineUp,
      title: "Invest for Your Future",
      description:
        "Through FINETIKS Invest, in partnership with Gotrade, you can buy ETFs and US stocks straight from your phone.",
      cta: "Try FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investing through FINETIKS Invest",
      bg: "#009377",
    },
  ],
};

const HEADER = {
  id: {
    title: "Nggak Perlu Lagi Aplikasi Sana-Sini.",
    subtitle: "Satu perjalanan, dari catat sampai investasi, dalam satu aplikasi.",
  },
  en: {
    title: "No More Juggling Different Apps.",
    subtitle: "One journey, from tracking to investing, inside a single app.",
  },
};

// Sticky-stack: the OUTER div is a plain, non-sticky block that occupies one real
// h-[100dvh] slot in document flow — Motion's useScroll tracks progress against this
// plain block, since a `position: sticky` element's own rect freezes at top:0 while
// pinned and can't drive a continuous scroll progress value. The INNER div carries the
// actual `sticky top-0` styling, so it visually pins while the outer tracker keeps
// advancing underneath. The next stage's sticky box then naturally scrolls up and
// covers this one; the scale/opacity transform makes it recede as that happens.
function StagePanel({
  stage,
  index,
  total,
}: {
  stage: Stage;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const StageIcon = stage.Icon;

  return (
    <div
      ref={ref}
      className="relative h-[100dvh] w-full"
      style={{ zIndex: total - index }}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center bg-white px-6">
        <motion.div
          style={{
            backgroundColor: stage.bg,
            minHeight: "min(640px, 78dvh)",
            ...(reduceMotion ? {} : { scale, opacity }),
          }}
          className="relative mx-auto flex w-full max-w-[1128px] flex-col-reverse items-center gap-6 overflow-hidden rounded-[32px] px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-0"
        >
          <StageIcon
            weight="duotone"
            className="pointer-events-none absolute -top-20 -right-20 h-[320px] w-[320px] text-white/10 sm:h-[440px] sm:w-[440px] lg:h-[560px] lg:w-[560px]"
          />

          <div className="relative z-10 flex w-full max-w-[520px] flex-col gap-3 text-center lg:gap-4 lg:text-left">
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <h3 className="font-poppins text-[28px] font-bold leading-[1.1] text-white sm:text-[38px] lg:text-[48px]">
              {stage.title}
            </h3>
            <p className="font-poppins text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
              {stage.description}
            </p>
            <a
              href="#"
              className="mx-auto mt-1 inline-flex h-12 w-fit items-center justify-center rounded-full bg-white px-7 font-poppins text-[15px] font-bold transition-transform duration-200 hover:scale-[1.04] sm:h-14 sm:px-8 sm:text-[16px] lg:mx-0"
              style={{ color: stage.bg }}
            >
              {stage.cta}
            </a>
          </div>

          <div className="relative h-[190px] w-[170px] shrink-0 overflow-hidden rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] sm:h-[280px] sm:w-[240px] lg:h-[460px] lg:w-[430px] lg:rounded-[28px]">
            <Image
              src={stage.image}
              alt={stage.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 430px, 240px"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function JourneySectionV2() {
  const { lang } = useLanguage();
  const stages = STAGES[lang];
  const header = HEADER[lang];

  return (
    <section className="w-full bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex max-w-[1128px] flex-col items-center gap-4 px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-20 lg:pt-[128px]"
      >
        <h2 className="font-poppins text-[32px] font-bold leading-tight tracking-tight text-grape-dark sm:text-[48px] sm:leading-[1.05]">
          {header.title}
        </h2>
        <p className="max-w-[320px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:max-w-[640px] sm:text-[18px]">
          {header.subtitle}
        </p>
      </motion.div>

      <div className="relative">
        {stages.map((stage, i) => (
          <StagePanel key={stage.id} stage={stage} index={i} total={stages.length} />
        ))}
      </div>
    </section>
  );
}
