"use client";

import Link from "next/link";
import { useState } from "react";
import { getSite } from "@/lib/content";

export function Nav() {
  const { brand, version, nav } = getSite();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-0)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-widest"
        >
          {brand}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] text-[var(--text-muted)]">
            {version}
          </span>
          <Link
            href="/contact"
            className="font-mono text-[10px] tracking-widest text-[var(--text-primary)]"
          >
            LET&apos;S TALK →
          </Link>
        </div>

        <button
          type="button"
          className="font-mono text-xs lg:hidden"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 top-[57px] z-40 flex flex-col gap-6 bg-[var(--bg-0)] p-8 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm tracking-widest"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="font-mono text-sm tracking-widest"
            onClick={() => setOpen(false)}
          >
            LET&apos;S TALK →
          </Link>
        </div>
      )}
    </header>
  );
}
