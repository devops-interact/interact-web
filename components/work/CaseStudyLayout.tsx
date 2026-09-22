import Link from "next/link";
import type { WorkProject } from "@/lib/content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { WorkPreviewImage } from "./WorkPreviewImage";

export function CaseStudyLayout({ project }: { project: WorkProject }) {
  return (
    <>
      <SiteHeader showScrollCue={false} />
      <main className="surface-panel flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href="/work"
            className="font-mono text-[10px] tracking-widest text-muted-panel hover:text-[var(--text-on-panel)]"
          >
            ← Back to Work
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--border-panel)] px-2 py-0.5 font-mono text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-panel">{project.tagline}</p>
          <WorkPreviewImage
            project={project}
            className="mt-10 aspect-video"
            priority
          />

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Challenges</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-panel">
              {project.challenges.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Hypothesis</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-panel">
              {project.hypothesis.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Role &amp; process</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-panel">
              {project.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Key outcomes</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="border border-[var(--border-panel)] p-4 text-center"
                >
                  <p className="text-2xl font-semibold">{o.value}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-panel">
                    {o.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Link
            href="/work"
            className="mt-16 inline-block font-mono text-xs tracking-widest"
          >
            Back to Work
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
