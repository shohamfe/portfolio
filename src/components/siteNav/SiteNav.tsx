"use client";

import IconButton from "@/components/iconButton/IconButton";
import NavPill from "@/components/navPill/NavPill";
import { CONTACT_ITEMS, SOCIAL_LINKS } from "@/constants/contact";
import { ROUTES } from "@/constants/site";
import { cn } from "@/lib/cn";
import { isRouteActive } from "@/lib/routes";
import { usePathname } from "next/navigation";
import type { SiteNavProps } from "./types/siteNav.types";

const SiteNav: React.FC<SiteNavProps> = ({ trailing, className }) => {
  const pathname = usePathname();

  return (
    <div id="site-nav" className={cn("flex flex-col gap-3", className)}>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {CONTACT_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.label}
              className="font-ui text-small text-text-muted hover:text-text-strong inline-flex items-center gap-1.5"
            >
              {item.icon}
              {item.text}
            </a>
          </li>
        ))}
      </ul>

      <nav
        aria-label="Main"
        className="flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <ul className="flex items-center gap-2">
          {ROUTES.map((route) => (
            <li key={route.href}>
              <NavPill
                href={route.href}
                active={isRouteActive(pathname, route.href)}
              >
                {route.label}
              </NavPill>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <IconButton
                href={link.href}
                aria-label={link.label}
                icon={link.icon}
                target="_blank"
                rel="noreferrer"
              />
            </li>
          ))}

          {trailing && <li>{trailing}</li>}
        </ul>
      </nav>
    </div>
  );
};

export default SiteNav;
