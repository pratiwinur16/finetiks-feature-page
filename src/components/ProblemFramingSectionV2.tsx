"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ClockCountdown,
  ListChecks,
  Quotes,
  Receipt,
  Stack,
  Tag,
  type Icon,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

type Pain = {
  quote: string;
  label: string;
  Icon: Icon;
  angle: number;
  color: string;
};

// Reusing the same category-chip colors already used elsewhere in the app
// (icon-chip-lunch/storefront/payments/today/creditcard) so this stays on-brand.
const PAINS: Record<"id" | "en", Pain[]> = {
  id: [
    {
      quote: "Duh, tadi abis jajan lupa dicatet lagi...",
      label: "Lupa mencatat",
      Icon: ListChecks,
      angle: -2,
      color: "#6C5EEB",
    },
    {
      quote: "Nyatet manual satu-satu? Ribet, keburu males duluan.",
      label: "Ribet & makan waktu",
      Icon: ClockCountdown,
      angle: 1.5,
      color: "#FF9800",
    },
    {
      quote: "Struknya ke mana ya... kayaknya kebuang pas beresin tas.",
      label: "Struk hilang",
      Icon: Receipt,
      angle: -1,
      color: "#FF6666",
    },
    {
      quote: "Ini masuk kategori jajan apa kebutuhan sih? Bingung.",
      label: "Bingung kategori",
      Icon: Tag,
      angle: 2,
      color: "#1A9DC5",
    },
    {
      quote: "Udah dicatet sih, tapi terakhir aku cek kapan ya?",
      label: "Nggak sempat rekap",
      Icon: Stack,
      angle: -1.5,
      color: "#099250",
    },
  ],
  en: [
    {
      quote: "Ugh, forgot to log that snack I just bought...",
      label: "Forgot to log it",
      Icon: ListChecks,
      angle: -2,
      color: "#6C5EEB",
    },
    {
      quote: "Logging every single thing by hand? Too tedious, I give up fast.",
      label: "Tedious & slow",
      Icon: ClockCountdown,
      angle: 1.5,
      color: "#FF9800",
    },
    {
      quote: "Where did that receipt go... probably tossed it cleaning my bag.",
      label: "Receipt's gone",
      Icon: Receipt,
      angle: -1,
      color: "#FF6666",
    },
    {
      quote: "Is this a want or a need? I can never tell.",
      label: "Confusing categories",
      Icon: Tag,
      angle: 2,
      color: "#1A9DC5",
    },
    {
      quote: "It's logged, sure, but when did I last actually check it?",
      label: "Never get reviewed",
      Icon: Stack,
      angle: -1.5,
      color: "#099250",
    },
  ],
};

const HEADER = {
  id: {
    title: "Kenapa Nyatet Transaksi Suka Berhenti di Tengah Jalan?",
    subtitle:
      "Niatnya rajin, tapi ada aja yang bikin catatan keuanganmu jadi bolong-bolong. Ini yang paling sering dikeluhin.",
  },
  en: {
    title: "Why Does Tracking Your Spending Always Stall Out?",
    subtitle:
      "You start out motivated, but something always leaves your records full of gaps. Here's what people complain about most.",
  },
};

const BRIDGE = {
  id: "Makanya, FINETIKS kasih cara catat yang nggak bikin ribet",
  en: "That's why FINETIKS gives you ways to track that don't feel like a chore",
};

const BRIDGE_ARIA = {
  id: "Lihat cara mencatat di FINETIKS",
  en: "Jump to how tracking works in FINETIKS",
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function PainNote({ pain, index }: { pain: Pain; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      style={{
        rotate: reduce ? 0 : pain.angle,
        background: `linear-gradient(160deg, ${hexToRgba(pain.color, 0.1)}, white 55%)`,
        borderColor: hexToRgba(pain.color, 0.18),
        boxShadow: `0 10px 24px ${hexToRgba(pain.color, 0.12)}`,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              rotate: 0,
              y: -8,
              scale: 1.03,
              boxShadow: `0 20px 40px ${hexToRgba(pain.color, 0.28)}`,
              transition: { type: "spring", stiffness: 260, damping: 18 },
            }
      }
      className="relative flex flex-col gap-4 rounded-2xl border p-6"
    >
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 size-5 -translate-x-1/2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
        style={{
          background: `radial-gradient(circle at 35% 30%, white, ${pain.color})`,
        }}
      />

      <Quotes size={24} weight="fill" style={{ color: pain.color }} />
      <p className="font-poppins text-[15px] italic leading-[22px] text-text-primary">
        &ldquo;{pain.quote}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: hexToRgba(pain.color, 0.15),
            color: pain.color,
          }}
        >
          <pain.Icon size={14} weight="bold" />
        </span>
        <span className="font-poppins text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {pain.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProblemFramingSectionV2() {
  const reduce = useReducedMotion();
  const { lang } = useLanguage();
  const header = HEADER[lang];
  const pains = PAINS[lang];

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-16 sm:py-24 lg:px-0 lg:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-grape-tint-3 opacity-[0.15] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(108,94,235,0.35) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 85% 8%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 85% 8%, black, transparent 70%)",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto flex max-w-[1128px] flex-col items-center gap-14 lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-5 text-center"
        >
          <h2 className="max-w-[780px] font-poppins text-[32px] font-bold leading-tight text-text-primary sm:text-[44px] sm:leading-[52px]">
            {header.title}
          </h2>
          <p className="max-w-[700px] font-poppins text-[17px] leading-[26px] text-text-secondary sm:text-[19px] sm:leading-[30px]">
            {header.subtitle}
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pains.slice(0, 3).map((pain, i) => (
            <PainNote key={pain.label} pain={pain} index={i} />
          ))}
        </div>

        <div className="mx-auto grid w-full max-w-[744px] grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {pains.slice(3).map((pain, i) => (
            <PainNote key={pain.label} pain={pain} index={i + 3} />
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center gap-3 text-center font-poppins text-[18px] font-semibold text-grape sm:text-[20px]"
        >
          <p>{BRIDGE[lang]}</p>
          <motion.a
            href="#feature-section"
            aria-label={BRIDGE_ARIA[lang]}
            animate={reduce ? undefined : { y: [0, 6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-grape text-white"
          >
            <ArrowDown size={20} weight="bold" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
