import type { ProjectType } from "../types";
import { Bar } from "./Bar";
import { Chip } from "./Chip";
import { hpClass } from "../lib/energy";

interface Props {
  name: string;
  level: number;
  hp: number;
  types?: ProjectType[];
  footer: string;
  className?: string;
}

export function InfoCard({ name, level, hp, types, footer, className = "" }: Props) {
  return (
    <div className={`info ${className}`}>
      <div className="info-top">
        <span className="info-name">{name}</span>
        <span className="info-lv">Lv{level}</span>
      </div>
      {types && (
        <div className="types">
          {types.map((t) => (
            <Chip key={t} type={t} />
          ))}
        </div>
      )}
      <div className="hp">
        <b>HP</b>
        <Bar percent={hp} className={hpClass(hp)} />
      </div>
      <div className="where">{footer}</div>
    </div>
  );
}
