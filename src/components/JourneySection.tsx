"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    pause: "Jeda putar otomatis",
    play: "Lanjutkan putar otomatis",
  },
  en: {
    goTo: (i: number) => `Go to slide ${i}`,
    prev: "Previous slide",
    next: "Next slide",
    pause: "Pause autoplay",
    play: "Resume autoplay",
  },
};

const DWELL_MS = 6000;
const SLIDE_GAP = 48;

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

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <rect x="0" y="0" width="4" height="16" rx="1" fill="currentColor" />
      <rect x="10" y="0" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path
        d="M0 1.5C0 0.3 1.3-0.5 2.4 0.2L13.4 7.2C14.5 7.9 14.5 9.1 13.4 9.8L2.4 16.8C1.3 17.5 0 16.7 0 15.5V1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function JourneySection() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const slides = SLIDES[lang];
  const header = HEADER[lang];
  const aria = ARIA[lang];

  const paused = !autoplay || hovering;

  const goTo = (i: number, manual = false) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
    if (manual) setAutoplay(false);
  };

  useLayoutEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => goTo(index + 1), DWELL_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideRatio = viewportWidth < 640 ? 0.86 : 0.793;
  const slideWidth = Math.round(viewportWidth * slideRatio);
  const trackTranslate = viewportWidth
    ? (viewportWidth - slideWidth) / 2 - index * (slideWidth + SLIDE_GAP)
    : 0;

  return (
    <section className="w-full overflow-x-clip bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
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
          <p className="max-w-[320px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:max-w-[1040px] sm:text-[18px] sm:leading-[24px]">
            {header.subtitle}
          </p>
        </motion.div>

      </div>

      {/* Full-bleed peek carousel — breaks out of the max-w column so the previous/next
          cards' colors show at the edges, like Monzo's carousel. Kept outside any
          motion.div: framer-motion leaves a resting `transform` on animated elements,
          which would create a new containing block and break the left-1/2/-translate-x-1/2
          full-bleed trick below. */}
      <div className="mt-12 w-full lg:mt-[68px]">
          <div className="relative left-1/2 w-screen -translate-x-1/2">
            <div
              ref={viewportRef}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="overflow-hidden"
            >
              <div
                className="flex"
                style={{
                  gap: `${SLIDE_GAP}px`,
                  transform: `translateX(${trackTranslate}px)`,
                  transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                {slides.map((s, i) => (
                  <div
                    key={s.id}
                    style={
                      slideWidth
                        ? { flex: `0 0 ${slideWidth}px` }
                        : undefined
                    }
                    className="flex w-[86%] shrink-0 flex-col overflow-hidden rounded-[24px] sm:w-[79.3%] lg:flex-row lg:rounded-[32px]"
                  >
                    <div
                      style={{ backgroundColor: s.bg }}
                      className="relative z-10 flex flex-col justify-center gap-5 p-7 sm:gap-6 sm:p-10 lg:w-1/2 lg:p-14"
                    >
                      <h3 className="font-poppins text-[24px] font-bold leading-tight text-white sm:text-[32px] sm:leading-[43px]">
                        {s.title}
                      </h3>
                      <p className="font-poppins text-[15px] leading-relaxed text-white/90 sm:text-[16px] sm:leading-[26px]">
                        {s.description}
                      </p>
                      <a
                        href="#"
                        className="mt-1 flex h-14 w-full max-w-[290px] items-center justify-center rounded-xl bg-grape-tint-5 px-4 font-poppins text-[16px] font-bold text-grape-shade-1 transition-transform duration-200 hover:scale-[1.02]"
                      >
                        {s.cta}
                      </a>
                    </div>

                    <div
                      style={{ backgroundColor: s.bg }}
                      className="relative min-h-[220px] sm:min-h-[300px] lg:min-h-full lg:w-1/2"
                    >
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 41vw, 100vw"
                        priority={i === 0}
                      />
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "#000", opacity: s.overlay }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1128px] items-center justify-center gap-5 sm:mt-10 sm:gap-6">
        <button
          type="button"
          onClick={() => setAutoplay((a) => !a)}
          aria-label={autoplay ? aria.pause : aria.play}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-grape-tint-3 text-grape transition-colors duration-200 hover:bg-grape-tint-3/20"
        >
          <PlayPauseIcon playing={autoplay} />
        </button>

        <motion.button
          type="button"
          onClick={() => goTo(index - 1, true)}
          aria-label={aria.prev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-grape text-white transition-colors duration-200 hover:bg-grape-dark"
        >
          <ArrowIcon direction="left" />
        </motion.button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, true)}
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
          onClick={() => goTo(index + 1, true)}
          aria-label={aria.next}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-grape text-white transition-colors duration-200 hover:bg-grape-dark"
        >
          <ArrowIcon direction="right" />
        </motion.button>
      </div>
    </section>
  );
}
