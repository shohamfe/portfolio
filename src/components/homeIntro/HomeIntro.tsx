import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import { HOME_CONTENT } from "@/content/home";

const { passion, howIWork, about } = HOME_CONTENT;

const LIST_CLASSES =
  "list-disc pl-5 font-body text-small text-text-muted marker:text-default-400";
const HEADING_CLASSES = "font-display text-h2 font-extrabold text-text-strong";

/** The left-hand column of the Home page: identity, navigation, and the three
 *  short prose sections. Each section is labelled by its own heading so it is
 *  announced as a named landmark rather than an anonymous region. */
const HomeIntro: React.FC = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-h1 font-bold text-text-strong">{SITE.name}</h1>

        <p className="font-display text-h5 text-text-strong">{SITE.role}</p>

        <p className="font-code text-code text-text-muted">{SITE.tagline}</p>

        <SiteNav className="mt-2" />
      </header>

      <hr className="border-border-subtle" />

      <section aria-labelledby="passion-heading" className="flex flex-col gap-2">
        <h2 id="passion-heading" className={HEADING_CLASSES}>
          {passion.title}
        </h2>

        <ul className={LIST_CLASSES}>
          {passion.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-i-work-heading" className="flex flex-col gap-2">
        <h2 id="how-i-work-heading" className={HEADING_CLASSES}>
          {howIWork.title}
        </h2>

        <ul className={LIST_CLASSES}>
          {howIWork.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-heading" className="flex flex-col gap-3">
        <h2 id="about-heading" className={HEADING_CLASSES}>
          {about.title}
        </h2>

        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="font-body text-small text-text-muted">
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  );
};

export default HomeIntro;
