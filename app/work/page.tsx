import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { WorkCard } from "@/components/work/WorkCard";
import { getWorkProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Interact",
  description: "Client products designed and built by Interact studio.",
};

export default function WorkPage() {
  const projects = getWorkProjects();

  return (
    <>
      <SiteHeader showScrollCue={false} />
      <main className="surface-panel flex-1">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <p className="font-mono text-[11px] text-muted-panel">[N. WORK]</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Client work</h1>
          <p className="mt-4 max-w-xl text-muted-panel">
            Products we&apos;ve designed and built with founders and teams—from compliance
            and marketplaces to 3D pipelines and editorial platforms.
          </p>
          <div className="mt-16 grid gap-0 border border-[var(--border-panel)] md:grid-cols-2">
            {projects.map((p) => (
              <WorkCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
