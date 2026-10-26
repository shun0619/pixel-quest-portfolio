import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

const COLORS = ["#e8613c", "#e9b949", "#3fbf6a", "#4f7fe0", "#d6568f"];

/** Pixel confetti that falls once each time `trigger` increases. */
export function Confetti({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger === 0 || prefersReducedMotion()) return;
    setActive(true);
  }, [trigger]);

  useEffect(() => {
    const cv = ref.current;
    if (!active || !cv?.parentElement) return;
    const ctx = cv.getContext("2d");
    if (!ctx) {
      setActive(false);
      return;
    }
    cv.width = cv.parentElement.clientWidth;
    cv.height = cv.parentElement.clientHeight;
    const bits = Array.from({ length: 70 }, () => ({
      x: Math.random() * cv.width,
      y: -Math.random() * cv.height * 0.5,
      v: 2 + Math.random() * 3,
      s: 4 + Math.floor(Math.random() * 3) * 2,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    let frame = 0;
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const b of bits) {
        b.y += b.v;
        b.x += Math.sin((b.y + frame) / 20);
        ctx.fillStyle = b.c;
        ctx.fillRect(Math.round(b.x), Math.round(b.y), b.s, b.s);
      }
      frame += 1;
      if (frame < 140) raf = requestAnimationFrame(tick);
      else setActive(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, trigger]);

  return <canvas ref={ref} className="confetti" hidden={!active} aria-hidden="true" />;
}
