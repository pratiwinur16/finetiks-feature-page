"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const COPY = {
  id: {
    regulated: "Terdaftar & diawasi oleh:",
    partner: "Bekerja sama dengan:",
    member: "Anggota dan terdaftar oleh:",
  },
  en: {
    regulated: "Registered & Supervised by:",
    partner: "In partnership with:",
    member: "Member of:",
  },
};

const DWELL_MS = 3000;

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

function useGroups(t: (typeof COPY)["en"]) {
  return [
    {
      label: t.regulated,
      logos: [
        { src: "/images/logo-ojk.png", alt: "OJK", width: 97, height: 42, className: "h-[42px] w-auto object-contain" },
        { src: "/images/logo-bi.svg", alt: "Bank Indonesia", width: 153, height: 28, className: "h-[28px] w-auto object-contain" },
        { src: "/images/logo-komdigi.svg", alt: "Komdigi", width: 55, height: 42, className: "h-[42px] w-auto object-contain" },
      ] satisfies Logo[],
    },
    {
      label: t.partner,
      logos: [
        { src: "/images/logo-bank-victoria.svg", alt: "Bank Victoria", width: 75, height: 36, className: "h-[35px] w-auto object-contain" },
        { src: "/images/logo-google.png", alt: "Google", width: 320, height: 105, className: "h-[26px] w-auto object-contain" },
        { src: "/images/logo-security-badge3.svg", alt: "Lightspeed", width: 132, height: 28, className: "h-[28px] w-auto object-contain" },
      ] satisfies Logo[],
    },
    {
      label: t.member,
      logos: [
        { src: "/images/logo-fintech-indonesia.svg", alt: "Asosiasi Fintech Indonesia", width: 61, height: 40, className: "h-[40px] w-auto object-contain" },
        { src: "/images/badge-iso27001.png", alt: "ISO 27001", width: 42, height: 42, className: "h-[42px] w-auto object-contain" },
      ] satisfies Logo[],
    },
  ];
}

function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <div className="flex items-end justify-center gap-[26px]">
      {logos.map((logo) => (
        <Image key={logo.src} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={logo.className} />
      ))}
    </div>
  );
}

export default function LegalityBar() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const groups = useGroups(t);

  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const programmaticScroll = useRef(false);

  // Autoplay — advances the mobile carousel unless the user is actively touching it.
  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % groups.length);
    }, DWELL_MS);
    return () => clearInterval(timer);
  }, [groups.length]);

  // Scroll the track to match `index`, whether it changed via autoplay or a dot click.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    programmaticScroll.current = true;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    const settle = setTimeout(() => {
      programmaticScroll.current = false;
    }, 400);
    return () => clearTimeout(settle);
  }, [index]);

  // Keep the dots in sync when the user swipes manually.
  function handleScroll() {
    if (programmaticScroll.current) return;
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(i);
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-[100px]">
      {/* Tablet/desktop — every category shown at once, wrapping as needed. */}
      <div className="hidden flex-wrap items-center justify-center gap-x-16 gap-y-10 sm:flex">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col items-start gap-3">
            <p className="font-manrope text-sm whitespace-nowrap text-white">{group.label}</p>
            <LogoRow logos={group.logos} />
          </div>
        ))}
      </div>

      {/* Mobile — one category at a time, swipeable + autoplaying, to avoid a tall vertical stack. */}
      <div className="sm:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            pausedRef.current = false;
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {groups.map((group) => (
            <div key={group.label} className="flex w-full shrink-0 snap-center flex-col items-center gap-3">
              <p className="font-manrope text-sm text-white">{group.label}</p>
              <LogoRow logos={group.logos} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {groups.map((group, i) => (
            <button
              key={group.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${group.label}`}
              className="p-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
