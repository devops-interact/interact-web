"use client";

import Link from "next/link";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { ChartCompare } from "@/components/ui/ChartCompare";
import { CodeTabs } from "@/components/ui/CodeTabs";
import { Accordion } from "@/components/ui/Accordion";
import { TestimonialStrip } from "@/components/ui/TestimonialStrip";
import { ChangelogTimeline } from "@/components/ui/ChangelogTimeline";
import { CapabilitiesSplit } from "@/components/ui/CapabilitiesSplit";
import { ProcessGrid } from "@/components/ui/ProcessGrid";
import Image from "next/image";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { getContactMailto, getSite, getFaq, getWorkProjects } from "@/lib/content";
import { WorkCard } from "@/components/work/WorkCard";
import { useState } from "react";
import { Marquee } from "@/components/layout/Marquee";
import { GridBand } from "@/components/layout/GridBand";

export function Section01Hero() {
  const { hero } = getSite();

  return (
    <section id="section-01" className="surface-panel border-b border-[var(--border-panel)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="border-b border-[var(--border-panel)] p-8 md:border-b-0 md:border-r md:p-12 lg:p-16">
            <h1 className="max-w-2xl text-[1.875rem] leading-snug tracking-tight md:text-[2.34375rem] lg:text-[2.8125rem]">
              {hero.headline}
            </h1>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="font-mono text-[10px] tracking-widest text-muted-panel">
              {hero.trust.label}
            </p>
            <p className="mt-2 text-xl font-semibold">{hero.trust.rating}</p>
            <p className="text-sm text-muted-panel">{hero.trust.subrating}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-panel">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={getContactMailto()}>{hero.ctaPrimary}</Button>
              <Link
                href="/#work"
                className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-panel hover:text-[var(--text-on-panel)]"
              >
                <span className="inline-block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[var(--text-on-panel)]" />
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        <PartnerStrip />
      </div>
    </section>
  );
}

export function SectionAbout() {
  const { aboutSection } = getSite();

  return (
    <section id="about" className="border-b border-white/10">
      <GridBand className="py-16 md:py-24" minHeight="min-h-[360px]">
        <div className="mx-auto max-w-[1400px] px-4 text-white md:px-8">
          <p className="font-mono text-[11px] text-white/50">&gt; About</p>
          <h2 className="mt-4 max-w-4xl text-2xl leading-snug tracking-tight text-white md:text-3xl lg:text-4xl">
            {aboutSection.headline}
          </h2>
          <div className="mt-8 grid gap-8 text-sm leading-relaxed text-white/75 md:grid-cols-2">
            <p>
              Interact is a development studio: you hire us to ship a product. We handle
              brand, product direction, UX, and engineering in one accountable team—often
              from first workshop through production launch.
            </p>
            <p>
              Our client work includes Prevify, Itemz.gg, Splattr, and Territorio Nacional—each
              shipped with measurable outcomes in compliance, marketplaces, 3D, and media.
              Based in Monterrey; we work with founders and product teams remotely.
            </p>
          </div>
        </div>
      </GridBand>
    </section>
  );
}

export function SectionWork() {
  const projects = getWorkProjects();

  return (
    <section
      id="work"
      className="surface-panel border-b border-[var(--border-panel)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="font-mono text-[11px] text-muted-panel">[N. WORK]</p>
        <h2 className="mt-4 text-3xl md:text-5xl">Client work</h2>
        <p className="mt-4 max-w-xl text-muted-panel">
          Products we&apos;ve designed and built with founders and teams—from compliance
          and marketplaces to 3D pipelines and editorial platforms.
        </p>
        <div className="mt-12 grid gap-0 border border-[var(--border-panel)] md:grid-cols-2">
          {projects.map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Section02Pillars() {
  const { pillars } = getSite();

  return (
    <SectionShell
      index={2}
      label={pillars.label}
      titleLines={[pillars.title[0], pillars.title[1]]}
      action={<Button href={getContactMailto()}>{pillars.cta}</Button>}
    >
      <div className="grid border-t border-l border-[var(--border-panel)] sm:grid-cols-3">
        {pillars.items.map((item) => (
          <article
            key={item.index}
            className="border-r border-b border-[var(--border-panel)] p-8"
          >
            <p className="font-mono text-xs text-muted-panel">// {item.index}</p>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-panel">{item.body}</p>
            <p className="mt-6 font-mono text-[10px] tracking-widest text-muted-panel">
              {item.chip}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function Section03Velocity() {
  const { velocity } = getSite();

  return (
    <SectionShell
      index={3}
      label={velocity.label}
      titleLines={[velocity.title[0], velocity.title[1]]}
      action={<Button href="/#work" variant="secondary">{velocity.cta}</Button>}
    >
      <div className="mb-0 grid grid-cols-2 border border-[var(--border-panel)] md:grid-cols-4">
        {velocity.stats.map((s) => (
          <div
            key={s.label}
            className="border-r border-b border-[var(--border-panel)] p-6 last:border-r-0 md:border-b-0"
          >
            <p className="text-2xl font-semibold md:text-3xl">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] text-muted-panel">{s.label}</p>
          </div>
        ))}
      </div>
      <ChartCompare
        beforeLabel={velocity.chart.beforeLabel}
        afterLabel={velocity.chart.afterLabel}
      />
    </SectionShell>
  );
}

export function Section04Layers() {
  const { layers } = getSite();

  return (
    <SectionShell
      index={4}
      label={layers.label}
      titleLines={[layers.title[0], layers.title[1]]}
    >
      <CapabilitiesSplit items={layers.items} />
      <div className="mt-0 grid border border-t-0 border-[var(--border-panel)] md:grid-cols-3">
        {layers.principles.map((p) => (
          <div
            key={p.title}
            className="border-r border-[var(--border-panel)] p-6 last:border-r-0"
          >
            <h4 className="text-sm font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm text-muted-panel">{p.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function Section05Process() {
  const { process } = getSite();

  return (
    <SectionShell
      index={5}
      label={process.label}
      titleLines={[process.title[0], process.title[1]]}
      action={<Button href={getContactMailto()}>{process.cta}</Button>}
    >
      <ProcessGrid steps={process.steps} />
    </SectionShell>
  );
}

export function Section06Code() {
  const { kickoff } = getSite();

  return (
    <SectionShell
      index={6}
      label={kickoff.label}
      titleLines={[kickoff.title[0], kickoff.title[1]]}
      action={<Button href={getContactMailto()}>{kickoff.cta}</Button>}
    >
      <CodeTabs tabs={kickoff.tabs} samples={kickoff.samples} />
    </SectionShell>
  );
}

export function Section07Playbook() {
  const { playbook } = getSite();

  return (
    <SectionShell
      index={7}
      label={playbook.label}
      titleLines={[playbook.title[0], playbook.title[1]]}
    >
      <div className="grid border border-[var(--border-panel)] sm:grid-cols-2">
        {playbook.items.map((doc) => (
          <Link
            key={doc.index}
            href="/#about"
            className="group border-b border-r border-[var(--border-panel)] p-8 last:border-b-0 sm:even:border-r-0 sm:[&:nth-child(odd)]:border-r"
          >
            <p className="font-mono text-xs text-muted-panel">// {doc.index}</p>
            <h3 className="mt-3 text-lg font-semibold">{doc.title}</h3>
            <p className="mt-2 text-sm text-muted-panel">{doc.description}</p>
            <p className="mt-2 font-mono text-[10px] text-muted-panel">
              {doc.category} · {doc.tags.join(" · ")}
            </p>
            <span className="mt-4 inline-block font-mono text-[10px] tracking-widest">
              ↗ VIEW
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

export function Section08Testimonials() {
  const { testimonials } = getSite();

  return (
    <SectionShell
      index={8}
      label={testimonials.label}
      titleLines={[testimonials.title[0], testimonials.title[1]]}
    >
      <TestimonialStrip />
    </SectionShell>
  );
}

export function Section09Engagement() {
  const { engagement } = getSite();
  const [mode, setMode] = useState<0 | 1>(0);

  return (
    <SectionShell
      index={9}
      label={engagement.label}
      titleLines={[engagement.title[0], engagement.title[1]]}
    >
      <div className="mb-8 flex items-center gap-6 border border-[var(--border-panel)] px-4 py-3">
        {engagement.toggle.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setMode(i as 0 | 1)}
            className={`font-mono text-[10px] tracking-widest ${
              mode === i ? "text-[var(--text-on-panel)]" : "text-muted-panel"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid border-t border-l border-[var(--border-panel)] lg:grid-cols-3">
        {engagement.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col border-r border-b border-[var(--border-panel)] p-8 ${
              tier.featured ? "bg-neutral-50" : ""
            }`}
          >
            {tier.featured && (
              <p className="font-mono text-[10px] tracking-widest text-muted-panel">
                RECOMMENDED
              </p>
            )}
            <h3 className="mt-2 text-xl font-semibold">{tier.name}</h3>
            <p className="mt-2 text-sm text-muted-panel">{tier.description}</p>
            <p className="mt-6 text-3xl font-semibold">
              {mode === 0 ? tier.sprintPrice : tier.retainerPrice}
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-panel">
              {tier.features.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
            <Button href={getContactMailto()} className="mt-8 w-full justify-center">
              INQUIRE
            </Button>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function Section10ShipLog() {
  const { shipLog } = getSite();

  return (
    <SectionShell
      index={10}
      label={shipLog.label}
      titleLines={[shipLog.title[0], shipLog.title[1]]}
      action={
        <Button href="/#work" variant="secondary">{shipLog.cta}</Button>
      }
    >
      <ChangelogTimeline entries={shipLog.entries} />
    </SectionShell>
  );
}

export function Section11InsightsFaq() {
  const site = getSite();
  const { studioSection } = site;
  const faq = getFaq();

  return (
    <>
      <section
        id="section-11"
        className="surface-panel border-t border-[var(--border-panel)]"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="flex flex-col justify-center border-b border-[var(--border-panel)] p-8 md:border-b-0 md:border-r md:p-12 lg:p-16">
              <p className="font-mono text-[11px] uppercase text-muted-panel">
                [N. 11] — &gt; {studioSection.label}
              </p>
              <h2 className="mt-6 max-w-lg text-3xl leading-tight tracking-tight md:text-5xl">
                {studioSection.title[0]}
                {studioSection.title[1] ? (
                  <>
                    <br />
                    <span className="text-muted-panel">{studioSection.title[1]}</span>
                  </>
                ) : null}
              </h2>
              <div className="mt-8">
                <Button href={getContactMailto()}>{studioSection.cta}</Button>
              </div>
              <address className="mt-8 max-w-md text-sm leading-relaxed text-muted-panel not-italic">
                {studioSection.address}
              </address>
              <p className="mt-6 font-mono text-[10px] tracking-widest text-muted-panel">
                BY APPOINTMENT ·{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[var(--text-on-panel)] hover:underline"
                >
                  {site.contact.email}
                </a>
              </p>
            </div>
            <div className="relative min-h-[280px] border-b border-[var(--border-panel)] md:min-h-[420px] md:border-b-0">
              <Image
                src={studioSection.image}
                alt={studioSection.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel border-t border-[var(--border-panel)] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="font-mono text-[11px] uppercase text-muted-panel">
            [N. 11 / 11] — &gt; {site.faqSection.label}
          </p>
          <h2 className="mt-6 text-3xl md:text-5xl">
            {site.faqSection.title[0]}
            <br />
            <span className="text-muted-panel">{site.faqSection.title[1]}</span>
          </h2>
          <div className="mt-12">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <GridBand className="py-24" minHeight="min-h-[360px]">
        <div className="mx-auto max-w-[900px] border border-white/20 bg-white px-8 py-16 text-center text-[var(--text-on-panel)]">
          <p className="font-mono text-[10px] tracking-widest text-muted-panel">
            {site.cta.eyebrow}
          </p>
          <h2 className="mt-6 text-4xl md:text-5xl">
            {site.cta.lines[0]}
            <br />
            {site.cta.lines[1]}
          </h2>
          <div className="mt-10 flex justify-center">
            <Button href={getContactMailto()}>{site.cta.button}</Button>
          </div>
        </div>
        <Marquee />
      </GridBand>
    </>
  );
}
