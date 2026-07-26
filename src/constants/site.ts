/** Identity and outbound links. Single source for anything that appears in
 *  metadata, the header, and the footer. */
export const SITE = {
  name: "Shoham Fellner",
  role: "Software Developer++",
  tagline: "From concept to experience",
  description:
    "Software Developer with 4+ years of experience building complex, data-heavy React applications, with a strong UX/UI background and ownership from Figma to production.",
  cvPath: "/Shoham-Fellner-CV.pdf",
} as const;

export const LINKS = {
  email: "mailto:shoham.fe@gmail.com",
  linkedin: "https://www.linkedin.com/in/shoham-fe",
  // TODO(shoham): confirm the GitHub handle — not in the Figma file.
  github: "https://github.com/shohamfellner",
  figma: "https://www.figma.com/@shohamfellner",
} as const;

/** Nav order matches the Figma header. Portfolio is a stub until designed. */
export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
] as const;
