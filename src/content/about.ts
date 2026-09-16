import { LINKS, LOCATION } from "@/constants/site";
import type { ProsePageProps } from "@/components/prosePage/types/prosePage.types";

/** Copy for the About page. Kept out of the components so the text can be
 *  edited without touching JSX. */
export const ABOUT_CONTENT: ProsePageProps = {
  title: "About",
  lede: "// Software Developer++, frontend oriented",
  sections: [
    {
      id: "about-summary",
      title: "Summary",
      paragraphs: [
        "I am Shoham Fellner, a software developer with a frontend focus, specializing in building complex, data-heavy React applications. My background is equally split between engineering and UX/UI, which means I tend to take ownership of a feature from the first Figma frame through to the version running in production.",
        `I am based in ${LOCATION.locality}, Israel, and I work mostly in React and TypeScript on products where the hard part is the data: many sources, large volumes, and users who need an answer quickly.`,
      ],
    },
    {
      id: "about-work",
      title: "The problems I take on",
      paragraphs: [
        "Most recently I led frontend development on a mission-critical React and SAP system that replaced a legacy platform, built inside an Agile team and used to drive annual procurement decisions.",
        "The work that interests me looks like that: a multi-source dashboard where every widget fetches, caches and parses its own data so it can load and fail independently; tables that render tens of thousands of rows with virtualization and server-side pagination; schema-driven forms that encode real business logic instead of a flat list of inputs.",
        "That kind of system is rarely solved on the client alone, so I spend a fair amount of time with backend engineers on schema and data-contract design, shaping the payload before it becomes a state management problem.",
      ],
    },
    {
      id: "about-design",
      title: "Design to production",
      paragraphs: [
        "I design the interfaces I build. In practice that means user research, wireframes and a Figma design system, then the components, the state, and the edge cases nobody drew.",
        "Owning both ends removes the usual translation loss between a design file and a shipped screen, and it makes trade-offs cheaper to discuss: when a layout is expensive to render or a flow has a state the mock never covered, the conversation happens once rather than across two teams.",
      ],
    },
    {
      id: "about-ai",
      title: "AI-assisted engineering",
      paragraphs: [
        "I work with AI-assisted engineering and autonomous agents as part of the normal development loop, mainly Claude Code, MCP servers and agentic workflows.",
        "I treat agents as another interface to a codebase: they need clear structure, honest documentation and machine-readable entry points, the same things that make a project pleasant for a new human developer. This site is built the same way, which is why pages like this one exist as plain server-rendered text.",
      ],
    },
    {
      id: "about-elsewhere",
      title: "Elsewhere",
      links: [
        {
          label: "Resume",
          href: "/resume",
          description:
            "Full timeline of roles, projects and education, with a downloadable CV.",
        },
        {
          label: "Contact",
          href: "/contact",
          description: "Email, phone and what to include in a first message.",
        },
        {
          label: "GitHub",
          href: LINKS.github,
          description: "Code and side projects.",
          external: true,
        },
        {
          label: "LinkedIn",
          href: LINKS.linkedin,
          description: "Professional background and history.",
          external: true,
        },
      ],
    },
  ],
};
