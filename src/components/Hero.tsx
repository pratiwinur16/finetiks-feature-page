"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import Lottie from "lottie-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import LegalityBar from "./LegalityBar";
import { useLanguage } from "./LanguageProvider";
import manageMoneyLottieEn from "@/lottie/manage-money.json";
import manageMoneyLottieId from "@/lottie/manage-money-id.json";

const HERO_LOTTIE = {
  id: manageMoneyLottieId,
  en: manageMoneyLottieEn,
};

const COPY = {
  id: {
    headline: "Atur & Catat Keuangan Jadi Lebih Mudah",
    subhead:
      "Ngomong, foto, atau ketik — FINETIKS ubah semuanya jadi catatan rapi dan insight yang jelas.",
  },
  en: {
    headline: "Manage & Track Your Money, Made Easy",
    subhead:
      "Talk, snap a photo, or type — FINETIKS turns it all into tidy records and clear insights.",
  },
};

const GRAIN_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
      "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/></svg>"
  );

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const t = COPY[lang];

  // Cursor position across the section, 0–1. Rest state is dead-center.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothMx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.5 });
  const smoothMy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.5 });

  // Parallax depth — near layers move more than far ones.
  const blob1X = useTransform(smoothMx, [0, 1], [-18, 18]);
  const blob1Y = useTransform(smoothMy, [0, 1], [-18, 18]);
  const blob2X = useTransform(smoothMx, [0, 1], [16, -16]);
  const blob2Y = useTransform(smoothMy, [0, 1], [16, -16]);

  // Soft light that tracks the pointer over the texture.
  const spotlightLeft = useTransform(smoothMx, (v) => `${v * 100}%`);
  const spotlightTop = useTransform(smoothMy, (v) => `${v * 100}%`);

  // The phone tilts gently toward the pointer, like it's being held.
  const phoneRotateY = useTransform(smoothMx, [0, 1], [-7, 7]);
  const phoneRotateX = useTransform(smoothMy, [0, 1], [7, -7]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full overflow-hidden pt-[105px]"
      style={{
        backgroundImage:
          "linear-gradient(146.5deg, #2CB9E4 14%, #0095C2 86%)",
      }}
    >
      {/* Depth — soft mesh light, so the flat gradient reads as layered */}
      <motion.div
        aria-hidden
        style={{ x: blob1X, y: blob1Y }}
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#7DD8F5] opacity-40 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: blob2X, y: blob2Y }}
        className="pointer-events-none absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-[#006F94] opacity-50 blur-3xl"
      />

      {/* Texture — fine dot grid, a quiet nod to ledgers and data points */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 74% 35%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 80% at 74% 35%, black, transparent 70%)",
          opacity: 0.5,
        }}
      />

      {/* Finish — faint grain so the gradient feels tactile, not flat vector */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_URI}")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Cursor light — traces the pointer across the texture */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden
          style={{ left: spotlightLeft, top: spotlightTop }}
          className="pointer-events-none absolute hidden h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-soft-light blur-3xl lg:block"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
            }}
          />
        </motion.div>
      )}

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-0 px-6 pt-4 pb-2 text-center sm:gap-0 sm:pt-6 sm:pb-3 lg:gap-1 lg:pt-8 lg:pb-4">
        <div className="flex flex-col items-center gap-6 text-white">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="max-w-[900px] font-poppins text-[28px] font-semibold leading-tight sm:max-w-none sm:whitespace-nowrap sm:text-[32px] lg:text-[50px]"
          >
            {t.headline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="font-poppins text-[18px] font-normal leading-[24px] sm:whitespace-nowrap"
          >
            {t.subhead}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  rotateX: phoneRotateX,
                  rotateY: phoneRotateY,
                  transformPerspective: 900,
                }
          }
          className="-mt-4 flex h-[410px] w-[323px] items-center justify-center sm:-mt-4 sm:h-[535px] sm:w-[420px] lg:-mt-6 lg:h-[690px] lg:w-[542px]"
        >
          <Lottie
            key={lang}
            animationData={HERO_LOTTIE[lang]}
            loop={false}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            className="h-full w-full"
          />
        </motion.div>
      </div>

      <div className="relative">
        <LegalityBar />
      </div>
    </section>
  );
}
