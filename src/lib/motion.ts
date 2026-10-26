export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

export const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
