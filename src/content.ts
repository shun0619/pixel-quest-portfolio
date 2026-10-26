import type { Profile } from "./types";

/** All portfolio content lives here. Edit this file to update the site. */
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
    "Full-stack engineer with about 3 years of web development in Japan. Built a security token platform for a securities firm with React, NestJS and PostgreSQL on AWS, and a logistics system with Java Spring Boot, Vue.js and MySQL. Comfortable owning a feature from design docs through testing and release. Now studying IT in English in Auckland.",
  cv: "",

  projects: [
    {
      name: "Security Token Management System",
      period: "2025.07 – 2026.05",
      types: ["FRONTEND", "BACKEND"],
      stack: "TypeScript · React · NestJS · PostgreSQL (Prisma) · Jest · AWS ECS/ECR",
      desc: "A web app for a securities firm in Japan to issue, manage and transfer security tokens, connected to an external blockchain.",
      role: "Full-stack member",
      team: "10 people",
      phases: "Design → release",
      notes: [
        "Built React screens and NestJS APIs",
        "Wrote design docs, unit tests and system test specs",
        "Handled Node.js upgrades and external API changes",
      ],
      private: true,
    },
    {
      name: "Logistics Management System",
      period: "2023.04 – 2025.04",
      types: ["BACKEND", "FRONTEND"],
      stack: "Java · Spring Boot · JUnit · TypeScript · Vue.js · MySQL · Linux",
      desc: "Development and maintenance of a logistics system centred on inventory control and logistics data processing.",
      role: "Member",
      team: "10 people",
      phases: "Requirements → maintenance",
      notes: [
        "Implemented inventory logic in Spring Boot",
        "Designed MySQL schemas and tuned queries",
        "Improved performance and proposed UI fixes",
      ],
      private: true,
    },
    {
      name: "Pixel Quest Portfolio",
      period: "2026",
      types: ["FRONTEND"],
      stack: "TypeScript · React · Vite · Vitest · Web Audio API",
      desc: "This site. A blocky avatar built from SVG polygons, sound effects synthesized in the browser, tested with Vitest.",
      role: "Solo",
      team: "1 person",
      phases: "Design → release",
      notes: ["Keyboard and screen-reader friendly", "Hidden extras for curious visitors"],
      code: "https://github.com/shun0619",
    },
  ],

  skills: [
    {
      type: "LANGUAGE",
      moves: [
        { name: "TypeScript / JS", yrs: 3, desc: "Main language for React frontends and NestJS APIs." },
        { name: "SQL", yrs: 3, desc: "Schema design and query tuning on MySQL and PostgreSQL." },
        { name: "Java", yrs: 2, desc: "Inventory and logistics logic with Spring Boot." },
      ],
    },
    {
      type: "FRAMEWORK",
      moves: [
        { name: "Spring Boot", yrs: 2, desc: "Backend for a logistics management system." },
        { name: "Vue.js", yrs: 2, desc: "Frontend screens and UI improvements." },
        { name: "React", yrs: 1, desc: "Frontend of a security token platform." },
        { name: "NestJS", yrs: 1, desc: "Backend API design and implementation in TypeScript." },
      ],
    },
    {
      type: "DATABASE",
      moves: [
        { name: "MySQL", yrs: 2, desc: "Database design, build and query optimisation." },
        { name: "PostgreSQL", yrs: 1, desc: "Database design and implementation with Prisma ORM." },
      ],
    },
    {
      type: "INFRA",
      moves: [
        { name: "Docker", yrs: 3, desc: "Containerised development environments on every project." },
        { name: "Linux", yrs: 2, desc: "Server updates and security hardening." },
        { name: "AWS ECS / ECR", yrs: 1, desc: "Development and releases on AWS containers." },
        { name: "Node.js", yrs: 1, desc: "Runtime upgrades and external API changes." },
      ],
    },
    {
      type: "TESTING",
      moves: [
        { name: "Test specs", yrs: 3, desc: "Wrote and ran unit, integration and system test specifications." },
        { name: "JUnit", yrs: 2, desc: "Unit tests for Spring Boot services." },
        { name: "Jest", yrs: 1, desc: "Unit tests for a financial system, kept in sync with the specs." },
      ],
    },
    {
      type: "TOOLS",
      moves: [
        { name: "Git (GitLab)", yrs: 3, desc: "Daily version control and code review." },
        { name: "Confluence", yrs: 1, desc: "Kept design docs in one place and up to date." },
        { name: "CodeCommit etc.", yrs: 1, desc: "CodeCommit, CodeServer, and TimeTracker for WBS and effort tracking." },
      ],
    },
  ],

  history: [
    {
      year: "NOW – 2027.05",
      title: "Graduate Diploma in Information Technology",
      org: "Auckland Institute of Studies, NZ",
      desc: "Studying IT in English. Expected to complete in May 2027.",
    },
    {
      year: "2025.07 – 2026.05",
      title: "Software Engineer (Contract)",
      org: "Persol Excel HR Partners",
      desc: "Full-stack development of a security token management system for a securities firm in Japan.",
    },
    {
      year: "2023.04 – 2025.04",
      title: "Systems Engineer",
      org: "GUN System",
      desc: "Development and maintenance of a logistics management system with Java, Vue.js and MySQL.",
    },
    {
      year: "– 2023.03",
      title: "B.Eng. Electrical and Electronic Engineering",
      org: "National Defense Academy of Japan",
      desc: "Four years of team life that built discipline and a strong sense of responsibility.",
    },
  ],

  badges: [
    { name: "Oracle Certified Java Programmer, Silver SE 17", date: "2025.12" },
    { name: "TOEIC Listening & Reading 860", date: "2023.02" },
    { name: "English: business level", date: "NOW" },
  ],

  contact: {
    pitch:
      "I can own a feature from design docs through testing and release on AWS, and I care about quality. Let's build something together.",
    email: "",
    links: [
      { label: "GITHUB", url: "https://github.com/shun0619" },
      { label: "LINKEDIN", url: "https://www.linkedin.com/in/shun-miyashita-0ab01829b" },
    ],
  },

  secret: [
    ["Trained at", "National Defense Academy of Japan"],
    ["Stack switches", "Vue.js → React, MySQL → PostgreSQL"],
    ["TOEIC", "860"],
    ["Lesson learned", "Keep tests and specs in sync"],
  ],
};
