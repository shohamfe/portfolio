import { LINKS } from "@/constants/site";
import { PiFigmaLogo, PiGithubLogo, PiHouse, PiReadCvLogo } from "react-icons/pi";
import type { MobileNavItem } from "../types/mobileNav.types";

export const NAV_ITEMS: readonly MobileNavItem[] = [
  { href: "/", label: "Home", icon: <PiHouse /> },
  { href: "/resume", label: "Resume", icon: <PiReadCvLogo /> },
  {
    href: LINKS.github,
    label: "Github",
    icon: <PiGithubLogo />,
    external: true,
  },
  { href: LINKS.figma, label: "Figma", icon: <PiFigmaLogo />, external: true },
];
