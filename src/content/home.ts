/** Copy for the Home page. Kept out of the components so the text can be
 *  edited without touching JSX. */
export const HOME_CONTENT = {
  passion: {
    title: "My Passion",
    bullets: [
      "Turning a concept into the best reality",
      "Working on data-heavy, complex projects",
    ],
  },
  howIWork: {
    title: "How I Work",
    bullets: [
      "Approaching problems with a comprehensive systemic view",
      "Prioritizing user experience in every development decision",
      "Maintaining a broad perspective on project requirements",
    ],
  },
  about: {
    title: "About",
    paragraphs: [
      "Software Developer specializing in building complex, data-heavy React applications, with a strong UX/UI background and ownership from Figma to production.",
      "Lead frontend developer on a mission-critical React-SAP system replacing a legacy platform.",
      "Experienced in AI-assisted engineering and utilizing autonomous agents (Claude Code, MCP, Agentic Workflows).",
    ],
  },
} as const;
