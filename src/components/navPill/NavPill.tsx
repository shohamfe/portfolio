import Link from "next/link";
import { cn } from "@/lib/cn";
import { navPillVariants } from "./components/navPill.variants";
import type { NavPillProps } from "./types/navPill.types";
import Magnetic from "../magnetic/Magnetic";

const NavPill: React.FC<NavPillProps> = ({
  href,
  active = false,
  children,
  className,
}) => {
  return (
    <Magnetic>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(navPillVariants({ active }), className)}
      >
        <Magnetic>{children}</Magnetic>
      </Link>
    </Magnetic>
  );
};

export default NavPill;
