"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type Slide = {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  bg: string;
  overlay: number;
};

const SLIDES: Record<"id" | "en", Slide[]> = {
  id: [
    {
      id: "record",
      title: "Catat Semua Transaksimu",
      description:
        "Kamu udah lihat sendiri di atas — ngomong, jepret struk, atau input manual, semua transaksi otomatis rapi. Ini pondasi paling penting sebelum melangkah lebih jauh.",
      cta: "Mulai Mencatat",
      image: "/images/journey/record.jpg",
      imageAlt: "Mencatat transaksi harian di FINETIKS",
      bg: "#ff7915",
      overlay: 0.34,
    },
    {
      id: "saving",
      title: "Mulai Menabung dengan Terarah",
      description:
        "Sesudah catatanmu rapi, saatnya nabung. Bikin Pocket buat tiap tujuan, atur Budget bulanan, sampai sisihkan buat bayar cicilan — semua lewat FINETIKS VIP Save.",
      cta: "Kenalan sama VIP Save →",
      image: "/images/journey/saving.jpg",
      imageAlt: "Menabung terarah dengan FINETIKS VIP Save",
      bg: "#635bff",
      overlay: 0.11,
    },
    {
      id: "invest",
      title: "Investasi buat Masa Depan",
      description:
        "Kalau catatan udah rapi dan tabungan udah jalan, kamu siap naik level. Lewat FINETIKS Invest yang kerja sama dengan Gotrade, kamu bisa beli ETF dan saham AS langsung dari HP.",
      cta: "Cobain FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investasi lewat FINETIKS Invest",
      bg: "#009377",
      overlay: 0.25,
    },
  ],
  en: [
    {
      id: "record",
      title: "Track Every Transaction",
      description:
        "You've already seen it above — talk, snap a receipt, or enter it manually, and every transaction stays neatly organized. It's the most important foundation before you go any further.",
      cta: "Start Tracking",
      image: "/images/journey/record.jpg",
      imageAlt: "Tracking daily transactions in FINETIKS",
      bg: "#ff7915",
      overlay: 0.34,
    },
    {
      id: "saving",
      title: "Start Saving With a Clear Plan",
      description:
        "Once your records are tidy, it's time to save. Create a Pocket for every goal, set a monthly Budget, even set aside money for installments — all through FINETIKS VIP Save.",
      cta: "Meet VIP Save →",
      image: "/images/journey/saving.jpg",
      imageAlt: "Saving with a clear plan via FINETIKS VIP Save",
      bg: "#635bff",
      overlay: 0.11,
    },
    {
      id: "invest",
      title: "Invest for Your Future",
      description:
        "Once your records are tidy and your savings are moving, you're ready to level up. Through FINETIKS Invest, in partnership with Gotrade, you can buy ETFs and US stocks straight from your phone.",
      cta: "Try FINETIKS Invest",
      image: "/images/journey/invest.jpg",
      imageAlt: "Investing through FINETIKS Invest",
      bg: "#009377",
      overlay: 0.25,
    },
  ],
};

const HEADER = {
  id: {
    title: "Nggak Perlu Lagi Aplikasi Sana-Sini.",
    subtitle:
      "Dari catat transaksi, nabung terarah, sampai investasi, semua perjalanan keuanganmu ada dalam satu aplikasi.",
  },
  en: {
    title: "No More Juggling Different Apps.",
    subtitle:
      "From tracking transactions to focused saving and investing — your whole financial journey lives in one app.",
  },
};

const ARIA = {
  id: {
    goTo: (i: number) => `Ke slide ${i}`,
    prev: "Slide sebelumnya",
    next: "Slide selanjutnya",
  },
  en: {
    goTo: (i: number) => `Go to slide ${i}`,
    prev: "Previous slide",
    next: "Next slide",
  },
};

const DWELL_MS = 6000;

// Exact path data from the Figma "keyboard_arrow_left/right" export.
function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? (
    <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
      <path
        d="M10.4875 15.7708L4.0208 9.3042L10.4875 2.8375C11.1375 2.1875 11.1375 1.1375 10.4875 0.4875C9.8375 -0.1625 8.7875 -0.1625 8.1375 0.4875L0.4875 8.1375C-0.1625 8.7875 -0.1625 9.8375 0.4875 10.4875L8.1375 18.1375C8.7875 18.7875 9.8375 18.7875 10.4875 18.1375C11.1208 17.4875 11.1375 16.4208 10.4875 15.7708Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
      <path
        d="M0.4875 15.7708L6.9542 9.3042L0.4875 2.8375C-0.1625 2.1875 -0.1625 1.1375 0.4875 0.4875C1.1375 -0.1625 2.1875 -0.1625 2.8375 0.4875L10.4875 8.1375C11.1375 8.7875 11.1375 9.8375 10.4875 10.4875L2.8375 18.1375C2.1875 18.7875 1.1375 18.7875 0.4875 18.1375C-0.1458 17.4875 -0.1625 16.4208 0.4875 15.7708Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function JourneySection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { lang } = useLanguage();
  const slides = SLIDES[lang];
  const header = HEADER[lang];
  const aria = ARIA[lang];

  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const nextSlide = slides[(index + 1) % slides.length];

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(next, DWELL_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  const slide = slides[index];

  return (
    <section className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-12 lg:gap-[68px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-4 text-center"
        >
          <h2 className="font-poppins text-[28px] font-bold leading-tight text-grape-dark sm:text-[40px] sm:leading-[54px]">
            {header.title}
          </h2>
          <p className="max-w-[720px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:text-[18px] sm:leading-[24px]">
            {header.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex w-full flex-col items-center gap-8"
        >
          <div className="flex w-full items-stretch gap-3 sm:gap-4 lg:gap-[28px]">
            <div className="relative min-w-0 flex-1 overflow-hidden rounded-[24px] lg:rounded-[28px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ backgroundColor: slide.bg }}
                  className="flex w-full flex-col lg:h-[440px] lg:flex-row"
                >
                  <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 p-7 sm:gap-6 sm:p-10 lg:max-w-[420px] lg:p-14">
                    <h3 className="font-poppins text-[24px] font-bold leading-tight text-white sm:text-[32px] sm:leading-[43px]">
                      {slide.title}
                    </h3>
                    <p className="font-poppins text-[15px] leading-relaxed text-white/90 sm:text-[16px] sm:leading-[26px]">
                      {slide.description}
                    </p>
                    <a
                      href="#"
                      className="mt-1 inline-flex w-fit items-center justify-center rounded-xl bg-grape-tint-5 px-6 py-4 font-poppins text-[15px] font-bold text-[#412fe5] transition-transform duration-200 hover:scale-[1.02] sm:px-8 sm:text-[16px]"
                    >
                      {slide.cta}
                    </a>
                  </div>

                  <div className="relative min-h-[220px] flex-1 sm:min-h-[300px] lg:min-h-full">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 440px, 100vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: "#000", opacity: slide.overlay }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label={aria.next}
              style={{ backgroundColor: nextSlide.bg }}
              className="hidden w-8 shrink-0 rounded-[24px] transition-opacity duration-300 hover:opacity-80 sm:block lg:w-14 lg:rounded-[28px]"
            />
          </div>

          <div className="flex items-center gap-6 sm:gap-9">
            <button
              type="button"
              onClick={prev}
              aria-label={aria.prev}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-l-xl bg-neutral-200 text-text-tertiary transition-colors duration-200 hover:bg-grape-tint-3/40 sm:h-14 sm:w-14"
            >
              <ArrowIcon direction="left" />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={aria.goTo(i + 1)}
                  className="flex items-center"
                >
                  <motion.span
                    animate={{ width: index === i ? 34 : 8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`relative h-[5px] overflow-hidden rounded-full ${
                      index === i ? "bg-grape/20" : "bg-grape-tint-3"
                    }`}
                  >
                    {index === i && !paused && (
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

            <motion.button
              type="button"
              onClick={next}
              aria-label={aria.next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-r-xl bg-grape text-white transition-colors duration-200 hover:bg-grape-dark sm:h-14 sm:w-14"
            >
              <ArrowIcon direction="right" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
