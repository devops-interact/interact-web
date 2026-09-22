type Entry = { date: string; title: string; body: string };

export function ChangelogTimeline({ entries }: { entries: Entry[] }) {
  return (
    <div className="border-t border-[var(--border-panel)]">
      {entries.map((entry) => (
        <article
          key={entry.title}
          className="grid border-b border-[var(--border-panel)] md:grid-cols-[140px_1fr]"
        >
          <time
            className="border-b border-[var(--border-panel)] p-6 font-mono text-[10px] tracking-widest text-muted-panel md:border-b-0 md:border-r"
          >
            {entry.date}
          </time>
          <div className="grid gap-4 p-6 md:grid-cols-[48px_1fr]">
            <div className="flex h-12 w-12 items-center justify-center border border-[var(--border-panel)] font-mono text-xs">
              &lt;&gt;
            </div>
            <div>
              <h3 className="font-medium">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-panel">
                {entry.body}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
