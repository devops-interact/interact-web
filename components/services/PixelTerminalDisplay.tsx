"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type PixelDrawFn = (args: {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  t: number;
  hover: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
}) => void;

type PixelTerminalDisplayProps = {
  label: string;
  draw: PixelDrawFn;
  logicalWidth?: number;
  logicalHeight?: number;
  pixelSize?: number;
};

export function PixelTerminalDisplay({
  label,
  draw,
  logicalWidth = 52,
  logicalHeight = 36,
  pixelSize = 4,
}: PixelTerminalDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const hoverRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const [hoverTarget, setHoverTarget] = useState(0);
  const reducedMotion = useReducedMotion();

  const width = logicalWidth * pixelSize;
  const height = logicalHeight * pixelSize;

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0c0c0c";
    ctx.fillRect(0, 0, width, height);

    draw({
      ctx,
      w: logicalWidth,
      h: logicalHeight,
      t: frameRef.current,
      hover: hoverRef.current,
      pointer: pointerRef.current,
      reducedMotion: reducedMotion ?? false,
    });
  }, [draw, logicalWidth, logicalHeight, width, height, reducedMotion]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      frameRef.current += 1;
      hoverRef.current += (hoverTarget - hoverRef.current) * 0.12;
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paint, hoverTarget]);

  useEffect(() => {
    paint();
  }, [paint]);

  return (
    <div
      className="group relative mb-6 overflow-hidden border border-[#2a2a2a] bg-[#0c0c0c] shadow-[inset_0_0_0_1px_#1f1f1f]"
      onPointerEnter={() => setHoverTarget(1)}
      onPointerLeave={() => {
        setHoverTarget(0);
        pointerRef.current = { x: 0.5, y: 0.5 };
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      }}
    >
      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-2 py-1">
        <span className="font-mono text-[9px] tracking-widest text-[#525252] group-hover:text-[#a3a3a3]">
          {label}
        </span>
        <span className="font-mono text-[9px] text-[#404040]">
          <span className="text-[#a3e635]">●</span> LIVE
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block w-full image-rendering-pixelated"
        style={{ imageRendering: "pixelated" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </div>
  );
}
