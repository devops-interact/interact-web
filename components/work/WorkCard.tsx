"use client";

import Link from "next/link";
import { useState } from "react";
import type { WorkProject } from "@/lib/content";
import { WorkPreviewImage } from "./WorkPreviewImage";
import { WorkCardTitle } from "./WorkCardTitle";

export function WorkCard({ project }: { project: WorkProject }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-r border-[var(--border-panel)] bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <WorkPreviewImage project={project} className="aspect-[16/10]" framed={false} />
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--border-panel)] px-2 py-0.5 font-mono text-[10px] text-muted-panel"
            >
              {tag}
            </span>
          ))}
        </div>
        <WorkCardTitle text={project.title} active={hovered} />
        <p className="mt-2 text-sm text-muted-panel">{project.tagline}</p>
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[var(--border-panel)] pt-4">
          {project.outcomes.map((o) => (
            <div key={o.label}>
              <p className="text-sm font-medium text-[var(--text-on-panel)]">{o.value}</p>
              <p className="font-mono text-[9px] text-muted-panel">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
