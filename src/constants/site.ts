/** `?role=frontend` swaps the role copy below to "Frontend Developer" phrasing. */
export const ROLE_QUERY_PARAM = "role";
export const ROLE_QUERY_VALUE = "frontend";

export const ROLE_LABELS = {
  default: { primary: "Software Developer", secondary: "Frontend Oriented" },
  frontend: { primary: "Frontend Developer", secondary: null },
} as const;

export const resolveRoleLabel = (roleParam: string | string[] | undefined) =>
  roleParam === ROLE_QUERY_VALUE ? ROLE_LABELS.frontend : ROLE_LABELS.default;

export const getSiteDescription = (roleLabel: {
  primary: string;
  secondary: string | null;
}) =>
  `${roleLabel.secondary ? `${roleLabel.primary} (${roleLabel.secondary})` : roleLabel.primary} with 4+ years of experience building complex, data-heavy React applications, with a strong UX/UI background and ownership from Figma to production.`;

export const getRoleTitle = (roleLabel: {
  primary: string;
  secondary: string | null;
}) => `${roleLabel.primary}++`;

/** Identity and outbound links. Single source for anything that appears in
 *  metadata, the header, and the footer. */
export const SITE = {
  name: "Shoham Fellner",
  role: getRoleTitle(ROLE_LABELS.default),
  tagline: "// From concept to experience",
  description: getSiteDescription(ROLE_LABELS.default),
  cvPath: "/Shoham-Fellner-CV.pdf",
} as const;

/** Search keyword targets for the root metadata's `keywords` field. */
export const SITE_KEYWORDS = [
  "Shoham Fellner",
  "Frontend Developer",
  "Software Developer",
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

/** Portfolio route exists but is intentionally left out of nav while it's a stub. */
export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
] as const;
