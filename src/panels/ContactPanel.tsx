import { useRef, useState } from "react";
import type { Profile } from "../types";

interface Props {
  profile: Profile;
  onCopy: (result: "copied" | "selected") => void;
  onRecruit: () => void;
}

export function ContactPanel({ profile, onCopy, onRecruit }: Props) {
  const emailRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { contact } = profile;

  const copy = () => {
    const selectText = () => {
      const el = emailRef.current;
      const sel = window.getSelection();
      if (el && sel) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      onCopy("selected");
    };
    try {
      navigator.clipboard.writeText(contact.email).then(() => {
        setCopied(true);
        onCopy("copied");
      }, selectText);
    } catch {
      selectText();
    }
  };

  return (
    <div className="talk">
      <p>{contact.pitch}</p>
      <dl className="meta status">
        <dt>AVAILABLE</dt>
        <dd>{profile.available}</dd>
        <dt>LOOKING FOR</dt>
        <dd>{profile.seeking}</dd>
      </dl>
      {contact.email && (
        <div className="mail">
          <code ref={emailRef}>{contact.email}</code>
          <button className="btn" onClick={copy}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      )}
      <div className="links">
        {contact.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
            ▶ {l.label}
          </a>
        ))}
      </div>
      <button className="btn big" onClick={onRecruit}>
        ★ RECRUIT {profile.short}
      </button>
    </div>
  );
}
