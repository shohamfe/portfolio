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

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: "300",
  display: "swap",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
