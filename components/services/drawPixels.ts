import { PIXEL } from "./pixelColors";

export function fillPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function mixColor(hover: number, base: string, lit: string) {
  return hover > 0.35 ? lit : base;
}

export function drawRectOutline(
  ctx: CanvasRenderingContext2D,
  size: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
) {
  for (let x = x0; x <= x1; x++) {
    fillPixel(ctx, x, y0, size, color);
    fillPixel(ctx, x, y1, size, color);
  }
  for (let y = y0; y <= y1; y++) {
    fillPixel(ctx, x0, y, size, color);
    fillPixel(ctx, x1, y, size, color);
  }
}

export function fillRect(
  ctx: CanvasRenderingContext2D,
  size: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      fillPixel(ctx, x, y, size, color);
    }
  }
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  size: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;
  while (true) {
    fillPixel(ctx, x, y, size, color);
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
}

export function drawCog(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  radius: number,
  teeth: number,
  angle: number,
  color: string,
) {
  const steps = teeth * 4;
  for (let i = 0; i < steps; i++) {
    const a = angle + (i / steps) * Math.PI * 2;
    const wobble = i % 2 === 0 ? radius + 1.2 : radius - 0.6;
    const x = Math.round(cx + Math.cos(a) * wobble);
    const y = Math.round(cy + Math.sin(a) * wobble);
    fillPixel(ctx, x, y, size, color);
  }
  fillRect(ctx, size, cx - 1, cy - 1, cx + 1, cy + 1, PIXEL.off);
}

export function frameColors(hover: number) {
  const edge = mixColor(hover, PIXEL.dim, PIXEL.mid);
  const hi = mixColor(hover, PIXEL.mid, PIXEL.bright);
  const accent = hover > 0.4 ? PIXEL.accent : PIXEL.accentDim;
  return { edge, hi, accent };
}
