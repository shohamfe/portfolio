import type { ProseSectionProps } from "../types/prosePage.types";
import {
  proseHeading,
  proseLink,
  proseLinkDescription,
  proseLinkList,
  proseList,
  proseParagraph,
  proseSection,
} from "./prosePage.variants";

const ProseSection: React.FC<ProseSectionProps> = ({ section }) => {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={proseSection}
    >
      <h2 id={headingId} className={proseHeading}>
        {section.title}
      </h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className={proseParagraph}>
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className={proseList}>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {section.links && (
        <ul className={proseLinkList}>
          {section.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={proseLink}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>

              {link.description && (
                <p className={proseLinkDescription}>{link.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProseSection;
