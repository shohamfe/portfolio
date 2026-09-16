export interface StageHeaderProps {
  /** Steps the site name down from h1, for pages that bring their own. */
  pageHasOwnHeading?: boolean;
}

export interface ScrollStageProps extends StageHeaderProps {
  /** Page name the stage, body and scroller element ids are built from; the
   *  page's own <main> owns the bare name. */
  id: string;
  className?: string;
  scrollerClassName?: string;
  children: React.ReactNode;
}
