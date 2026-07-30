import { CONTACT, LINKS } from "@/constants/site";
import {
  PiEnvelopeSimple,
  PiFigmaLogo,
  PiGithubLogo,
  PiLinkedinLogo,
  PiPhone,
} from "react-icons/pi";

export const EXTERNAL_LINKS = [
  { href: LINKS.linkedin, label: "LinkedIn profile", icon: <PiLinkedinLogo /> },
  { href: LINKS.github, label: "GitHub profile", icon: <PiGithubLogo /> },
  { href: LINKS.figma, label: "Figma profile", icon: <PiFigmaLogo /> },
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
