import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Syne, Google_Sans_Flex, Google_Sans_Code, Inter, Heebo } from "next/font/google";
import GAClickTracker from "@/components/analytics/GAClickTracker";
import { GA_MEASUREMENT_ID, SITE, SITE_URL } from "@/constants/site";
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

/* Google Sans Flex has no Hebrew glyphs, so Hebrew text in body copy (the
   resume's "שנת שירות") fell through to whatever generic Hebrew face the
   browser happened to substitute - visibly mismatched against the Latin text
   around it. Heebo is appended as a fallback in --font-body rather than
   applied to any specific element: the browser resolves per character, using
   the first font in the stack that actually has a glyph for it, so Latin
   text keeps rendering in Google Sans Flex and only the Hebrew characters
   fall through to Heebo - no need to split the string into separate spans. */
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

/* The og:image, favicon and Apple icon are not declared here - Next picks up
   opengraph-image.jpg, icon.svg, favicon.ico and apple-icon.png from this
   directory by filename and emits the tags itself, reading each image's real
   dimensions rather than trusting a hand-written width/height.

   metadataBase is what makes those generated URLs absolute; scrapers fetch
   them with no page context, so a relative path would simply fail to
   resolve. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE.name} - ${SITE.role}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
  },
  /* summary_large_image, not the default summary: without it the card renders
     the image as a small square thumbnail beside the text rather than the
     full-bleed 1200x630 banner it was designed as. */
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
  },
};

/** viewport-fit=cover, not Next's own default: without it, every
 *  env(safe-area-inset-*) used below (the mobile nav, the bottom sheet)
 *  resolves to 0px on iOS - Safari only extends the page under the
 *  notch/home-indicator area, and hands out those insets, once a page opts
 *  in with this. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${googleSansFlex.variable} ${googleSansCode.variable} ${inter.variable} ${heebo.variable} h-dvh antialiased`}
    >
      <head>
        {/* Preloaded so the cursor images are already decoded by first paint -
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
      {/* h-dvh (not h-full/min-h-full), on both html and body: a percentage
          height here would depend on the initial containing block resolving
          correctly through two more percentage layers below it (html then
          body), and iOS Safari does not reliably keep that chain in sync
          with the real visual viewport while its own toolbar is animating -
          the failure mode is the page quietly growing past the visible
          screen with no way back, since overflow-hidden then has nothing
          correctly-sized left to clip. dvh is a hard viewport measurement,
          not a cascaded percentage, so it does not depend on that chain at
          all. Plus overflow-hidden, this locks the document to exactly the
          viewport height - nothing on the page scrolls except the specific
          regions that opt in with their own overflow-y. */}
      <body className="flex h-dvh flex-col overflow-hidden">
        {children}
        <GAClickTracker />
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
};

export default RootLayout;
