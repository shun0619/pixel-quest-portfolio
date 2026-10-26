/** Original 24x24 pixel creature. Each letter maps to a palette colour; "." is transparent. */
export const SPRITE_SIZE = 24;

export const SPRITE_ROWS = [
  "........................",
  "........................",
  "........................",
  "..............K..K......",
  ".............KAK.KAK....",
  ".............KAAKKAAK...",
  "............KBBBBBBBBK..",
  "............KBLLBBKKBBK.",
  "...........KBBLBBBEEBBBK",
  "KK.........KBBBBBBBBBBKK",
  "KAKK........KBBBBBWWWWWK",
  ".KAAKKKKKKKKKSBBBWWK....",
  "..KAAAAAAAAAAAAAAAK.....",
  "...KKAAAAAAAAAAAAAAK....",
  ".......KSBBBBBBBBWWWK...",
  "..KK...KSSBBAABBBBWWWK..",
  ".KLBK.KSSBBBBAABBBBWWK..",
  ".KBBSKKSSSBBAABBBBBWWK..",
  "..KBSSSSSSSBBBBBBBBBBK..",
  "...KKKKSSKSSBBBBBKSBBK..",
  "......KSSK.......KSBK...",
  "......KSSK.......KSBK...",
  ".....KHHHK......KHHHK...",
  ".....KKKKK......KKKKK...",
];

export type Palette = Record<"K" | "B" | "S" | "L" | "W" | "E" | "A" | "H", string>;

export const PALETTES = {
  /** The developer. */
  front: { K: "#141826", B: "#3d5a8a", S: "#2a3f66", L: "#7399d0", W: "#e8eef7", E: "#ffd23f", A: "#e8613c", H: "#cfd8e6" },
  /** Unlocked by poking the developer five times. */
  rare: { K: "#141826", B: "#2e2e3c", S: "#1c1c26", L: "#55556c", W: "#dcdce6", E: "#ff4d4d", A: "#e9b949", H: "#e9b949" },
  /** The visitor. */
  visitor: { K: "#141826", B: "#3f8f6b", S: "#2c6a4f", L: "#72c79f", W: "#eef7f1", E: "#ffffff", A: "#e9b949", H: "#cfd8e6" },
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
