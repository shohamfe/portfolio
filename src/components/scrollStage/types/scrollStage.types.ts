export interface ScrollStageProps {
  /** Page name the stage, body and scroller element ids are built from; the
   *  page's own <main> owns the bare name. */
  id: string;
  className?: string;
  scrollerClassName?: string;
  children: React.ReactNode;
}
