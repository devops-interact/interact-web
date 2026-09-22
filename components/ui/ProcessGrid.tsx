type Step = { index: string; title: string; body: string };

export function ProcessGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="grid border-t border-l border-[var(--border-panel)] sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div
          key={step.index}
          className="border-r border-b border-[var(--border-panel)] p-6"
        >
          <div
            className={`mb-4 h-1 w-full ${i === 0 ? "bg-[var(--text-on-panel)]" : "bg-neutral-200"}`}
          />
          <p className="font-mono text-xs text-muted-panel">// {step.index}</p>
          <p className="mt-4 text-sm text-muted-panel">{step.body}</p>
          <h3
            className={`mt-6 text-lg font-medium ${
              i <= 1 ? "text-[var(--text-on-panel)]" : "text-neutral-400"
            }`}
          >
            {step.title}
          </h3>
          <div className="mt-8 flex h-16 items-end justify-center opacity-40" aria-hidden>
            <div className="h-10 w-10 border border-[var(--border-panel)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
