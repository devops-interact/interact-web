"use client";

import { useState } from "react";

type Item = {
  index: string;
  tags: string[];
  title: string;
  body: string;
};

export function CapabilitiesSplit({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid border border-[var(--border-panel)] lg:grid-cols-2">
      <div className="border-b border-[var(--border-panel)] lg:border-b-0 lg:border-r">
        {items.map((item, i) => (
          <button
            key={item.index}
            type="button"
            className={`w-full border-b border-[var(--border-panel)] p-6 text-left last:border-b-0 ${
              open === i ? "bg-neutral-50" : ""
            }`}
            onClick={() => setOpen(i)}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-muted-panel">
                {item.tags.join(" · ")}
              </span>
              <span className="font-mono text-xs text-muted-panel">// {item.index}</span>
            </div>
            <h3
              className={`mt-3 text-lg font-medium ${
                open === i ? "text-[var(--text-on-panel)]" : "text-muted-panel"
              }`}
            >
              {item.title}
            </h3>
            {open === i && (
              <p className="mt-3 text-sm leading-relaxed text-muted-panel">{item.body}</p>
            )}
          </button>
        ))}
      </div>
      <div
        className="relative min-h-[280px] bg-[#0a0a0a] p-8"
        style={{
          backgroundImage:
            "radial-gradient(circle, #333 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        <svg viewBox="0 0 400 240" className="h-full w-full text-white" aria-hidden>
          <rect x="40" y="40" width="100" height="48" fill="none" stroke="white" strokeWidth="1" />
          <text x="50" y="68" fill="white" fontSize="10" fontFamily="monospace">BRIEF</text>
          <rect x="260" y="40" width="100" height="48" fill="none" stroke="white" strokeWidth="1" />
          <text x="270" y="68" fill="white" fontSize="10" fontFamily="monospace">BUILD</text>
          <rect x="150" y="140" width="100" height="48" fill="white" />
          <text x="168" y="168" fill="black" fontSize="10" fontFamily="monospace">SHIP</text>
          <line x1="140" y1="64" x2="150" y2="164" stroke="white" strokeWidth="1" />
          <line x1="260" y1="64" x2="250" y2="164" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
