import { TECH_FOLDERS } from "@/constants/tech";

/** The folder shown on the error screen, matching the design. */
export const ERROR_FOLDER =
  TECH_FOLDERS.find((techFolder) => techFolder.id === "react") ??
  TECH_FOLDERS[0];
