"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const COLS = 13;
const ROWS = 13;
const PIXEL = 2;

type Cell = readonly [number, number];

function outline(x0: number, y0: number, x1: number, y1: number): Cell[] {
  const cells: Cell[] = [];
  for (let x = x0; x <= x1; x++) {
    cells.push([x, y0], [x, y1]);
  }
  for (let y = y0 + 1; y < y1; y++) {
    cells.push([x0, y], [x1, y]);
  }
  return cells;
}

function block(x0: number, y0: number, x1: number, y1: number): Cell[] {
  const cells: Cell[] = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) cells.push([x, y]);
  }
  return cells;
}

function inside(cells: Cell[]) {
  return cells.filter(([x, y]) => x >= 0 && y >= 0 && x < COLS && y < ROWS);
}

/** Flag on a pole. The cloth shifts one pixel between frames. */
function kickoff(t: number): Cell[] {
  const wave = Math.floor(t / 12) % 2;
  const pole = block(1, 1, 2, 11);
  const cloth = block(3, 1, 9 + wave, 5);
  const notch = block(3, 3, 5, 3);
  return inside([...pole, ...cloth.filter((cell) => !notch.some(([x, y]) => x === cell[0] && y === cell[1])), [0, 11], [3, 11]]);
}

/** Wireframe window. A cursor block steps across the lower row. */
function prototype(t: number): Cell[] {
  const cursorX = 3 + (Math.floor(t / 8) % 5);
  return inside([
    ...outline(1, 1, 11, 11),
    ...block(2, 3, 10, 4),
    ...block(3, 6, 8, 6),
    ...block(cursorX, 8, cursorX + 1, 9),
  ]);
}

/** Three bricks stay stacked. The top brick slides side to side. */
function build(t: number): Cell[] {
  const slide = Math.floor(t / 10) % 3;
  return inside([
    ...block(1, 9, 11, 11),
    ...block(2, 6, 10, 8),
    ...block(3 + slide, 2, 8 + slide, 4),
  ]);
}

/** Rocket bobs. Exhaust flickers under the fins. */
function launch(t: number): Cell[] {
  const bob = [0, -1, 0, 1][Math.floor(t / 8) % 4];
  const body: Cell[] = [
    [6, 0],
    [5, 1],
    [6, 1],
    [7, 1],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
    ...block(4, 3, 8, 7),
    [2, 6],
    [3, 6],
    [2, 7],
    [3, 7],
    [9, 6],
    [10, 6],
    [9, 7],
    [10, 7],
  ].map(([x, y]) => [x, y + bob] as Cell);
  if (Math.floor(t / 5) % 2 === 0) body.push([6, 10 + bob]);
  return inside(body);
}

const DRAW: Record<string, (t: number) => Cell[]> = {
  "001": kickoff,
  "002": prototype,
  "003": build,
  "004": launch,
};

export function PhasePixelIcon({
  phase,
  ink = "#ffffff",
  className = "",
}: {
  phase: string;
  ink?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const inkRef = useRef(ink);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    inkRef.current = ink;
  }, [ink]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = DRAW[phase] ?? DRAW["001"];
    let raf = 0;

    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = inkRef.current;
      const t = reducedMotion ? 0 : frameRef.current;
      for (const [x, y] of draw(t)) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
      if (!reducedMotion) {
        frameRef.current += 1;
        raf = requestAnimationFrame(paint);
      }
    };

    paint();
    return () => cancelAnimationFrame(raf);
  }, [phase, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={COLS * PIXEL}
      height={ROWS * PIXEL}
      className={className}
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}
