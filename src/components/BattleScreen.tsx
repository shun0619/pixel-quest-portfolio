import type { MutableRefObject } from "react";
import type { CommandKey, Profile } from "../types";
import { BLOCKY_PALETTES } from "../lib/blocky";
import { energy } from "../lib/energy";
import { Blocky } from "./Blocky";
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
          subtitle={`${profile.role} · ${profile.base.split(",")[0].toUpperCase()}`}
          types={profile.types}
          meterLabel="ENERGY"
          meter={hp.value}
          tag={`OPEN TO WORK · ${profile.available.replace(/^From /i, "").toUpperCase()}`}
        />
        <button className={`sprite foe${hit ? " hit" : ""}`} onClick={props.onPoke} aria-label={`Poke ${profile.short}`} title={hp.note}>
          <Blocky palette={rare ? BLOCKY_PALETTES.rare : BLOCKY_PALETTES.developer} platform={10} />
        </button>
        <div className="sprite me" aria-hidden="true">
          <Blocky palette={BLOCKY_PALETTES.visitor} view="back" platform={10} />
        </div>
        <InfoCard className="me-card" name="YOU" level={Math.min(visits, 99)} meterLabel="CURIOSITY" meter={100} reading="100 / 100" />
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
