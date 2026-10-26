# Pixel Quest Portfolio

The portfolio of **Shun Miyashita**, full-stack engineer. Explore it like a retro monster-RPG:
press START, then pick PROJECTS, SKILLS, HISTORY or CONTACT from the battle menu.
In a hurry? The **QUICK VIEW** button shows everything on one screen.

## Stack

- React + TypeScript, built with Vite
- Plain CSS (no UI library) and self-hosted pixel fonts via Fontsource
- Pixel sprites drawn on `<canvas>`, sound effects synthesized with the Web Audio API
- Vitest + Testing Library for unit and UI tests
- GitHub Actions runs type checks, tests and a production build on every push

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # watch mode
npm run build      # type check + production build into dist/
```

## Editing content

All text lives in [`src/content.ts`](src/content.ts), typed by [`src/types.ts`](src/types.ts).
Add a project, skill or job there and the site and tests pick it up.
Set `contact.email` to show an email row with a copy button.

## Project structure

```
src/
  App.tsx            screen flow, menu state, keyboard controls
  content.ts         all portfolio content
  components/        title screen, battle screen, panel, sprite, confetti
  panels/            projects, skills, history, contact, quick view, secret file
  hooks/             typewriter message box
  lib/               sound, sprite data, storage, visit counter
```

## Accessibility

- Every action works from the keyboard: arrows move, Enter selects, Esc goes back
- Message boxes are `aria-live` regions; panels are labelled dialogs
- Animations are turned off when the visitor prefers reduced motion

## Deploy

The site is static. Import the repository on Vercel or Cloudflare Pages;
both detect Vite automatically (build command `npm run build`, output `dist`).

## Hidden extras

Some things only happen if you poke around. Try it.
