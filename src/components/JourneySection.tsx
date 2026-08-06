"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type Slide = {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  accent: string;
};

// TODO: swap these mockup images for the real Savings/Invest screens once they're ready.
const SLIDES: Record<"id" | "en", Slide[]> = {
  id: [
    {
      step: "01",
      eyebrow: "Langkah 01 — Catat",
      title: "Catat Semua Transaksimu",
      description:
        "Kamu udah lihat sendiri di atas — ngomong, jepret struk, atau input manual, semua transaksi otomatis rapi. Ini pondasi paling penting sebelum melangkah lebih jauh.",
      cta: "Lihat Cara Mencatat",
      image: "/images/feature-voice-mockup.png",
      imageAlt: "Tampilan pencatatan transaksi otomatis di FINETIKS",
      accent: "#3E7CB1",
    },
    {
      step: "02",
      eyebrow: "Langkah 02 — Nabung",
      title: "Mulai Menabung dengan Terarah",
      description:
        "Sesudah catatanmu rapi, saatnya nabung. Bikin Pocket buat tiap tujuan, atur Budget bulanan, sampai sisihkan buat bayar cicilan — semua lewat FINETIKS VIP Save.",
      cta: "Kenalan sama VIP Save",
      image: "/images/hero-phone-mockup.png",
      imageAlt: "Tampilan FINETIKS VIP Save",
      accent: "#1F9E73",
    },
    {
      step: "03",
      eyebrow: "Langkah 03 — Investasi",
      title: "Investasi buat Masa Depan",
      description:
        "Kalau catatan udah rapi dan tabungan udah jalan, kamu siap naik level. Lewat FINETIKS Invest yang kerja sama dengan Gotrade, kamu bisa beli ETF dan saham AS langsung dari HP.",
      cta: "Jelajahi FINETIKS Invest",
      image: "/images/feature-insight-mockup.png",
      imageAlt: "Tampilan FINETIKS Invest",
      accent: "#D99A2B",
    },
  ],
  en: [
    {
      step: "01",
      eyebrow: "Step 01 — Track",
      title: "Track Every Transaction",
      description:
        "You've already seen it above — talk, snap a receipt, or enter it manually, and every transaction stays neatly organized. It's the most important foundation before you go any further.",
      cta: "See How Tracking Works",
      image: "/images/feature-voice-mockup.png",
      imageAlt: "FINETIKS automatic transaction tracking screen",
      accent: "#3E7CB1",
    },
    {
      step: "02",
      eyebrow: "Step 02 — Save",
      title: "Start Saving With a Clear Plan",
      description:
        "Once your records are tidy, it's time to save. Create a Pocket for every goal, set a monthly Budget, even set aside money for installments — all through FINETIKS VIP Save.",
      cta: "Meet VIP Save",
      image: "/images/hero-phone-mockup.png",
      imageAlt: "FINETIKS VIP Save screen",
      accent: "#1F9E73",
    },
    {
      step: "03",
      eyebrow: "Step 03 — Invest",
      title: "Invest for Your Future",
      description:
        "Once your records are tidy and your savings are moving, you're ready to level up. Through FINETIKS Invest, in partnership with Gotrade, you can buy ETFs and US stocks straight from your phone.",
      cta: "Explore FINETIKS Invest",
      image: "/images/feature-insight-mockup.png",
      imageAlt: "FINETIKS Invest screen",
      accent: "#D99A2B",
    },
  ],
};

const HEADER = {
  id: {
    title: "Urutan yang Benar Menuju Bebas Finansial",
    subtitle:
      "Nggak perlu bingung mulai dari mana. Catat, nabung, baru investasi — ikuti urutannya, dan semuanya udah tersedia dalam satu aplikasi FINETIKS.",
  },
  en: {
    title: "The Right Order to Financial Freedom",
    subtitle:
      "No need to wonder where to start. Track, save, then invest — follow the order, and it's all available in one FINETIKS app.",
  },
};

const ARIA = {
  id: {
    pause: "Jeda slideshow",
    play: "Putar slideshow",
    goTo: (i: number) => `Ke slide ${i}`,
    prev: "Slide sebelumnya",
    next: "Slide selanjutnya",
  },
  en: {
    pause: "Pause slideshow",
    play: "Play slideshow",
    goTo: (i: number) => `Go to slide ${i}`,
    prev: "Previous slide",
    next: "Next slide",
  },
};

const DWELL_MS = 6000;

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JourneySection() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { lang } = useLanguage();
  const slides = SLIDES[lang];
  const header = HEADER[lang];
  const aria = ARIA[lang];

  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(next, DWELL_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, playing]);

  const slide = slides[index];

  return (
    <section className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-6 text-center"
        >
          <h2 className="font-poppins text-[32px] font-bold leading-tight text-grape-dark sm:text-[48px] sm:leading-[58px]">
            {header.title}
          </h2>
          <p className="max-w-[820px] font-poppins text-[20px] leading-[28px] text-text-secondary sm:leading-[32px]">
            {header.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex w-full flex-col overflow-hidden rounded-[28px] bg-grape-dark shadow-[0_24px_64px_rgba(26,21,51,0.28)] lg:h-[560px] lg:flex-row"
            >
              <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 p-8 sm:p-12 lg:max-w-[420px] lg:p-14">
                <p className="font-poppins text-[13px] font-bold uppercase tracking-wide text-white/60">
                  {slide.eyebrow}
                </p>
                <h3 className="font-poppins text-[32px] font-bold leading-tight text-white sm:text-[40px]">
                  {slide.title}
                </h3>
                <p className="font-montserrat text-[16px] leading-relaxed text-white/75 sm:text-[18px]">
                  {slide.description}
                </p>
                <a
                  href="#"
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-full border-2 border-white px-8 py-3.5 font-poppins text-[15px] font-bold text-white transition-colors duration-200 hover:bg-white hover:text-grape-dark"
                >
                  {slide.cta}
                </a>
              </div>

              <div
                className="relative min-h-[300px] flex-1 overflow-hidden sm:min-h-[380px] lg:min-h-full"
                style={{ backgroundColor: slide.accent }}
              >
                <div className="absolute inset-x-[6%] -top-[10%] bottom-0">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className="object-contain object-bottom"
                    sizes="(min-width: 1024px) 640px, 100vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? aria.pause : aria.play}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-grape/20 text-grape transition-colors duration-200 hover:bg-grape/5"
          >
            <PlayPauseIcon playing={playing} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button key={s.step} onClick={() => goTo(i)} aria-label={aria.goTo(i + 1)} className="flex items-center">
                <motion.span
                  animate={{ width: index === i ? 34 : 8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`relative h-2 overflow-hidden rounded-full ${
                    index === i ? "bg-grape/20" : "bg-grape-tint-3"
                  }`}
                >
                  {index === i && playing && (
                    <motion.span
                      key={index}
                      className="absolute inset-y-0 left-0 rounded-full bg-grape"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label={aria.prev}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-200 transition-colors duration-200 hover:bg-grape-tint-3/40"
            >
              <span className="text-text-secondary group-hover:text-grape">
                <ChevronIcon direction="left" />
              </span>
            </button>
            <motion.button
              onClick={next}
              aria-label={aria.next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-grape text-white transition-colors duration-200 hover:bg-grape-dark"
            >
              <ChevronIcon direction="right" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
