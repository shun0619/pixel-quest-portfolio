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
            <p>{h.desc}</p>
          </li>
        ))}
      </ol>
      <h3 className="section-h">BADGES</h3>
      <ul className="badges">
        {badges.map((b) => (
          <li key={b.name}>
            <span className="medal" aria-hidden="true" />
            <span>{b.name}</span>
            <span className="yr">{b.date}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
