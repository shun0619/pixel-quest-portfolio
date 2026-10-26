import type { Profile } from "../types";
import { Chip } from "../components/Chip";

/** Plain one-screen summary for visitors who want the facts fast. */
export function QuickPanel({ profile }: { profile: Profile }) {
  return (
    <div className="quick">
      <div>
        <h3 className="q-name">{profile.name}</h3>
        <p className="q-role">
          {profile.role} · {profile.base}
        </p>
      </div>
      <p className="q-lead">{profile.summary}</p>
      <dl className="meta status">
        <dt>AVAILABLE</dt>
        <dd>{profile.available}</dd>
        <dt>LOOKING FOR</dt>
        <dd>{profile.seeking}</dd>
        <dt>LANGUAGES</dt>
        <dd>{profile.languages}</dd>
      </dl>
      <section>
        <h3 className="section-h">EXPERIENCE & EDUCATION</h3>
        <ul className="q-list">
          {profile.history.map((h) => (
            <li key={h.title}>
              <span className="yr">{h.year}</span>
              <div>
                <b>{h.title}</b>
                <span>{h.org}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="section-h">SKILLS</h3>
        <div className="q-skills">
          {profile.skills.map((g) => (
            <div key={g.type}>
              <Chip type={g.type} />
              <span>{g.moves.map((m) => m.name).join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="section-h">CERTIFICATIONS</h3>
        <ul className="q-list">
          {profile.badges.map((b) => (
            <li key={b.name}>
              <span className="yr">{b.date}</span>
              <div>
                <b>{b.name}</b>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className="links">
        {profile.contact.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
            ▶ {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
