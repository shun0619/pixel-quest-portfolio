export function Chip({ type }: { type: string }) {
  return (
    <span className="chip" data-t={type}>
      {type}
    </span>
  );
}
