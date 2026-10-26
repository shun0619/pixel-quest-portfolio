export type ProjectType = "FRONTEND" | "BACKEND" | "DATA" | "DESIGN";

export interface Project {
  name: string;
  period: string;
  types: ProjectType[];
  /** One sentence. */
  summary: string;
  stack: string;
  live?: string;
  code?: string;
  /** Client work whose code cannot be shared. */
  private?: boolean;
}

export interface Skill {
  name: string;
  /** Bar length, 0–100. A feel, not a measurement. */
  power: number;
  /** One playful line. */
  line: string;
  /** Just for fun; left out of the Quick View. */
  joke?: boolean;
}

export interface HistoryItem {
  year: string;
  title: string;
  org: string;
}

export interface Badge {
  name: string;
  date: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  short: string;
  role: string;
  /** Years of experience, shown as the level. */
  level: number;
  types: ProjectType[];
  base: string;
  available: string;
  seeking: string;
  languages: string;
  summary: string;
  /** Link to a CV PDF (for example /cv.pdf in public/). Leave empty to hide the CV buttons. */
  cv: string;
  projects: Project[];
  skills: Skill[];
  history: HistoryItem[];
  badges: Badge[];
  contact: {
    pitch: string;
    /** Leave empty to hide the email row. */
    email: string;
    links: ExternalLink[];
  };
  secret: [string, string][];
}

export type PanelKey = "projects" | "skills" | "history" | "contact" | "quick" | "secret";
export type CommandKey = Extract<PanelKey, "projects" | "skills" | "history" | "contact">;
