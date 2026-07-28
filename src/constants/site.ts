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

/** Nav order matches the Figma header. Portfolio is a stub until designed. */
export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
] as const;
