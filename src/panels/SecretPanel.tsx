export function SecretPanel({ entries }: { entries: [string, string][] }) {
  return (
    <div className="secret">
      <dl>
        {entries.map(([k, v]) => (
          <div key={k} className="secret-row">
            <dt>{k.toUpperCase()}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
