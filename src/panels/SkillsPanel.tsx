import type { Move, SkillGroup } from "../types";
import { Chip } from "../components/Chip";

interface Props {
  groups: SkillGroup[];
  onMove: (move: Move) => void;
}

export function SkillsPanel({ groups, onMove }: Props) {
  return (
    <ul className="skill-rows">
      {groups.map((g) => (
        <li key={g.type} className="skill-row">
          <Chip type={g.type} />
          <div className="skill-moves">
            {g.moves.map((m) => (
              <button className="move" key={m.name} onClick={() => onMove(m)}>
                <span className="nm">{m.name}</span>
                <span className="pp">{m.yrs}y</span>
              </button>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
