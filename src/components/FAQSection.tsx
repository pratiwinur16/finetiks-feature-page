"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: Record<"id" | "en", FAQItem[]> = {
  id: [
    {
      question: "Apa itu Monthly Budget?",
      answer:
        "Monthly Budget adalah anggaran bulanan yang kamu atur sendiri berdasarkan total penghasilan. Fungsinya membantu kamu memantau apakah pengeluaranmu sesuai rencana atau melebihi batas.",
    },
    {
      question: "Apa itu Needs?",
      answer:
        "Needs adalah kategori kebutuhan wajib sehari-hari, seperti: Makan, Transportasi, dan Tagihan listrik, air, atau internet. Pengeluaran ini umumnya tidak bisa dihindari.",
    },
    {
      question: "Apa itu Wants?",
      answer:
        "Wants adalah kategori keinginan atau gaya hidup, seperti: jajan minuman atau makanan favorit, beli barang non-prioritas, dan hiburan atau liburan singkat. Kategori ini bisa diatur sesuai kondisi keuanganmu.",
    },
    {
      question: "Bagaimana cara mengatur budget untuk setiap kategori pengeluaran?",
      answer:
        "Buka menu Insights, pilih “Lihat Semua” pada bagian pengeluaran, lalu pilih “Ubah Budget” di bagian ringkasan. Sesuaikan jumlah untuk setiap kategori, lalu simpan perubahanmu.",
    },
    {
      question: "Apakah transaksi di FINETIKS bisa di-download?",
      answer:
        "Bisa. Buka menu Insights, klik “Lihat Semua” pada bagian pengeluaran, tekan ikon download, pilih rentang tanggal yang kamu inginkan, lalu ekspor data transaksimu.",
    },
  ],
  en: [
    {
      question: "What is Monthly Budget?",
      answer:
        "Monthly Budget is a monthly spending plan you set yourself based on your total income. It helps you track whether your spending stays on plan or goes over the limit.",
    },
    {
      question: "What are Needs?",
      answer:
        "Needs are your essential everyday categories, like food, transportation, and electricity, water, or internet bills. These expenses generally can't be avoided.",
    },
    {
      question: "What are Wants?",
      answer:
        "Wants are lifestyle or discretionary spending, like your favorite snacks or drinks, non-priority purchases, and short trips or entertainment. This category can be adjusted based on your finances.",
    },
    {
      question: "How do I set a budget for each spending category?",
      answer:
        "Open the Insights menu, select “View All” under spending, then choose “Edit Budget” in the summary section. Adjust the amount for each category, then save your changes.",
    },
    {
      question: "Can I download my transactions from FINETIKS?",
      answer:
        "Yes. Open the Insights menu, tap “View All” under spending, tap the download icon, choose your preferred date range, and export your transaction data.",
    },
  ],
};

const HEADER = {
  id: {
    title: "Pertanyaan yang Sering Diajukan (FAQ)",
    subtitle: "Tenang aja, FINETIKS selalu ada buat kamu!",
  },
  en: {
    title: "Frequently Asked Questions (FAQ)",
    subtitle: "Don't worry, FINETIKS is always here for you!",
  },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 rounded-lg bg-white p-4 text-left transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        <span className="flex-1 font-poppins text-base font-semibold text-text-secondary sm:text-lg">
          {item.question}
        </span>
        <span className="shrink-0 text-text-secondary">
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 font-montserrat text-sm leading-relaxed text-text-secondary sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLanguage();
  const header = HEADER[lang];
  const faqs = FAQS[lang];

  return (
    <section className="w-full bg-white px-6 py-16 sm:py-24 lg:py-[128px]">
      <div className="mx-auto flex max-w-[938px] flex-col items-center gap-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="font-poppins text-[28px] font-bold leading-tight text-grape-dark sm:text-[40px] sm:leading-[54px]">
            {header.title}
          </h2>
          <p className="font-poppins text-base text-text-primary sm:text-lg">
            {header.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex w-full flex-col items-start gap-6"
        >
          {faqs.map((item, i) => (
            <div key={item.question + i} className="w-full">
              <AccordionItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
              {i < faqs.length - 1 && (
                <div className="mt-6 h-px w-full bg-[#83AFBE] opacity-20" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
