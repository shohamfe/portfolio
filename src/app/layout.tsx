import type { Metadata } from "next";
import { Syne, Google_Sans_Flex, Google_Sans_Code, Inter } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";

/* Only the weights the Figma styles actually use are requested. Syne needs
   three (400/700/800) so its variable file is the smaller single download;
   the other three families need one weight each and ship as static cuts. */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

/* Next has no metrics for Google Sans Flex yet, so it cannot synthesise a
   size-matched fallback. Declaring the fallback explicitly silences the build
   warning and keeps the swap from falling through to an unstyled serif. */
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  fallback: ["ui-monospace", "Consolas", "monospace"],
  adjustFontFallback: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    type: "website",
  },
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${googleSansFlex.variable} ${googleSansCode.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preloaded so the cursor images are already decoded by first paint —
            without this, the browser may still show its default cursor for a
            beat until each image finishes loading. This doesn't fully
            eliminate the delay: most browsers only repaint a custom cursor on
            an actual mousemove, which is a platform behaviour no amount of
            preloading or CSS can override. */}
        <link rel="preload" as="image" href="/cursors/arrow.svg" />
        <link rel="preload" as="image" href="/cursors/pointer.svg" />
        <link rel="preload" as="image" href="/cursors/hand.svg" />
        <link rel="preload" as="image" href="/cursors/grab.svg" />
      </head>
      {/* h-full (not min-h-full) plus overflow-hidden locks the document to
          exactly the viewport height — nothing on the page scrolls except the
          specific regions that opt in with their own overflow-y. */}
      <body className="flex h-full flex-col overflow-hidden">{children}</body>
    </html>
  );
};

export default RootLayout;
