"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 44;
const HOVER_OPACITY = 0.12;
const PULSE_PEAK = 0.28;
const HOVER_TRANSITION_MS = 620;
const PULSE_EXPAND_MS = 1400;
const PULSE_FADE_MS = 700;
const HOLD_EXPAND_CELLS_PER_SEC = 3.2;
const TAP_MAX_RADIUS = 4.5;
const HOLD_MAX_RADIUS = 11;
const QUICK_TAP_MS = 220;

type Ripple = {
  id: number;
  cx: number;
  cy: number;
  startedAt: number;
  releasedAt: number | null;
  maxRadius: number;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function cellCenter(index: number, cols: number) {
  return {
    x: (index % cols) + 0.5,
    y: Math.floor(index / cols) + 0.5,
  };
}

function rippleStrengthAt(
  cellX: number,
  cellY: number,
  ripple: Ripple,
  now: number,
): number {
  const dist = Math.hypot(cellX - ripple.cx, cellY - ripple.cy);
  const holdRadius =
    ripple.releasedAt === null
      ? ((now - ripple.startedAt) / 1000) * HOLD_EXPAND_CELLS_PER_SEC
      : ((ripple.releasedAt - ripple.startedAt) / 1000) * HOLD_EXPAND_CELLS_PER_SEC;

  let radius: number;
  if (ripple.releasedAt === null) {
    radius = holdRadius;
  } else {
    const t = Math.min(1, (now - ripple.releasedAt) / PULSE_EXPAND_MS);
    const expand = easeOutCubic(t);
    radius = holdRadius + expand * Math.max(0, ripple.maxRadius - holdRadius);
  }

  radius = Math.min(radius, ripple.maxRadius);
  const soft = 1.35;
  if (dist > radius + soft) return 0;

  const core = dist <= radius ? 1 : 1 - (dist - radius) / soft;
  const wave = easeInOutCubic(Math.min(1, core));

  let fade = 1;
  if (ripple.releasedAt !== null) {
    const expandDone = now - ripple.releasedAt > PULSE_EXPAND_MS;
    if (expandDone) {
      const fadeT = (now - ripple.releasedAt - PULSE_EXPAND_MS) / PULSE_FADE_MS;
      fade = Math.max(0, 1 - easeOutCubic(Math.min(1, fadeT)));
    }
  }

  return wave * fade * PULSE_PEAK;
}

export function InteractiveGrid({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pulseLevels, setPulseLevels] = useState<number[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const activeRippleIdRef = useRef<number | null>(null);
  const pointerDownRef = useRef(false);
  const pulseIdRef = useRef(0);
  const rafRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const total = dims.cols * dims.rows;

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

  useEffect(() => {
    setPulseLevels((prev) => {
      if (prev.length === total) return prev;
      return new Array(total).fill(0);
    });
  }, [total]);

  const indexAt = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el || dims.cols === 0) return -1;
      const rect = el.getBoundingClientRect();
      const x = Math.floor((clientX - rect.left) / CELL);
      const y = Math.floor((clientY - rect.top) / CELL);
      if (x < 0 || y < 0 || x >= dims.cols || y >= dims.rows) return -1;
      return y * dims.cols + x;
    },
    [dims.cols, dims.rows],
  );

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const tick = useCallback(() => {
    const now = performance.now();
    const ripples = ripplesRef.current;
    const count = dims.cols * dims.rows;

    if (count === 0) {
      stopLoop();
      return;
    }

    const next = new Array<number>(count).fill(0);
    const alive: Ripple[] = [];

    for (const ripple of ripples) {
      let any = false;
      for (let i = 0; i < count; i++) {
        const { x, y } = cellCenter(i, dims.cols);
        const s = rippleStrengthAt(x, y, ripple, now);
        if (s > 0) {
          any = true;
          next[i] = Math.max(next[i], s);
        }
      }

      const releasedAt = ripple.releasedAt;
      const fadedOut =
        releasedAt !== null &&
        now - releasedAt > PULSE_EXPAND_MS + PULSE_FADE_MS;

      if (any || !fadedOut) alive.push(ripple);
    }

    ripplesRef.current = alive;
    setPulseLevels(next);

    if (alive.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
    }
  }, [dims.cols, stopLoop]);

  const startLoop = useCallback(() => {
    if (reduceMotion || rafRef.current) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [reduceMotion, tick]);

  const addRipple = useCallback(
    (idx: number, maxRadius: number) => {
      if (reduceMotion || idx < 0) return;
      const x = idx % dims.cols;
      const y = Math.floor(idx / dims.cols);
      const id = pulseIdRef.current++;
      const ripple: Ripple = {
        id,
        cx: x + 0.5,
        cy: y + 0.5,
        startedAt: performance.now(),
        releasedAt: null,
        maxRadius,
      };
      ripplesRef.current = [...ripplesRef.current, ripple];
      activeRippleIdRef.current = id;
      startLoop();
    },
    [dims.cols, reduceMotion, startLoop],
  );

  const releaseActiveRipple = useCallback(() => {
    const id = activeRippleIdRef.current;
    if (id === null) return;
    const now = performance.now();
    ripplesRef.current = ripplesRef.current.map((r) => {
      if (r.id !== id) return r;
      const heldMs = now - r.startedAt;
      const maxRadius = heldMs < QUICK_TAP_MS ? TAP_MAX_RADIUS : HOLD_MAX_RADIUS;
      return { ...r, releasedAt: now, maxRadius };
    });
    activeRippleIdRef.current = null;
    startLoop();
  }, [startLoop]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || pointerDownRef.current) return;
    setHoverIndex(indexAt(e.clientX, e.clientY));
  };

  const onPointerLeave = () => {
    setHoverIndex(null);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion || e.button !== 0) return;
    const idx = indexAt(e.clientX, e.clientY);
    if (idx < 0) return;
    pointerDownRef.current = true;
    setHoverIndex(idx);
    e.currentTarget.setPointerCapture(e.pointerId);
    addRipple(idx, HOLD_MAX_RADIUS);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointerDownRef.current = false;
    releaseActiveRipple();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onPointerCancel = () => {
    pointerDownRef.current = false;
    releaseActiveRipple();
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 touch-none overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
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
          const hover = hoverIndex === i;
          const pulse = pulseLevels[i] ?? 0;

          return (
            <div key={i} className="relative border border-[var(--grid-line)]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor: hover
                    ? `rgba(255,255,255,${HOVER_OPACITY})`
                    : "transparent",
                  transition: reduceMotion
                    ? undefined
                    : `background-color ${HOVER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor:
                    pulse > 0 ? `rgba(255,255,255,${pulse})` : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
