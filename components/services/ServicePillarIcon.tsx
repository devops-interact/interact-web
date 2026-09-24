"use client";

import { PixelOutlineIcon } from "./PixelOutlineIcon";
import {
  drawAiAutomation,
  drawBrandLaunch,
  drawEngineering,
  drawProductUx,
} from "./serviceIconDraws";

const ICONS = {
  "001": drawProductUx,
  "002": drawEngineering,
  "003": drawBrandLaunch,
  "004": drawAiAutomation,
} as const;

export function ServicePillarIcon({ index }: { index: string }) {
  const draw = ICONS[index as keyof typeof ICONS] ?? ICONS["001"];
  return <PixelOutlineIcon draw={draw} />;
}
