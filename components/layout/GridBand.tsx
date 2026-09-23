"use client";

import type { ReactNode } from "react";
import { InteractiveGrid } from "./InteractiveGrid";

type GridBandProps = {
  children: ReactNode;
  className?: string;
  minHeight?: string;
};

/** Black grid surface with interactive cells (hover + click pulse). */
export function GridBand({
  children,
  className = "",
  minHeight = "min-h-[280px]",
}: GridBandProps) {
  return (
    <div className={`relative surface-grid ${minHeight} ${className}`}>
      <InteractiveGrid />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
