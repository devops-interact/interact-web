import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";
import {
  Section01Hero,
  SectionAbout,
  SectionWork,
  Section02Pillars,
  Section05Process,
  Section08Testimonials,
  Section09Engagement,
  Section11InsightsFaq,
} from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <SiteHeader showHeroBand />
      <main className="flex-1">
        <Section01Hero />
        <SectionAbout />
        <SectionWork />
        <Section02Pillars />
        <Section05Process />
        <Section08Testimonials />
        <Section09Engagement />
        <Section11InsightsFaq />
      </main>
      <Footer />
    </>
  );
}
