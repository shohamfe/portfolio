/** Identity and outbound links. Single source for anything that appears in
 *  metadata, the header, and the footer. */
export const SITE = {
  name: "Shoham Fellner",
  role: "Software Developer++",
  tagline: "From concept to experience",
  description:
    "Software Developer (Frontend Oriented) with 4+ years of experience building complex, data-heavy React applications, with a strong UX/UI background and ownership from Figma to production.",
  cvPath: "/Shoham-Fellner-CV.pdf",
} as const;

/** Absolute base for generated metadata URLs. og:image and twitter:image are
 *  fetched by scrapers that have no page context, so they must be absolute -
 *  Next resolves them against this.
 *
 *  Read from the environment rather than hardcoded: Vercel injects the
 *  production host itself, so this is correct on a deploy without anyone
 *  maintaining it. Set NEXT_PUBLIC_SITE_URL to override once a custom domain
 *  is pointed at the site. The localhost fallback only ever applies to local
 *  dev, where nothing is scraping the page anyway. */
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

/** Display strings for the contact line - LINKS carries the href-formatted
 *  versions (tel: needs E.164, not the local 050- format people read). */
export const CONTACT = {
  email: "shoham.fe@gmail.com",
  phone: "050-8882689",
} as const;

/** Public GA4 measurement ID - not a secret, safe to ship in client code. */
export const GA_MEASUREMENT_ID = "G-Q2MY5GERZT";

/** Nav order matches the Figma header. Portfolio is intentionally absent
 *  while it is still a stub - the route and its page are left in place, so
 *  restoring it is a matter of adding the entry back here. */
export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
] as const;
