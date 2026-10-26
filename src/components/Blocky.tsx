import { useMemo } from "react";
import { BLOCKY_OUTLINE, buildBlocky, type BlockyPalette } from "../lib/blocky";

interface Props {
  palette: BlockyPalette;
  /** Mirror horizontally so the character faces right. */
  flip?: boolean;
  className?: string;
}

export function Blocky({ palette, flip = false, className }: Props) {
  const shape = useMemo(() => buildBlocky(palette), [palette]);
  const w = shape.width.toFixed(1);
  const h = shape.height.toFixed(1);
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <g transform={flip ? `translate(${w} 0) scale(-1 1)` : undefined} stroke={BLOCKY_OUTLINE} strokeWidth="1.2" strokeLinejoin="round">
        {shape.polys.map((poly, i) => (
          <polygon key={i} points={poly.points} fill={poly.fill} />
        ))}
      </g>
    </svg>
  );
}
