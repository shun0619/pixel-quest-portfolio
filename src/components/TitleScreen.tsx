import type { Profile } from "../types";
import { PALETTES } from "../lib/sprite";
import { Sprite } from "./Sprite";

interface Props {
  profile: Profile;
  onStart: () => void;
}

export function TitleScreen({ profile, onStart }: Props) {
  return (
    <section className="title" aria-label="Title screen">
      <Sprite palette={PALETTES.front} className="title-sprite" />
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
      <p className="avail">OPEN TO FULL-STACK ROLES · {profile.available.toUpperCase()}</p>
      <button className="start" onClick={onStart}>
        <span>▶ PRESS START</span>
      </button>
      <small>
        © {new Date().getFullYear()} {profile.name}
      </small>
    </section>
  );
}
