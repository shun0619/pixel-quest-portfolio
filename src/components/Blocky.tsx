import { useMemo } from "react";
import { BLOCKY_OUTLINE, buildBlocky, type BlockyOptions, type BlockyPalette } from "../lib/blocky";

interface Props extends BlockyOptions {
  palette: BlockyPalette;
  /** Mirror horizontally. */
  flip?: boolean;
  className?: string;
}

/** Spots on the platform, as fractions of its radii. */
const SPOTS: [number, number, number][] = [
  [-0.52, -0.18, 0.09],
  [0.46, 0.22, 0.07],
  [0.1, 0.55, 0.06],
  [0.62, -0.32, 0.05],
  [-0.2, 0.38, 0.05],
];

export function Blocky({ palette, view = "front", tile = false, platform, flip = false, className }: Props) {
  const shape = useMemo(() => buildBlocky(palette, { view, tile, platform }), [palette, view, tile, platform]);
  const w = shape.width.toFixed(1);
  const h = shape.height.toFixed(1);
  const disc = shape.platform;
  const sh = shape.shadow;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <g transform={flip ? `translate(${w} 0) scale(-1 1)` : undefined} stroke={BLOCKY_OUTLINE} strokeWidth="1.2" strokeLinejoin="round">
        {disc && (
          <g className="blocky-platform">
            <path
              d={`M${disc.cx - disc.rx} ${disc.cy} v${disc.depth} a${disc.rx} ${disc.ry} 0 0 0 ${disc.rx * 2} 0 v${-disc.depth} z`}
              fill="#c4a874"
            />
            <ellipse cx={disc.cx} cy={disc.cy} rx={disc.rx} ry={disc.ry} fill="#ead9ae" />
            <ellipse cx={disc.cx} cy={disc.cy} rx={disc.rx - 5} ry={disc.ry - 3} fill="none" stroke="#f6ecd0" strokeWidth="2" />
            {SPOTS.map(([fx, fy, fr], i) => (
              <ellipse
                key={i}
                cx={disc.cx + fx * disc.rx}
                cy={disc.cy + fy * disc.ry}
                rx={fr * disc.rx}
                ry={fr * disc.rx * (disc.ry / disc.rx)}
                fill="#d5bd8a"
                stroke="none"
              />
            ))}
          </g>
        )}
        {shape.ground.length > 0 && (
          <g className="blocky-ground">
            {shape.ground.map((poly, i) => (
              <polygon key={i} points={poly.points} fill={poly.fill} />
            ))}
          </g>
        )}
        <ellipse className="blocky-shadow" cx={sh.cx} cy={sh.cy} rx={sh.rx} ry={sh.ry} fill="rgba(20, 24, 38, 0.25)" stroke="none" />
        <g className="blocky-body">
          {shape.body.map((poly, i) => (
            <polygon key={i} points={poly.points} fill={poly.fill} />
          ))}
        </g>
      </g>
    </svg>
  );
}
