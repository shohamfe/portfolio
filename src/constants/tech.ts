// Catalogue of technology "folders" shown on the Home canvas.
// Each folder is a white folder body carrying a tech logo, backed by two
// coloured sheets. Every sheet carries a small Phosphor icon badge chosen to
// describe something the technology actually does (not just decoration).

export type SheetColor = "pink" | "green" | "yellow" | "grey" | "blue" | "purple";

export interface TechFolderSheet {
  color: SheetColor;
  icon: string; // Phosphor export name from react-icons/pi
}

export interface TechFolder {
  id: string;
  label: string;
  logo: string; // public path, e.g. "/logos/react.png"
  sheets: [TechFolderSheet, TechFolderSheet];
}

// Grid order matches the Figma "Folders Grid" (node 49:2193) layout.
export const TECH_FOLDERS: readonly TechFolder[] = [
  {
    id: "react",
    label: "React",
    logo: "/logos/react.png",
    sheets: [
      { color: "blue", icon: "PiAtom" }, // component model / atomic structure
      { color: "grey", icon: "PiPuzzlePiece" }, // composable components
    ],
  },
  {
    id: "typescript",
    label: "TypeScript",
    logo: "/logos/typescript.png",
    sheets: [
      { color: "blue", icon: "PiShieldCheck" }, // type safety
      { color: "grey", icon: "PiBracketsCurly" }, // syntax / type annotations
    ],
  },
  {
    id: "javascript",
    label: "JavaScript",
    logo: "/logos/javascript.png",
    sheets: [
      { color: "yellow", icon: "PiLightning" }, // dynamic, event-driven
      { color: "grey", icon: "PiBrowser" }, // runs in the browser
    ],
  },
  {
    id: "nodejs",
    label: "Node.js",
    logo: "/logos/nodejs.png",
    sheets: [
      { color: "green", icon: "PiHardDrives" }, // server runtime
      { color: "grey", icon: "PiTerminal" }, // CLI / scripting
    ],
  },
  {
    id: "claude",
    label: "Claude",
    logo: "/logos/claude.png",
    sheets: [
      { color: "pink", icon: "PiSparkle" }, // generative AI
      { color: "yellow", icon: "PiChatCircleText" }, // conversational assistant
    ],
  },
  {
    id: "html5",
    label: "HTML5",
    logo: "/logos/html5.png",
    sheets: [
      { color: "pink", icon: "PiBracketsAngle" }, // markup tags
      { color: "grey", icon: "PiStackSimple" }, // document structure
    ],
  },
  {
    id: "css3",
    label: "CSS3",
    logo: "/logos/css3.png",
    sheets: [
      { color: "blue", icon: "PiPaintBrush" }, // styling
      { color: "pink", icon: "PiPalette" }, // colors / theming
    ],
  },
  {
    id: "figma",
    label: "Figma",
    logo: "/logos/figma.png",
    sheets: [
      { color: "purple", icon: "PiFrameCorners" }, // frames / canvas
      { color: "pink", icon: "PiCursor" }, // design tool pointer
    ],
  },
  {
    id: "github",
    label: "GitHub",
    logo: "/logos/github.png",
    sheets: [
      { color: "grey", icon: "PiGitBranch" }, // version control
      { color: "purple", icon: "PiUsersThree" }, // collaboration
    ],
  },
  {
    id: "npm",
    label: "npm",
    logo: "/logos/npm.png",
    sheets: [
      { color: "pink", icon: "PiPackage" }, // packages
      { color: "grey", icon: "PiDownloadSimple" }, // installing dependencies
    ],
  },
  {
    id: "illustrator",
    label: "Illustrator",
    logo: "/logos/illustrator.png",
    sheets: [
      { color: "yellow", icon: "PiPenNib" }, // vector pen tool
      { color: "grey", icon: "PiVectorTwo" }, // vector paths
    ],
  },
  {
    id: "photoshop",
    label: "Photoshop",
    logo: "/logos/photoshop.png",
    sheets: [
      { color: "blue", icon: "PiImage" }, // photo / raster editing
      { color: "grey", icon: "PiStackSimple" }, // layers
    ],
  },
  {
    id: "aws",
    label: "AWS",
    logo: "/logos/aws.png",
    sheets: [
      { color: "yellow", icon: "PiCloud" }, // cloud hosting
      { color: "grey", icon: "PiStack" }, // infrastructure stack
    ],
  },
  {
    id: "jira",
    label: "Jira",
    logo: "/logos/jira.png",
    sheets: [
      { color: "blue", icon: "PiKanban" }, // kanban boards
      { color: "purple", icon: "PiCheckSquare" }, // task tracking
    ],
  },
  {
    id: "mui",
    label: "MUI",
    logo: "/logos/mui.png",
    sheets: [
      { color: "blue", icon: "PiSquaresFour" }, // component grid
      { color: "purple", icon: "PiCube" }, // UI building blocks
    ],
  },
  {
    id: "axios",
    label: "Axios",
    logo: "/logos/axios.png",
    sheets: [
      { color: "grey", icon: "PiArrowsClockwise" }, // requests / retries
      { color: "purple", icon: "PiGlobe" }, // network calls
    ],
  },
  {
    id: "tanstack",
    label: "TanStack",
    logo: "/logos/tanstack.png",
    sheets: [
      { color: "green", icon: "PiDatabase" }, // data fetching / caching
      { color: "yellow", icon: "PiArrowsCounterClockwise" }, // refetching / sync
    ],
  },
  {
    id: "react-router",
    label: "React Router",
    logo: "/logos/react-router.png",
    sheets: [
      { color: "pink", icon: "PiSignpost" }, // navigation
      { color: "grey", icon: "PiPath" }, // routes as paths
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    logo: "/logos/gemini.png",
    sheets: [
      { color: "purple", icon: "PiStarFour" }, // matches the Gemini mark
      { color: "blue", icon: "PiMagicWand" }, // generative AI
    ],
  },
] as const;
