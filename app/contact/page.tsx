import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { getSite } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Interact",
  description: "Start a project with Interact software development studio.",
};

export default function ContactPage() {
  const { contact } = getSite();

  return (
    <>
      <SiteHeader showScrollCue={false} />
      <main className="surface-panel flex-1">
        <div className="mx-auto max-w-xl border border-[var(--border-panel)] px-6 py-20 md:my-12 md:py-28">
          <p className="font-mono text-[11px] text-muted-panel">&gt; Contact</p>
          <h1 className="mt-4 text-4xl font-semibold">Start a project</h1>
          <p className="mt-4 text-muted-panel">
            Share what you&apos;re building, your timeline, and how you&apos;d like to work
            together. We typically respond within two business days.
          </p>
          <form className="mt-10 space-y-6" action={`mailto:${contact.email}`} method="get">
            <div>
              <label className="font-mono text-[10px] tracking-widest text-muted-panel">
                NAME
              </label>
              <input
                name="subject"
                className="mt-2 w-full border border-[var(--border-panel)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--text-on-panel)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-widest text-muted-panel">
                EMAIL
              </label>
              <input
                type="email"
                className="mt-2 w-full border border-[var(--border-panel)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--text-on-panel)]"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-widest text-muted-panel">
                MESSAGE
              </label>
              <textarea
                rows={5}
                className="mt-2 w-full border border-[var(--border-panel)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--text-on-panel)]"
                placeholder="What are you building?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--text-on-panel)] py-3 font-mono text-xs tracking-widest text-white"
            >
              SEND →
            </button>
          </form>
          <p className="mt-8 font-mono text-xs text-muted-panel">
            Or email{" "}
            <a href={`mailto:${contact.email}`} className="text-[var(--text-on-panel)]">
              {contact.email}
            </a>
            {contact.location ? ` · ${contact.location}` : ""}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
