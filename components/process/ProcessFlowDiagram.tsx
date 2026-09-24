"use client";

const W = 520;
const H = 200;
const NODE_W = 88;
const NODE_H = 52;
const Y = 88;

type Step = { title: string };

function nodeX(index: number, count: number) {
  const gap = (W - count * NODE_W) / (count + 1);
  return gap + index * (NODE_W + gap);
}

/** L-shaped wire between right of node i and left of node i+1 */
function wirePath(i: number, steps: Step[]) {
  const x0 = nodeX(i, steps.length) + NODE_W;
  const x1 = nodeX(i + 1, steps.length);
  const midX = (x0 + x1) / 2;
  return `M ${x0} ${Y + NODE_H / 2} H ${midX} V ${Y + NODE_H / 2} H ${x1}`;
}

export function ProcessFlowDiagram({
  steps,
  activeIndex,
}: {
  steps: Step[];
  activeIndex: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full min-h-[180px]"
      role="img"
      aria-label={`Process flow, step ${activeIndex + 1} of ${steps.length}: ${steps[activeIndex]?.title}`}
    >
      <defs>
        <filter id="process-flow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {steps.slice(0, -1).map((_, i) => {
        const d = wirePath(i, steps);
        const completed = i < activeIndex - 1;
        const pulsing = i === activeIndex - 1;
        const future = i >= activeIndex;

        if (future) {
          return (
            <path
              key={`edge-${i}`}
              d={d}
              fill="none"
              stroke="#3a3a3a"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        }

        if (pulsing) {
          return (
            <g key={`edge-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="#a3e635"
                strokeWidth="3"
                strokeOpacity="0.25"
                filter="url(#process-flow-glow)"
              />
              <path
                d={d}
                fill="none"
                stroke="#737373"
                strokeWidth="1"
              />
              <path
                d={d}
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
                className="process-flow-edge--pulse"
                pathLength={1}
              />
            </g>
          );
        }

        return (
          <path
            key={`edge-${i}`}
            d={d}
            fill="none"
            stroke={completed || i < activeIndex ? "#525252" : "#737373"}
            strokeWidth="1"
          />
        );
      })}

      {steps.map((step, i) => {
        const x = nodeX(i, steps.length);
        const isPast = i < activeIndex;
        const isCurrent = i === activeIndex;
        const isFuture = i > activeIndex;
        const stroke = isCurrent ? "#a3e635" : isPast ? "#d4d4d4" : "#3a3a3a";
        const fill = isFuture ? "#141414" : "#0c0c0c";

        return (
          <g
            key={step.title}
            className="process-flow-node"
            style={{
              opacity: isFuture ? 0.55 : 1,
              transform: isCurrent ? "scale(1.02)" : "scale(1)",
              transformOrigin: `${x + NODE_W / 2}px ${Y + NODE_H / 2}px`,
            }}
          >
            <rect
              x={x}
              y={Y}
              width={NODE_W}
              height={NODE_H}
              rx={2}
              fill={fill}
              stroke={stroke}
              strokeWidth={isCurrent ? 2 : 1}
            />
            {/* corner ticks */}
            <path
              d={`M ${x + 4} ${Y} V ${Y + 6} M ${x} ${Y + 4} H ${x + 6}`}
              stroke={stroke}
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M ${x + NODE_W - 4} ${Y + NODE_H} V ${Y + NODE_H - 6} M ${x + NODE_W} ${Y + NODE_H - 4} H ${x + NODE_W - 6}`}
              stroke={stroke}
              strokeWidth="1"
              fill="none"
            />
            <text
              x={x + NODE_W / 2}
              y={Y + NODE_H / 2 + 4}
              textAnchor="middle"
              className="fill-neutral-400 font-mono text-[9px] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {step.title.length > 10 ? `${step.title.slice(0, 9)}…` : step.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
