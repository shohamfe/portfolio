import { CONTACT, LINKS } from "@/constants/site";
import { FaFigma, FaGithub, FaLinkedin } from "react-icons/fa6";
import { PiEnvelopeSimple, PiPhone } from "react-icons/pi";

export const EXTERNAL_LINKS = [
  { href: LINKS.linkedin, label: "LinkedIn profile", icon: <FaLinkedin /> },
  { href: LINKS.github, label: "GitHub profile", icon: <FaGithub /> },
  { href: LINKS.figma, label: "Figma profile", icon: <FaFigma /> },
];

export const CONTACT_ITEMS = [
  {
    href: LINKS.email,
    text: CONTACT.email,
    label: "Email Shoham",
    icon: <PiEnvelopeSimple aria-hidden />,
  },
  {
    href: LINKS.phone,
    text: CONTACT.phone,
    label: "Call Shoham",
    icon: <PiPhone aria-hidden />,
  },
];
