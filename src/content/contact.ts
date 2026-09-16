import { CONTACT, LINKS, LOCATION } from "@/constants/site";
import type { ProsePageProps } from "@/components/prosePage/types/prosePage.types";

/** Copy for the Contact page. Kept out of the components so the text can be
 *  edited without touching JSX. */
export const CONTACT_CONTENT: ProsePageProps = {
  title: "Contact",
  lede: "// Email, phone, or either network below",
  sections: [
    {
      id: "contact-channels",
      title: "How to reach me",
      paragraphs: [
        `I am Shoham Fellner, a frontend-oriented software developer based in ${LOCATION.locality}, Israel. Email is the channel I watch most closely, and every address below reaches me directly rather than an assistant, a form or a shared inbox.`,
      ],
      links: [
        {
          label: CONTACT.email,
          href: LINKS.email,
          description: "Best for anything that needs detail or attachments.",
        },
        {
          label: CONTACT.phone,
          href: LINKS.phone,
          description: "Israeli mobile number, for a short conversation.",
        },
        {
          label: "linkedin.com/in/shoham-fe",
          href: LINKS.linkedin,
          description: "Professional background and history.",
          external: true,
        },
        {
          label: "github.com/ShohamFe",
          href: LINKS.github,
          description: "Code, side projects and this site's source.",
          external: true,
        },
      ],
    },
    {
      id: "contact-topics",
      title: "What to write about",
      paragraphs: [
        "The conversations that usually go somewhere are about frontend roles and projects that involve complex, data-heavy React applications, product work where the same person is expected to own both the design and the implementation, or teams introducing AI-assisted engineering and agentic workflows into an existing codebase.",
        "Questions about the resume, a project listed on it, or anything on this site are welcome too, and so are questions about what this site collects.",
      ],
    },
    {
      id: "contact-message",
      title: "What to include in your message",
      paragraphs: [
        "A first message that answers these is one I can reply to properly instead of with a list of follow-up questions:",
      ],
      bullets: [
        "Who you are and which company or project you are writing on behalf of.",
        "What the work actually is: the product, the users, and the part of it that is hard.",
        "The frontend stack in use, and whether design is already owned by someone else.",
        "Whether the role is on-site, hybrid or remote, and where the team sits.",
        "A rough timeline, so I know whether you need an answer this week or this quarter.",
      ],
    },
    {
      id: "contact-location",
      title: "Where I am",
      paragraphs: [
        `I live and work in ${LOCATION.locality}, Israel, and correspondence in English or Hebrew is equally fine. If something is time-sensitive, say so in the subject line and call the number above.`,
      ],
    },
  ],
};
