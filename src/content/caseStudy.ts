/** Copy for the Case Study page. Kept out of the components so the text can
 *  be edited without touching JSX. */

export type CaseStudyAccent = "blue" | "green" | "pink" | "purple" | "yellow";

export interface CaseStudyProject {
  id: string;
  title: string;
  meta: string;
  blurb: string;
  role: string;
  tech: string[];
  /** e.g. "/case-study/octseven.png" */
  image: string;
  accent: CaseStudyAccent;
  link: {
    label: string;
    href: string;
    /** Shown to screen readers in place of the default "coming soon" when
     *  there will never be a link - e.g. a site that's been taken down. */
    unavailableReason?: string;
  };
}

export interface CaseStudyThread {
  id: string;
  title: string;
  body: string;
  accent: CaseStudyAccent;
}

export const CASE_STUDY_INTRO = {
  title: "Selected Work",
  lines: [
    "Four systems in four very different domains.",
    "Some of this work lives behind closed doors,",
    "what I can show you is how it was built, and why.",
  ],
} as const;

export const CASE_STUDY_PROJECTS: readonly CaseStudyProject[] = [
  {
    id: "procurement-planning-system",
    title: "Procurement Planning System",
    meta: "IDF Teleprocessing Corps · via Inford-Team · 2024-2026",
    blurb:
      "Built from scratch to replace the legacy platform behind the Ground Forces' annual budget.",
    role: "Lead Frontend Developer & UX/UI",
    tech: ["React", "TypeScript", "TanStack Query", "SAP Gateway"],
    image: "/case-study/procurement-planning-system.png",
    accent: "blue",
    link: { label: "Design Files", href: "#" },
  },
  {
    id: "live-drone-patrol-console",
    title: "Live Drone Patrol Console",
    meta: "Nando · 2022-2024",
    blurb:
      "Put the responding guard and the command room on the same live picture, from anywhere in the world.",
    role: "Frontend Developer & UX/UI",
    tech: ["React", "Leaflet"],
    image: "/case-study/live-drone-patrol-console.png",
    accent: "green",
    link: { label: "Design Files", href: "#" },
  },
  {
    id: "octseven",
    title: "OctSeven",
    meta: "October 7th Memorial Platform · Volunteer · 2023-2026",
    blurb:
      "A public platform where families build memorial pages for the people they lost. Development started two weeks after October 7th.",
    role: "Core Frontend Developer",
    tech: ["Next.js", "Redux", "MUI"],
    image: "/case-study/octseven.png",
    accent: "pink",
    link: {
      label: "Archive",
      href: "#",
      unavailableReason:
        "the site was retired and its data merged into another platform",
    },
  },
  {
    id: "aura-cloud",
    title: "Aura Cloud",
    meta: "AWS Resource Monitoring · Academic Project · 2026",
    blurb:
      "Maps how AWS resources connect, and surfaces the permission mismatches hiding between them.",
    role: "Full-Stack Developer & UX/UI",
    tech: ["React", "Node.js", "AWS", "MCP"],
    image: "/case-study/aura-cloud.png",
    accent: "purple",
    link: { label: "Source Code", href: "#" },
  },
];

export const COMMON_THREAD_INTRO = {
  title: "The Common Thread",
  body: "Different domains, same way of working.",
} as const;

export const CASE_STUDY_THREADS: readonly CaseStudyThread[] = [
  {
    id: "figma-to-production",
    title: "Figma to production",
    body: "I design in Figma and build in the codebase. Intent survives the trip to production instead of getting lost in the handoff.",
    accent: "yellow",
  },
  {
    id: "data-is-the-hard-part",
    title: "Data is the hard part",
    body: "Thousands of procurement line items, live drone telemetry, AWS topology. State, caching and performance are where the work is.",
    accent: "blue",
  },
  {
    id: "ai-assisted-engineering",
    title: "AI-assisted engineering",
    body: "Claude Code, MCP and agentic workflows - from the Aura Cloud MCP layer to this site itself.",
    accent: "green",
  },
];
