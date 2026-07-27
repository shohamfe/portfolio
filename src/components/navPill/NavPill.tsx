import Link from "next/link";
import { cn } from "@/lib/cn";
import { navPillVariants } from "./components/navPill.variants";
import type { NavPillProps } from "./types/navPill.types";

/** Header nav item - rounded pill wrapping Next's Link. Active/inactive state
 *  is passed in by the caller (typically derived from usePathname). */
const NavPill: React.FC<NavPillProps> = ({ href, active = false, children, className }) => {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(navPillVariants({ active }), className)}
    >
      {children}
    </Link>
  );
};

export default NavPill;
