import type { PixelPainter } from "./PixelOutlineIcon";
import { PIXEL } from "./PixelOutlineIcon";

const INK = "#0a0a0a";
const MID = "#737373";
const SOFT = "#c4c4c4";

function dot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string = INK,
) {
  const px = Math.round(x);
  const py = Math.round(y);
  if (px < 0 || py < 0 || px > 80 || py > 48) return;
  ctx.fillStyle = color;
  ctx.fillRect(px * PIXEL, py * PIXEL, PIXEL, PIXEL);
}

function stamp(
  ctx: CanvasRenderingContext2D,
  rows: string[],
  ox: number,
  oy: number,
  colors: Record<string, string> = { "#": INK, "+": MID, ".": SOFT },
) {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = colors[row[x]];
      if (color) dot(ctx, ox + x, oy + y, color);
    }
  });
}

function outlineRect(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string = INK,
) {
  for (let x = x0; x <= x1; x++) {
    dot(ctx, x, y0, color);
    dot(ctx, x, y1, color);
  }
  for (let y = y0; y <= y1; y++) {
    dot(ctx, x0, y, color);
    dot(ctx, x1, y, color);
  }
}

function line(
  ctx: CanvasRenderingContext2D,
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
    dot(ctx, x, y, color);
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

/** Circular gear with chunky rectangular teeth, a rim, and a hub. */
function drawGear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number,
) {
  const teeth = 8;
  const rim = 6.4;
  const toothLen = 2.6;
  const toothHalf = 1.15;

  for (let y = -11; y <= 11; y++) {
    for (let x = -11; x <= 11; x++) {
      const dist = Math.hypot(x, y);
      const onRim = dist <= rim + 0.45 && dist >= rim - 1.15;
      const onHub = dist <= 2.35 && dist >= 1.35;
      if (onRim || onHub) dot(ctx, cx + x, cy + y, INK);
    }
  }

  for (let i = 0; i < teeth; i++) {
    const a = angle + (i / teeth) * Math.PI * 2;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    const px = -uy;
    const py = ux;
    for (let t = -0.2; t <= toothLen; t += 0.45) {
      for (let w = -toothHalf; w <= toothHalf; w += 0.45) {
        const r = rim - 0.2 + t;
        dot(ctx, cx + ux * r + px * w, cy + uy * r + py * w, INK);
      }
    }
  }
}

function drawAppScroll(
  ctx: CanvasRenderingContext2D,
  t: number,
  reducedMotion: boolean,
  top: number,
  bottom: number,
) {
  const left = 5;
  const pitch = 6;
  const offset = reducedMotion ? 0 : Math.floor(t / 3) % pitch;

  for (let i = -1; i < 6; i++) {
    const y = top + i * pitch - offset;
    const titleEnd = left + (i % 2 === 0 ? 6 : 4);
    for (let x = left; x <= titleEnd; x++) {
      if (y >= top && y <= bottom) dot(ctx, x, y, INK);
    }
    for (const [dy, len] of [
      [2, 7],
      [3, 5],
    ] as const) {
      const yy = y + dy;
      if (yy < top || yy > bottom) continue;
      for (let x = left; x < left + len; x++) dot(ctx, x, yy, INK);
    }
  }

  const thumb = 5;
  const travel = Math.max(1, bottom - top - thumb + 1);
  const thumbY = top + (reducedMotion ? 1 : Math.floor(t / 3) % travel);
  for (let y = thumbY; y < thumbY + thumb && y <= bottom; y++) dot(ctx, 15, y, INK);
}

export const drawProductUx: PixelPainter = ({ ctx, t, reducedMotion }) => {
  const by = 10;
  const phoneBottom = by + 26;
  outlineRect(ctx, 2, by, 17, phoneBottom);
  line(ctx, 7, by + 2, 12, by + 2, INK);
  drawAppScroll(ctx, t, reducedMotion, by + 5, phoneBottom - 2);

  const bx = 22;
  outlineRect(ctx, bx, by, bx + 50, by + 26);
  outlineRect(ctx, bx, by, bx + 50, by + 4);
  for (let i = 0; i < 3; i++) dot(ctx, bx + 2 + i * 2, by + 2, i === 0 ? INK : SOFT);
  line(ctx, bx + 14, by + 2, bx + 28, by + 2, SOFT);

  const cards: [number, number, number, number][] = [
    [bx + 3, by + 7, bx + 14, by + 14],
    [bx + 18, by + 7, bx + 32, by + 13],
    [bx + 36, by + 8, bx + 47, by + 16],
    [bx + 12, by + 17, bx + 28, by + 24],
  ];
  const step = reducedMotion ? cards.length - 1 : Math.floor(t / 16) % cards.length;
  cards.forEach(([x0, y0, x1, y1], i) => {
    const on = i <= step;
    outlineRect(ctx, x0, y0, x1, y1, on ? INK : SOFT);
    line(ctx, x0 + 2, y0 + 2, x1 - 2, y0 + 2, on ? MID : SOFT);
    if (i < cards.length - 1) {
      const next = cards[i + 1];
      line(
        ctx,
        x1,
        Math.round((y0 + y1) / 2),
        next[0],
        Math.round((next[1] + next[3]) / 2),
        i < step ? INK : SOFT,
      );
    }
  });
};

export const drawEngineering: PixelPainter = ({ ctx, t, reducedMotion }) => {
  const x = 1;
  const y = 8;
  const ideRight = 53;
  outlineRect(ctx, x, y, ideRight, y + 30);
  outlineRect(ctx, x, y, ideRight, y + 4);
  dot(ctx, x + 2, y + 2, INK);
  dot(ctx, x + 4, y + 2, MID);
  dot(ctx, x + 6, y + 2, SOFT);
  line(ctx, x + 8, y + 5, x + 8, y + 29, SOFT);

  const rows = [
    { indent: 0, marks: [10, 4, 8] },
    { indent: 2, marks: [6, 14] },
    { indent: 2, marks: [8, 5, 6] },
    { indent: 4, marks: [16] },
    { indent: 4, marks: [7, 9] },
    { indent: 2, marks: [4, 6] },
    { indent: 0, marks: [6, 8] },
  ];
  const typed = reducedMotion ? 99 : Math.floor(t / 5) % 52;
  let used = 0;
  rows.forEach((row, ri) => {
    let col = x + 11 + row.indent;
    row.marks.forEach((len, mi) => {
      for (let c = 0; c < len; c++) {
        if (used < typed) {
          dot(ctx, col, y + 7 + ri * 3, mi % 2 === 0 ? INK : MID);
        }
        col += 1;
        used += 1;
      }
      col += 1;
    });
    dot(ctx, x + 3, y + 7 + ri * 3, SOFT);
  });
  if (!reducedMotion && Math.floor(t / 12) % 2 === 0) {
    const row = Math.min(6, Math.floor(typed / 5));
    dot(ctx, x + 12 + (typed % 12), y + 7 + row * 3, INK);
  }

  const angle = reducedMotion ? 0.2 : t * 0.05;
  drawGear(ctx, 64, 23, angle);
};

export const drawBrandLaunch: PixelPainter = ({ ctx, t, reducedMotion }) => {
  const x0 = 6;
  const y0 = 4;
  const x1 = 70;
  const y1 = 40;
  outlineRect(ctx, x0, y0, x1, y1);

  const corners: [number, number][] = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
  const pulse = reducedMotion ? 0 : Math.floor(t / 18) % 4;
  corners.forEach(([x, y], i) => {
    const dx = x === x0 ? 1 : -1;
    const dy = y === y0 ? 1 : -1;
    for (let py = 0; py < 4; py++) {
      for (let px = 0; px < 4; px++) {
        const edge = px === 0 || py === 0 || px === 3 || py === 3;
        dot(ctx, x + dx * px, y + dy * py, edge || i === pulse ? INK : MID);
      }
    }
  });

  const swatches: [number, number][] = [
    [12, 10],
    [22, 10],
    [12, 20],
    [22, 20],
  ];
  swatches.forEach(([sx, sy], i) => {
    outlineRect(ctx, sx, sy, sx + 7, sy + 7, INK);
    const on = i === pulse;
    if (on) {
      for (let py = 2; py <= 5; py++) {
        for (let px = 2; px <= 5; px++) dot(ctx, sx + px, sy + py, INK);
      }
    }
  });

  const styleA = [
    "...#...",
    "..#.#..",
    ".#...#.",
    "#.....#",
    "#######",
    "#.....#",
    "#.....#",
  ];
  const styleB = [
    "######.",
    "#.....#",
    "#.....#",
    "######.",
    "#.....#",
    "#.....#",
    "######.",
  ];
  const glyphs = [
    { rows: styleA, y: 10 },
    { rows: styleB, y: 19 },
  ];
  const glyphRows = glyphs.reduce((n, g) => n + g.rows.length, 0);
  let revealed = reducedMotion ? glyphRows : Math.floor(t / 5) % (glyphRows + 6);
  glyphs.forEach((glyph) => {
    glyph.rows.forEach((row, i) => {
      if (i >= revealed) return;
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "#") dot(ctx, 36 + x, glyph.y + i, INK);
      }
    });
    revealed -= glyph.rows.length;
  });

  line(ctx, 46, 12, 62, 12, INK);
  line(ctx, 46, 16, 58, 16, INK);
  line(ctx, 46, 21, 62, 21, MID);
  line(ctx, 46, 24, 56, 24, MID);

  outlineRect(ctx, 12, 31, 28, 36, INK);
  line(ctx, 16, 33, 24, 33, pulse === 0 ? INK : MID);
  outlineRect(ctx, 32, 31, 64, 36, INK);
  line(ctx, 35, 33, 48, 33, MID);
};

const LETTER_A = [
  "..###..",
  ".#...#.",
  "#.....#",
  "#.....#",
  "#######",
  "#.....#",
  "#.....#",
];
const LETTER_I = ["#######", "...#...", "...#...", "...#...", "...#...", "...#...", "#######"];

export const drawAiAutomation: PixelPainter = ({ ctx, t, reducedMotion }) => {
  const x0 = 14;
  const y0 = 8;
  const x1 = 62;
  const y1 = 36;
  outlineRect(ctx, x0, y0, x1, y1, INK);

  const sidePins = [4, 9, 14, 19, 24];
  sidePins.forEach((offset, i) => {
    const on = reducedMotion || (Math.floor(t / 7) + i) % 4 !== 0;
    const color = on ? INK : SOFT;
    const y = y0 + offset;
    line(ctx, x0 - 4, y, x0, y, color);
    line(ctx, x1, y, x1 + 4, y, color);
  });
  [8, 18, 28, 38].forEach((offset, i) => {
    const on = reducedMotion || (Math.floor(t / 7) + i) % 3 !== 1;
    const color = on ? INK : SOFT;
    line(ctx, x0 + offset, y0 - 4, x0 + offset, y0, color);
    line(ctx, x0 + offset, y1, x0 + offset, y1 + 4, color);
  });

  const glyphs = [LETTER_A, LETTER_I];
  const glyphRows = glyphs.reduce((n, rows) => n + rows.length, 0);
  let revealed = reducedMotion ? glyphRows : Math.floor(t / 4) % (glyphRows + 8);
  const originX = Math.round((x0 + x1) / 2) - 8;
  const originY = Math.round((y0 + y1) / 2) - 3;
  glyphs.forEach((rows, index) => {
    rows.forEach((row, i) => {
      if (i >= revealed) return;
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "#") dot(ctx, originX + index * 9 + x, originY + i, INK);
      }
    });
    revealed -= rows.length;
  });
};
