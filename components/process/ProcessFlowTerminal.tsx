"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { TerminalTypewriter } from "@/components/ui/TerminalTypewriter";
import { ProcessFlowDiagram } from "@/components/process/ProcessFlowDiagram";
import { getSite } from "@/lib/content";

const AUTO_ADVANCE_MS = 7000;

export function ProcessFlowTerminal() {
  const steps = getSite().process.steps;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const step = steps[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % steps.length) + steps.length) % steps.length;
      setActiveIndex(next);
    },
    [steps.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % steps.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, steps.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      goTo(activeIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goTo(activeIndex - 1);
    }
  }

  const phaseSlug = step.title.toLowerCase().replace(/\s+/g, "_");

  return (
    <TerminalFrame
      title="how_we_work.flow"
      bodyRef={panelRef}
      shellProps={{
        tabIndex: 0,
        className: "outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-inset",
        onKeyDown,
        onPointerEnter: () => setPaused(true),
        onPointerLeave: () => setPaused(false),
        onFocus: () => setPaused(true),
        onBlur: (e) => {
          if (!panelRef.current?.contains(e.relatedTarget as Node)) {
            setPaused(false);
          }
        },
        "aria-label": "How we work process phases",
      }}
    >
      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="border-b border-[#2a2a2a] md:border-b-0 md:border-r">
          <nav className="border-b border-[#2a2a2a]" aria-label="Process phases">
            <ul>
              {steps.map((s, i) => {
                const active = i === activeIndex;
                return (
                  <li key={s.index}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`flex w-full items-stretch border-b border-[#2a2a2a] text-left transition-colors last:border-b-0 ${
                        active ? "bg-[#141414]" : "bg-transparent hover:bg-[#101010]"
                      }`}
                    >
                      <span
                        className={`w-1 shrink-0 ${active ? "terminal-glow-bar" : "bg-transparent"}`}
                        aria-hidden
                      />
                      <span className="px-4 py-3">
                        <span
                          className={`block font-mono text-[10px] ${
                            active ? "terminal-glow" : "text-neutral-600"
                          }`}
                        >
                          // {s.index}
                        </span>
                        <span
                          className={`mt-1 block font-mono text-xs tracking-wide ${
                            active ? "terminal-glow" : "text-neutral-500"
                          }`}
                        >
                          {active ? `<${s.title.toUpperCase()}>` : s.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] text-neutral-600">// HOW WE WORK</p>
            <p className="terminal-glow mt-3 font-mono text-xs">
              {`> phase::${phaseSlug}`}
            </p>
            <div className="mt-4 min-h-[4.5rem]">
              <TerminalTypewriter
                key={`${activeIndex}-${step.body}`}
                text={step.body}
                runKey={activeIndex}
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-[200px] flex-col bg-[#0a0a0a] p-4 md:p-6">
          <p className="mb-3 font-mono text-[10px] tracking-widest text-neutral-600">
            WIREFRAME :: PIPELINE
          </p>
          <div className="flex flex-1 items-center">
            <ProcessFlowDiagram steps={steps} activeIndex={activeIndex} />
          </div>
          <p className="mt-2 text-right font-mono text-[9px] text-neutral-600">
            step {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            {paused ? " · paused" : ""}
          </p>
        </div>
      </div>
    </TerminalFrame>
  );
}
