"use client";

import { cn } from "@/lib/cn";
import Magnetic from "../magnetic/Magnetic";
import { buttonRoot } from "./components/button.variants";
import type { ButtonProps } from "./types/button.types";

/** Primary pill CTA. Mirrors IconButton's href/onClick duality and its
 *  Magnetic nesting - an outer Magnetic on the control itself, an inner one
 *  on just the label for extra pull. */
const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className,
}) => {
  const classes = cn(buttonRoot, className);
  const label = <Magnetic>{children}</Magnetic>;

  const linkComponent = (
    <a href={href} className={classes}>
      {label}
    </a>
  );

  const buttonComponent = (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );

  return <Magnetic>{href ? linkComponent : buttonComponent}</Magnetic>;
};

export default Button;
