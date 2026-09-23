import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import {
  Section01Hero,
  SectionAbout,
  SectionWork,
  Section02Pillars,
  Section05Process,
  Section08Testimonials,
  Section09Engagement,
  Section11InsightsFaq,
  SectionContact,
} from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
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
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
