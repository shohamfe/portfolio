import { CONTACT, GA_MEASUREMENT_ID, LINKS } from "@/constants/site";
import type { ProsePageProps } from "@/components/prosePage/types/prosePage.types";

export const PRIVACY_LAST_UPDATED = "2026-09-16";

/** Copy for the Privacy page. Kept out of the components so the text can be
 *  edited without touching JSX. */
export const PRIVACY_CONTENT: ProsePageProps = {
  title: "Privacy",
  lede: "// What this site measures, and what it does not",
  sections: [
    {
      id: "privacy-summary",
      title: "The short version",
      paragraphs: [
        "This is a personal portfolio site for Shoham Fellner. It has no accounts, no login, no contact form, no comments and no payments, so there is nothing here for you to sign up to and no personal details for you to hand over.",
        "The only measurement running is Google Analytics 4, plus the request logs that any web host keeps. Nothing collected here is sold, rented or shared with data brokers or advertisers.",
      ],
    },
    {
      id: "privacy-analytics",
      title: "Google Analytics",
      paragraphs: [
        `The site loads Google Analytics 4 under measurement ID ${GA_MEASUREMENT_ID}. Google receives the usual web analytics signals on each page view: the page you opened, the page or search that referred you, rough device, browser and screen information, a coarse location derived from your IP address, and a randomly generated identifier stored in a cookie so repeat visits can be counted as one visitor.`,
        "I use it to see which pages people actually read and on what kind of device. I never see your name, your email or your exact location through it, and Google's own handling of that data is governed by their terms rather than by this page.",
      ],
    },
    {
      id: "privacy-clicks",
      title: "Click tracking",
      paragraphs: [
        "On top of page views, a single delegated click listener records two custom events and sends them to the same Google Analytics property.",
      ],
      bullets: [
        "card_click - fired when you click one of the draggable folders or sticky note cards. It records that element's id, for example which folder was opened.",
        "button_click - fired when you click any other button or link. It records the control's accessible label, its visible text, or its id, for example the label of the CV download button.",
      ],
    },
    {
      id: "privacy-not-collected",
      title: "What the click tracking does not record",
      paragraphs: [
        "The listener reads only the identity of the element you clicked. It does not record keystrokes, mouse movement, scroll position or screen contents, there is no session replay or heatmap tool on this site, and because no page has an input field there is no typed text to capture in the first place.",
      ],
    },
    {
      id: "privacy-storage",
      title: "Storage in your browser",
      paragraphs: [
        "Two small pieces of state are kept in your browser's local storage: where you dragged the folders on the home canvas, and whether you have already seen the one-time hint that explains the canvas. Both exist so the site behaves the way you left it. Neither is sent to me or to anyone else, and clearing your browser data removes them.",
      ],
    },
    {
      id: "privacy-hosting",
      title: "Hosting logs",
      paragraphs: [
        "The site is hosted on Vercel, which keeps standard request logs. A log line contains the path requested, the time, the response status, your IP address and your user agent string. These are operational records used for debugging and abuse prevention, kept and deleted on Vercel's own schedule, and not combined with the analytics data above.",
      ],
    },
    {
      id: "privacy-cv",
      title: "CV downloads",
      paragraphs: [
        "The CV download button does not link straight to a file. It calls an internal route on this site, /api/cv, which fetches the PDF from Google Drive server-side and streams it back to you so the download comes from this domain.",
        "That means your browser never contacts Google Drive for the file and Drive sees the server's request rather than yours. The download still appears in the Vercel request log as a request to /api/cv, and the click on the button is counted as a button_click analytics event like any other button.",
      ],
    },
    {
      id: "privacy-optout",
      title: "Opting out",
      paragraphs: [
        "Any content blocker or privacy-focused browser that blocks Google Analytics will stop the measurement script from loading, and with it every event described above. Google also publishes a browser add-on that opts you out of Analytics across all sites.",
        "To be accurate rather than reassuring: this site does not implement its own handling of Do Not Track or Global Privacy Control headers, so those signals only matter to the extent your browser or Google acts on them. Blocking the script is the reliable option. Nothing on the site breaks when analytics is blocked.",
      ],
    },
    {
      id: "privacy-contact",
      title: "Questions and data requests",
      paragraphs: [
        `If you want to know what has been recorded about a visit, or want analytics data associated with you removed, write to ${CONTACT.email} and say so. I hold no certification and claim no formal compliance programme for this site; it is one person's portfolio, and requests are handled by hand.`,
      ],
      links: [
        {
          label: CONTACT.email,
          href: LINKS.email,
          description: "For anything on this page.",
        },
      ],
    },
  ],
  footnote: `Last updated: ${PRIVACY_LAST_UPDATED}`,
};
