"use client";

import { useState } from "react";

type Item = { id: string; question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-[var(--border-panel)] border border-[var(--border-panel)]">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-start gap-4 px-6 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="font-mono text-xs text-muted-panel">// {item.id}</span>
              <span className="flex-1 text-sm font-medium">{item.question}</span>
              <span className="font-mono text-xs text-muted-panel">
                {open ? "−" : "+"}
              </span>
            </button>
            {open && (
              <p className="border-t border-[var(--border-panel)] px-6 pb-5 pl-16 text-sm leading-relaxed text-muted-panel">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
