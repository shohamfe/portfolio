/** Copy for a single project's case study page. The list page's copy lives in
 *  `caseStudy.ts`; this file carries the seven-section spine behind each card. */

import { CASE_STUDY_PROJECTS, type CaseStudyProject } from "./caseStudy";

export interface ProjectVisual {
  caption: string;
  badge: string;
  note: string;
  /** Falls back to a dashed placeholder carrying `placeholder` when absent. */
  image?: string;
  placeholder: string;
}

export interface ProjectProseSection {
  title: string;
  paragraphs: readonly string[];
  /** "lead" sizes the opening paragraph up, for the sections that carry the page. */
  emphasis?: "lead";
  /** Renders as a tinted [TO FILL] box under the paragraphs. */
  todo?: string;
  note?: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  constraint: string;
  decision: string;
  tradeOff: string;
}

export interface ProjectEvidenceItem {
  id: string;
  caption: string;
  image?: string;
  placeholder: string;
}

export interface ProjectDetail {
  eyebrow: string;
  backLabel: string;
  visual: ProjectVisual;
  stakes: ProjectProseSection;
  role: ProjectProseSection;
  problem: ProjectProseSection;
  decisions: { title: string; items: readonly ProjectDecision[] };
  evidence: {
    title: string;
    intro: string;
    items: readonly ProjectEvidenceItem[];
  };
  outcome: ProjectProseSection;
  whatIdChange: ProjectProseSection;
}

const PROCUREMENT_DETAIL: ProjectDetail = {
  eyebrow: "Case Study",
  backLabel: "Selected Work",
  visual: {
    caption: "Requirement planning — catalogue view",
    badge: "Reconstruction",
    note: "Interface reconstructed with generic labels and sample data. Not the production system.",
    image: "/case-study/procurement-planning-system.png",
    placeholder: "[ hero screenshot — Figma frame, English labels ]",
  },
  stakes: {
    title: "The Stakes",
    emphasis: "lead",
    paragraphs: [
      "Roughly twenty people use this system. What they enter becomes the annual procurement plan for the IDF Ground Forces — what gets bought, what gets repaired, what sits in reserve.",
      "The user count is not the measure here. The budget behind each line is. And it replaced the legacy platform outright rather than a module at a time, which meant the new system had to carry the whole planning process on its own from the day it went in.",
    ],
  },
  role: {
    title: "My Role",
    paragraphs: [
      "I led frontend development inside an Agile team and owned the UX/UI process end to end — research, Figma, and the implementation that followed it.",
      "The backend was a separate SAP Gateway team. The data contracts between us were designed together rather than handed down, which is the reason several of the decisions below were possible at all.",
    ],
  },
  problem: {
    title: "The Problem",
    paragraphs: [
      "Procurement planning is not one screen. It is dozens of interlocking views over the same catalogue: requirement tables tens of thousands of rows deep, dashboards pulling from several unrelated sources, and forms whose fields depend on what kind of item you happen to be planning for.",
      "Any one of those, built the obvious way, stalls the entire screen. The work was deciding where to put the boundaries so that no single slow thing could take the rest of the page down with it.",
    ],
  },
  decisions: {
    title: "Decisions",
    items: [
      {
        id: "widget-owns-its-data",
        title: "Every widget owns its own data",
        constraint:
          "The dashboard reads from several unrelated sources, each with its own shape and its own latency.",
        decision:
          "Each widget fetches, caches and parses its own data through TanStack Query, with its own loading and error state.",
        tradeOff:
          "More query keys to keep coherent, and a genuine “refresh everything” has to be built deliberately rather than coming for free. In exchange, one failing source degrades one widget instead of the page.",
      },
      {
        id: "virtualization-and-paging",
        title: "Virtualization on the client, paging on the server",
        constraint:
          "Requirement tables run to tens of thousands of rows, and planners scroll them rather than query them.",
        decision:
          "List virtualization so the DOM only ever holds what is on screen, with pagination handled server-side.",
        tradeOff:
          "Browser find stops working across the full set, and sorting can no longer be done in the client. Both had to move to the server, which is work you sign up for the moment you virtualize.",
      },
      {
        id: "schema-driven-forms",
        title: "Forms generated from a schema, not hand-built",
        constraint:
          "Which fields a planner sees depends on the material type, and the rules behind that change over time.",
        decision:
          "Dynamic, schema-driven forms built on React Hook Form, so a category is data rather than a new screen.",
        tradeOff:
          "A level of indirection between the bug you see and the code that caused it. Worth paying once; not worth paying if the schema had been static.",
      },
      {
        id: "shaping-the-contract",
        title: "Shaping the contract instead of the response",
        constraint:
          "What SAP Gateway returns naturally and what the interface needs are not the same shape.",
        decision:
          "Design the schema and the data contract together with the backend team, rather than reshaping every response in the client.",
        tradeOff:
          "Slower to agree on, and it needs a backend team willing to have the conversation. It kept the same data from living twice in two different shapes.",
      },
    ],
  },
  evidence: {
    title: "Evidence",
    intro:
      "The system itself is not public. What follows is the design work behind it, rebuilt with generic labels and sample data.",
    items: [
      {
        id: "dashboard",
        caption: "Each widget loads and fails on its own.",
        placeholder: "[ dashboard — multi-source widgets ]",
      },
      {
        id: "requirement-table",
        caption: "Tens of thousands of rows, constant scroll cost.",
        placeholder: "[ requirement table — virtualized ]",
      },
      {
        id: "schema-form",
        caption: "Fields resolve from the material type.",
        placeholder: "[ schema-driven form ]",
      },
      {
        id: "architecture",
        caption: "Query boundaries between UI and SAP Gateway.",
        placeholder: "[ architecture diagram ]",
      },
    ],
  },
  outcome: {
    title: "Outcome",
    emphasis: "lead",
    paragraphs: [
      "Delivered as the replacement for the legacy platform, taken from research through to production inside an Agile cycle.",
    ],
    todo: "What state was the system in when you left — live with users, in rollout, in acceptance? One honest sentence. No invented percentages.",
  },
  whatIdChange: {
    title: "What I'd Change",
    paragraphs: [],
    todo: "I have no material for this section yet — it is the one part of the spine I cannot write from your CV, and I am not going to invent it. One or two sentences: something you would build differently knowing what you know now.",
    note: "This is the section that reads as seniority. Juniors present projects with nothing they would redo.",
  },
};

export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {
  "procurement-planning-system": PROCUREMENT_DETAIL,
};

export const getProject = (slug: string): CaseStudyProject | undefined =>
  CASE_STUDY_PROJECTS.find((project) => project.id === slug);

/** Walks forward past projects whose case study is not written yet, so "Next"
 *  can never point at a page that would 404. */
export const getNextProject = (slug: string): CaseStudyProject | undefined => {
  const index = CASE_STUDY_PROJECTS.findIndex((project) => project.id === slug);
  if (index === -1) return undefined;

  for (let step = 1; step < CASE_STUDY_PROJECTS.length; step++) {
    const candidate =
      CASE_STUDY_PROJECTS[(index + step) % CASE_STUDY_PROJECTS.length];
    if (candidate.id in PROJECT_DETAILS) return candidate;
  }

  return undefined;
};
