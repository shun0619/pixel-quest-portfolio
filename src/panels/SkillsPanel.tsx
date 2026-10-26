import type { Skill } from "../types";
import { Bar } from "../components/Bar";

export function SkillsPanel({ skills }: { skills: Skill[] }) {
  return (
    <>
      <p className="stats-legend">POWER = how often I reach for it at work</p>
      <ul className="stats">
        {skills.map((s) => (
          <li key={s.name} className="stat">
            <span className="stat-name">{s.name}</span>
            <div className="stat-bar">
              <b>POWER</b>
              <Bar percent={s.power} />
            </div>
            <span className="stat-line">▸ {s.line}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
