import type { Move, SkillGroup } from "../types";
import { Bar } from "../components/Bar";
import { Chip } from "../components/Chip";

const MAX_YEARS = 3;

interface Props {
  groups: SkillGroup[];
  onMove: (move: Move) => void;
}

export function SkillsPanel({ groups, onMove }: Props) {
  return (
    <>
      {groups.map((g) => (
        <div className="group" key={g.type}>
          <h3>{g.type} MOVES</h3>
          {g.moves.map((m) => (
            <button className="move" key={m.name} onClick={() => onMove(m)}>
              <span className="nm">{m.name}</span>
              <Chip type={g.type} />
              <Bar percent={(m.yrs / MAX_YEARS) * 100} />
              <span className="pp">
                ~{m.yrs} YR{m.yrs > 1 ? "S" : ""}
              </span>
            </button>
          ))}
        </div>
      ))}
    </>
  );
}
