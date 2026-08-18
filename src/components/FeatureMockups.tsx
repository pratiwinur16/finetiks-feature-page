"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import insightLottiePreview from "@/lottie/insight.json";
import manualLottiePreview from "@/lottie/manual.json";
import { useLanguage } from "./LanguageProvider";

const VOICE_CHIPS = {
  id: {
    today: "Hari ini",
    shop: "Aku jajan",
    at: "di KKV",
    using: "pakai GoPay",
    amount: "Sebesar Rp 10.000",
  },
  en: {
    today: "Today",
    shop: "I shop",
    at: "at KKV",
    using: "using GoPay",
    amount: "For Rp 10,000",
  },
};

const CATEGORY_LABELS = {
  id: {
    spendingOverview: "Ringkasan Pengeluaran",
    thisMonth: "Bulan Ini",
    shopping: "Belanja",
    foodDrinks: "Makan & Minum",
    transportation: "Transportasi",
    home: "Rumah Tangga",
  },
  en: {
    spendingOverview: "Spending Overview",
    thisMonth: "This Month",
    shopping: "Shopping",
    foodDrinks: "Food & Drinks",
    transportation: "Transportation",
    home: "Home",
  },
};

// TEMP: quick look at the Lottie export — flip to false to go back to the hand-built version.
const SHOW_INSIGHT_LOTTIE_PREVIEW = true;
const SHOW_MANUAL_LOTTIE_PREVIEW = true;

const cardVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};

function Chip({
  icon,
  label,
  style,
}: {
  icon: string;
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={chipVariants}
      className="absolute flex items-center gap-2 rounded-2xl bg-white px-3 py-1 shadow-[0_4px_8px_rgba(0,0,0,0.16)]"
      style={style}
    >
      <Image src={icon} alt="" width={16} height={16} />
      <span className="whitespace-nowrap font-manrope text-sm font-semibold text-text-secondary">
        {label}
      </span>
    </motion.div>
  );
}

function RecordingPulse() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "50.6%",
        top: "44.7%",
        width: "24%",
        height: "24%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-grape"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.1,
          }}
        />
      ))}
    </div>
  );
}

// Deterministic pseudo-random envelope so bar heights are stable across
// server/client render (avoids hydration mismatch from Math.random()).
function barEnvelope(i: number) {
  const h = 6 + Math.abs(Math.sin(i * 1.31)) * 15 + Math.abs(Math.cos(i * 0.68)) * 10;
  return Math.round(h * 100) / 100;
}

function AnimatedWaveform() {
  const bars = 46;
  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{ left: "4%", width: "92%", top: "70%", height: "18%" }}
    >
      {/* covers the static waveform baked into the source image */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 flex items-center justify-between gap-[2px]">
        {Array.from({ length: bars }).map((_, i) => {
          const base = barEnvelope(i);
          return (
            <motion.span
              key={i}
              className="w-[2px] shrink-0 rounded-full bg-grape/70"
              initial={{ height: base }}
              animate={{ height: [base * 0.35, base * 1.15, base * 0.35] }}
              transition={{
                duration: 0.9 + (i % 5) * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 7) * 0.08,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function VoiceMockup() {
  const { lang } = useLanguage();
  const chips = VOICE_CHIPS[lang];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative h-[320px] w-[320px] overflow-visible rounded-2xl bg-card shadow-[0_2px_4px_rgba(0,0,0,0.1)] sm:h-[400px] sm:w-[440px] lg:h-[449px] lg:w-[527px]"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl p-10">
        <motion.div
          className="relative aspect-square h-full"
          animate={{ scale: [1, 1.012, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/feature-voice-mockup.png"
            alt="Voice recording feature"
            fill
            className="object-contain"
            sizes="440px"
          />
          <RecordingPulse />
          <AnimatedWaveform />
        </motion.div>
      </div>
      <Chip icon="/images/icon-chip-today.svg" label={chips.today} style={{ left: "11%", top: "21%" }} />
      <Chip icon="/images/icon-chip-lunch.svg" label={chips.shop} style={{ left: "46%", top: "12%" }} />
      <Chip icon="/images/icon-chip-storefront.svg" label={chips.at} style={{ left: "79%", top: "34%" }} />
      <Chip icon="/images/icon-chip-creditcard.svg" label={chips.using} style={{ left: "70%", top: "54%" }} />
      <Chip icon="/images/icon-chip-payments.svg" label={chips.amount} style={{ left: "4%", top: "57%" }} />
    </motion.div>
  );
}

export function SnapMockup() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-[400px] sm:w-[440px] lg:h-[449px] lg:w-[527px]"
    >
      <Image
        src="/images/feature-snap-mockup.png"
        alt="Receipt snap feature"
        fill
        className="object-cover"
        sizes="527px"
      />
      <motion.div
        className="pointer-events-none absolute h-[6px]"
        style={{
          left: "25.5%",
          width: "49.5%",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.9) 55%, transparent)",
          boxShadow: "0 0 24px 6px rgba(108,94,235,0.55)",
        }}
        initial={{ top: "7.5%" }}
        animate={{ top: ["7.5%", "92%", "7.5%"] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.8,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="absolute left-[7%] top-[6%] flex h-[52px] w-[57px] rotate-[9deg] items-center justify-center rounded-xl bg-white p-2 shadow-[0_4px_8px_rgba(0,0,0,0.16)]"
      >
        <Image src="/images/icon-category-fastfood.svg" alt="" width={32} height={32} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: 0.5 }}
        className="absolute left-[83%] top-[50%] flex h-[52px] w-[57px] rotate-[9deg] items-center justify-center rounded-xl bg-white p-2 shadow-[0_4px_8px_rgba(0,0,0,0.16)]"
      >
        <Image src="/images/icon-category-moneyout.svg" alt="" width={32} height={32} />
      </motion.div>
    </motion.div>
  );
}

const sparkles = [
  { left: "36%", top: "26%", size: "text-base", delay: 0 },
  { left: "31%", top: "32%", size: "text-xs", delay: 0.6 },
  { left: "39%", top: "34%", size: "text-sm", delay: 1.2 },
];

export function ManualMockup() {
  if (SHOW_MANUAL_LOTTIE_PREVIEW) {
    return (
      <div className="relative h-[320px] w-[320px] overflow-hidden rounded-3xl bg-card p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-[400px] sm:w-[440px] sm:p-10 lg:h-[449px] lg:w-[527px] lg:p-12">
        <Lottie animationData={manualLottiePreview} loop className="h-full w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="relative h-[320px] w-[320px] overflow-hidden rounded-3xl bg-card shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-[400px] sm:w-[440px] lg:h-[449px] lg:w-[527px]"
    >
      <Image
        src="/images/feature-manual-mockup.png"
        alt="Manual input feature"
        fill
        className="object-contain p-4"
        sizes="527px"
      />

      {/* Ambient glow behind the Add Transaction button, hinting it's tappable */}
      <motion.div
        className="pointer-events-none absolute rounded-full bg-grape/25 blur-md"
        style={{ left: "44%", top: "50%", width: "36%", height: "8%" }}
        animate={{ opacity: [0.5, 0.1, 0.5], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling sparkles echoing the ones baked into the artwork */}
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute ${s.size} text-grape-tint-2`}
          style={{ left: s.left, top: s.top }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          ✦
        </motion.span>
      ))}
    </motion.div>
  );
}

const insightContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const donutVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const connectorVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// Donut center/radius and each category's angle (degrees) in the 300x200 (3:2) viewBox,
// matching the four corner cards around the centered donut.
const INSIGHT_DONUT_CENTER = { x: 150, y: 100 };
const INSIGHT_DONUT_RADIUS = 51;
const INSIGHT_CONNECTOR_ANGLES = [
  { label: "Shopping", angle: -157.3 },
  { label: "Food & Drinks", angle: -26.3 },
  { label: "Transportation", angle: 145.5 },
  { label: "Home", angle: 31.2 },
];

function polarPoint(radius: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round((INSIGHT_DONUT_CENTER.x + radius * Math.cos(angleRad)) * 100) / 100,
    y: Math.round((INSIGHT_DONUT_CENTER.y + radius * Math.sin(angleRad)) * 100) / 100,
  };
}

function InsightConnectors() {
  return (
    <motion.svg
      variants={connectorVariants}
      className="pointer-events-none absolute inset-0 text-grape-tint-2"
      viewBox="0 0 300 200"
      fill="none"
    >
      <defs>
        <marker id="insight-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>
      <circle
        cx={INSIGHT_DONUT_CENTER.x}
        cy={INSIGHT_DONUT_CENTER.y}
        r={75}
        stroke="currentColor"
        strokeOpacity={0.35}
        strokeDasharray="3 4"
      />
      {INSIGHT_CONNECTOR_ANGLES.map(({ label, angle }) => {
        const start = polarPoint(INSIGHT_DONUT_RADIUS + 2, angle);
        const end = polarPoint(88, angle);
        return (
          <line
            key={label}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="currentColor"
            strokeOpacity={0.8}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="1 3.5"
            markerEnd="url(#insight-arrow)"
          />
        );
      })}
    </motion.svg>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
  style,
  emphasis,
  valueClassName = "text-info",
}: {
  icon: string;
  label: string;
  value: string;
  subtitle?: string;
  style: React.CSSProperties;
  emphasis?: boolean;
  valueClassName?: string;
}) {
  return (
    <motion.div
      variants={statCardVariants}
      className={`absolute flex items-center gap-2 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
        emphasis ? "flex-col items-start gap-1.5 p-3" : "p-2"
      }`}
      style={style}
    >
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grape-tint-3/35">
        <Image src={icon} alt="" fill className="object-contain p-1" sizes="24px" />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="whitespace-nowrap font-manrope text-[9px] text-text-secondary">
          {label}
        </span>
        <span
          className={`whitespace-nowrap font-poppins font-bold ${valueClassName} ${
            emphasis ? "text-base" : "text-xs"
          }`}
        >
          {value}
        </span>
        {subtitle && (
          <span className="whitespace-nowrap font-manrope text-[8px] text-text-tertiary">
            {subtitle}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function InsightMockup() {
  const { lang } = useLanguage();
  const labels = CATEGORY_LABELS[lang];

  if (SHOW_INSIGHT_LOTTIE_PREVIEW) {
    return (
      <div className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl bg-card sm:h-[400px] sm:w-[440px] lg:h-[449px] lg:w-[527px]">
        <Lottie animationData={insightLottiePreview} loop className="h-full w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl bg-card sm:h-[400px] sm:w-[440px] lg:h-[449px] lg:w-[527px]"
    >
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.div
          variants={insightContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative aspect-[3/2] w-full"
        >
          {/* Donut chart, centered */}
          <motion.div
            variants={donutVariants}
            className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2"
          >
            <Image src="/images/insight/donut.svg" alt="Spending breakdown donut chart" fill sizes="180px" />
          </motion.div>

          {/* Dotted guide ring + arrows pointing from the donut to each category card */}
          <InsightConnectors />

          {/* Summary card, centered above the chart */}
          <StatCard
            icon="/images/insight/icon-balance.svg"
            label={labels.spendingOverview}
            value="Rp7.500.000"
            subtitle={labels.thisMonth}
            valueClassName="text-punch"
            emphasis
            style={{ left: "50%", top: "0%", transform: "translateX(-50%)" }}
          />

          {/* Upper corners */}
          <StatCard
            icon="/images/insight/icon-shopping-bag.svg"
            label={labels.shopping}
            value="5%"
            style={{ left: "0%", top: "30%" }}
          />
          <StatCard
            icon="/images/insight/icon-graduation-hat.svg"
            label={labels.foodDrinks}
            value="40%"
            style={{ right: "0%", top: "26%" }}
          />

          {/* Lower corners */}
          <StatCard
            icon="/images/insight/icon-car.svg"
            label={labels.transportation}
            value="15%"
            style={{ left: "2%", top: "82%" }}
          />
          <StatCard
            icon="/images/insight/icon-sofa.svg"
            label={labels.home}
            value="35%"
            style={{ right: "0%", top: "78%" }}
          />

          <motion.span
            variants={statCardVariants}
            className="absolute text-base text-grape-tint-2"
            style={{ right: "6%", top: "2%" }}
          >
            ✦
          </motion.span>
          <motion.span
            variants={statCardVariants}
            className="absolute text-xs text-grape-tint-2"
            style={{ right: "0%", top: "10%" }}
          >
            ✦
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
