import Link from "next/link";
import type { WorkProject } from "@/lib/content";
import { WorkPreviewImage } from "./WorkPreviewImage";

export function WorkCard({ project }: { project: WorkProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-r border-[var(--border-panel)] bg-white transition-colors hover:bg-neutral-50"
    >
      <WorkPreviewImage project={project} className="aspect-[16/10]" framed={false} />
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-4 text-xl font-medium group-hover:text-white">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{project.tagline}</p>
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-4">
          {project.outcomes.map((o) => (
            <div key={o.label}>
              <p className="text-sm font-medium">{o.value}</p>
              <p className="font-mono text-[9px] text-[var(--text-muted)]">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
