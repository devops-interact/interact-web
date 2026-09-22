"use client";

import { useState } from "react";

type CodeTabsProps = {
  tabs: string[];
  samples: Record<string, string>;
};

export function CodeTabs({ tabs, samples }: CodeTabsProps) {
  const [active, setActive] = useState(tabs[0] ?? "Brief");
  const [copied, setCopied] = useState(false);
  const code = samples[active] ?? "";

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-[var(--border-panel-strong)] bg-[#0a0a0a] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`font-mono text-[10px] tracking-widest ${
                active === tab ? "text-white" : "text-neutral-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10px] tracking-widest text-neutral-500 hover:text-white"
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-neutral-400">
        <code>{code}</code>
      </pre>
    </div>
  );
}
