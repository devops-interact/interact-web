type ChartCompareProps = {
  beforeLabel: string;
  afterLabel: string;
};

export function ChartCompare({ beforeLabel, afterLabel }: ChartCompareProps) {
  const without = [120, 180, 240, 320, 400, 480, 560];
  const withStudio = [80, 100, 130, 160, 190, 210, 230];
  const max = 600;
  const h = 120;

  function bars(values: number[], muted: boolean) {
    return values.map((v, i) => {
      const barH = (v / max) * h;
      return (
        <rect
          key={i}
          x={i * 36 + 8}
          y={h - barH}
          width={24}
          height={barH}
          fill={muted ? "#a3a3a3" : "#0a0a0a"}
          opacity={muted ? 0.5 : 0.95}
        />
      );
    });
  }

  return (
    <div className="grid gap-0 border border-[var(--border-panel)] md:grid-cols-2">
      <div className="border-b border-[var(--border-panel)] p-6 md:border-b-0 md:border-r">
        <p className="font-mono text-[10px] tracking-widest text-muted-panel">
          {beforeLabel}
        </p>
        <svg viewBox={`0 0 280 ${h}`} className="mt-4 w-full" aria-hidden>
          {bars(without, true)}
        </svg>
      </div>
      <div className="p-6">
        <p className="font-mono text-[10px] tracking-widest text-[var(--text-on-panel)]">
          {afterLabel}
        </p>
        <svg viewBox={`0 0 280 ${h}`} className="mt-4 w-full" aria-hidden>
          {bars(withStudio, false)}
        </svg>
      </div>
    </div>
  );
}
