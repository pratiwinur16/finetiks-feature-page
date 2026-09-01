"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useLanguage } from "./LanguageProvider";
import heartsFeedbackLottie from "@/lottie/hearts-feedback.json";

const LOVE_BADGE = {
  id: { line1: "Lebih dari 30.000 Pengguna", line2: "Cinta FINETIKS" },
  en: { line1: "Over 30,000 Users", line2: "Love FINETIKS" },
};

function LoveBadge() {
  const { lang } = useLanguage();
  const t = LOVE_BADGE[lang];

  return (
    <div className="flex w-fit items-center gap-3 rounded-2xl bg-[#f2f8f4] py-3 pr-6 pl-3">
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 h-[19px] w-[20px] shrink-0"
      >
        {/* Hearts trail up and out, centered on and anchored to this SVG heart, which is their source. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-full left-1/2 h-[168px] w-[78px] -translate-x-1/2"
          style={{
            maskImage: "linear-gradient(to top, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
          }}
        >
          <Lottie
            animationData={heartsFeedbackLottie}
            loop
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            className="h-full w-full"
          />
        </div>
        <Image src="/images/testimonial/heart.svg" alt="" fill />
      </motion.div>
      <p className="relative z-10 whitespace-nowrap font-poppins text-sm leading-[19px] text-text-primary">
        <span className="font-bold">{t.line1}</span> {t.line2}
      </p>
    </div>
  );
}

const ARIA = {
  id: {
    prev: "Testimoni sebelumnya",
    next: "Testimoni selanjutnya",
    goTo: (i: number) => `Ke halaman testimoni ${i}`,
  },
  en: {
    prev: "Previous testimonial",
    next: "Next testimonial",
    goTo: (i: number) => `Go to testimonial page ${i}`,
  },
};

// Reading-speed estimate (~200 wpm) plus a small per-card skim allowance,
// clamped so a short quote doesn't flash by and a long one doesn't stall too long.
function calcDwellMs(featuredQuote: string, secondaryQuotes: string[]) {
  const words = featuredQuote.trim().split(/\s+/).filter(Boolean).length;
  const base = words * 260 + 1200;
  const skim = secondaryQuotes.length * 900;
  return Math.min(9000, Math.max(3800, base + skim));
}

type Testimonial = {
  quote: string;
  name: string;
  date: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "This app impresses me with its features — especially the budget tracking and insights based on spending patterns. It has genuinely helped me make smarter financial decisions.",
    name: "ANNISA AYU AVRILLIA",
    date: "March 31, 2023",
  },
  {
    quote:
      "Very user-friendly. Simple, effective, and hasn’t given me any problems so far.",
    name: "HERRY ELBERT",
    date: "April 17, 2023",
  },
  {
    quote:
      "Great for tracking spending and keeping up with savings. Overall a great app.",
    name: "KEVIN",
    date: "April 7, 2023",
  },
  {
    quote:
      "Looking forward to using this daily as account connection options expand.",
    name: "JOVAN",
    date: "April 3, 2023",
  },
];

const PAGE_COUNT = 3;

function Stars() {
  return (
    <div className="flex items-start gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const { lang } = useLanguage();
  const aria = ARIA[lang];

  const rotate = (offset: number) =>
    TESTIMONIALS[(offset + page) % TESTIMONIALS.length];

  const featured = rotate(0);
  const secondary = [rotate(1), rotate(2), rotate(3)];

  const goTo = (dir: 1 | -1) => {
    setPage((p) => (p + dir + PAGE_COUNT) % PAGE_COUNT);
  };

  const dwellMs = calcDwellMs(
    featured.quote,
    secondary.map((s) => s.quote)
  );

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => goTo(1), dwellMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, paused]);

  return (
    <section
      className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <LoveBadge />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex w-full max-w-[760px] flex-col items-center gap-8"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={featured.name + page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-center font-poppins text-[24px] font-medium leading-[1.4] text-text-primary sm:text-[32px] sm:leading-[43px]"
            >
              “{featured.quote}”
            </motion.p>
          </AnimatePresence>
          <Stars />
          <p className="font-poppins text-base text-text-secondary">
            {featured.name}
          </p>
        </motion.div>

        <div className="h-px w-full bg-black/[0.08]" />

        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          {secondary.map((t, i) => (
            <motion.div
              key={t.name + page}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`flex flex-col items-start gap-4 ${
                i === 0
                  ? "sm:pr-10"
                  : i === 1
                  ? "sm:border-x sm:border-black/[0.08] sm:px-10"
                  : "sm:pl-10"
              }`}
            >
              <Stars />
              <p className="font-poppins text-base leading-[21px] text-text-secondary">
                “{t.quote}”
              </p>
              <p className="font-poppins text-sm text-text-primary">{t.name}</p>
              <p className="font-poppins text-[10px] text-text-secondary">
                {t.date}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-9">
          <button
            onClick={() => goTo(-1)}
            aria-label={aria.prev}
            className="group flex items-center justify-center rounded-lg bg-neutral-200 p-2 transition-colors hover:bg-grape-tint-3/40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-secondary group-hover:text-grape">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={aria.goTo(i + 1)}
                className="flex items-center"
              >
                <motion.span
                  animate={{ width: page === i ? 34 : 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`relative h-[5px] overflow-hidden rounded-full ${
                    page === i ? "bg-grape/25" : "bg-grape-tint-3"
                  }`}
                >
                  {page === i && (
                    <motion.span
                      key={page}
                      className="absolute inset-y-0 left-0 rounded-full bg-grape"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: dwellMs / 1000, ease: "linear" }}
                    />
                  )}
                </motion.span>
              </button>
            ))}
          </div>

          <motion.button
            onClick={() => goTo(1)}
            aria-label={aria.next}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-full bg-grape p-2 transition-colors hover:bg-grape-dark"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
