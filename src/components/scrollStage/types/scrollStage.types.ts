export interface ScrollStageProps {
  /** Also seeds the body and scroller element ids. */
  id: string;
  className?: string;
  scrollerClassName?: string;
  children: React.ReactNode;
}
