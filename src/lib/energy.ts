/** The developer's "HP", based on the visitor's local time of day. */
export function energy(date = new Date()): { value: number; note: string } {
  const h = date.getHours();
  if (h >= 6 && h < 12) return { value: 100, note: "Fresh morning" };
  if (h >= 12 && h < 17) return { value: 82, note: "Afternoon focus" };
  if (h >= 17 && h < 22) return { value: 58, note: "Evening mode" };
  return { value: 24, note: "Sleepy… zzz" };
}

export function hpClass(percent: number): string {
  if (percent > 50) return "";
  return percent > 20 ? "mid" : "low";
}
