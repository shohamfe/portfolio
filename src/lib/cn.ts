import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges class lists so a caller's utility always beats the component's
 *  default, instead of both landing and the cascade picking a winner. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
