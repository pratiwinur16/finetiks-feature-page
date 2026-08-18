import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import ProblemFramingSection from "@/components/ProblemFramingSection"; // Ver 1 — hidden for now, uncomment to bring back
import ProblemFramingSectionV2 from "@/components/ProblemFramingSectionV2";
import FeatureSection from "@/components/FeatureSection";
// import JourneySection from "@/components/JourneySection"; // Ver 1 — hidden for now, uncomment to bring back
// import JourneySectionV2 from "@/components/JourneySectionV2"; // Ver 2 — hidden for now, uncomment to bring back
// import JourneySectionV3 from "@/components/JourneySectionV3"; // Ver 3 — hidden for now, uncomment to bring back
// import JourneySectionV5 from "@/components/JourneySectionV5"; // Ver 5 (horizontal scroll) — hidden for now, uncomment to bring back
// import JourneySectionV6 from "@/components/JourneySectionV6"; // Ver 6 — hidden for now, uncomment to bring back
import JourneySectionV7 from "@/components/JourneySectionV7";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        {/* Ver 1 — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 pt-10">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 1
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <ProblemFramingSection />
        */}
        <ProblemFramingSectionV2 />
        <FeatureSection />
        {/* Ver 3 — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 3
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <JourneySectionV3 />
        */}
        {/* Ver 5 (horizontal scroll) — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 5
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <JourneySectionV5 />
        */}
        <JourneySectionV7 />
        {/* Ver 6 — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 6
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <JourneySectionV6 />
        */}
        {/* Ver 2 — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 2
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <JourneySectionV2 />
        */}
        {/* Ver 1 — hidden for now, uncomment to bring back
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 1
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <JourneySection />
        */}
        <TestimonialSection />
        <FAQSection />
        <Banner />
      </main>
      <Footer />
    </>
  );
}
