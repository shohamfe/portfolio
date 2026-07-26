import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Our type scale adds text-h1 … text-tiny as font sizes. Without registering
 *  them, tailwind-merge reads `text-body` as a colour and silently drops any
 *  `text-<colour>` that appears earlier in the same class list. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h5", "code", "body", "small", "tiny"] }],
    },
  },
});

/** Merges class lists so a caller's utility always beats the component's
 *  default, instead of both landing and the cascade picking a winner. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
