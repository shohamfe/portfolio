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
        title: "Lead Frontend Developer & UX/UI Designer",
        subtitle: "Teleprocessing Corps - IDF (Via Inford-Team)",
        bullets: [
          "Led frontend development within an Agile team, building a mission-critical system that dictates the annual procurement for the IDF Ground Forces.",
          "Architected a multi-source data visualization dashboard where each widget independently fetches, caches, and parses its data (TanStack Query), enabling isolated loading and error states.",
          "Built data tables rendering tens of thousands of rows with list virtualization and server-side pagination.",
          "Engineered dynamic, schema-driven forms with React Hook Form for complex procurement logic.",
          "Partnered with the SAP Gateway backend team on schema and data-contract design to optimize state management and avoid data duplication.",
          "Own the full UX/UI process, from research and Figma design to implementation.",
        ],
      },
      {
        id: "nando-frontend",
        year: "2022",
        title: "Frontend Developer & UX/UI Designer",
        subtitle: "Nando",
        bullets: [
          "Designed and built a React app giving field guards real-time awareness from patrol drones: live video, telemetry (velocity, battery), and drone position with a field-of-view polygon on a Leaflet map.",
          "Connected the responding field guard to what the drone operator sees, serving roughly 20 operators.",
        ],
      },
      {
        id: "nando-integration",
        year: "2020",
        title: "Head of Integration & Training Manager",
        subtitle: "Nando",
        bullets: [
          "Led integration testing of drones, software, and hardware, and designed autonomous flight paths.",
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
          "Core frontend developer from two weeks after October 7 through post-launch development of a public memorial site where families create and share memorial pages for their loved ones.",
          "Built the home page, main search, and the user and memorial creation forms, writing the largest share of frontend code (React, Redux, MUI, Uppy, JWT, i18n multilingual support).",
        ],
      },
      {
        id: "aura-cloud",
        year: "2026",
        title: "Aura Cloud - Cloud Monitoring System",
        href: "https://github.com/giladyavneh/AuraCloud",
        subtitle: "Academic Project",
        bullets: [
          "Led UX/UI and full-stack development (React, Node.js) of a dashboard mapping AWS resource connectivity and surfacing permission mismatches, significantly reducing DevOps investigation time.",
          "Designing an MCP integration so external AI agents can query the system data autonomously.",
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
        title: "B.Sc. Computer Science",
        subtitle:
          "The Academic College of Tel Aviv-Yaffo - Expected October 2026 (final course)",
        bullets: [],
      },
      {
        id: "drone-commander",
        year: "2017 2020",
        title: "Drone Team Commander",
        subtitle: "Combat Intelligence Collection Corps (869)",
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
    color: "purple",
    title: "System Design",
    body: "Designing modular, scalable foundations that grow seamlessly with evolving business requirements.",
  },
  {
    id: "performance",
    chip: "Performance",
    color: "yellow",
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
