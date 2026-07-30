"use client";

import { cn } from "@/lib/cn";
import { iconButtonVariants } from "./components/iconButton.variants";
import type { IconButtonProps } from "./types/iconButton.types";
import Magnetic from "../magnetic/Magnetic";

/** Circular icon button used for the GitHub / Figma links in the header. */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  href,
  target,
  rel,
  onClick,
  className,
  ...props
}) => {
  const classes = cn(iconButtonVariants({ size }), className);

  icon = <Magnetic>{icon}</Magnetic>;
  const linkComponent = (
    <a href={href} target={target} rel={rel} className={classes} {...props}>
      {icon}
    </a>
  );

  const buttonComponent = (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {icon}
    </button>
  );

  return <Magnetic>{href ? linkComponent : buttonComponent}</Magnetic>;
};

export default IconButton;
