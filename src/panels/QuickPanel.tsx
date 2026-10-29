import type { Profile } from "../types";
import { BLOCKY_PALETTES } from "../lib/blocky";
import { Blocky } from "../components/Blocky";

/** One-page résumé for visitors who want the facts fast. */
export function QuickPanel({ profile }: { profile: Profile }) {
  const linkedIn = profile.contact.links.find((l) => l.label === "LINKEDIN");
  const gitHub = profile.contact.links.find((l) => l.label === "GITHUB");
  return (
    <div className="qv">
      <header className="qv-hero">
        <div className="qv-avatar">
          <Blocky palette={BLOCKY_PALETTES.developer} />
        </div>
        <div className="qv-id">
          <h3 className="qv-name">{profile.name}</h3>
          <p className="qv-role">
            Full-stack engineer · {profile.level} yrs · {profile.base}
          </p>
          <ul className="qv-tags" aria-label="Status">
            <li className="open">● OPEN TO WORK · {profile.available.replace(/^From /i, "").toUpperCase()}</li>
            <li>{profile.seeking.replace(/^Full-stack roles in /i, "").toUpperCase()}</li>
            <li>JA NATIVE · EN BUSINESS</li>
          </ul>
        </div>
        <div className="qv-actions">
          {gitHub && (
            <a className="qv-btn primary" href={gitHub.url} target="_blank" rel="noopener noreferrer">
              ▶ GITHUB
            </a>
          )}
          {linkedIn && (
            <a className="qv-btn" href={linkedIn.url} target="_blank" rel="noopener noreferrer">
              ▶ LINKEDIN
            </a>
          )}
          {profile.cv && (
            <a className="qv-btn" href={profile.cv} target="_blank" rel="noopener noreferrer">
              ↓ CV (PDF)
            </a>
          )}
        </div>
      </header>

      <div className="qv-cols">
        <div className="qv-col">
          <section>
            <h4 className="section-h">SUMMARY</h4>
            <p className="qv-lead">{profile.summary}</p>
          </section>
          <section>
            <h4 className="section-h">SKILLS</h4>
            <p className="qv-lead">
              {profile.skills
                .filter((sk) => !sk.joke)
                .map((sk) => sk.name)
                .join(" · ")}
            </p>
          </section>
          <section>
            <h4 className="section-h">CERTIFICATIONS</h4>
            <ul className="qv-certs">
              {profile.badges.map((b) => (
                <li key={b.name}>
                  ★ {b.name} ({b.date})
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="qv-col">
          <section>
            <h4 className="section-h">EXPERIENCE & EDUCATION</h4>
            <ul className="qv-timeline">
              {profile.history.map((h) => (
                <li key={h.title}>
                  <span className="yr">{h.year}</span>
                  <b>{h.title}</b>
                  <span className="org">{h.org}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
