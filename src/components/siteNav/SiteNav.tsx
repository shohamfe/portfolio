"use client";

import { usePathname } from "next/navigation";
import { PiEnvelopeSimple, PiFigmaLogo, PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";
import IconButton from "@/components/iconButton/IconButton";
import Magnetic from "@/components/magnetic/Magnetic";
import NavPill from "@/components/navPill/NavPill";
import { LINKS, ROUTES } from "@/constants/site";
import { cn } from "@/lib/cn";
import type { SiteNavProps } from "./types/siteNav.types";

const EXTERNAL_LINKS = [
  { href: LINKS.github, label: "GitHub profile", icon: <PiGithubLogo /> },
  { href: LINKS.linkedin, label: "LinkedIn profile", icon: <PiLinkedinLogo /> },
  { href: LINKS.figma, label: "Figma profile", icon: <PiFigmaLogo /> },
  { href: LINKS.email, label: "Email Shoham", icon: <PiEnvelopeSimple /> },
];

/** Route pills plus the external profile links. Shared by Home and Resume. */
const SiteNav: React.FC<SiteNavProps> = ({ className }) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={cn("flex items-center gap-6", className)}>
      <ul className="flex items-center gap-2">
        {ROUTES.map((route) => (
          <li key={route.href}>
            <Magnetic>
              <NavPill href={route.href} active={pathname === route.href}>
                {route.label}
              </NavPill>
            </Magnetic>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-2">
        {EXTERNAL_LINKS.map((link) => (
          <li key={link.href}>
            <Magnetic>
              <IconButton
                href={link.href}
                aria-label={link.label}
                icon={link.icon}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              />
            </Magnetic>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteNav;
