"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const NAV_LINKS = {
  id: [
    { label: "Home", href: "#", active: true, hasDropdown: false },
    { label: "Produk", href: "#", active: false, hasDropdown: true },
    { label: "Rich Mindset", href: "#", active: false, hasDropdown: true },
    { label: "Blog", href: "#", active: false, hasDropdown: false },
    { label: "Lainnya", href: "#", active: false, hasDropdown: true },
  ],
  en: [
    { label: "Home", href: "#", active: true, hasDropdown: false },
    { label: "Products", href: "#", active: false, hasDropdown: true },
    { label: "Rich Mindset", href: "#", active: false, hasDropdown: true },
    { label: "Blog", href: "#", active: false, hasDropdown: false },
    { label: "More", href: "#", active: false, hasDropdown: true },
  ],
};

const DOWNLOAD_LABEL = {
  id: "Download FINETIKS",
  en: "Download FINETIKS",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const navLinks = NAV_LINKS[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 820);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-text-primary" : "text-white";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: scrolled ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        boxShadow: scrolled
          ? "0 2px 8px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-[105px]"
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center gap-[33px] px-6">
        <Link href="/" className="relative h-[26px] w-[137px] shrink-0">
          <Image
            src="/images/logo-finetiks-nav.svg"
            alt="FINETIKS"
            fill
            sizes="137px"
            className="object-contain brightness-0 invert transition-opacity duration-300"
            style={{ opacity: scrolled ? 0 : 1 }}
            preload
          />
          <Image
            src="/images/logo-finetiks-blue.svg"
            alt="FINETIKS"
            fill
            sizes="137px"
            className="object-contain transition-opacity duration-300"
            style={{ opacity: scrolled ? 1 : 0 }}
          />
        </Link>

        <nav className="flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex flex-col items-center justify-center gap-1 rounded-md px-3 py-0.5 ${
                link.active ? "font-bold" : "font-semibold"
              } text-base ${textColor} transition-colors duration-300 hover:opacity-80`}
            >
              <span className="flex items-center gap-1 whitespace-nowrap">
                {link.label}
                {link.hasDropdown && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`h-[2px] w-6 rounded-full transition-opacity duration-200 ${
                  link.active
                    ? scrolled
                      ? "bg-grape opacity-100"
                      : "bg-white opacity-100"
                    : "opacity-0 group-hover:opacity-40 " +
                      (scrolled ? "bg-grape" : "bg-white")
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[19px]">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-[202px] items-center justify-center gap-0.5 rounded-md bg-black px-4 py-2 text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
          >
            <span className="whitespace-nowrap text-base font-bold">
              {DOWNLOAD_LABEL[lang]}
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="7"
                y="2"
                width="10"
                height="20"
                rx="2"
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <path d="M11 18h2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </motion.button>

          <div className="flex h-[41px] w-[127px] items-center justify-center gap-2 rounded-3xl border border-grape-tint-2 bg-neutral-100 p-2">
            <button
              onClick={() => setLang("id")}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                lang === "id" ? "font-bold text-text-primary" : "font-medium text-text-tertiary"
              }`}
            >
              ID
              <span className="text-base leading-none">🇮🇩</span>
            </button>
            <span className="h-[25px] w-px rotate-90 rounded-md bg-grape/20" />
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                lang === "en" ? "font-bold text-text-primary" : "font-medium text-text-tertiary"
              }`}
            >
              EN
              <span className="text-base leading-none">🇬🇧</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
