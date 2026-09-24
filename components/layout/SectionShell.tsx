"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/motion";
import { formatSectionLabel, HOME_SECTION_COUNT } from "@/lib/sectionLabel";
import { type ReactNode } from "react";

type SectionShellProps = {
  index: number;
  total?: number;
  label: string;
  titleLines: [string, string];
  children: ReactNode;
  id?: string;
  className?: string;
  action?: ReactNode;
  dark?: boolean;
};

export function SectionShell({
  index,
  total = HOME_SECTION_COUNT,
  label,
  titleLines,
  children,
  id,
  className = "",
  action,
  dark = false,
}: SectionShellProps) {
  const padded = String(index).padStart(2, "0");
  const sectionId = id ?? `section-${padded}`;
  const { fadeUp } = useMotionSafe();

  return (
    <section
      id={sectionId}
      className={`border-t border-[var(--border-panel)] py-16 md:py-24 ${
        dark ? "surface-grid border-white/10" : "surface-panel"
      } ${className}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <motion.div
          {...fadeUp}
          className="mb-10 flex flex-col gap-8 border-b border-[var(--border-panel)] pb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p
              className={`font-mono text-[11px] uppercase tracking-wider ${
                dark ? "text-neutral-500" : "text-muted-panel"
              }`}
            >
              {formatSectionLabel(index, label, total)}
            </p>
            <h2
              className={`mt-6 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl ${
                dark ? "text-white" : "text-[var(--text-on-panel)]"
              }`}
            >
              {titleLines[0]}
              <br />
              <span className={dark ? "text-neutral-400" : "text-muted-panel"}>
                {titleLines[1]}
              </span>
            </h2>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
