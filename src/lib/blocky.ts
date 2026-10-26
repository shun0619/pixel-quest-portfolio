/**
 * Original blocky (isometric, voxel-style) developer avatar.
 * Built from boxes projected to 2D; faces are listed back to front so later polygons cover earlier ones.
 */
type Shade = [top: string, front: string, side: string];

export interface BlockyPalette {
  hoodie: Shade;
  pocket: string;
  hair: Shade;
  accent: Shade;
  cupInner: string;
  skin: Shade;
  pants: Shade;
  shoes: Shade;
  laptop: Shade;
  logo: string;
}

export interface BlockyShape {
  polys: { points: string; fill: string }[];
  width: number;
  height: number;
}

const COS30 = 0.866;
const UNIT = 10;
const INK = "#141826";

export const BLOCKY_OUTLINE = INK;

export const BLOCKY_PALETTES = {
  /** The developer. */
  developer: {
    hoodie: ["#5677b0", "#3d5a8a", "#2a3f66"],
    pocket: "#34507d",
    hair: ["#3a3f5c", "#2b2f45", "#1b1e2e"],
    accent: ["#ff9a63", "#e8613c", "#b9461f"],
    cupInner: "#7a2c12",
    skin: ["#f6d3ad", "#f2c9a0", "#d9a47c"],
    pants: ["#4a5275", "#39415e", "#262c40"],
    shoes: ["#ffffff", "#e3e8f2", "#b8c2d6"],
    laptop: ["#c9d1e0", "#9aa5bd", "#6f7a93"],
    logo: "#e8613c",
  },
  /** Unlocked by poking the developer five times. */
  rare: {
    hoodie: ["#4a4a5e", "#2e2e3c", "#1c1c26"],
    pocket: "#262632",
    hair: ["#3a3f5c", "#2b2f45", "#1b1e2e"],
    accent: ["#ffe08a", "#e9b949", "#b88a1f"],
    cupInner: "#6b4e0f",
    skin: ["#f6d3ad", "#f2c9a0", "#d9a47c"],
    pants: ["#2e2e3c", "#1c1c26", "#121218"],
    shoes: ["#ffe08a", "#e9b949", "#b88a1f"],
    laptop: ["#55556c", "#3c3c4e", "#2a2a38"],
    logo: "#e9b949",
  },
  /** The visitor. */
  visitor: {
    hoodie: ["#5fb08a", "#3f8f6b", "#2c6a4f"],
    pocket: "#367d5d",
    hair: ["#8c6844", "#6b4a2e", "#4a321e"],
    accent: ["#ffe08a", "#e9b949", "#b88a1f"],
    cupInner: "#6b4e0f",
    skin: ["#f9ddc0", "#f5d2b0", "#e0ab84"],
    pants: ["#46536a", "#2f3a4a", "#202833"],
    shoes: ["#ffffff", "#e3e8f2", "#b8c2d6"],
    laptop: ["#c9d1e0", "#9aa5bd", "#6f7a93"],
    logo: "#3f8f6b",
  },
} satisfies Record<string, BlockyPalette>;

export function buildBlocky(p: BlockyPalette): BlockyShape {
  const raw: { pts: [number, number][]; fill: string }[] = [];
  const P = (x: number, y: number, z: number): [number, number] => [(x - y) * COS30 * UNIT, (x + y) * 0.5 * UNIT - z * UNIT];
  const poly = (pts: [number, number, number][], fill: string) => raw.push({ pts: pts.map((q) => P(...q)), fill });
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, [top, front, side]: Shade) => {
    poly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], top);
    poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], front);
    poly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], side);
  };
  const onFront = (y: number, x0: number, x1: number, z0: number, z1: number, fill: string) =>
    poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], fill);
  const onSide = (x: number, y0: number, y1: number, z0: number, z1: number, fill: string) =>
    poly([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]], fill);
  const onTop = (z: number, x0: number, x1: number, y0: number, y1: number, fill: string) =>
    poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], fill);

  // Back arm
  box(-1.6, 0, 1, 2.6, 8, 12, p.hoodie);
  box(-1.6, 0, 2.6, 4.6, 8, 9.6, p.hoodie);
  box(-1.6, 0, 4.6, 5.4, 8, 9.6, p.skin);
  // Legs and shoes
  box(0.6, 2.8, 0.5, 2.5, 1.2, 6, p.pants);
  box(0.6, 2.8, 0.5, 2.7, 0, 1.2, p.shoes);
  box(3.2, 5.4, 0.5, 2.5, 1.2, 6, p.pants);
  box(3.2, 5.4, 0.5, 2.7, 0, 1.2, p.shoes);
  // Hoodie with pocket and strings
  box(0, 6, 0, 3.2, 6, 12, p.hoodie);
  onFront(3.2, 1.2, 4.8, 6.6, 8.4, p.pocket);
  onFront(3.2, 2.3, 2.6, 9.4, 11.6, "#ffffff");
  onFront(3.2, 3.4, 3.7, 9.4, 11.6, "#ffffff");
  // Open laptop (we see the back of the lid)
  box(-0.6, 6.6, 3.6, 6.2, 9.6, 10.1, p.laptop);
  box(-0.6, 6.6, 3.6, 4.0, 10.1, 13.4, p.laptop);
  onFront(4.0, 2.4, 3.6, 11.2, 12.4, p.logo);
  // Front arm
  box(6, 7.6, 1, 2.6, 8, 12, p.hoodie);
  box(6, 7.6, 2.6, 4.6, 8, 9.6, p.hoodie);
  box(6, 7.6, 4.6, 5.4, 8, 9.6, p.skin);
  // Neck and head
  box(1.8, 4.2, 0.8, 2.8, 12, 12.6, p.skin);
  box(-1, 7, -1.4, 5.2, 12.6, 20, p.skin);
  // Hair
  onTop(20, -1, 7, -1.4, 5.2, p.hair[0]);
  onSide(7, -1.4, 5.2, 16.4, 20, p.hair[2]);
  onSide(7, -1.4, 1.6, 12.6, 16.4, p.hair[2]);
  onFront(5.2, -1, 7, 18.2, 20, p.hair[1]);
  onFront(5.2, -1, 1.2, 16.6, 18.2, p.hair[1]);
  onFront(5.2, 4.2, 7, 17.2, 18.2, p.hair[1]);
  box(0, 1.6, 0, 1.6, 20, 21.2, p.hair);
  box(3, 4.6, 1.5, 3.1, 20, 21.6, p.hair);
  box(5.2, 6.6, -0.6, 1, 20, 20.9, p.hair);
  // Face
  onFront(5.2, 0.6, 2.6, 16.2, 16.6, INK);
  onFront(5.2, 3.8, 5.8, 16.2, 16.6, INK);
  onFront(5.2, 1.2, 2.4, 14.6, 15.8, INK);
  onFront(5.2, 4.0, 5.2, 14.6, 15.8, INK);
  onFront(5.2, 1.2, 1.6, 15.4, 15.8, "#ffffff");
  onFront(5.2, 4.0, 4.4, 15.4, 15.8, "#ffffff");
  onFront(5.2, 3.0, 4.6, 13.4, 13.8, "#a8644a");
  onFront(5.2, 4.6, 5.0, 13.8, 14.2, "#a8644a");
  // Headphones
  onTop(20.02, 2.6, 3.6, -1.4, 5.2, p.accent[0]);
  onSide(7, -1.4, -0.4, 16.6, 20, p.accent[2]);
  box(7, 7.8, 0, 3.6, 13.6, 17.4, p.accent);
  onSide(7.8, 0.6, 3.0, 14.2, 16.8, p.cupInner);

  const xs = raw.flatMap((r) => r.pts.map((q) => q[0]));
  const ys = raw.flatMap((r) => r.pts.map((q) => q[1]));
  const pad = 2;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) + pad - minX;
  const height = Math.max(...ys) + pad - minY;
  const polys = raw.map((r) => ({
    fill: r.fill,
    points: r.pts.map(([x, y]) => `${(x - minX).toFixed(1)},${(y - minY).toFixed(1)}`).join(" "),
  }));
  return { polys, width, height };
}
