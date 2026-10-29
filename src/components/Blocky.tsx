import { useMemo } from "react";
import { BLOCKY_OUTLINE, buildBlocky, type BlockyPalette, type BlockyView } from "../lib/blocky";

interface Props {
  palette: BlockyPalette;
  view?: BlockyView;
  /** Mirror horizontally. */
  flip?: boolean;
  /** Draw a grass tile under the character. */
  tile?: boolean;
  className?: string;
}

export function Blocky({ palette, view = "front", flip = false, tile = false, className }: Props) {
  const shape = useMemo(() => buildBlocky(palette, view, tile), [palette, view, tile]);
  const w = shape.width.toFixed(1);
  const h = shape.height.toFixed(1);
  const solid = (fill: string) => (fill.startsWith("rgba") ? "none" : undefined);
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <g transform={flip ? `translate(${w} 0) scale(-1 1)` : undefined} stroke={BLOCKY_OUTLINE} strokeWidth="1.2" strokeLinejoin="round">
        {shape.ground.length > 0 && (
          <g className="blocky-ground">
            {shape.ground.map((poly, i) => (
              <polygon key={i} points={poly.points} fill={poly.fill} />
            ))}
          </g>
        )}
        <g className="blocky-body">
          {shape.body.map((poly, i) => (
            <polygon key={i} points={poly.points} fill={poly.fill} stroke={solid(poly.fill)} />
          ))}
        </g>
      </g>
    </svg>
  );
}
