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
  /** Takes over from `image` when set - an autoplaying, muted loop. */
  video?: string;
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
    caption: "Requirement planning - catalogue view",
    badge: "Reconstruction",
    note: "Interface reconstructed with generic labels and sample data. Not the production system.",
    image: "/case-study/procurement-system/main.png",
    placeholder: "[ hero screenshot - Figma frame, English labels ]",
  },
  stakes: {
    title: "The Stakes",
    emphasis: "lead",
    paragraphs: [
      "Roughly twenty people use this system. What they enter becomes the annual procurement plan for the IDF Ground Forces - what gets bought, what gets repaired, what sits in reserve.",
      "The user count is not the measure here. The budget behind each line is. And it replaced the legacy platform outright rather than a module at a time, which meant the new system had to carry the whole planning process on its own from the day it went in.",
    ],
  },
  role: {
    title: "My Role",
    paragraphs: [
      "I led frontend development inside an Agile team and owned the UX/UI process end to end - research, Figma, and the implementation that followed it.",
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
        video: "/case-study/procurement-system/dashboard.mp4",
        placeholder: "[ dashboard - multi-source widgets ]",
      },
      {
        id: "requirement-table",
        caption: "Tens of thousands of rows, constant scroll cost.",
        image: "/case-study/procurement-system/requirement-table.png",
        placeholder: "[ requirement table - virtualized ]",
      },
      {
        id: "schema-form",
        caption: "Fields resolve from the material type.",
        image: "/case-study/procurement-system/schema-form.png",
        placeholder: "[ schema-driven form ]",
      },
      {
        id: "architecture",
        caption: "Query boundaries between UI and SAP Gateway.",
        image: "/case-study/procurement-system/architecture.png",
        placeholder: "[ architecture diagram ]",
      },
    ],
  },
  outcome: {
    title: "Outcome",
    emphasis: "lead",
    paragraphs: [
      "Delivered as the replacement for the legacy platform, taken from research through to production inside an Agile cycle.",
      "The MVP was deployed to production, with planners executing the annual procurement cycle in parallel with the legacy system to validate data integrity and workflows under real-world conditions.",
    ],
  },
  whatIdChange: {
    title: "What I'd Change",
    paragraphs: [
      "I would introduce a Backend-for-Frontend (BFF) layer to offload heavy data parsing. We handled complex calculations on the client due to infrastructure constraints, which introduced unavoidable overhead to initial load times.",
      "Additionally, rather than stretching a rigid SAP Gateway data structure to serve multiple dashboard components, I would enforce purpose-built data contracts. Reusing a single structure across too many contexts added unnecessary complexity to the client-side state.",
    ],
  },
};

const DRONE_DETAIL: ProjectDetail = {
  eyebrow: "Case Study",
  backLabel: "Selected Work",
  visual: {
    caption: "Live console - map, video feed and telemetry",
    badge: "Reconstruction",
    note: "Interface reconstructed with a generic site and an AI-generated drone feed. Not a real client's data.",
    image: "/case-study/drone/main.png",
    placeholder: "[ hero screenshot - map, video feed, telemetry panel ]",
  },
  stakes: {
    title: "The Stakes",
    emphasis: "lead",
    paragraphs: [
      "The responding guard is the site's own security guard. The command room is that same security team's operators, plus the drone pilots - one room, both roles. Used daily, across multiple operational sites.",
      "The drone gives a perspective nobody on the ground has, but a dropped feed isn't a failure state - it's a normal part of operating a drone in the field. The drone itself is built to continue its mission, or return to base if its battery runs low, and both the guard and the command room have other ways to keep working the incident without it.",
    ],
  },
  role: {
    title: "My Role",
    paragraphs: [
      "Solo frontend, owning UX/UI and the implementation. I joined when the product was a single video stream and built it out from there - my first project, taken on as a junior with full ownership of the frontend.",
      "The backend was a separate team: C#/.NET services, MongoDB for user management, and a Node.js API server running in Docker. I built against what they exposed.",
    ],
  },
  problem: {
    title: "The Problem",
    paragraphs: [
      '"Same live picture" was the actual solution, not a description of the problem: the drone operator and the guard needed to see the same event, at the same time, so both could act on the same information. The command room also carries higher permissions than the guard - editing waypoints, gate positions, fences, and flight presets - so the same screen had to serve two different levels of control.',
      "Sites with more than one drone add a second problem on top: a single command-room operator may need to watch and manage several drones at once, each with its own video feed and its own position on the map. The default single-drone view couldn't just stretch to cover that - it needed a dedicated view built for it.",
    ],
  },
  decisions: {
    title: "Decisions",
    items: [
      {
        id: "leaflet-not-my-choice",
        title: "Building on a mapping library I didn't choose",
        constraint:
          "Leaflet was set before I joined, and the client base included sites with far better aerial imagery available than the default map tiles.",
        decision:
          "Layered clustering and custom tile sources on top of Leaflet, so those sites could use their own aerial views instead of the stock map.",
        tradeOff:
          "Built by hand, without a baseline to weigh it against - I never got to compare it with what Mapbox or Google Maps would have handled for free. A real cost, on top of this being my first project.",
      },
      {
        id: "one-view-two-permission-levels",
        title: "One shared view, two permission levels",
        constraint:
          "The guard needs the same live picture as the command room, but only the command room should be able to edit the map.",
        decision:
          "A single interface with permission-gated UI, rather than two separate builds, so both roles stay in sync on the same underlying data.",
        tradeOff:
          "Every map feature has to be designed for two audiences from the start, instead of shipping operator-only tools as a separate track.",
      },
      {
        id: "multi-drone-per-operator",
        title: "One operator, several drones",
        constraint:
          "Sites with more than one drone needed a single command-room operator able to track and manage every one of them at once.",
        decision:
          "A dedicated multi-drone view, built specifically for sites with more than one drone, rather than stretching the single-drone view to cover it.",
        tradeOff:
          "Screen space and attention turned out to be the real constraint, not bandwidth - fitting several live feeds in front of one person was the harder problem.",
      },
    ],
  },
  evidence: {
    title: "Evidence",
    intro:
      "Not a real client's site or footage - a generic area and an AI-generated drone feed stand in for the real interface.",
    items: [
      {
        id: "main-console",
        caption:
          "Guard and command room share this same live view - map, video feed and telemetry together.",
        image: "/case-study/drone/main-console.png",
        placeholder: "[ main console - map, video feed, telemetry ]",
      },
      {
        id: "command-room-editing",
        caption:
          "The command room's added controls - waypoints, gates, fences, flight presets.",
        image: "/case-study/drone/command-room-editing.png",
        placeholder: "[ command room - map editing tools ]",
      },
      {
        id: "mobile-view",
        caption: "The guard's view in the field.",
        image: "/case-study/drone/mobile-view.png",
        placeholder: "[ mobile view - guard in the field ]",
      },
    ],
  },
  outcome: {
    title: "Outcome",
    emphasis: "lead",
    paragraphs: [
      "As of when I left, it was in daily operational use across every deployed site - guards and command rooms working from the same live picture, real incidents included.",
    ],
  },
  whatIdChange: {
    title: "What I'd Change",
    paragraphs: [
      "Move telemetry off polling and onto WebSockets. It was the plan the whole time I was there - it just never landed before I moved on. Polling works, but it's the wrong tool for something this real-time.",
    ],
  },
};

const OCTSEVEN_DETAIL: ProjectDetail = {
  eyebrow: "Case Study",
  backLabel: "Selected Work",
  visual: {
    caption: "Home page - memorial grid",
    badge: "Live Site",
    note: "octseven.com is live and public. Shown here are the grid page and a blank creation form - deliberately not an individual memorial page, out of respect for the families whose stories they hold.",
    image: "/case-study/octseven/main.png",
    placeholder: "[ hero screenshot - home page, profile grid ]",
  },
  stakes: {
    title: "The Stakes",
    emphasis: "lead",
    paragraphs: [
      "Built for the families and friends of the people lost on October 7th, so they could create and share memorial pages for the loved ones they miss - a volunteer initiative, not a company product. Every profile on it represents a family who trusted us with someone they lost.",
      "Being volunteer-built doesn't lower the stakes here - the subject leaves no room for the usual margin of error. A bug that mixed up two people's data, or lost a family's story, wouldn't just be a defect. It would hurt people who chose to hand us these memories directly.",
    ],
  },
  role: {
    title: "My Role",
    paragraphs: [
      "Part of a fully volunteer team from the project's first day to its last, alongside a rotating cast of other developers, plus product, UX/UI, UX writing, QA and DevOps - some there for the duration, some for a stretch. Nobody on the team had worked together before, and we were spread across time zones and technical backgrounds.",
      "I built most of what a visitor actually touches: the home page's profile grid and filtering, the create-profile form, the add-story form, and the profile page itself. Next.js was already chosen before I joined, for its SEO benefit on a public memorial site.",
    ],
  },
  problem: {
    title: "The Problem",
    paragraphs: [
      "The team formed to get a platform live as close to October 7th as possible - strangers, remote, from different technical backgrounds, building toward one deadline with no slack in it.",
      "Speed was the actual constraint, and it didn't let up: every technical choice had to hold up under a team that kept changing shape while the work was still in motion.",
    ],
  },
  decisions: {
    title: "Decisions",
    items: [
      {
        id: "moderation-before-publish",
        title: "A person checks every profile before it goes live",
        constraint:
          "A mix-up on a memorial profile isn't a minor bug - it's someone's trust in what we built with their loved one's memory.",
        decision:
          "A manager reviews every new profile for duplicates and accuracy before it publishes, and a profile's own author has to approve any story someone else adds to it.",
        tradeOff:
          "Nothing goes live instantly - every submission waits on a person, which is slower than an open pipeline, and the right trade on a project where a wrong page is worse than a slow one.",
      },
      {
        id: "schema-driven-forms",
        title: "Forms built from a schema, not hand-coded per case",
        constraint:
          "The create-profile and add-story forms needed to hold up while the team itself kept changing, without every new contributor relearning bespoke form code.",
        decision:
          "Schema-driven forms - the same technique later projects would also lean on.",
        tradeOff:
          "Some indirection between what a form shows and where that's defined - a fair trade against a rotating team that couldn't afford to onboard onto one-off form logic each time someone joined.",
      },
      {
        id: "familiar-over-novel",
        title: "Reaching for the tools everyone already knew",
        constraint:
          "A team of strangers, on a deadline, with people rotating in and out mid-project.",
        decision:
          "Redux and MUI over less familiar alternatives, chosen because they're the industry-standard tools most incoming contributors would already recognize.",
        tradeOff:
          "Neither was necessarily the best technical fit on its own merits - the fit that mattered here was a shared team already knowing them.",
      },
    ],
  },
  evidence: {
    title: "Evidence",
    intro:
      "octseven.com is live - what follows is the grid and a blank form instead of a real memorial page, to protect the families and keep their loved ones' memory in their hands, not a case study.",
    items: [
      {
        id: "home-grid",
        caption: "The full memorial grid, with filtering.",
        image: "/case-study/octseven/home-grid.png",
        placeholder: "[ home page - profile grid ]",
      },
      {
        id: "create-profile-form",
        caption: "The schema-driven form used to create a profile.",
        image: "/case-study/octseven/create-profile-form.png",
        placeholder: "[ create profile - schema-driven form ]",
      },
    ],
  },
  outcome: {
    title: "Outcome",
    emphasis: "lead",
    paragraphs: [
      "Shipped and live at octseven.com, built and launched by a volunteer team that had never worked together before, on a timeline measured in weeks.",
      "The platform is feature-frozen now, and will be retired soon - its data merged into another existing platform, a maintenance-cost decision rather than a product one.",
    ],
  },
  whatIdChange: {
    title: "What I'd Change",
    paragraphs: [
      "The code carries real duplication across the create-profile and add-story forms - a direct cost of a volunteer team that kept changing shape, where consistency across contributors was harder to hold onto than the features themselves. I'd go back and refactor it properly.",
    ],
  },
};

const AURA_CLOUD_DETAIL: ProjectDetail = {
  eyebrow: "Case Study",
  backLabel: "Selected Work",
  visual: {
    caption: "Dashboard - identity permission status",
    badge: "Academic Project",
    note: "Real screenshots from the working app, run locally against our own test AWS account - not a hosted, public product yet.",
    image: "/case-study/aura-cloud/main.png",
    placeholder: "[ hero screenshot - dashboard, permission status ]",
  },
  stakes: {
    title: "The Stakes",
    emphasis: "lead",
    paragraphs: [
      "A year-long academic project, built with two teammates - not a company, though the shape of it could support real usage.",
      "Identity and policy drift apart constantly in a real AWS account, and the two places you'd normally check - IAM policy, and what's actually allowed - rarely agree on their own. Getting that resolution wrong means either missing a real over-permission, or flagging one that isn't real.",
    ],
  },
  role: {
    title: "My Role",
    paragraphs: [
      "A team of three, and I covered the most ground across it: UX/UI, the frontend, the API server, and part of the MCP server - the parts of the system a user or an LLM client actually touches, all reading from the same MongoDB.",
      "My teammates owned the rest: managing our AWS test environment, the crawlers that pull live data from AWS into Redis, and the logic service that reads Redis and writes verdicts back to MongoDB.",
    ],
  },
  problem: {
    title: "The Problem",
    paragraphs: [
      "Aura Cloud resolves something narrower and harder to get right than a resource map: which policies actually apply to a given identity, and whether AWS would allow or deny a specific action once those policies, and the account's cross-account rules, are all applied together.",
      "IAM's own evaluation logic isn't simple. An explicit deny always wins, an unmatched action is denied by default, actions and resources can match on wildcards, and the same-account rule - identity or resource allows it - is not the cross-account rule, where both have to. Reproducing that correctly, not approximately, was the actual work.",
    ],
  },
  decisions: {
    title: "Decisions",
    items: [
      {
        id: "stale-outranks-blocked",
        title: "A stale verdict outranks a blocked one",
        constraint:
          "A permission verdict is only as good as how recently it was computed - and a resource can look blocked when the real cause is that nobody's re-evaluated it recently.",
        decision:
          'Any verdict older than 60 seconds shows as stale, even when the last real answer was "blocked".',
        tradeOff:
          "A genuine active block becomes briefly invisible once it goes stale - deliberate, since we'd rather a user re-check a stale resource than chase a block that's already been fixed.",
      },
      {
        id: "transactional-guard-rail",
        title: "A throwaway write to catch a real race condition",
        constraint:
          "Two requests demoting the last manager of a company at the same time could both succeed, leaving the company with no manager at all - and a plain count-then-check has a window where that race slips through.",
        decision:
          "Force a shared-document write inside a Mongo transaction purely to trigger write-conflict detection, so the second concurrent request fails instead of racing.",
        tradeOff:
          "A write whose only purpose is to make the database catch the race for us - simpler to reason about than managing the lock ourselves, at the cost of looking odd out of context.",
      },
      {
        id: "three-way-identity-split",
        title: "Login identity and AWS identity are two different documents",
        constraint:
          "A customer can sign up before Aura Cloud has discovered anything about them in AWS - the two identities don't necessarily arrive together.",
        decision:
          "Keep Company, Customer (login identity) and User (AWS-discovered identity) as separate documents, linked by an external id, instead of one combined record.",
        tradeOff:
          "Every permission lookup needs an extra hop between documents to resolve - accepted so a customer's account isn't blocked on AWS discovery finishing first.",
      },
    ],
  },
  evidence: {
    title: "Evidence",
    intro:
      "Real screenshots from the working app, run locally against our own test AWS account.",
    items: [
      {
        id: "dashboard",
        caption: "Permission status per identity, resolved from IAM.",
        image: "/case-study/aura-cloud/dashboard.png",
        placeholder: "[ dashboard - permission status ]",
      },
      {
        id: "mcp-tools",
        caption: "The same evaluator, queried conversationally through MCP.",
        image: "/case-study/aura-cloud/mcp-tools.png",
        placeholder: "[ MCP client - permission query ]",
      },
      {
        id: "watchlist",
        caption: "The watchlist a user manages, resources tracked over time.",
        image: "/case-study/aura-cloud/watchlist.png",
        placeholder: "[ watchlist - manage page ]",
      },
      {
        id: "manager-view",
        caption: "A manager's view across the company's users and permissions.",
        image: "/case-study/aura-cloud/manager-view.png",
        placeholder: "[ manager view ]",
      },
    ],
  },
  outcome: {
    title: "Outcome",
    emphasis: "lead",
    paragraphs: [
      "Built end to end over a full academic year: six live crawlers pulling real AWS data through the AWS SDK, a logic service resolving IAM's evaluation rules correctly, a dashboard, and an MCP server exposing the same evaluator to an LLM client.",
      "Done developing. The initial architecture held without a rework from the first version through to now - the one real cost it carries is covered below.",
    ],
  },
  whatIdChange: {
    title: "What I'd Change",
    paragraphs: [
      "Extend coverage to more AWS resource types beyond what's there now - identity-to-policy resolution is solid, and the natural next step is breadth, not a rebuild.",
      "The one real cost in the current design is the extra indirection every permission lookup pays for keeping login and AWS identity separate - worth watching if this ever became a real product rather than a project.",
    ],
  },
};

export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {
  "procurement-planning-system": PROCUREMENT_DETAIL,
  "live-drone-patrol-console": DRONE_DETAIL,
  octseven: OCTSEVEN_DETAIL,
  "aura-cloud": AURA_CLOUD_DETAIL,
};

export const getProject = (slug: string): CaseStudyProject | undefined =>
  CASE_STUDY_PROJECTS.find((project) => project.id === slug);

/** Walks the project loop in the given direction, skipping past any project
 *  whose case study is not written yet, so "Previous"/"Next" can never point
 *  at a page that would 404. */
const walkProjects = (
  slug: string,
  direction: 1 | -1,
): CaseStudyProject | undefined => {
  const count = CASE_STUDY_PROJECTS.length;
  const index = CASE_STUDY_PROJECTS.findIndex((project) => project.id === slug);
  if (index === -1) return undefined;

  for (let step = 1; step < count; step++) {
    const candidate =
      CASE_STUDY_PROJECTS[
        (((index + step * direction) % count) + count) % count
      ];
    if (candidate.id in PROJECT_DETAILS) return candidate;
  }

  return undefined;
};

export const getNextProject = (slug: string): CaseStudyProject | undefined =>
  walkProjects(slug, 1);

export const getPreviousProject = (
  slug: string,
): CaseStudyProject | undefined => walkProjects(slug, -1);
