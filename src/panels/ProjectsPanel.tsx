import type { Project } from "../types";
import { Chip } from "../components/Chip";

export function ProjectsPanel({ projects }: { projects: Project[] }) {
  return (
    <div className="dex">
      {projects.map((p, i) => (
        <article className="entry" key={p.name}>
          <div className="no">
            <span>No.{String(i + 1).padStart(3, "0")}</span>
            <span>{p.period}</span>
          </div>
          <h3>{p.name}</h3>
          <div className="types">
            {p.types.map((t) => (
              <Chip key={t} type={t} />
            ))}
          </div>
          <p>{p.desc}</p>
          <dl className="meta">
            <dt>ROLE</dt>
            <dd>{p.role}</dd>
            <dt>TEAM</dt>
            <dd>{p.team}</dd>
            <dt>PHASES</dt>
            <dd>{p.phases}</dd>
          </dl>
          <ul className="notes">
            {p.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className="stack">{p.stack}</div>
          <div className="links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                ▶ LIVE
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer">
                ▶ CODE
              </a>
            )}
            {p.private && <span className="private">CLIENT WORK · CODE PRIVATE</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
