import type { Profile } from "./types";

/** All portfolio content lives here. Keep it short: every view should fit on one screen. */
export const profile: Profile = {
  name: "SHUN MIYASHITA",
  short: "SHUN",
  role: "SOFTWARE ENGINEER",
  level: 3,
  types: ["FRONTEND", "BACKEND"],
  base: "Auckland, NZ",
  available: "From May 2027",
  seeking: "Full-stack roles in Japan or New Zealand",
  languages: "Japanese (native) · English (business, TOEIC 860)",
  summary:
    "Full-stack engineer with 3 years of web development in Japan, working across React, NestJS and Java. Now studying IT in Auckland.",
  cv: "",

  projects: [
    {
      name: "Security Token Platform",
      period: "2025 – 2026",
      types: ["FRONTEND", "BACKEND"],
      summary: "Issue, manage and transfer security tokens for a securities firm in Japan.",
      stack: "React · NestJS · PostgreSQL · AWS",
      private: true,
    },
    {
      name: "Logistics System",
      period: "2023 – 2025",
      types: ["BACKEND", "FRONTEND"],
      summary: "Inventory and logistics data processing, from development to maintenance.",
      stack: "Java · Spring Boot · Vue.js · MySQL",
      private: true,
    },
    {
      name: "Pixel Quest",
      period: "2026",
      types: ["FRONTEND"],
      summary: "This portfolio, built as a retro RPG.",
      stack: "React · TypeScript · Vite",
      code: "https://github.com/shun0619/pixel-quest-portfolio",
    },
  ],

  skills: [
    { name: "TYPESCRIPT", power: 88, line: "Catches bugs before they hatch." },
    { name: "REACT", power: 80, line: "Builds screens one component at a time." },
    { name: "NESTJS", power: 74, line: "Summons tidy APIs with a few decorators." },
    { name: "SPRING BOOT", power: 72, line: "Moves warehouse stock without dropping a box." },
    { name: "SQL", power: 82, line: "Asks the database the right question, fast." },
    { name: "DOCKER & AWS", power: 70, line: "Ships the same box to every server." },
    { name: "TESTING", power: 86, line: "Writes the spec, then proves it." },
    { name: "MATCHA", power: 99, line: "Restores focus after long code reviews.", joke: true },
  ],

  history: [
    { year: "NOW – 2027.05", title: "Graduate Diploma in IT", org: "Auckland Institute of Studies" },
    { year: "2025 – 2026", title: "Software Engineer (Contract)", org: "Persol Excel HR Partners" },
    { year: "2023 – 2025", title: "Systems Engineer", org: "GUN System" },
    { year: "– 2023", title: "B.Eng. Electrical and Electronic Engineering", org: "National Defense Academy of Japan" },
  ],

  badges: [
    { name: "Oracle Java Silver SE 17", date: "2025" },
    { name: "TOEIC 860", date: "2023" },
  ],

  contact: {
    pitch: "Looking for a full-stack engineer? Let's build something together.",
    email: "",
    links: [
      { label: "GITHUB", url: "https://github.com/shun0619" },
      { label: "LINKEDIN", url: "https://www.linkedin.com/in/shun-miyashita-0ab01829b" },
    ],
  },

  secret: [
    ["Trained at", "National Defense Academy of Japan"],
    ["Stack switches", "Vue.js → React, MySQL → PostgreSQL"],
    ["Lesson learned", "Keep tests and specs in sync"],
  ],
};
