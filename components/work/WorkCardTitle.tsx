"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]/";

function scramble(text: string, revealed: number) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      if (index < revealed) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

type WorkCardTitleProps = {
  text: string;
  active: boolean;
};

export function WorkCardTitle({ text, active }: WorkCardTitleProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }

    if (!active || reduceMotion) {
      setDisplay(text);
      return;
    }

    let revealed = 0;
    setDisplay(scramble(text, 0));

    tickRef.current = setInterval(() => {
      revealed += 1;
      if (revealed >= text.length) {
        setDisplay(text);
        if (tickRef.current) clearInterval(tickRef.current);
        tickRef.current = null;
        return;
      }
      setDisplay(scramble(text, revealed));
    }, 45);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [active, reduceMotion, text]);

  return (
    <h2
      className={`mt-4 text-xl text-[var(--text-on-panel)] underline-offset-4 transition-[text-decoration] ${
        active ? "underline" : "no-underline"
      }`}
    >
      {display}
    </h2>
  );
}
