import { CONTACT, LINKS } from "@/constants/site";
import { FaFigma, FaGithub, FaLinkedin } from "react-icons/fa6";
import { PiEnvelopeSimple, PiPhone } from "react-icons/pi";

/** Shared by the desktop header and the mobile nav's Connect panel, so the two
 *  can never drift apart on which channels are offered or how they are labelled. */
export const CONTACT_ITEMS = [
  {
    href: LINKS.email,
    text: CONTACT.email,
    label: "Email Shoham",
    copyLabel: "Copy email address",
    icon: <PiEnvelopeSimple aria-hidden />,
  },
  {
    href: LINKS.phone,
    text: CONTACT.phone,
    label: "Call Shoham",
    copyLabel: "Copy phone number",
    icon: <PiPhone aria-hidden />,
  },
];

export const SOCIAL_LINKS = [
  { href: LINKS.linkedin, label: "LinkedIn profile", icon: <FaLinkedin /> },
  { href: LINKS.github, label: "GitHub profile", icon: <FaGithub /> },
  { href: LINKS.figma, label: "Figma profile", icon: <FaFigma /> },
];
