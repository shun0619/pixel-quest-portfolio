import { storage } from "./storage";

const KEY = "pq_visits";

/** Counts this page load once per module evaluation (safe under React StrictMode). */
function recordVisit(): number {
  const count = parseInt(storage.get(KEY) ?? "0", 10) + 1;
  storage.set(KEY, String(count));
  return count;
}

export const visits = recordVisit();

export function visitLine(count: number, name: string): string {
  if (count === 1) return `A wild ${name} appeared! It looks friendly.`;
  if (count === 2) return `Oh, you're back. ${name} seems pleased to see you.`;
  if (count === 3) return `Third encounter. Are you scouting ${name}?`;
  if (count < 6) return `Visit #${count}. ${name} remembers your face.`;
  if (count < 10) return `Visit #${count}. Your curiosity rose sharply!`;
  return `Visit #${count}. You and ${name} are basically party members now.`;
}
