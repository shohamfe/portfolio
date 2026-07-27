"use client";

import { useEffect, useState } from "react";

const TYPING_MS = 70;
const DELETING_MS = 40;
const PAUSE_MS = 1500;

/** Types out each word in turn, pauses, deletes it, then moves to the next -
 *  looping forever. Each render schedules exactly one character-step (or one
 *  state transition) via a single setTimeout, so the whole cycle is driven by
 *  re-renders rather than a persistent interval that would need its own
 *  cleanup bookkeeping. */
export const useTypewriterCycle = (words: readonly string[]): string => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const word = words[index % words.length];

    if (!isDeleting && text === word) {
      const timer = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(timer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((current) => (current + 1) % words.length);
      return;
    }

    const delay = isDeleting ? DELETING_MS : TYPING_MS;
    const next = isDeleting ? text.slice(0, -1) : word.slice(0, text.length + 1);
    const timer = setTimeout(() => setText(next), delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words]);

  return text;
};
