"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 44;
const HOVER_PEAK = 0.14;
const TRAIL_DECAY = 0.965;
const TRAIL_LOOP_EPS = 0.012;
const SPLASH_HOLD_INTERVAL_MS = 55;

type SplashSpark = {
  index: number;
  startAt: number;
  peak: number;
  duration: number;
};

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function hashNoise(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function cellsAlongLine(
  from: number,
  to: number,
  cols: number,
): number[] {
  if (from < 0) return [to];
  if (from === to) return [to];

  const x0 = from % cols;
  const y0 = Math.floor(from / cols);
  const x1 = to % cols;
  const y1 = Math.floor(to / cols);

  const out: number[] = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;

  while (true) {
    out.push(y * cols + x);
    if (x === x1 && y === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
  return out;
}

function spawnSplash(
  originIdx: number,
  cols: number,
  rows: number,
  now: number,
  intensity: "tap" | "hold",
): SplashSpark[] {
  const cx = originIdx % cols;
  const cy = Math.floor(originIdx / cols);
  const sparks: SplashSpark[] = [];
  const count = intensity === "tap" ? 10 + Math.floor(Math.random() * 14) : 4 + Math.floor(Math.random() * 6);
  const maxDist = intensity === "tap" ? 4 : 3;

  for (let n = 0; n < count; n++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 1 + Math.random() * maxDist;
    const nx = Math.round(cx + Math.cos(angle) * dist);
    const ny = Math.round(cy + Math.sin(angle) * dist);
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;

    const index = ny * cols + nx;
    const jitter = hashNoise(index + now + n);
    sparks.push({
      index,
      startAt: now + jitter * (intensity === "tap" ? 90 : 40),
      peak: 0.12 + jitter * 0.32,
      duration: 140 + jitter * 180,
    });
  }

  sparks.push({
    index: originIdx,
    startAt: now,
    peak: 0.35 + Math.random() * 0.15,
    duration: 160 + Math.random() * 100,
  });

  return sparks;
}

function splashStrength(spark: SplashSpark, now: number): number {
  const t = now - spark.startAt;
  if (t < 0 || t > spark.duration) return 0;
  const p = t / spark.duration;
  const attack = Math.min(1, t / 35);
  const decay = 1 - easeOutQuad(p);
  return spark.peak * attack * decay;
}

export function InteractiveGrid({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const [trailLevels, setTrailLevels] = useState<number[]>([]);
  const [pulseLevels, setPulseLevels] = useState<number[]>([]);
  const trailRef = useRef<Float32Array>(new Float32Array(0));
  const splashesRef = useRef<SplashSpark[]>([]);
  const lastHoverIdxRef = useRef(-1);
  const pointerDownRef = useRef(false);
  const holdSplashAtRef = useRef(0);
  const splashOriginRef = useRef(-1);
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
    trailRef.current = new Float32Array(total);
    setTrailLevels(new Array(total).fill(0));
    setPulseLevels(new Array(total).fill(0));
    lastHoverIdxRef.current = -1;
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

  const paintTrail = useCallback(
    (idx: number) => {
      if (idx < 0 || dims.cols === 0) return;
      const trail = trailRef.current;
      if (trail.length !== total) return;

      const cells = cellsAlongLine(lastHoverIdxRef.current, idx, dims.cols);
      for (const cell of cells) {
        trail[cell] = 1;
      }
      lastHoverIdxRef.current = idx;
    },
    [dims.cols, total],
  );

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const tick = useCallback(() => {
    const now = performance.now();
    const count = dims.cols * dims.rows;

    if (count === 0) {
      stopLoop();
      return;
    }

    const trail = trailRef.current;
    if (trail.length !== count) {
      stopLoop();
      return;
    }

    let trailActive = false;
    const trailOut = new Array<number>(count);
    for (let i = 0; i < count; i++) {
      trail[i] *= TRAIL_DECAY;
      if (trail[i] < TRAIL_LOOP_EPS) trail[i] = 0;
      else trailActive = true;
      trailOut[i] = trail[i] * HOVER_PEAK;
    }

    if (pointerDownRef.current && splashOriginRef.current >= 0) {
      if (now - holdSplashAtRef.current >= SPLASH_HOLD_INTERVAL_MS) {
        holdSplashAtRef.current = now;
        splashesRef.current.push(
          ...spawnSplash(
            splashOriginRef.current,
            dims.cols,
            dims.rows,
            now,
            "hold",
          ),
        );
      }
    }

    const pulseOut = new Array<number>(count).fill(0);
    const alive: SplashSpark[] = [];
    for (const spark of splashesRef.current) {
      const s = splashStrength(spark, now);
      if (s > 0) {
        pulseOut[spark.index] = Math.max(pulseOut[spark.index], s);
        alive.push(spark);
      } else if (now - spark.startAt <= spark.duration + 20) {
        alive.push(spark);
      }
    }
    splashesRef.current = alive;

    setTrailLevels(trailOut);
    setPulseLevels(pulseOut);

    if (trailActive || alive.length > 0 || pointerDownRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
    }
  }, [dims.cols, dims.rows, stopLoop]);

  const startLoop = useCallback(() => {
    if (reduceMotion || rafRef.current) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [reduceMotion, tick]);

  const addSplash = useCallback(
    (idx: number, kind: "tap" | "hold") => {
      if (reduceMotion || idx < 0) return;
      const now = performance.now();
      splashesRef.current = [
        ...splashesRef.current,
        ...spawnSplash(idx, dims.cols, dims.rows, now, kind),
      ];
      startLoop();
    },
    [dims.cols, dims.rows, reduceMotion, startLoop],
  );

  useEffect(() => () => stopLoop(), [stopLoop]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    if (pointerDownRef.current) return;

    const idx = indexAt(e.clientX, e.clientY);
    if (idx < 0) return;

    paintTrail(idx);
    startLoop();
  };

  const onPointerLeave = () => {
    lastHoverIdxRef.current = -1;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion || e.button !== 0) return;
    const idx = indexAt(e.clientX, e.clientY);
    if (idx < 0) return;

    pointerDownRef.current = true;
    splashOriginRef.current = idx;
    holdSplashAtRef.current = performance.now();
    paintTrail(idx);

    e.currentTarget.setPointerCapture(e.pointerId);
    addSplash(idx, "tap");
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointerDownRef.current = false;
    splashOriginRef.current = -1;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onPointerCancel = () => {
    pointerDownRef.current = false;
    splashOriginRef.current = -1;
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
          const trail = trailLevels[i] ?? 0;
          const pulse = pulseLevels[i] ?? 0;

          return (
            <div key={i} className="relative border border-[var(--grid-line)]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor:
                    trail > 0 ? `rgba(255,255,255,${trail})` : "transparent",
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
