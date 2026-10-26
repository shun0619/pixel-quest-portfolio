import type { MutableRefObject } from "react";
import type { CommandKey } from "../types";

export const COMMANDS: { key: CommandKey; label: string; sub: string }[] = [
  { key: "projects", label: "PROJECTS", sub: "Battle log" },
  { key: "skills", label: "SKILLS", sub: "Move list" },
  { key: "history", label: "HISTORY", sub: "Key items" },
  { key: "contact", label: "CONTACT", sub: "Team up" },
];

interface Props {
  selected: number;
  onHover: (index: number) => void;
  onFocus: (index: number) => void;
  onSelect: (key: CommandKey) => void;
  buttonRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
}

export function CommandMenu({ selected, onHover, onFocus, onSelect, buttonRefs }: Props) {
  return (
    <div className="box cmds" role="menu" aria-label="Commands">
      {COMMANDS.map((c, i) => (
        <button
          key={c.key}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          role="menuitem"
          className={`cmd${selected === i ? " sel" : ""}`}
          onMouseEnter={() => onHover(i)}
          onFocus={() => onFocus(i)}
          onClick={() => onSelect(c.key)}
        >
          <span className="k">{c.label}</span>
          <span className="s">{c.sub}</span>
        </button>
      ))}
    </div>
  );
}
