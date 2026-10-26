import type { Badge, HistoryItem } from "../types";

export function HistoryPanel({ history, badges }: { history: HistoryItem[]; badges: Badge[] }) {
  return (
    <>
      <ol className="log">
        {history.map((h) => (
          <li key={h.title}>
            <span className="yr">{h.year}</span>
            <h3>{h.title}</h3>
            <span className="org">{h.org}</span>
          </li>
        ))}
      </ol>
      <ul className="badges" aria-label="Certifications">
        {badges.map((b) => (
          <li key={b.name}>
            <span className="medal" aria-hidden="true" />
            {b.name} <span className="yr">{b.date}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
