"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ChartLineUp, Receipt, Vault, type Icon } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";
import investLottie from "@/lottie/finetiks-invest.json";
import analyticLottie from "@/lottie/analytic.json";

// Heavy (4.3MB, embedded raster frames) — loaded on demand only once the Save
// slide becomes the active slide, instead of bundling it into the initial JS.
// (Every slide stays mounted in the DOM for the peek-carousel effect, with the
// non-active ones just peeking at the edge, so "isActive" — not visibility —
// is what actually distinguishes "the user is looking at this slide".)
type LottieData = Record<string, unknown>;
function useLazyLottie(enabled: boolean, loader: () => Promise<{ default: LottieData }>) {
  const [data, setData] = useState<LottieData | null>(null);

  useEffect(() => {
    if (!enabled || data) return;
    let cancelled = false;
    loader().then((mod) => {
      if (!cancelled) setData(mod.default);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return data;
}

type Stage = {
  id: string;
  Icon: Icon;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  bg: string;
  bgGradient?: string;
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #b4ebfa 0%, #66cfee 40%, #21a4cf 100%)",
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #c8c6ff 0%, #8f89ff 40%, #5952e6 100%)",
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #a6d9cf 0%, #47b19d 40%, #00846b 100%)",
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #b4ebfa 0%, #66cfee 40%, #21a4cf 100%)",
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #c8c6ff 0%, #8f89ff 40%, #5952e6 100%)",
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
      bgGradient:
        "radial-gradient(130% 130% at 85% 15%, #a6d9cf 0%, #47b19d 40%, #00846b 100%)",
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

const INVEST_DISCLAIMER = {
  id: "Disclaimer: Data ilustrasi, bukan performa aktual",
  en: "Disclaimer: Illustrative data only, not actual performance",
};

// Same peek-carousel mechanics as Ver 1 (Monzo-style): full-bleed track, measured slide
// width, translateX-driven peek on both sides, autoplay with play/pause + dots + next
// arrow. The only thing that changed from Ver 2 is the axis — instead of a vertical
// sticky-stack where the next stage covers the previous one on scroll, all three stages
// sit side by side and you move between them horizontally. The card itself (colors,
// icon watermark, copy, pill CTA, image, height) is untouched from Ver 2.
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

function StageCard({
  stage,
  index,
  total,
  isActive,
}: {
  stage: Stage;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const StageIcon = stage.Icon;
  const { lang } = useLanguage();
  const saveLottieData = useLazyLottie(
    stage.id === "saving" && isActive,
    () => import("@/lottie/pocket-and-saving.json")
  );
  return (
    <div
      style={{
        background: stage.bgGradient ?? stage.bg,
        minHeight: "min(640px, 78dvh)",
      }}
      className="relative flex h-full w-full flex-col-reverse items-center gap-6 overflow-hidden rounded-[24px] px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-[32px] lg:px-14 lg:py-0"
    >
      {/* Dot-grid texture, same convention as the Hero/ProblemFraming sections — fades in over the image side, away from the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 65% 70% at 78% 45%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 78% 45%, black, transparent 70%)",
          opacity: 0.5,
        }}
      />

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
        <h3 className="font-poppins text-[22px] font-bold leading-[1.15] text-white sm:text-[30px] lg:text-[36px]">
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

      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="relative h-[240px] w-[215px] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] sm:h-[280px] sm:w-[240px] lg:h-[460px] lg:w-[430px] lg:rounded-[28px]">
          <Image
            src={stage.image}
            alt={stage.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 430px, 240px"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/10" />
          {stage.id === "record" && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Lottie animationData={analyticLottie} loop className="h-[95%] w-[95%] sm:h-[80%] sm:w-[80%]" />
            </div>
          )}
          {stage.id === "invest" && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Lottie animationData={investLottie} loop className="h-[95%] w-[95%] sm:h-[80%] sm:w-[80%]" />
            </div>
          )}
          {stage.id === "saving" && saveLottieData && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Lottie animationData={saveLottieData} loop className="h-[95%] w-[95%] sm:h-[80%] sm:w-[80%]" />
            </div>
          )}
        </div>
        {stage.id === "invest" && (
          <p className="max-w-[215px] text-center font-poppins text-[10px] leading-tight text-white/70 sm:max-w-[240px] sm:text-[11px] lg:max-w-[430px] lg:text-[12px]">
            {INVEST_DISCLAIMER[lang]}
          </p>
        )}
      </div>
    </div>
  );
}

export default function JourneySectionV7() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const stages = STAGES[lang];
  const header = HEADER[lang];
  const aria = ARIA[lang];

  const paused = !autoplay || hovering;

  const goTo = (i: number, manual = false) => {
    setIndex(((i % stages.length) + stages.length) % stages.length);
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
          <h2 className="font-poppins text-[32px] font-bold leading-tight text-grape-dark sm:text-[44px] sm:leading-[52px]">
            {header.title}
          </h2>
          <p className="max-w-[320px] font-poppins text-[16px] leading-relaxed text-text-secondary sm:max-w-[640px] sm:text-[18px]">
            {header.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Full-bleed peek carousel, same left-1/2/-translate-x-1/2 breakout as Ver 1, kept
          outside the header's motion.div for the same reason: a resting `transform` on an
          ancestor would break the containing-block math this trick depends on. */}
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
              {stages.map((stage, i) => (
                <div
                  key={stage.id}
                  style={slideWidth ? { flex: `0 0 ${slideWidth}px` } : undefined}
                  className="w-[86%] shrink-0 sm:w-[79.3%]"
                >
                  <StageCard stage={stage} index={i} total={stages.length} isActive={index === i} />
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
          {stages.map((stage, i) => (
            <button
              key={stage.id}
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
