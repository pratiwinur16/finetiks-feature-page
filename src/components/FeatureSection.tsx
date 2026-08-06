"use client";

import { motion } from "framer-motion";
import FeatureRow from "./FeatureRow";
import {
  VoiceMockup,
  SnapMockup,
  ManualMockup,
  InsightMockup,
} from "./FeatureMockups";
import { useLanguage } from "./LanguageProvider";

const HEADER = {
  id: {
    title: "Cara Catat Bebas, Hasilnya Tetap Rapi",
    subtitle:
      "Upload e-statement, ngomong pakai Voice, atau catat manual — semua transaksimu otomatis kebaca dan jadi insight lengkap soal kebutuhan vs keinginan.",
  },
  en: {
    title: "Track It Your Way, Stay Perfectly Organized",
    subtitle:
      "Upload an e-statement, talk to Voice, or log it manually — every transaction is read automatically and turned into a clear needs-vs-wants insight.",
  },
};

const ROWS = {
  id: [
    {
      tag: "Voice Capture",
      titleLines: ["Ngomong aja,", "FINETIKS yang catat"],
      description:
        "Ngomong aja secara natural, dan FINETIKS mengubah kata-katamu jadi transaksi yang terstruktur, sebelum detailnya keburu lupa.",
    },
    {
      tag: "Receipt Snap",
      titleLines: ["Jepret Struknya,", "Langsung Tercatat"],
      description:
        "Bagikan gambar dari aplikasi mana aja, dan FINETIKS otomatis mengenali merchant, jumlah, tanggal, dan detail penting lainnya.",
    },
    {
      tag: "Manual Input",
      titleLines: ["Mau Isi Sendiri?", "Tinggal Input Manual"],
      description:
        "Tidak semua transaksi bisa diceritain lewat foto atau suara. Kadang kamu yang paling tahu detailnya, jadi kamu yang pegang kendali.",
    },
    {
      tag: "Insight & Analytic",
      titleLines: ["Semua Transaksi,", "Jadi Cerita yang Jelas"],
      description:
        "Begitu tercatat, FINETIKS mengolah datamu jadi insight, biar kamu tahu persis ke mana uangmu pergi, tanpa perlu hitung sendiri.",
    },
  ],
  en: [
    {
      tag: "Voice Capture",
      titleLines: ["Just talk,", "FINETIKS logs it"],
      description:
        "Speak naturally, and FINETIKS turns your words into a structured transaction before the details slip your mind.",
    },
    {
      tag: "Receipt Snap",
      titleLines: ["Snap the Receipt,", "It's Logged Instantly"],
      description:
        "Share an image from any app, and FINETIKS automatically recognizes the merchant, amount, date, and other key details.",
    },
    {
      tag: "Manual Input",
      titleLines: ["Prefer to Type It?", "Go Manual Anytime"],
      description:
        "Not every transaction can be told through a photo or your voice. Sometimes you know the details best, so you stay in control.",
    },
    {
      tag: "Insight & Analytic",
      titleLines: ["Every Transaction,", "Turned Into a Clear Story"],
      description:
        "Once it's logged, FINETIKS turns your data into insights, so you know exactly where your money goes without doing the math yourself.",
    },
  ],
};

export default function FeatureSection() {
  const { lang } = useLanguage();
  const header = HEADER[lang];
  const rows = ROWS[lang];

  return (
    <section id="feature-section" className="w-full bg-white px-6 py-16 sm:py-24 lg:px-0 lg:py-[128px]">
      <div className="mx-auto flex max-w-[1124px] flex-col items-center gap-16 lg:gap-[90px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-6 text-center"
        >
          <h2 className="font-poppins text-[32px] font-bold leading-tight text-grape-dark sm:text-[44px] sm:leading-[52px]">
            {header.title}
          </h2>
          <p className="max-w-[900px] font-poppins text-[20px] leading-[28px] text-text-secondary sm:leading-[32px]">
            {header.subtitle}
          </p>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-16 lg:gap-[63px]">
          <FeatureRow
            imagePosition="left"
            tag={rows[0].tag}
            titleLines={rows[0].titleLines}
            description={rows[0].description}
            image={<VoiceMockup />}
          />

          <FeatureRow
            imagePosition="right"
            tag={rows[1].tag}
            titleLines={rows[1].titleLines}
            description={rows[1].description}
            image={<SnapMockup />}
          />

          <FeatureRow
            imagePosition="left"
            tag={rows[2].tag}
            titleLines={rows[2].titleLines}
            description={rows[2].description}
            image={<ManualMockup />}
          />

          <FeatureRow
            imagePosition="right"
            tag={rows[3].tag}
            titleLines={rows[3].titleLines}
            description={rows[3].description}
            image={<InsightMockup />}
          />
        </div>
      </div>
    </section>
  );
}
