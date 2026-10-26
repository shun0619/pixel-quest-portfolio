import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { profile } from "./content";

async function startGame() {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /press start/i }));
  await screen.findByRole("menu", { name: /commands/i });
  return user;
}

describe("title screen", () => {
  it("shows the name and availability", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByText(/open to full-stack roles/i)).toBeInTheDocument();
  });

  it("opens the quick view without starting the game", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /quick view/i }));
    const dialog = screen.getByRole("dialog", { name: "QUICK VIEW" });
    expect(within(dialog).getByText(profile.summary)).toBeInTheDocument();
    for (const h of profile.history) expect(within(dialog).getByText(h.title)).toBeInTheDocument();
  });
});

describe("battle menu", () => {
  it("greets the visitor after pressing start", async () => {
    await startGame();
    expect(await screen.findByText("What will you check out?")).toBeInTheDocument();
  });

  it("lists every project and returns to the menu", async () => {
    const user = await startGame();
    await user.click(screen.getByRole("menuitem", { name: /projects/i }));
    const dialog = screen.getByRole("dialog", { name: "PROJECTS" });
    for (const p of profile.projects) expect(within(dialog).getByText(p.name)).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: /back/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows every skill with its one-liner", async () => {
    const user = await startGame();
    await user.click(screen.getByRole("menuitem", { name: /skills/i }));
    const dialog = screen.getByRole("dialog", { name: "SKILLS" });
    for (const s of profile.skills) {
      expect(within(dialog).getByText(s.name)).toBeInTheDocument();
      expect(within(dialog).getByText(`▸ ${s.line}`)).toBeInTheDocument();
    }
  });

  it("closes a panel with Escape", async () => {
    const user = await startGame();
    await user.click(screen.getByRole("menuitem", { name: /history/i }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("unlocks the hidden file after five pokes", async () => {
    const user = await startGame();
    const foe = screen.getByRole("button", { name: `Poke ${profile.short}` });
    for (let i = 0; i < 5; i++) await user.click(foe);
    expect(await screen.findByRole("dialog", { name: "??? FILE" }, { timeout: 3000 })).toBeInTheDocument();
  });
});

describe("contact", () => {
  it("links to GitHub and LinkedIn", async () => {
    const user = await startGame();
    await user.click(screen.getByRole("menuitem", { name: /contact/i }));
    for (const l of profile.contact.links) {
      expect(screen.getByRole("link", { name: new RegExp(l.label, "i") })).toHaveAttribute("href", l.url);
    }
  });
});
