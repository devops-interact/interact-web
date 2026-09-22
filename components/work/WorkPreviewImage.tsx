import Image from "next/image";
import type { WorkProject } from "@/lib/content";

type WorkPreviewImageProps = {
  project: WorkProject;
  className?: string;
  priority?: boolean;
  framed?: boolean;
};

export function WorkPreviewImage({
  project,
  className = "aspect-[16/10]",
  priority = false,
  framed = true,
}: WorkPreviewImageProps) {
  const frame = framed ? "border border-[var(--border)]" : "border-b border-[var(--border)]";

  if (!project.coverImage) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--bg-1)] font-mono text-sm text-[var(--text-muted)] ${frame} ${className}`}
      >
        {project.title} — preview
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-1)] ${frame} ${className}`}
    >
      <Image
        src={project.coverImage}
        alt={`${project.title} — product preview`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        unoptimized
        priority={priority}
      />
    </div>
  );
}
