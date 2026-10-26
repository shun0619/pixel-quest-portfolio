export function Bar({ percent, className = "" }: { percent: number; className?: string }) {
  const width = Math.max(0, Math.min(100, percent));
  return (
    <div className="bar" aria-hidden="true">
      <i className={className} style={{ width: `${width}%` }} />
    </div>
  );
}
