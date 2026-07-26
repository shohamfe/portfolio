import type { TechFolder, TechFolderSheet } from "@/constants/tech";

export type SheetSide = "left" | "right";

export interface FolderProps {
  folder: TechFolder;
  className?: string;
}

export interface FolderSheetProps {
  id: string;
  sheet: TechFolderSheet;
  side: SheetSide;
}

export interface FolderBodyProps {
  id: string;
  logo: string;
}
