"use client";

import { PixelTerminalDisplay } from "./PixelTerminalDisplay";
import {
  drawAiAutomation,
  drawBrandLaunch,
  drawEngineering,
  drawProductUx,
} from "./serviceIconDraws";

const ICONS: Record<string, { label: string; draw: typeof drawProductUx }> = {
  "001": { label: "product_ux.bin", draw: drawProductUx },
  "002": { label: "engineering.bin", draw: drawEngineering },
  "003": { label: "brand_launch.bin", draw: drawBrandLaunch },
  "004": { label: "ai_automation.bin", draw: drawAiAutomation },
};

export function ServicePillarIcon({ index }: { index: string }) {
  const config = ICONS[index] ?? ICONS["001"];

  return (
    <PixelTerminalDisplay label={config.label} draw={config.draw} />
  );
}
