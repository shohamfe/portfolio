export interface TypewriterProps {
  /** Cycles through in order, typing each out then deleting it before moving
   *  to the next. Loops forever. */
  words: readonly string[];
  className?: string;
}
