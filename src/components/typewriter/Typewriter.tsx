"use client";

import {
  typewriterCursor,
  typewriterSrOnly,
} from "./components/typewriter.variants";
import { useTypewriterCycle } from "./hooks/typewriter.hooks";
import type { TypewriterProps } from "./types/typewriter.types";

const Typewriter: React.FC<TypewriterProps> = ({ words, className }) => {
  const text = useTypewriterCycle(words);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text}
        <span className={typewriterCursor}>|</span>
      </span>

      <span className={typewriterSrOnly}>{words[0]}</span>
    </span>
  );
};

export default Typewriter;
