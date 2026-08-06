"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ClockCountdown,
  ListChecks,
  Receipt,
  Stack,
  Tag,
  type Icon,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

type Pain = {
  number: string;
  Icon: Icon;
  title: string;
  description: string;
  span: "half" | "third";
};

const PAINS: Record<"id" | "en", Pain[]> = {
  id: [
    {
      number: "01",
      Icon: ListChecks,
      title: "Lupa di Tengah Jalan",
      description:
        "Niatnya udah ada, tapi keburu lupa begitu sibuk sama aktivitas lain. Catatan pun berhenti di tengah jalan.",
      span: "third",
    },
    {
      number: "02",
      Icon: ClockCountdown,
      title: "Ribet & Makan Waktu",
      description:
        "Nyatet manual satu-satu bikin males, apalagi kalau transaksinya banyak dalam sehari.",
      span: "third",
    },
    {
      number: "03",
      Icon: Receipt,
      title: "Struk Gampang Ilang",
      description:
        "Struk fisik gampang hilang atau luntur duluan sebelum sempat dicatat.",
      span: "third",
    },
    {
      number: "04",
      Icon: Tag,
      title: "Ribet Pilih Kategori",
      description:
        "Bingung transaksi ini masuk kategori apa, jajan, kebutuhan, atau lifestyle? Akhirnya nyatet asal, datanya jadi nggak akurat.",
      span: "half",
    },
    {
      number: "05",
      Icon: Stack,
      title: "Nggak Ada Waktu Rekap",
      description:
        "Transaksinya kecatat, tapi nggak pernah sempat dilihat lagi. Akhirnya nggak tahu ke mana aja uang bulan ini pergi.",
      span: "half",
    },
  ],
  en: [
    {
      number: "01",
      Icon: ListChecks,
      title: "Forgotten Halfway Through",
      description:
        "You mean to log it, but life gets busy and it slips your mind. The record just stops halfway.",
      span: "third",
    },
    {
      number: "02",
      Icon: ClockCountdown,
      title: "Tedious & Time-Consuming",
      description:
        "Logging every transaction by hand gets old fast, especially on a busy spending day.",
      span: "third",
    },
    {
      number: "03",
      Icon: Receipt,
      title: "Receipts Go Missing",
      description:
        "Paper receipts get lost or fade out before you ever get around to recording them.",
      span: "third",
    },
    {
      number: "04",
      Icon: Tag,
      title: "Categorizing Is a Hassle",
      description:
        "Not sure if it's a want, a need, or lifestyle spend? You end up guessing, and your data gets messy.",
      span: "half",
    },
    {
      number: "05",
      Icon: Stack,
      title: "Never Time to Review",
      description:
        "It's logged, but you never get around to looking back. You end up with no idea where the month's money went.",
      span: "half",
    },
  ],
};

const HEADER = {
  id: {
    title: "Kenapa Nyatet Transaksi Suka Berhenti di Tengah Jalan?",
    subtitle:
      "Niatnya rajin, tapi ada aja yang bikin catatan keuanganmu jadi bolong-bolong.",
  },
  en: {
    title: "Why Does Tracking Your Spending Always Stall Out?",
    subtitle:
      "You start out motivated, but something always leaves your records full of gaps.",
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

function PainCard({ pain, index }: { pain: Pain; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-[22px] border border-transparent bg-gradient-to-br from-grape to-grape-dark p-6 shadow-[0_16px_36px_rgba(108,94,235,0.28)] transition-shadow duration-300 hover:shadow-[0_20px_44px_rgba(108,94,235,0.4)] ${
        pain.span === "third" ? "lg:col-span-2" : "lg:col-span-3"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 right-3 select-none font-poppins text-[56px] font-extrabold leading-none text-white/15 transition-transform duration-300 group-hover:scale-105 sm:text-[64px]"
      >
        {pain.number}
      </span>

      <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
        <pain.Icon size={20} weight="bold" />
      </span>

      <div className="relative z-10 flex flex-col gap-1.5">
        <p className="font-poppins text-[17px] font-semibold text-white">
          {pain.title}
        </p>
        <p className="max-w-[340px] font-poppins text-[13.5px] leading-[21px] text-white/80">
          {pain.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProblemFramingSection() {
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
          <p className="max-w-[560px] font-poppins text-[17px] leading-[26px] text-text-secondary sm:text-[19px] sm:leading-[30px]">
            {header.subtitle}
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {pains.map((pain, i) => (
            <PainCard key={pain.number} pain={pain} index={i} />
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
