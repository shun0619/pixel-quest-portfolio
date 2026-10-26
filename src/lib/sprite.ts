/** Original 24x24 pixel developer avatar. Each letter maps to a palette colour; "." is transparent. */
export const SPRITE_SIZE = 24;

export const SPRITE_ROWS = [
  "........KRKKRKKK........",
  "......KKRRRRRRRRKK......",
  ".....KRRJJRRRRRRRRK.....",
  "....KRJJRRRRRRRRRRRK....",
  "...KRRRRRRRRRRRRRRRRK...",
  "...KRRRRRRFRRRRFFFRRK...",
  "...KRRFFRFFFFFFFFFRRK...",
  "...KRFFKKKFFFFKKKFFRK...",
  "...KRFFFEEFFFFEEFFFRK...",
  "...KRGFFFFFFFFFFFFGRK...",
  "...KRGFFFFFFKKFFFFGRK...",
  "....KGGFFFFFFFFFFGGK....",
  "......KKGGGGGGGGKK......",
  "....KAAAKFFFFFFKAAAK....",
  "...KBBBBSKSSSSKSBBBBK...",
  "..KBBBBBBBKWWKBBBBBBBK..",
  "..KBLBBBBBBBBBBBBBBLBK..",
  "..KBLBKHHHHHHHHHHKBLBK..",
  "..KFFBKHWWWWWWWWHKBFFK..",
  "..KFFKKHHHHHHHHHHKKFFK..",
  "...KKSSSSSSSSSSSSSSKK...",
  "......KDDDK..KDDDK......",
  ".....KHHHHK..KHHHHK.....",
  ".....KKKKKK..KKKKKK.....",
];

/**
 * K outline · R/J hair and hair highlight · F/G skin and shadow · E eyes
 * B/S/L hoodie, shadow, highlight · A headphones · W laptop screen · H laptop and shoes · D trousers
 */
export type Palette = Record<"K" | "R" | "J" | "F" | "G" | "E" | "W" | "B" | "S" | "L" | "A" | "H" | "D", string>;

export const PALETTES = {
  /** The developer. */
  front: {
    K: "#141826", R: "#2b2f45", J: "#4a5275", F: "#f2c9a0", G: "#d9a47c", E: "#141826", W: "#e8f4ff",
    B: "#3d5a8a", S: "#2a3f66", L: "#7399d0", A: "#e8613c", H: "#cfd8e6", D: "#39415e",
  },
  /** Unlocked by poking the developer five times. */
  rare: {
    K: "#141826", R: "#2b2f45", J: "#4a5275", F: "#f2c9a0", G: "#d9a47c", E: "#141826", W: "#ffe9a6",
    B: "#2e2e3c", S: "#1c1c26", L: "#55556c", A: "#e9b949", H: "#e9b949", D: "#1c1c26",
  },
  /** The visitor. */
  visitor: {
    K: "#141826", R: "#6b4a2e", J: "#8c6844", F: "#f5d2b0", G: "#e0ab84", E: "#141826", W: "#eef7f1",
    B: "#3f8f6b", S: "#2c6a4f", L: "#72c79f", A: "#e9b949", H: "#cfd8e6", D: "#2f3a4a",
  },
} satisfies Record<string, Palette>;

export function drawSprite(canvas: HTMLCanvasElement, palette: Palette, flip = false): void {
  canvas.width = SPRITE_SIZE;
  canvas.height = SPRITE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  SPRITE_ROWS.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const color = palette[ch as keyof Palette];
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(flip ? SPRITE_SIZE - 1 - x : x, y, 1, 1);
    });
  });
}
