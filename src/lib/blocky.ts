/**
 * Original blocky (isometric, voxel-style) developer avatar.
 * The model is a list of boxes in 3D. A view ("front" or "back") projects them to 2D and
 * paints them back to front, so the same model gives a front view and a back view.
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

export type BlockyView = "front" | "back";

type Poly = { points: string; fill: string };

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface BlockyShape {
  /** Optional grass tile under the character. */
  ground: Poly[];
  /** Optional round platform, projected like the character so they share one camera. */
  platform?: Ellipse & { depth: number };
  /** Soft shadow under the feet. */
  shadow: Ellipse;
  /** The character itself. */
  body: Poly[];
  width: number;
  height: number;
}

export interface BlockyOptions {
  view?: BlockyView;
  /** Square grass tile under the character. */
  tile?: boolean;
  /** Radius (in model units) of a round platform centred on the feet. */
  platform?: number;
}

/** A circle of radius r on the ground projects to an ellipse with these semi-axes. */
const ISO_RX = 1.2247;
const ISO_RY = 0.7071;
const PLATFORM_DEPTH = 1.1;

type Box = [x0: number, x1: number, y0: number, y1: number, z0: number, z1: number];
/** Rectangle on a vertical face: [from, to, z0, z1, colour]. */
type FaceDecal = [number, number, number, number, string];
/** Rectangle on the top face: [x0, x1, y0, y1, colour]. */
type TopDecal = [number, number, number, number, string];

interface Part {
  box: Box;
  mat: Shade;
  top?: string;
  /** Colour of the back (-y) face, if different from the material. */
  back?: string;
  front?: FaceDecal[];
  side?: FaceDecal[];
  backDecals?: FaceDecal[];
  left?: FaceDecal[];
  topDecals?: TopDecal[];
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

function model(p: BlockyPalette): Part[] {
  const h = p.hair;
  const hairSide: FaceDecal[] = [
    [-1.4, 5.2, 16.4, 20, h[2]],
    [-1.4, 1.6, 12.6, 16.4, h[2]],
  ];
  return [
    // Legs and shoes
    { box: [0.6, 2.8, 0.5, 2.5, 1.2, 6], mat: p.pants },
    { box: [0.6, 2.8, 0.5, 2.7, 0, 1.2], mat: p.shoes },
    { box: [3.2, 5.4, 0.5, 2.5, 1.2, 6], mat: p.pants },
    { box: [3.2, 5.4, 0.5, 2.7, 0, 1.2], mat: p.shoes },
    // Left arm
    { box: [-1.6, 0, 1, 2.6, 8, 12], mat: p.hoodie },
    { box: [-1.6, 0, 2.6, 4.6, 8, 9.6], mat: p.hoodie },
    { box: [-1.6, 0, 4.6, 5.4, 8, 9.6], mat: p.skin },
    // Hoodie, pocket, strings, and the hood on the back
    {
      box: [0, 6, 0, 3.2, 6, 12],
      mat: p.hoodie,
      front: [
        [1.2, 4.8, 6.6, 8.4, p.pocket],
        [2.3, 2.6, 9.4, 11.6, "#ffffff"],
        [3.4, 3.7, 9.4, 11.6, "#ffffff"],
      ],
    },
    { box: [0.6, 5.4, -0.9, 0, 10.2, 12.6], mat: p.hoodie },
    // Open laptop (front view shows the back of the lid)
    { box: [-0.6, 6.6, 3.6, 6.2, 9.6, 10.1], mat: p.laptop },
    { box: [-0.6, 6.6, 3.6, 4.0, 10.1, 13.4], mat: p.laptop, front: [[2.4, 3.6, 11.2, 12.4, p.logo]] },
    // Right arm
    { box: [6, 7.6, 1, 2.6, 8, 12], mat: p.hoodie },
    { box: [6, 7.6, 2.6, 4.6, 8, 9.6], mat: p.hoodie },
    { box: [6, 7.6, 4.6, 5.4, 8, 9.6], mat: p.skin },
    // Neck and head
    { box: [1.8, 4.2, 0.8, 2.8, 12, 12.6], mat: p.skin },
    {
      box: [-1, 7, -1.4, 5.2, 12.6, 20],
      mat: p.skin,
      top: h[0],
      back: h[1],
      front: [
        [-1, 7, 18.2, 20, h[1]],
        [-1, 1.2, 16.6, 18.2, h[1]],
        [4.2, 7, 17.2, 18.2, h[1]],
        [0.6, 2.6, 16.2, 16.6, INK],
        [3.8, 5.8, 16.2, 16.6, INK],
        [1.2, 2.4, 14.6, 15.8, INK],
        [4.0, 5.2, 14.6, 15.8, INK],
        [1.2, 1.6, 15.4, 15.8, "#ffffff"],
        [4.0, 4.4, 15.4, 15.8, "#ffffff"],
        [3.0, 4.6, 13.4, 13.8, "#a8644a"],
        [4.6, 5.0, 13.8, 14.2, "#a8644a"],
      ],
      side: hairSide,
      left: hairSide,
      topDecals: [[2.6, 3.6, -1.4, 5.2, p.accent[0]]],
    },
    // Spiky tufts
    { box: [0, 1.6, 0, 1.6, 20, 21.2], mat: h },
    { box: [3, 4.6, 1.5, 3.1, 20, 21.6], mat: h },
    { box: [5.2, 6.6, -0.6, 1, 20, 20.9], mat: h },
    // Headphone cups
    { box: [7, 7.8, 0, 3.6, 13.6, 17.4], mat: p.accent, side: [[0.6, 3.0, 14.2, 16.8, p.cupInner]] },
    { box: [-1.8, -1, 0, 3.6, 13.6, 17.4], mat: p.accent, left: [[0.6, 3.0, 14.2, 16.8, p.cupInner]] },
  ];
}

const GRASS: Shade = ["#a9d790", "#7fbf63", "#5f9d4b"];
const DIRT: Shade = ["#8a6a4a", "#8a6a4a", "#6e5238"];

export function buildBlocky(p: BlockyPalette, { view = "front", tile = false, platform }: BlockyOptions = {}): BlockyShape {
  type Raw = { pts: [number, number][]; fill: string };
  const back = view === "back";
  const P = (x: number, y: number, z: number): [number, number] => [(x - y) * COS30 * UNIT, (x + y) * 0.5 * UNIT - z * UNIT];
  let out: Raw[] = [];
  const quad = (pts: [number, number, number][], fill: string) => out.push({ pts: pts.map((q) => P(...q)), fill });
  const box = ([x0, x1, y0, y1, z0, z1]: Box, top: string, front: string, side: string) => {
    quad([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], top);
    quad([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], front);
    quad([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], side);
  };
  // Looking from behind is the same as rotating the model 180° around the vertical axis.
  const turn = ([x0, x1, y0, y1, z0, z1]: Box): Box => (back ? [-x1, -x0, -y1, -y0, z0, z1] : [x0, x1, y0, y1, z0, z1]);
  const flipRange = (a: number, b: number): [number, number] => (back ? [-b, -a] : [a, b]);

  if (tile) {
    box(turn([-2.6, 8.6, -4.0, 7.2, -1.8, -0.5]), ...DIRT);
    box(turn([-2.6, 8.6, -4.0, 7.2, -0.5, 0]), ...GRASS);
  }
  const ground = out;
  out = [];

  // Everything on the ground is centred on the middle of the footprint.
  const [footX, footY] = back ? P(-3, -1.6, 0) : P(3, 1.6, 0);

  // Painter's algorithm: the viewer looks along (1, 1, 1), so a larger x + y + z is closer.
  const parts = model(p)
    .map((part) => ({ part, b: turn(part.box) }))
    .sort((a, b) => a.b[0] + a.b[1] + a.b[2] + a.b[3] + a.b[4] + a.b[5] - (b.b[0] + b.b[1] + b.b[2] + b.b[3] + b.b[4] + b.b[5]));

  for (const { part, b } of parts) {
    const [, x1, , y1, , z1] = b;
    const front = back ? part.back ?? part.mat[1] : part.mat[1];
    box(b, part.top ?? part.mat[0], front, part.mat[2]);
    for (const [a0, a1, c0, c1, fill] of part.topDecals ?? []) {
      const [u0, u1] = flipRange(a0, a1);
      const [v0, v1] = flipRange(c0, c1);
      const z = z1 + 0.01;
      quad([[u0, v0, z], [u1, v0, z], [u1, v1, z], [u0, v1, z]], fill);
    }
    for (const [a0, a1, z0, zz, fill] of (back ? part.backDecals : part.front) ?? []) {
      const [u0, u1] = flipRange(a0, a1);
      quad([[u0, y1, z0], [u1, y1, z0], [u1, y1, zz], [u0, y1, zz]], fill);
    }
    for (const [a0, a1, z0, zz, fill] of (back ? part.left : part.side) ?? []) {
      const [v0, v1] = flipRange(a0, a1);
      quad([[x1, v0, z0], [x1, v1, z0], [x1, v1, zz], [x1, v0, zz]], fill);
    }
  }

  const all = [...ground, ...out];
  const xs = all.flatMap((r) => r.pts.map((q) => q[0]));
  const ys = all.flatMap((r) => r.pts.map((q) => q[1]));
  const disc = platform ? { rx: platform * ISO_RX * UNIT, ry: platform * ISO_RY * UNIT, depth: PLATFORM_DEPTH * UNIT } : null;
  if (disc) {
    xs.push(footX - disc.rx, footX + disc.rx);
    ys.push(footY - disc.ry, footY + disc.ry + disc.depth);
  }
  const pad = 2;
  // Centre the view box on the feet so the character stands in the middle of its platform.
  const half = Math.max(footX - Math.min(...xs), Math.max(...xs) - footX) + pad;
  const minX = footX - half;
  const minY = Math.min(...ys) - pad;
  const toPolys = (list: Raw[]): Poly[] =>
    list.map((r) => ({
      fill: r.fill,
      points: r.pts.map(([x, y]) => `${(x - minX).toFixed(1)},${(y - minY).toFixed(1)}`).join(" "),
    }));
  const cx = footX - minX;
  const cy = footY - minY;
  return {
    ground: toPolys(ground),
    platform: disc ? { cx, cy, ...disc } : undefined,
    shadow: { cx, cy, rx: 3.6 * ISO_RX * UNIT, ry: 3.6 * ISO_RY * UNIT },
    body: toPolys(out),
    width: half * 2,
    height: Math.max(...ys) + pad - minY,
  };
}
