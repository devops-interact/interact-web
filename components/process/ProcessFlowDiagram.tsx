"use client";

import { PhasePixelIcon } from "@/components/process/PhasePixelIcon";

const W = 520;
const H = 220;
const NODE_W = 88;
const NODE_H = 72;
const Y = 68;
const ICON = 24;

type Step = { title: string; index: string };

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
        <filter id="process-flow-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="process-flow-node-glow" x="-15%" y="-25%" width="130%" height="150%">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
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
                stroke="#ffffff"
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
                stroke="#ffffff"
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
        const stroke = isCurrent ? "#ffffff" : isPast ? "#d4d4d4" : "#3a3a3a";
        const fill = isFuture ? "#141414" : "#0c0c0c";
        const ink = isCurrent ? "#ffffff" : isPast ? "#d4d4d4" : "#737373";

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
              strokeWidth="1"
            />
            {isCurrent ? (
              <rect
                className="process-flow-node--glow"
                x={x}
                y={Y}
                width={NODE_W}
                height={NODE_H}
                rx={2}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.25"
                strokeLinecap="round"
                pathLength={1}
                filter="url(#process-flow-node-glow)"
              />
            ) : null}
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
            <foreignObject
              x={x + (NODE_W - ICON) / 2}
              y={Y + 8}
              width={ICON}
              height={ICON}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <PhasePixelIcon phase={step.index} ink={ink} className="block h-full w-full" />
              </div>
            </foreignObject>
            <text
              x={x + NODE_W / 2}
              y={Y + NODE_H - 12}
              textAnchor="middle"
              className={`${isCurrent ? "fill-white" : "fill-neutral-400"} font-mono text-[9px] uppercase tracking-wider`}
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
