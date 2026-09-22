"use client";

import { useRef } from "react";
import { getSite } from "@/lib/content";

export function TestimonialStrip() {
  const items = getSite().testimonials.items;
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="border border-[var(--border-panel)] px-3 py-2 font-mono text-xs"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="border border-[var(--border-panel)] px-3 py-2 font-mono text-xs"
          aria-label="Next"
        >
          →
        </button>
      </div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
      >
        {items.map((item, i) => (
          <article
            key={i}
            className={`snap-start shrink-0 border border-[var(--border-panel)] p-6 ${
              item.type === "quote" ? "w-[280px]" : "w-[320px]"
            }`}
          >
            {item.type === "tweet" ? (
              <>
                <p className="text-sm leading-relaxed">{item.text}</p>
                <p className="mt-4 font-mono text-[10px] text-muted-panel">
                  {item.name} {item.handle} · {item.date}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-panel">{item.role}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
