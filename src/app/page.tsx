import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import ProblemFramingSection from "@/components/ProblemFramingSection"; // Ver 1 — hidden for now, uncomment to bring back
import ProblemFramingSectionV2 from "@/components/ProblemFramingSectionV2";
import FeatureSection from "@/components/FeatureSection";
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
        <div className="mx-auto flex w-full max-w-[1128px] items-center gap-4 px-6 py-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Ver 2
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
        <ProblemFramingSectionV2 />
        <FeatureSection />
        <TestimonialSection />
        <FAQSection />
        <Banner />
      </main>
      <Footer />
    </>
  );
}
