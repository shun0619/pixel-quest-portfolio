import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile } from "./content";
import type { CommandKey, PanelKey } from "./types";
import { sound } from "./lib/sound";
import { storage } from "./lib/storage";
import { prefersReducedMotion } from "./lib/motion";
import { visits, visitLine } from "./lib/visits";
import { useTypewriter } from "./hooks/useTypewriter";
import { TitleScreen } from "./components/TitleScreen";
import { BattleScreen } from "./components/BattleScreen";
import { Panel } from "./components/Panel";
import { Confetti } from "./components/Confetti";
import { ProjectsPanel } from "./panels/ProjectsPanel";
import { SkillsPanel } from "./panels/SkillsPanel";
import { HistoryPanel } from "./panels/HistoryPanel";
import { ContactPanel } from "./panels/ContactPanel";
import { QuickPanel } from "./panels/QuickPanel";
import { SecretPanel } from "./panels/SecretPanel";

const IDLE = "What will you check out?";
const POKES_TO_UNLOCK = 5;
const name = profile.short;

const POKE_LINES = [
  `${name} dodged! The menu works better.`,
  `${name} looks puzzled.`,
  `${name} is getting a little dizzy…`,
  `${name} is glowing strangely!`,
];

const INTRO: Record<PanelKey, string> = {
  projects: `Your project log has ${profile.projects.length} entries. Pick one to inspect.`,
  skills: `You checked ${name}'s stats. Longer POWER bars are the skills he uses most.`,
  history: `You opened the key items pocket. ${profile.history.length} items and ${profile.badges.length} badges inside.`,
  contact: `${name} is looking at you expectantly.`,
  quick: "The short version. Press START on the title screen for the full adventure.",
  secret: "You found the hidden file. Not many visitors get this far.",
};

export default function App() {
  const [screen, setScreen] = useState<"title" | "battle">("title");
  const [panel, setPanel] = useState<PanelKey | null>(null);
  const [selected, setSelected] = useState(0);
  const [rare, setRare] = useState(false);
  const [level, setLevel] = useState(profile.level);
  const [hit, setHit] = useState(false);
  const [flash, setFlash] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [soundOn, setSoundOn] = useState(() => storage.get("pq_sound") !== "off");

  const pokes = useRef(0);
  const started = useRef(false);
  const panelRef = useRef<PanelKey | null>(null);
  panelRef.current = panel;

  const cmdRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const backRef = useRef<HTMLButtonElement>(null);
  const quickRef = useRef<HTMLButtonElement>(null);

  const battleMsg = useTypewriter(sound.blip);
  const panelMsg = useTypewriter(sound.blip);

  useEffect(() => {
    sound.enabled = soundOn;
    storage.set("pq_sound", soundOn ? "on" : "off");
  }, [soundOn]);

  useEffect(() => {
    if (panel) backRef.current?.focus({ preventScroll: true });
  }, [panel]);

  useEffect(() => {
    if (screen === "battle") cmdRefs.current[0]?.focus({ preventScroll: true });
  }, [screen]);

  const openPanel = (key: PanelKey) => {
    sound.ensure();
    sound.select();
    setPanel(key);
    void panelMsg.play([INTRO[key]]);
  };

  const closePanel = () => {
    if (!panelRef.current) return;
    setPanel(null);
    sound.back();
    if (screen === "title") {
      quickRef.current?.focus({ preventScroll: true });
      return;
    }
    cmdRefs.current[selected]?.focus({ preventScroll: true });
    void battleMsg.play([IDLE]);
  };

  const start = () => {
    if (started.current) return;
    started.current = true;
    sound.ensure();
    sound.encounter();
    setFlash((f) => f + 1);
    const reduced = prefersReducedMotion();
    window.setTimeout(() => {
      setScreen("battle");
      window.setTimeout(() => void battleMsg.play([visitLine(visits, name), IDLE]), reduced ? 0 : 700);
    }, reduced ? 0 : 900);
  };

  const hover = (i: number) => {
    if (i !== selected) sound.move();
    setSelected(i);
  };

  const poke = async () => {
    sound.ensure();
    sound.hit();
    pokes.current += 1;
    setHit(false);
    window.requestAnimationFrame(() => setHit(true));
    window.setTimeout(() => setHit(false), 320);

    if (pokes.current < POKES_TO_UNLOCK) {
      void battleMsg.play([POKE_LINES[pokes.current - 1]]);
      return;
    }
    if (rare) {
      void battleMsg.play([`${name} is already at full power.`]);
      return;
    }
    const next = level + 1;
    setRare(true);
    setLevel(next);
    sound.levelUp();
    setConfetti((c) => c + 1);
    const finished = await battleMsg.play([`${name} grew to Lv${next}!`, "A hidden file appeared…"]);
    if (finished && !panelRef.current) window.setTimeout(() => openPanel("secret"), 600);
  };

  const recruit = () => {
    sound.select();
    window.setTimeout(() => {
      sound.levelUp();
      setConfetti((c) => c + 1);
    }, 2400);
    const how = profile.contact.email ? `Email ${profile.contact.email}` : "Send a message on LinkedIn";
    void panelMsg.play([`You sent ${name} a team-up offer…`, ". . . . . .", `${name} wants to join your party! ${how} to make it official.`]);
  };

  // Keyboard: arrows move the cursor, Enter selects, Esc / X goes back.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "x") {
        if (panelRef.current) {
          e.preventDefault();
          closePanel();
        }
        return;
      }
      if (panelRef.current) return;
      if (screen === "title") {
        if ((e.key === "Enter" || e.key === " ") && !(document.activeElement instanceof HTMLButtonElement)) {
          e.preventDefault();
          start();
        }
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const next =
        e.key === "ArrowLeft" || e.key === "ArrowRight"
          ? selected % 2 === 0 ? selected + 1 : selected - 1
          : selected < 2 ? selected + 2 : selected - 2;
      sound.move();
      setSelected(next);
      cmdRefs.current[next]?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const panels: Record<PanelKey, { title: string; count?: string; body: () => ReactNode }> = {
    projects: {
      title: "PROJECTS",
      count: `${profile.projects.length} SEEN`,
      body: () => <ProjectsPanel projects={profile.projects} />,
    },
    skills: {
      title: "SKILLS",
      count: "STATS",
      body: () => <SkillsPanel skills={profile.skills} />,
    },
    history: {
      title: "HISTORY",
      count: `${profile.history.length} ITEMS`,
      body: () => <HistoryPanel history={profile.history} badges={profile.badges} />,
    },
    contact: {
      title: "CONTACT",
      body: () => (
        <ContactPanel
          profile={profile}
          onRecruit={recruit}
          onCopy={(r) =>
            void panelMsg.play([
              r === "copied" ? "Email address copied. Paste it into your mail app." : "Address selected. Copy it with Ctrl+C or Cmd+C.",
            ])
          }
        />
      ),
    },
    quick: { title: "QUICK VIEW", body: () => <QuickPanel profile={profile} /> },
    secret: { title: "??? FILE", count: "UNLOCKED", body: () => <SecretPanel entries={profile.secret} /> },
  };
  const current = panel ? panels[panel] : null;

  return (
    <main className="console">
      <div className="console-top">
        <span className="led">PIXEL QUEST · PORTFOLIO</span>
        <div className="top-actions">
          <button className="quick-btn" ref={quickRef} onClick={() => openPanel("quick")}>
            QUICK VIEW
          </button>
          {profile.cv && (
            <a className="cv-btn" href={profile.cv} target="_blank" rel="noopener noreferrer">
              ↓ CV (PDF)
            </a>
          )}
        </div>
      </div>

      <div className="screen">
        {screen === "title" ? (
          <TitleScreen profile={profile} onStart={start} />
        ) : (
          <BattleScreen
            profile={profile}
            level={level}
            rare={rare}
            visits={visits}
            hit={hit}
            message={battleMsg.text}
            onSkipMessage={battleMsg.skip}
            onPoke={poke}
            selected={selected}
            onHover={hover}
            onFocus={setSelected}
            onSelect={(key: CommandKey) => {
              setSelected(["projects", "skills", "history", "contact"].indexOf(key));
              openPanel(key);
            }}
            buttonRefs={cmdRefs}
          />
        )}

        {current && (
          <Panel
            key={panel}
            title={current.title}
            count={current.count}
            message={panelMsg.text}
            onSkipMessage={panelMsg.skip}
            onBack={closePanel}
            backRef={backRef}
          >
            {current.body()}
          </Panel>
        )}

        {flash > 0 && <div key={flash} className="flash go" aria-hidden="true" />}
        <Confetti trigger={confetti} />
      </div>

      <div className="console-foot">
        <button
          className="sound"
          onClick={() => {
            sound.ensure();
            setSoundOn((on) => !on);
          }}
        >
          ♪ SOUND: {soundOn ? "ON" : "OFF"}
        </button>
        <span className="keys">
          <kbd>Arrows</kbd> move · <kbd>Enter</kbd> select · <kbd>Esc</kbd> back
        </span>
      </div>
    </main>
  );
}
