import { PIXEL } from "./pixelColors";
import type { PixelDrawFn } from "./PixelTerminalDisplay";
import {
  drawCog,
  drawLine,
  drawRectOutline,
  fillPixel,
  fillRect,
  frameColors,
  lerp,
  mixColor,
} from "./drawPixels";

const PS = 1;

export const drawProductUx: PixelDrawFn = ({ ctx, w, h, t, hover, reducedMotion }) => {
  const { edge, hi, accent } = frameColors(hover);
  const blink = reducedMotion ? 1 : 0.6 + 0.4 * Math.sin(t * 0.08);

  // Phone (left)
  const px0 = 4;
  const py0 = 6;
  drawRectOutline(ctx, PS, px0, py0, px0 + 10, py0 + 18, edge);
  fillRect(ctx, PS, px0 + 1, py0 + 3, px0 + 9, py0 + 16, PIXEL.off);
  fillPixel(ctx, px0 + 5, py0 + 1, PS, hi);
  // Package cube on screen
  const cube = accent;
  fillPixel(ctx, px0 + 4, py0 + 8, PS, cube);
  fillPixel(ctx, px0 + 5, py0 + 7, PS, cube);
  fillPixel(ctx, px0 + 6, py0 + 8, PS, cube);
  fillPixel(ctx, px0 + 5, py0 + 8, PS, PIXEL.hot);
  fillPixel(ctx, px0 + 5, py0 + 9, PS, mixDim(cube, blink));

  // Browser (right) with wireflow
  const bx0 = 18;
  const by0 = 5;
  drawRectOutline(ctx, PS, bx0, by0, bx0 + 28, by0 + 22, edge);
  fillRect(ctx, PS, bx0 + 1, by0 + 1, bx0 + 27, by0 + 3, PIXEL.dim);
  for (let i = 0; i < 3; i++) {
    fillPixel(ctx, bx0 + 2 + i * 2, by0 + 2, PS, i === 0 ? PIXEL.mid : PIXEL.off);
  }
  const flow = mixColor(hover, PIXEL.mid, PIXEL.bright);
  const nodes = [
    [bx0 + 4, by0 + 8],
    [bx0 + 12, by0 + 7],
    [bx0 + 20, by0 + 10],
    [bx0 + 10, by0 + 14],
    [bx0 + 22, by0 + 17],
  ];
  const step = reducedMotion ? 0 : Math.floor(t / 18) % nodes.length;
  nodes.forEach(([nx, ny], i) => {
    drawLine(ctx, PS, nx, ny, nodes[(i + 1) % nodes.length][0], nodes[(i + 1) % nodes.length][1], PIXEL.dim);
  });
  nodes.forEach(([nx, ny], i) => {
    const on = i <= step;
    fillPixel(ctx, nx, ny, PS, on ? flow : PIXEL.dim);
    if (on && i === step) fillPixel(ctx, nx, ny, PS, accent);
  });
  drawLine(ctx, PS, bx0 + 4, by0 + 19, bx0 + 24, by0 + 19, PIXEL.dim);
};

export const drawEngineering: PixelDrawFn = ({ ctx, w, h, t, hover, reducedMotion }) => {
  const { edge, hi, accent } = frameColors(hover);
  const ideX = 3;
  const ideY = 4;
  drawRectOutline(ctx, PS, ideX, ideY, ideX + 32, ideY + 26, edge);
  fillRect(ctx, PS, ideX + 1, ideY + 1, ideX + 31, ideY + 4, PIXEL.dim);
  fillPixel(ctx, ideX + 3, ideY + 2, PS, "#ef4444");
  fillPixel(ctx, ideX + 5, ideY + 2, PS, "#eab308");
  fillPixel(ctx, ideX + 7, ideY + 2, PS, "#22c55e");

  const lineColors = [PIXEL.dim, PIXEL.mid, accent, PIXEL.mid, PIXEL.dim];
  for (let row = 0; row < 5; row++) {
    fillPixel(ctx, ideX + 2, ideY + 7 + row * 2, PS, PIXEL.dim);
    const len = 8 + (row % 3) * 4;
    for (let c = 0; c < len; c++) {
      const flicker = reducedMotion ? 1 : 0.85 + 0.15 * Math.sin(t * 0.05 + row + c * 0.3);
      fillPixel(ctx, ideX + 5 + c, ideY + 7 + row * 2, PS, flicker > 0.9 ? hi : lineColors[row]);
    }
  }

  const angle = reducedMotion ? 0 : t * 0.06;
  const cx = 42;
  const cy = 18;
  drawCog(ctx, PS, cx, cy, 5, 8, angle, mixColor(hover, PIXEL.mid, PIXEL.bright));
  drawCog(ctx, PS, cx, cy, 2.5, 6, -angle * 0.5, PIXEL.off);
  fillPixel(ctx, cx, cy, PS, accent);
};

export const drawBrandLaunch: PixelDrawFn = ({ ctx, w, h, t, hover, pointer }) => {
  const { edge, hi, accent } = frameColors(hover);
  const x0 = 8;
  const y0 = 5;
  const x1 = 44;
  const y1 = 30;
  drawRectOutline(ctx, PS, x0, y0, x1, y1, edge);

  const corners = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  corners.forEach(([cx, cy], i) => {
    fillRect(ctx, PS, cx - (cx === x0 ? 0 : 1), cy - (cy === y0 ? 0 : 1), cx + (cx === x1 ? 0 : 1), cy + (cy === y1 ? 0 : 1), accent);
    fillPixel(ctx, cx, cy, PS, PIXEL.hot);
  });
  drawLine(ctx, PS, x0, y0, x1, y0, PIXEL.dim);
  drawLine(ctx, PS, x1, y0, x1, y1, PIXEL.dim);
  drawLine(ctx, PS, x1, y1, x0, y1, PIXEL.dim);
  drawLine(ctx, PS, x0, y1, x0, y0, PIXEL.dim);

  const ecx = lerp(26, 26 + (pointer.x - 0.5) * 6, hover);
  const ecy = lerp(17, 17 + (pointer.y - 0.5) * 4, hover);
  const ex = Math.round(ecx);
  const ey = Math.round(ecy);

  for (let dy = -4; dy <= 4; dy++) {
    for (let dx = -6; dx <= 6; dx++) {
      const d = (dx * dx) / 36 + (dy * dy) / 16;
      if (d <= 1 && d > 0.55) fillPixel(ctx, ex + dx, ey + dy, PS, hi);
      if (d <= 0.55 && d > 0.2) fillPixel(ctx, ex + dx, ey + dy, PS, PIXEL.mid);
    }
  }
  fillRect(ctx, PS, ex - 1, ey - 1, ex + 1, ey + 1, PIXEL.off);
  fillPixel(ctx, ex, ey, PS, accent);
};

export const drawAiAutomation: PixelDrawFn = ({ ctx, w, h, t, hover, reducedMotion }) => {
  const { edge, hi, accent } = frameColors(hover);
  const pulse = reducedMotion ? 1 : 0.55 + 0.45 * Math.sin(t * 0.07);
  const glow = pulse * (0.5 + hover * 0.5) > 0.55 ? PIXEL.accent : PIXEL.accentDim;

  const cx0 = 14;
  const cy0 = 8;
  const cx1 = 38;
  const cy1 = 28;
  drawRectOutline(ctx, PS, cx0, cy0, cx1, cy1, mixColor(hover, edge, hi));
  fillRect(ctx, PS, cx0 + 1, cy0 + 1, cx1 - 1, cy1 - 1, PIXEL.off);

  const pins = [
    [cx0 - 1, cy0 + 4],
    [cx0 - 1, cy0 + 10],
    [cx0 - 1, cy0 + 16],
    [cx1 + 1, cy0 + 6],
    [cx1 + 1, cy0 + 12],
    [cx1 + 1, cy0 + 20],
    [cx0 + 6, cy1 + 1],
    [cx0 + 18, cy1 + 1],
    [cx0 + 30, cy1 + 1],
  ];
  pins.forEach(([px, py], i) => {
    const on = reducedMotion ? true : Math.sin(t * 0.06 + i * 0.9) > -0.2;
    fillPixel(ctx, px, py, PS, on ? glow : PIXEL.dim);
  });

  const circuit = (x0: number, y0: number, x1: number, y1: number, phase: number) => {
    const lit = reducedMotion ? 1 : 0.5 + 0.5 * Math.sin(t * 0.08 + phase);
    const c = lit > 0.65 ? glow : PIXEL.dim;
    drawLine(ctx, PS, x0, y0, x1, y1, c);
  };
  circuit(cx0 + 2, cy0 + 4, cx0 + 10, cy0 + 4, 0);
  circuit(cx0 + 10, cy0 + 4, cx0 + 10, cy0 + 12, 1);
  circuit(cx1 - 2, cy0 + 6, cx1 - 10, cy0 + 6, 2);
  circuit(cx1 - 10, cy0 + 6, cx1 - 10, cy1 - 4, 3);
  circuit(cx0 + 8, cy1 - 2, cx1 - 8, cy1 - 2, 4);

  const drawLetter = (ox: number, oy: number, rows: string[], color: string) => {
    rows.forEach((row, ry) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === "#") fillPixel(ctx, ox + i, oy + ry, PS, color);
      }
    });
  };
  const letterColor = pulse > 0.65 ? PIXEL.hot : hi;
  drawLetter(24, 14, [" # ", "# #", "###", "# #", "# #"], letterColor);
  drawLetter(29, 14, ["###", " # ", " # ", " # ", "###"], letterColor);
  fillPixel(ctx, 26, 16, PS, accent);
  fillPixel(ctx, 30, 16, PS, accent);
};

function mixDim(color: string, blink: number) {
  return blink > 0.75 ? color : PIXEL.mid;
}
