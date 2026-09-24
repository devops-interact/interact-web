"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export const ICON_COLS = 76;
export const ICON_ROWS = 44;
export const PIXEL = 2;

export type PixelPainter = (args: {
  ctx: CanvasRenderingContext2D;
  t: number;
  reducedMotion: boolean;
}) => void;

export function PixelOutlineIcon({ draw }: { draw: PixelPainter }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw({
        ctx,
        t: reducedMotion ? 0 : frameRef.current,
        reducedMotion: reducedMotion ?? false,
      });
      frameRef.current += 1;
      raf = requestAnimationFrame(paint);
    };
    paint();
    return () => cancelAnimationFrame(raf);
  }, [draw, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={ICON_COLS * PIXEL}
      height={ICON_ROWS * PIXEL}
      className="mb-6 block"
      style={{
        width: ICON_COLS * PIXEL,
        height: ICON_ROWS * PIXEL,
        imageRendering: "pixelated",
      }}
      aria-hidden
    />
  );
}
