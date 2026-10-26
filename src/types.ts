export type SkillType = "LANGUAGE" | "FRAMEWORK" | "DATABASE" | "INFRA" | "TESTING" | "TOOLS";
export type ProjectType = "FRONTEND" | "BACKEND" | "DATA" | "DESIGN";

export interface Project {
  name: string;
  period: string;
  types: ProjectType[];
  stack: string;
  desc: string;
  role: string;
  team: string;
  phases: string;
  notes: string[];
  live?: string;
  code?: string;
  /** Client work whose code cannot be shared. */
  private?: boolean;
}

export interface Move {
  name: string;
  /** Years of experience. */
  yrs: number;
  desc: string;
}

export interface SkillGroup {
  type: SkillType;
  moves: Move[];
}

export interface HistoryItem {
  year: string;
  title: string;
  org: string;
  desc: string;
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
  projects: Project[];
  skills: SkillGroup[];
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
