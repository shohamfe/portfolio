export interface StageHeaderProps {
  /** The header shows the site name, which is the page's heading only until the
   *  page supplies one of its own - two h1s leave agents and screen readers
   *  without a single subject for the page. */
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
