import type { Profile } from "../types";
import { BLOCKY_PALETTES } from "../lib/blocky";
import { Blocky } from "./Blocky";

interface Props {
  profile: Profile;
  onStart: () => void;
}

export function TitleScreen({ profile, onStart }: Props) {
  return (
    <section className="title" aria-label="Title screen">
      <Blocky palette={BLOCKY_PALETTES.developer} tile className="title-avatar" />
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
