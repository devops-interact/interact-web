"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 44;

type Pulse = { x: number; y: number; id: number };

export function InteractiveGrid({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const [hover, setHover] = useState<Set<number>>(new Set());
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const reduceMotion = useReducedMotion();
  const pulseId = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setDims({
        cols: Math.ceil(w / CELL),
        rows: Math.ceil(h / CELL),
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const indexAt = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return -1;
    const rect = el.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / CELL);
    const y = Math.floor((clientY - rect.top) / CELL);
    if (x < 0 || y < 0 || x >= dims.cols || y >= dims.rows) return -1;
    return y * dims.cols + x;
  };

  const highlightNeighborhood = (idx: number) => {
    if (idx < 0) {
      setHover(new Set());
      return;
    }
    const x = idx % dims.cols;
    const y = Math.floor(idx / dims.cols);
    const next = new Set<number>();
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < dims.cols && ny < dims.rows) {
          next.add(ny * dims.cols + nx);
        }
      }
    }
    setHover(next);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    highlightNeighborhood(indexAt(e.clientX, e.clientY));
  };

  const onPointerLeave = () => setHover(new Set());

  const runPulse = useCallback(
    (idx: number) => {
      if (reduceMotion || idx < 0) return;
      const x = idx % dims.cols;
      const y = Math.floor(idx / dims.cols);
      const id = pulseId.current++;
      setPulses((p) => [...p, { x, y, id }]);
      const steps = [0, 1, 2, 3, 4];
      const lit = new Set<number>();
      steps.forEach((step, i) => {
        window.setTimeout(() => {
          const s = new Set<number>();
          for (let d = 1; d <= step; d++) {
            if (x - d >= 0) s.add(y * dims.cols + (x - d));
            if (x + d < dims.cols) s.add(y * dims.cols + (x + d));
            if (y - d >= 0) s.add((y - d) * dims.cols + x);
            if (y + d < dims.rows) s.add((y + d) * dims.cols + x);
          }
          setHover(s);
          if (step === 4) {
            window.setTimeout(() => setHover(new Set()), 120);
          }
        }, i * 80);
      });
      window.setTimeout(
        () => setPulses((p) => p.filter((pulse) => pulse.id !== id)),
        700,
      );
    },
    [dims.cols, dims.rows, reduceMotion],
  );

  const onClick = (e: React.MouseEvent) => {
    runPulse(indexAt(e.clientX, e.clientY));
  };

  const total = dims.cols * dims.rows;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      aria-hidden
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${dims.cols || 1}, ${CELL}px)`,
          gridTemplateRows: `repeat(${dims.rows || 1}, ${CELL}px)`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isHover = hover.has(i);
          return (
            <div
              key={i}
              className="border border-[var(--grid-line)] transition-colors duration-150"
              style={{
                background: isHover ? "rgba(255,255,255,0.14)" : "transparent",
              }}
            />
          );
        })}
      </div>
      {pulses.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute border border-white/40"
          style={{
            left: p.x * CELL,
            top: p.y * CELL,
            width: CELL,
            height: CELL,
            animation: reduceMotion ? undefined : "grid-pulse 0.6s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
