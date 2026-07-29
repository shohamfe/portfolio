/** Copy for the Home page. Kept out of the components so the text can be
 *  edited without touching JSX. */
export const HOME_CONTENT = {
  passion: {
    title: "My Passion",
    bullets: [
      "Taking a concept and making it the best reality",
      "Working on data-heavy, complex projects",
    ],
  },
  howIWork: {
    title: "How I Work",
    bullets: [
      "See the full picture",
      "Plan the architecture before building",
      "Read the codebase before adding to it",
    ],
  },
  about: {
    title: "About",
    paragraphs: [
      "Led frontend development on a mission-critical React-SAP system replacing a legacy platform.",
      "Experienced in AI-assisted engineering and utilizing autonomous agents (Claude Code, MCP, Agentic Workflows).",
    ],
  },
} as const;
