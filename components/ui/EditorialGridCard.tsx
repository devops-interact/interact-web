import { type ReactNode } from "react";

type EditorialGridCardProps = {
  index: string;
  body: string;
  title: string;
  footer?: ReactNode;
  /** Position in row — drives accent bar and title emphasis (same as process steps). */
  position: number;
};

export function EditorialGridCard({
  index,
  body,
  title,
  footer,
  position,
}: EditorialGridCardProps) {
  return (
    <article className="border-r border-b border-[var(--border-panel)] p-6">
      <div
        className={`mb-4 h-1 w-full ${
          position === 0 ? "bg-[var(--text-on-panel)]" : "bg-neutral-200"
        }`}
      />
      <p className="font-mono text-xs text-muted-panel">// {index}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-panel">{body}</p>
      <h3
        className={`mt-6 text-lg font-medium ${
          position <= 1 ? "text-[var(--text-on-panel)]" : "text-neutral-400"
        }`}
      >
        {title}
      </h3>
      {footer ? (
        <p className="mt-2 font-mono text-[10px] tracking-wide text-muted-panel">
          {footer}
        </p>
      ) : null}
      <div className="mt-8 flex h-16 items-end justify-center opacity-40" aria-hidden>
        <div className="h-10 w-10 border border-[var(--border-panel)]" />
      </div>
    </article>
  );
}

export function EditorialGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid border-t border-l border-[var(--border-panel)] sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
