import type { Skill } from "../types";
import { Bar } from "../components/Bar";

export function SkillsPanel({ skills }: { skills: Skill[] }) {
  return (
    <ul className="stats">
      {skills.map((s) => (
        <li key={s.name} className="stat">
          <span className="stat-name">{s.name}</span>
          <Bar percent={s.power} />
          <span className="stat-line">▸ {s.line}</span>
        </li>
      ))}
    </ul>
  );
}
