import { useEffect, useRef } from "react";
import { drawSprite, SPRITE_SIZE, type Palette } from "../lib/sprite";

interface Props {
  palette: Palette;
  flip?: boolean;
  className?: string;
}

export function Sprite({ palette, flip = false, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSprite(ref.current, palette, flip);
  }, [palette, flip]);
  return <canvas ref={ref} width={SPRITE_SIZE} height={SPRITE_SIZE} className={className} aria-hidden="true" />;
}
