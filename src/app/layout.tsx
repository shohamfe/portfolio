import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  Syne,
  Google_Sans_Flex,
  Google_Sans_Code,
  Inter,
  Heebo,
} from "next/font/google";
import GAClickTracker from "@/components/analytics/GAClickTracker";
import ViewportReveal from "@/components/viewportReveal/ViewportReveal";
import { MOBILE_QUERY } from "@/constants/mobile";
import {
  GA_MEASUREMENT_ID,
  SITE,
  SITE_KEYWORDS,
  SITE_URL,
} from "@/constants/site";
import { buildPageMetadata } from "@/lib/pageMetadata";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

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

// Hebrew fallback: browser picks per-character, so Latin stays in Google Sans Flex.
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords: [...SITE_KEYWORDS],
  ...buildPageMetadata({
    path: "/",
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
  }),
};

// viewport-fit=cover required for env(safe-area-inset-*) to work on iOS.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${googleSansFlex.variable} ${googleSansCode.variable} ${inter.variable} ${heebo.variable} h-dvh bg-white antialiased`}
    >
      <head>
        {/* Hides the document before first paint at mobile widths, where the
            server has no way to know it rendered the wrong tree; ViewportReveal
            clears it once the client has picked. Raw and inline because
            next/script's beforeInteractive is deferred into the __next_s queue,
            which drains after paint - too late to gate anything. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(window.matchMedia('${MOBILE_QUERY}').matches){document.documentElement.style.visibility='hidden'}}catch(e){}`,
          }}
        />

        {/* llms.txt v2: points agents at the index that describes this page. */}
        <link rel="describedby" href="/llms.txt" />

        <link rel="preload" as="image" href="/cursors/arrow.svg" />
        <link rel="preload" as="image" href="/cursors/pointer.svg" />
        <link rel="preload" as="image" href="/cursors/hand.svg" />
        <link rel="preload" as="image" href="/cursors/grab.svg" />
      </head>
      <body className="flex h-dvh flex-col overflow-hidden">
        {children}
        <ViewportReveal />
        <GAClickTracker />
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
};

export default RootLayout;
