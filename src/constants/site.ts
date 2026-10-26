export const JOB_TITLE = "Product Engineer";

/** Identity and outbound links. Single source for anything that appears in
 *  metadata, the header, and the footer. */
export const SITE = {
  name: "Shoham Fellner",
  role: `${JOB_TITLE}++`,
  tagline: "// From concept to experience",
  description: `${JOB_TITLE} specializing in building complex, data-heavy React applications, with a product manager's mindset, a UX designer's eye and ownership from discovery to production.`,
} as const;

/** Hosted in Drive, not /public, so updating the resume needs no redeploy. */
export const CV_URL =
  "https://drive.google.com/uc?export=download&id=1bshm4cDbZNEBwKdSMiETJSaEMb6sv3m8";

/** Goes through /api/cv, not CV_URL directly - Drive 403s on fetch(). */
export const CV_API_PATH = "/api/cv";

/** Search keyword targets for the root metadata's `keywords` field. */
export const SITE_KEYWORDS = [
  "Shoham Fellner",
  "Product Engineer",
  "Full-Stack Developer",
  "Frontend Developer",
  "React Developer",
  "TypeScript",
  "UX/UI Designer",
  "Portfolio",
] as const;

/** Absolute base for og:image/twitter:image URLs, since scrapers have no page context.
 *  Falls back to Vercel's injected production host, then localhost for local dev. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const LINKS = {
  email: "mailto:shoham.fe@gmail.com",
  phone: "tel:+972508882689",
  linkedin: "https://www.linkedin.com/in/shoham-fe",
  github: "https://github.com/ShohamFe",
  figma:
    "https://www.figma.com/design/l5phLfD82JdpZIZ2up9XPr/Shoham-Fellner-Resume?node-id=49-1160&t=IqXtCEdOPYhCn5Th-1",
} as const;

/** Display strings for the contact line; LINKS carries the href-formatted versions. */
export const CONTACT = {
  email: "shoham.fe@gmail.com",
  phone: "050-8882689",
} as const;

/** Public GA4 measurement ID - not a secret, safe to ship in client code. */
export const GA_MEASUREMENT_ID = "G-Q2MY5GERZT";

/** Coarse location for structured data - locality and country only, never a
 *  street address. */
export const LOCATION = {
  locality: "Tel Aviv",
  country: "IL",
} as const;

export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/case-study", label: "Case Study" },
  { href: "/resume", label: "Resume" },
] as const;

/** Every indexable route, including the ones kept out of ROUTES. Single source
 *  for the sitemap, llms.txt and the markdown representations. */
export const SITE_PAGES = [
  {
    href: "/",
    label: "Home",
    summary:
      "Introduction, what I care about building, how I work, and the tech stack I reach for.",
    priority: 1,
  },
  {
    href: "/resume",
    label: "Resume",
    summary:
      "Full professional timeline - roles, projects, education and skills - with a downloadable CV.",
    priority: 0.9,
  },
  {
    href: "/about",
    label: "About",
    summary:
      "Longer-form background: how I got into frontend, the problems I like, and how I work with design.",
    priority: 0.7,
  },
  {
    href: "/contact",
    label: "Contact",
    summary:
      "How to reach me, what I am available for, and what to include so I can answer usefully.",
    priority: 0.7,
  },
  {
    href: "/case-study",
    label: "Case Study",
    summary:
      "Four projects in depth - the problem, the constraints, what shipped, and what I would change.",
    priority: 0.9,
  },
  {
    href: "/privacy",
    label: "Privacy",
    summary:
      "What this site measures, which third parties see it, and how to opt out.",
    priority: 0.3,
  },
] as const;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
