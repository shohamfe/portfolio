"use client";

import { PiArrowRight } from "react-icons/pi";
import { cn } from "@/lib/cn";
import type { InteractiveHoverButtonProps } from "./types/interactiveHoverButton.types";

/** Ported from https://21st.dev/@dillionverma/components/interactive-hover-button.
 *  Original classes (bg-background, bg-primary, text-primary-foreground) swapped
 *  for our surface/accent tokens; lucide-react's ArrowRight swapped for Phosphor.
 *  No cursor utility here — globals.css drives the custom cursors. */
const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "group relative w-auto overflow-hidden rounded-full border border-border-subtle bg-surface-raised p-2 px-6 text-center font-ui font-semibold text-text-strong",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>

      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-accent-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <PiArrowRight aria-hidden />
      </div>
    </button>
  );
};

export default InteractiveHoverButton;
