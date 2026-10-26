import type { MutableRefObject } from "react";
import type { CommandKey, Profile } from "../types";
import { PALETTES } from "../lib/sprite";
import { energy } from "../lib/energy";
import { Sprite } from "./Sprite";
import { InfoCard } from "./InfoCard";
import { CommandMenu } from "./CommandMenu";

interface Props {
  profile: Profile;
  level: number;
  rare: boolean;
  visits: number;
  hit: boolean;
  message: string;
  onSkipMessage: () => void;
  onPoke: () => void;
  selected: number;
  onHover: (index: number) => void;
  onFocus: (index: number) => void;
  onSelect: (key: CommandKey) => void;
  buttonRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
}

export function BattleScreen(props: Props) {
  const { profile, level, rare, visits, hit, message } = props;
  const hp = energy();
  return (
    <section className="battle enter" aria-label="Battle screen">
      <div className="field">
        <InfoCard
          className="foe-card"
          name={profile.short}
          level={level}
          hp={hp.value}
          types={profile.types}
          footer={`${hp.note} · ${profile.base}`}
        />
        <button className={`sprite foe${hit ? " hit" : ""}`} onClick={props.onPoke} aria-label={`Poke ${profile.short}`}>
          <Sprite palette={rare ? PALETTES.rare : PALETTES.front} flip />
        </button>
        <div className="sprite me" aria-hidden="true">
          <Sprite palette={PALETTES.visitor} />
        </div>
        <InfoCard className="me-card" name="YOU" level={Math.min(visits, 99)} hp={100} footer="CURIOSITY 100/100" />
      </div>
      <div className="hud">
        <div className="box msg" aria-live="polite" onClick={props.onSkipMessage}>
          {message}
        </div>
        <CommandMenu
          selected={props.selected}
          onHover={props.onHover}
          onFocus={props.onFocus}
          onSelect={props.onSelect}
          buttonRefs={props.buttonRefs}
        />
      </div>
    </section>
  );
}
