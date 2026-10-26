import { describe, expect, it } from "vitest";
import { energy, hpClass } from "./energy";
import { visitLine } from "./visits";

describe("energy", () => {
  it("is full in the morning and low late at night", () => {
    expect(energy(new Date(2026, 0, 1, 9)).value).toBe(100);
    expect(energy(new Date(2026, 0, 1, 2)).value).toBe(24);
  });

  it("maps HP to bar colours", () => {
    expect(hpClass(80)).toBe("");
    expect(hpClass(40)).toBe("mid");
    expect(hpClass(10)).toBe("low");
  });
});

describe("visitLine", () => {
  it("changes with the number of visits", () => {
    expect(visitLine(1, "SHUN")).toMatch(/appeared/);
    expect(visitLine(12, "SHUN")).toMatch(/party members/);
  });
});
