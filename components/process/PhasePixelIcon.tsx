"use client";

import { useEffect, useRef, useState } from "react";
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

/** Magnifying glass. The lens sweeps a small search path; a glint tracks inside. */
function discovery(t: number): Cell[] {
  const sweep = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ][Math.floor(t / 8) % 8];
  const [dx, dy] = sweep;
  const lens = [
    ...block(4, 2, 6, 2),
    [3, 3],
    [7, 3],
    [2, 4],
    [8, 4],
    [2, 5],
    [8, 5],
    [2, 6],
    [8, 6],
    [3, 7],
    [7, 7],
    ...block(4, 8, 6, 8),
  ];
  const handle = [
    [7, 9],
    [8, 9],
    [8, 10],
    [9, 10],
  ];
  const glint = [
    [4, 4],
    [5, 4],
    [6, 4],
    [6, 5],
    [5, 5],
    [4, 5],
  ][Math.floor(t / 6) % 6];
  return inside(
    [...lens, ...handle, glint].map(([x, y]) => [x + dx, y + dy] as Cell),
  );
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

/** Rocket bobs. Fins sweep to a point; exhaust flickers under the nozzle. */
function launch(t: number): Cell[] {
  const bob = [0, -1, 0, 1][Math.floor(t / 8) % 4];
  const body: Cell[] = [
    [6, 1],
    [5, 2],
    [6, 2],
    [7, 2],
    [5, 3],
    [6, 3],
    [7, 3],
    ...block(4, 4, 8, 4),
    ...block(3, 5, 9, 5),
    [1, 6],
    [2, 6],
    [3, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [9, 6],
    [10, 6],
    [11, 6],
    [0, 7],
    [1, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [11, 7],
    [12, 7],
    [5, 8],
    [6, 8],
    [7, 8],
  ].map(([x, y]) => [x, y + bob] as Cell);
  if (Math.floor(t / 5) % 2 === 0) body.push([6, 10 + bob]);
  return inside(body);
}

const DRAW: Record<string, (t: number) => Cell[]> = {
  "001": discovery,
  "002": prototype,
  "003": build,
  "004": launch,
};

/** Pixel cells drawn in the parent SVG so they scale with the viewBox on small screens. */
export function PhasePixelSvg({
  phase,
  ink = "#ffffff",
  x,
  y,
  size,
}: {
  phase: string;
  ink?: string;
  x: number;
  y: number;
  size: number;
}) {
  const [cells, setCells] = useState<Cell[]>([]);
  const frameRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const draw = DRAW[phase] ?? DRAW["001"];
    let raf = 0;

    const paint = () => {
      const t = reducedMotion ? 0 : frameRef.current;
      setCells(draw(t));
      if (!reducedMotion) {
        frameRef.current += 1;
        raf = requestAnimationFrame(paint);
      }
    };

    frameRef.current = 0;
    paint();
    return () => cancelAnimationFrame(raf);
  }, [phase, reducedMotion]);

  const scale = size / COLS;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} shapeRendering="crispEdges">
      {cells.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx} y={cy} width={1} height={1} fill={ink} />
      ))}
    </g>
  );
}

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
