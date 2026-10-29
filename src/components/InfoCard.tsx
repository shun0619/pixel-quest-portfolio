import type { ProjectType } from "../types";
import { Bar } from "./Bar";
import { Chip } from "./Chip";
import { hpClass } from "../lib/energy";

interface Props {
  name: string;
  level: number;
  subtitle?: string;
  types?: ProjectType[];
  meterLabel: string;
  meter: number;
  tag?: string;
  /** Number shown under the meter, like "100 / 100". */
  reading?: string;
  className?: string;
}

export function InfoCard({ name, level, subtitle, types, meterLabel, meter, tag, reading, className = "" }: Props) {
  return (
    <div className={`info ${className}`}>
      <div className="info-top">
        <span className="info-name">{name}</span>
        <span className="info-lv">Lv{level}</span>
      </div>
      {subtitle && <div className="info-sub">{subtitle}</div>}
      {types && (
        <div className="types">
          {types.map((t) => (
            <Chip key={t} type={t} />
          ))}
        </div>
      )}
      <div className="meter">
        <b>{meterLabel}</b>
        <Bar percent={meter} className={hpClass(meter)} />
      </div>
      {reading && <div className="reading">{reading}</div>}
      {tag && <div className="open-tag">● {tag}</div>}
    </div>
  );
}
