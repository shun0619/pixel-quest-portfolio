import type { ReactNode, RefObject } from "react";

interface Props {
  title: string;
  count?: string;
  message: string;
  onSkipMessage: () => void;
  onBack: () => void;
  backRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}

export function Panel({ title, count, message, onSkipMessage, onBack, backRef, children }: Props) {
  return (
    <section className="panel" role="dialog" aria-label={title}>
      <div className="panel-head">
        <button className="back" ref={backRef} onClick={onBack}>
          ◀ BACK
        </button>
        <h2>{title}</h2>
        {count && <span className="count">{count}</span>}
      </div>
      <div className="panel-body">{children}</div>
      <div className="box panel-msg" aria-live="polite" onClick={onSkipMessage}>
        {message}
      </div>
    </section>
  );
}
