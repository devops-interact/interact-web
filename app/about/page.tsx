import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Interact",
  description:
    "Interact is a software development studio in Monterrey—we design, build, and ship products with client teams.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader showScrollCue={false} />
      <main className="surface-panel flex-1">
        <div className="mx-auto max-w-3xl border-x border-[var(--border-panel)] px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] text-muted-panel">&gt; About</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            We build software with you—not software you subscribe to.
          </h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-panel">
            <p>
              Interact is a development studio: you hire us to ship a product. We handle
              brand, product direction, UX, and engineering in one accountable team—often
              from first workshop through production launch.
            </p>
            <p>
              Our client work includes Prevify, Itemz.gg, Splattr, and Territorio Nacional—each
              shipped with measurable outcomes in compliance, marketplaces, 3D, and media.
            </p>
            <p>Based in Monterrey; we work with founders and product teams remotely.</p>
          </div>
          <div className="mt-10">
            <Button href="/contact">LET&apos;S TALK</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
