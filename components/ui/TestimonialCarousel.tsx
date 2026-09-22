"use client";

import { useState } from "react";
import { getSite } from "@/lib/content";

export function TestimonialCarousel() {
  const items = getSite().testimonials.items;
  const [index, setIndex] = useState(0);
  const item = items[index];

  function prev() {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-elevated)] p-8">
      <div className="min-h-[140px]">
        {item.type === "tweet" ? (
          <>
            <p className="text-sm leading-relaxed">{item.text}</p>
            <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
              {item.name} {item.handle} · {item.date}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg leading-relaxed">&ldquo;{item.text}&rdquo;</p>
            <p className="mt-4 text-sm font-medium">{item.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{item.role}</p>
          </>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          className="font-mono text-xs tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          aria-label="Previous testimonial"
        >
          ← BACK
        </button>
        <span className="font-mono text-xs text-[var(--text-muted)]" aria-live="polite">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={next}
          className="font-mono text-xs tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          aria-label="Next testimonial"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
