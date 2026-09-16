import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import ProseSection from "./components/ProseSection";
import {
  proseBackLink,
  proseContainer,
  proseFootnote,
  proseHeader,
  proseLede,
  proseRoot,
  proseSections,
  proseTitle,
} from "./components/prosePage.variants";
import { PROSE_BACK_LINK } from "./constants/prosePage.constants";
import type { ProsePageProps } from "./types/prosePage.types";

const ProsePage: React.FC<ProsePageProps> = ({
  title,
  lede,
  sections,
  footnote,
}) => {
  return (
    <main className={proseRoot}>
      <article className={proseContainer}>
        <header className={proseHeader}>
          <Link href={PROSE_BACK_LINK.href} className={proseBackLink}>
            <PiArrowLeft aria-hidden />
            {PROSE_BACK_LINK.label}
          </Link>

          <h1 className={proseTitle}>{title}</h1>

          {lede && <p className={proseLede}>{lede}</p>}
        </header>

        <div className={proseSections}>
          {sections.map((section) => (
            <ProseSection key={section.id} section={section} />
          ))}
        </div>

        {footnote && <p className={proseFootnote}>{footnote}</p>}
      </article>
    </main>
  );
};

export default ProsePage;
