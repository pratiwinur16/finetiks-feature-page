"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChartLineUp, PiggyBank, Receipt, type Icon } from "@phosphor-icons/react";
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
      Icon: PiggyBank,
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
      Icon: PiggyBank,
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

function StageCard({ stage }: { stage: Stage }) {
  const StageIcon = stage.Icon;
  return (
    <div
      style={{ backgroundColor: stage.bg }}
      className="relative flex h-full w-[86vw] shrink-0 flex-col overflow-hidden rounded-[32px] sm:w-[520px] lg:w-[620px]"
    >
      <StageIcon
        weight="duotone"
        className="pointer-events-none absolute -top-16 -right-16 h-[260px] w-[260px] text-white/10 lg:h-[360px] lg:w-[360px]"
      />

      <div className="relative z-10 flex h-full flex-col-reverse items-center gap-5 p-7 sm:gap-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-11">
        <div className="flex w-full max-w-[380px] flex-col gap-3 text-center lg:gap-4 lg:text-left">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25 lg:mx-0">
            <StageIcon weight="duotone" className="size-6" />
          </span>
          <h3 className="font-poppins text-[24px] font-bold leading-[1.1] text-white sm:text-[28px] lg:text-[32px]">
            {stage.title}
          </h3>
          <p className="font-poppins text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            {stage.description}
          </p>
          <a
            href="#"
            className="mx-auto mt-1 inline-flex h-11 w-fit items-center justify-center rounded-full bg-white px-6 font-poppins text-[14px] font-bold transition-transform duration-200 hover:scale-[1.04] sm:h-12 sm:px-7 sm:text-[15px] lg:mx-0"
            style={{ color: stage.bg }}
          >
            {stage.cta}
          </a>
        </div>

        <div className="relative h-[150px] w-[130px] shrink-0 overflow-hidden rounded-[20px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] sm:h-[190px] sm:w-[165px] lg:h-[220px] lg:w-[190px]">
          <Image
            src={stage.image}
            alt={stage.imageAlt}
            fill
            className="object-cover"
            sizes="190px"
          />
        </div>
      </div>
    </div>
  );
}

const PANEL_HEIGHT = "min(78vh, 520px)";

export default function JourneySectionV5() {
  const { lang } = useLanguage();
  const stages = STAGES[lang];
  const header = HEADER[lang];
  const reduceMotion = Boolean(useReducedMotion());

  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      setDistance(Math.max(0, trackWidth - viewportWidth));
    };
    update();
    const observer = new ResizeObserver(update);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [lang]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-4 text-center">
        <h2 className="font-poppins text-[28px] font-bold leading-tight text-grape-dark sm:text-[40px] sm:leading-[54px]">
          {header.title}
        </h2>
        <p className="max-w-[320px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:max-w-[640px] sm:text-[18px]">
          {header.subtitle}
        </p>
      </div>

      {reduceMotion ? (
        // Reduced motion: no scroll-hijacked pan — degrade to a plain native
        // horizontal scroller with snap points the user drives directly.
        <div className="mx-auto mt-12 flex max-w-[1128px] snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:mt-16">
          {stages.map((stage) => (
            <div key={stage.id} className="snap-center" style={{ height: PANEL_HEIGHT }}>
              <StageCard stage={stage} />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={wrapperRef}
          className="relative mx-auto mt-12 max-w-[1128px] lg:mt-16"
          style={{ height: distance ? `calc(${PANEL_HEIGHT} + ${distance}px)` : PANEL_HEIGHT }}
        >
          <div
            ref={viewportRef}
            className="sticky top-24 w-full overflow-hidden"
            style={{ height: PANEL_HEIGHT }}
          >
            <motion.div ref={trackRef} style={{ x }} className="flex h-full items-stretch gap-6">
              {stages.map((stage) => (
                <StageCard key={stage.id} stage={stage} />
              ))}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-neutral-200">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-grape" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
