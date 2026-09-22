import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import {
  Section01Hero,
  Section02Pillars,
  Section03Velocity,
  Section04Layers,
  Section05Process,
  Section06Code,
  Section07Playbook,
  Section08Testimonials,
  Section09Engagement,
  Section10ShipLog,
  Section11InsightsFaq,
} from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Section01Hero />
        <Section02Pillars />
        <Section03Velocity />
        <Section04Layers />
        <Section05Process />
        <Section06Code />
        <Section07Playbook />
        <Section08Testimonials />
        <Section09Engagement />
        <Section10ShipLog />
        <Section11InsightsFaq />
      </main>
      <Footer />
    </>
  );
}
