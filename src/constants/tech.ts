import type { IconType } from "react-icons";
import {
  PiArrowsClockwise,
  PiArrowsCounterClockwise,
  PiAtom,
  PiBracketsAngle,
  PiBracketsCurly,
  PiBrowser,
  PiChatCircleText,
  PiCheckSquare,
  PiCloud,
  PiCube,
  PiCursor,
  PiDatabase,
  PiDownloadSimple,
  PiFrameCorners,
  PiGitBranch,
  PiGlobe,
  PiHardDrives,
  PiImage,
  PiKanban,
  PiLightning,
  PiMagicWand,
  PiPackage,
  PiPaintBrush,
  PiPalette,
  PiPath,
  PiPenNib,
  PiPuzzlePiece,
  PiShieldCheck,
  PiSignpost,
  PiSparkle,
  PiSquaresFour,
  PiStack,
  PiStackSimple,
  PiStarFour,
  PiTerminal,
  PiUsersThree,
  PiVectorTwo,
} from "react-icons/pi";

// Catalogue of technology "folders" shown on the Home canvas.
// Each folder is a white folder body carrying a tech logo, backed by two
// coloured sheets. Every sheet carries a small Phosphor icon badge chosen to
// describe something the technology actually does, not just decoration.

export type SheetColor = "pink" | "green" | "yellow" | "grey" | "blue" | "purple";

export interface TechFolderSheet {
  color: SheetColor;
  Icon: IconType;
}

export interface TechFolder {
  id: string;
  label: string;
  logo: string;
  sheets: [TechFolderSheet, TechFolderSheet];
}

// Grid order matches the Figma folder grid (node 49:2193).
export const TECH_FOLDERS: readonly TechFolder[] = [
  {
    id: "react",
    label: "React",
    logo: "/logos/react.png",
    sheets: [
      { color: "blue", Icon: PiAtom },
      { color: "grey", Icon: PiPuzzlePiece },
    ],
  },
  {
    id: "typescript",
    label: "TypeScript",
    logo: "/logos/typescript.png",
    sheets: [
      { color: "blue", Icon: PiShieldCheck },
      { color: "grey", Icon: PiBracketsCurly },
    ],
  },
  {
    id: "javascript",
    label: "JavaScript",
    logo: "/logos/javascript.png",
    sheets: [
      { color: "yellow", Icon: PiLightning },
      { color: "grey", Icon: PiBrowser },
    ],
  },
  {
    id: "nodejs",
    label: "Node.js",
    logo: "/logos/nodejs.png",
    sheets: [
      { color: "green", Icon: PiHardDrives },
      { color: "grey", Icon: PiTerminal },
    ],
  },
  {
    id: "claude",
    label: "Claude",
    logo: "/logos/claude.png",
    sheets: [
      { color: "pink", Icon: PiSparkle },
      { color: "yellow", Icon: PiChatCircleText },
    ],
  },
  {
    id: "html5",
    label: "HTML5",
    logo: "/logos/html5.png",
    sheets: [
      { color: "pink", Icon: PiBracketsAngle },
      { color: "grey", Icon: PiStackSimple },
    ],
  },
  {
    id: "css3",
    label: "CSS3",
    logo: "/logos/css3.png",
    sheets: [
      { color: "blue", Icon: PiPaintBrush },
      { color: "pink", Icon: PiPalette },
    ],
  },
  {
    id: "figma",
    label: "Figma",
    logo: "/logos/figma.png",
    sheets: [
      { color: "purple", Icon: PiFrameCorners },
      { color: "pink", Icon: PiCursor },
    ],
  },
  {
    id: "github",
    label: "GitHub",
    logo: "/logos/github.png",
    sheets: [
      { color: "grey", Icon: PiGitBranch },
      { color: "purple", Icon: PiUsersThree },
    ],
  },
  {
    id: "npm",
    label: "npm",
    logo: "/logos/npm.png",
    sheets: [
      { color: "pink", Icon: PiPackage },
      { color: "grey", Icon: PiDownloadSimple },
    ],
  },
  {
    id: "illustrator",
    label: "Illustrator",
    logo: "/logos/illustrator.png",
    sheets: [
      { color: "yellow", Icon: PiPenNib },
      { color: "grey", Icon: PiVectorTwo },
    ],
  },
  {
    id: "photoshop",
    label: "Photoshop",
    logo: "/logos/photoshop.png",
    sheets: [
      { color: "blue", Icon: PiImage },
      { color: "grey", Icon: PiStackSimple },
    ],
  },
  {
    id: "aws",
    label: "AWS",
    logo: "/logos/aws.png",
    sheets: [
      { color: "yellow", Icon: PiCloud },
      { color: "grey", Icon: PiStack },
    ],
  },
  {
    id: "jira",
    label: "Jira",
    logo: "/logos/jira.png",
    sheets: [
      { color: "blue", Icon: PiKanban },
      { color: "purple", Icon: PiCheckSquare },
    ],
  },
  {
    id: "mui",
    label: "MUI",
    logo: "/logos/mui.png",
    sheets: [
      { color: "blue", Icon: PiSquaresFour },
      { color: "purple", Icon: PiCube },
    ],
  },
  {
    id: "axios",
    label: "Axios",
    logo: "/logos/axios.png",
    sheets: [
      { color: "grey", Icon: PiArrowsClockwise },
      { color: "purple", Icon: PiGlobe },
    ],
  },
  {
    id: "tanstack",
    label: "TanStack",
    logo: "/logos/tanstack.png",
    sheets: [
      { color: "green", Icon: PiDatabase },
      { color: "yellow", Icon: PiArrowsCounterClockwise },
    ],
  },
  {
    id: "react-router",
    label: "React Router",
    logo: "/logos/react-router.png",
    sheets: [
      { color: "pink", Icon: PiSignpost },
      { color: "grey", Icon: PiPath },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    logo: "/logos/gemini.png",
    sheets: [
      { color: "purple", Icon: PiStarFour },
      { color: "blue", Icon: PiMagicWand },
    ],
  },
];
