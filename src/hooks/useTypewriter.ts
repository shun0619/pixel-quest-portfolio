import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion, wait } from "../lib/motion";

const CHAR_MS = 26;
const LINE_PAUSE_MS = 900;

/**
 * RPG-style message box text. `play` types lines one after another and resolves
 * to true when it finished, or false if a newer `play` call interrupted it.
 */
export function useTypewriter(onBlip?: () => void) {
  const [text, setText] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const seq = useRef(0);
  const finish = useRef<(() => void) | null>(null);
  const blip = useRef(onBlip);
  blip.current = onBlip;

  const typeLine = useCallback(
    (line: string, id: number) =>
      new Promise<void>((resolve) => {
        window.clearInterval(timer.current);
        if (prefersReducedMotion()) {
          setText(line);
          resolve();
          return;
        }
        let i = 0;
        setText("");
        finish.current = () => {
          window.clearInterval(timer.current);
          finish.current = null;
          setText(line);
          resolve();
        };
        timer.current = window.setInterval(() => {
          if (id !== seq.current) {
            window.clearInterval(timer.current);
            resolve();
            return;
          }
          i += 1;
          setText(line.slice(0, i));
          if (i % 2 === 0 && line[i - 1] !== " ") blip.current?.();
          if (i >= line.length) {
            window.clearInterval(timer.current);
            finish.current = null;
            resolve();
          }
        }, CHAR_MS);
      }),
    [],
  );

  const play = useCallback(
    async (lines: string[]): Promise<boolean> => {
      const id = ++seq.current;
      for (let n = 0; n < lines.length; n++) {
        if (id !== seq.current) return false;
        await typeLine(lines[n], id);
        if (n < lines.length - 1) await wait(prefersReducedMotion() ? 0 : LINE_PAUSE_MS);
      }
      return id === seq.current;
    },
    [typeLine],
  );

  const skip = useCallback(() => finish.current?.(), []);

  useEffect(() => () => window.clearInterval(timer.current), []);

  return { text, play, skip };
}
