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
    {
      type: "LANGUAGE",
      moves: [
        { name: "TypeScript", yrs: 3, desc: "Main language for React frontends and NestJS APIs." },
        { name: "Java", yrs: 2, desc: "Backend logic with Spring Boot." },
        { name: "SQL", yrs: 3, desc: "Schema design and query tuning." },
      ],
    },
    {
      type: "FRAMEWORK",
      moves: [
        { name: "React", yrs: 1, desc: "Frontend of a security token platform." },
        { name: "NestJS", yrs: 1, desc: "Backend APIs in TypeScript." },
        { name: "Spring Boot", yrs: 2, desc: "Backend for a logistics system." },
        { name: "Vue.js", yrs: 2, desc: "Frontend screens and UI improvements." },
      ],
    },
    {
      type: "DATABASE",
      moves: [
        { name: "PostgreSQL", yrs: 1, desc: "Database design with Prisma ORM." },
        { name: "MySQL", yrs: 2, desc: "Database design and query optimisation." },
      ],
    },
    {
      type: "INFRA",
      moves: [
        { name: "AWS", yrs: 1, desc: "Development and releases on ECS and ECR." },
        { name: "Docker", yrs: 3, desc: "Containerised development on every project." },
      ],
    },
    {
      type: "TESTING",
      moves: [
        { name: "Jest", yrs: 1, desc: "Unit tests kept in sync with the specs." },
        { name: "JUnit", yrs: 2, desc: "Unit tests for Spring Boot services." },
      ],
    },
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
