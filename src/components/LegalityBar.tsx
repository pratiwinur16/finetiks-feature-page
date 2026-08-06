"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const COPY = {
  id: {
    regulated: "Berizin & diawasi oleh:",
    partner: "Bekerja sama dengan:",
    association: "Anggota Asosiasi:",
    security: "Keamananmu jadi prioritas",
  },
  en: {
    regulated: "Licensed & supervised by:",
    partner: "In partnership with:",
    association: "Association member:",
    security: "Your security is our priority",
  },
};

export default function LegalityBar() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-10 px-6 py-10 lg:justify-start lg:gap-12 lg:px-[163px] 2xl:flex-nowrap 2xl:justify-between 2xl:gap-6">
      <div className="flex flex-col items-start gap-3">
        <p className="font-manrope text-sm whitespace-nowrap text-white">{t.regulated}</p>
        <div className="flex items-end justify-center gap-[26px]">
          <Image src="/images/logo-ojk.png" alt="OJK" width={97} height={42} className="h-[42px] w-auto object-contain" />
          <Image src="/images/logo-bi.svg" alt="Bank Indonesia" width={153} height={28} className="h-[28px] w-auto object-contain" />
          <Image src="/images/logo-komdigi.svg" alt="Komdigi" width={55} height={42} className="h-[42px] w-auto object-contain" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <p className="font-manrope text-sm whitespace-nowrap text-white">{t.partner}</p>
        <Image
          src="/images/logo-bank-victoria.svg"
          alt="Bank Victoria"
          width={75}
          height={36}
          className="h-[35px] w-auto object-contain"
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <p className="font-manrope text-sm whitespace-nowrap text-white">{t.association}</p>
        <Image
          src="/images/logo-fintech-indonesia.svg"
          alt="Asosiasi Fintech Indonesia"
          width={61}
          height={40}
          className="h-[40px] w-auto object-contain"
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <p className="font-manrope text-sm whitespace-nowrap text-white">{t.security}</p>
        <div className="flex items-end justify-center gap-[26px]">
          <Image
            src="/images/badge-iso27001.png"
            alt="ISO 27001"
            width={42}
            height={42}
            className="h-[42px] w-auto object-contain"
          />
          <Image
            src="/images/logo-google.png"
            alt="Google"
            width={320}
            height={105}
            className="h-[26px] w-auto object-contain"
          />
          <Image
            src="/images/logo-security-badge3.svg"
            alt="Lightspeed"
            width={132}
            height={28}
            className="h-[28px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
