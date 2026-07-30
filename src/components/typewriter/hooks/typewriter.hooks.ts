"use client";

import { useEffect, useState } from "react";
import { DELETING_MS, PAUSE_MS, TYPING_MS } from "../constants/typewriter.constants";

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
    const next = isDeleting
      ? text.slice(0, -1)
      : word.slice(0, text.length + 1);
    const timer = setTimeout(() => setText(next), delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words]);

  return text;
};
