/** Copy for the Resume page. Kept out of the components so the text can be
 *  edited without touching JSX. */

export type CardColor = "blue" | "purple" | "pink" | "yellow" | "green";

export interface ResumeEntry {
  id: string;
  /** Left gutter year. Omitted for entries that share the year above them. */
  year?: string;
  title: string;
  subtitle?: string;
  /** Renders the subtitle as a typing/deleting cycle through these words
   *  instead of the static `subtitle` string. Takes priority when present. */
  subtitleWords?: readonly string[];
  /** Rendered as a link when href is present. */
  href?: string;
  bullets: string[];
}

export interface ResumeSection {
  id: string;
  title: string;
  entries: ResumeEntry[];
}

/** Sticky notes scattered down the right-hand side. Placement is decorative,
 *  not tied to the entry each one happens to sit beside. */
export interface ResumeCard {
  id: string;
  chip: string;
  color: CardColor;
  title: string;
  body: string;
}

export const RESUME_SECTIONS: readonly ResumeSection[] = [
  {
    id: "reserved",
    title: "Reserved",
    entries: [
      {
        id: "next",
        year: "2026",
        title: "Present",
        // Last 2 are placeholders - swap for whatever reads best.
        subtitleWords: [
          "Reserved",
          "Your Company's name",
          "This Company",
          "Insert Company Here",
          "TBD, Inc.",
        ],
        bullets: [],
      },
    ],
  },
  {
    id: "experience",
    title: "Professional Experience",
    entries: [
      {
        id: "teleprocessing",
        year: "2024",
        title: "Product Engineer",
        subtitle: "IDF Teleprocessing Corps (via Inford Team)",
        bullets: [
          "Owned front-end development (React, TypeScript) of a mission-critical IDF system end to end, partnering with PMs and users to take complex features from product discovery through production and post-release iteration.",
          "Architected a multi-source data visualization dashboard of reusable widgets that each fetch, cache, and parse their data (TanStack Query), enabling isolated loading and error states.",
          "Engineered high-scale data tables (tens of thousands of rows via list virtualization and server-side pagination) alongside dynamic, JSON schema-driven forms (React Hook Form) for complex procurement logic.",
          "Collaborated with PMs and backend engineers on schema design. Proposed and shipped a Gantt view replacing a 36-column table spec, solving user pain points with zero backend changes.",
        ],
      },
      {
        id: "nando-frontend",
        year: "2022",
        title: "Front-End Developer & UX/UI Designer",
        subtitle: "Nando",
        bullets: [
          "Designed and engineered a Realtime events React app giving field guards real-time awareness from patrol drones: live video, telemetry (velocity, battery), and drone position with a field-of-view polygon on a Leaflet map.",
          "Took the app from UX/UI design to production, connecting drone operators with responding field guards.",
        ],
      },
      {
        id: "nando-integration",
        year: "2020",
        title: "Head of Integration & Training Manager",
        subtitle: "Nando",
        bullets: [
          "Led integration and testing of drones, software, and hardware, and designed autonomous flight paths.",
          "Trained and certified new command-room drone operators, bridging R&D and operations.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Volunteering and Projects",
    entries: [
      {
        id: "octseven",
        year: "2023",
        title: "OctSeven.com - October 7 Memorial Site",
        subtitle: "Volunteer Project",
        href: "https://octseven.com",
        bullets: [
          "Core front-end developer from two weeks after October 7 through post-launch development of a public memorial site where families create and share memorial pages for their loved ones.",
          "Developed the home page, main layout, and the user and memorial creation forms, writing the largest share of front-end code (React, Redux, MUI, Uppy, JWT, i18next, RTL and multilingual support).",
        ],
      },
      {
        id: "aura-cloud",
        year: "2025",
        title: "Aura Cloud - Cloud Resources Monitoring System",
        href: "https://github.com/giladyavneh/AuraCloud",
        subtitle: "Academic Project",
        bullets: [
          "Architected and led full-stack development (React, TypeScript, Node.js) of Aura Cloud, a SaaS developer tool for AWS observability that maps resource connectivity and surfaces permission mismatches, cutting DevOps investigation time.",
          "Designed the system's core data/status model: a single-source-of-truth resolver distinguishing code bugs from cloud environment/permission errors across a microservices backend (crawlers, Redis cache, API server) and the dashboard.",
          "Built an MCP server exposing system data as tools, enabling LLM-based AI agents to query it autonomously.",
        ],
      },
      {
        id: "service-year",
        year: "2016 2017",
        title: "Service Year (שנת שירות)",
        subtitle: "The Hebrew Scouts Movement in Israel",
        bullets: [],
      },
    ],
  },
  {
    id: "education",
    title: "Education & Military Service",
    entries: [
      {
        id: "bsc",
        year: "2026",
        title: "B.Sc. Computer Science",
        subtitle: "The Academic College of Tel Aviv-Yaffo",
        bullets: [],
      },
      {
        id: "drone-commander",
        year: "2017 2020",
        title: "Drone Team Commander",
        subtitle: "Combat Intelligence Corps (869)",
        bullets: [
          "Commanded a drone team for visual intelligence collection.",
          "Awarded a certificate for operational success.",
        ],
      },
    ],
  },
];

export const RESUME_CARDS: readonly ResumeCard[] = [
  {
    id: "impact",
    chip: "Impact",
    color: "blue",
    title: "Purpose-Driven",
    body: "Building digital platforms that matter, connecting people and driving real-world outcomes.",
  },
  {
    id: "scale",
    chip: "Scale",
    color: "purple",
    title: "Enterprise Grade",
    body: "Architecting robust, mission-critical systems designed to handle high volumes of complex data.",
  },
  {
    id: "real-time",
    chip: "Real time",
    color: "pink",
    title: "Live Data Streams",
    body: "Engineering seamless data flows for immediate situational awareness and fast decision-making.",
  },
  {
    id: "methodology",
    chip: "Methodology",
    color: "yellow",
    title: "AI-Assisted Dev",
    body: "Integrating agentic workflows and AI tools to accelerate the engineering lifecycle from concept to deployment.",
  },
  {
    id: "data",
    chip: "Data",
    color: "green",
    title: "End-to-End",
    body: "Bridging complex database schemas with intuitive interfaces to deliver complete product experiences.",
  },
  {
    id: "architecture",
    chip: "Architecture",
    color: "yellow",
    title: "System Design",
    body: "Designing modular, scalable foundations that grow seamlessly with evolving business requirements.",
  },
  {
    id: "performance",
    chip: "Performance",
    color: "purple",
    title: "Heavy Data Handling",
    body: "Optimising memory management and caching to keep massive datasets feeling instantly responsive.",
  },
  {
    id: "execution",
    chip: "Execution",
    color: "blue",
    title: "Agile Delivery",
    body: "Moving rapidly and independently from initial concepts straight through to production environments.",
  },
];
