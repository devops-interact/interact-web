"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TerminalTypewriterProps = {
  text: string;
  /** Changes reset and re-type the text. */
  runKey: string | number;
  speed?: number;
  className?: string;
};

export function TerminalTypewriter({
  text,
  runKey,
  speed = 20,
  className = "",
}: TerminalTypewriterProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion ? text.length : 0);
  const [done, setDone] = useState(!!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(text.length);
      setDone(true);
      return;
    }

    setVisible(0);
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);

    return () => window.clearInterval(id);
  }, [text, runKey, speed, reducedMotion]);

  const shown = text.slice(0, visible);

  return (
    <p className={`font-mono text-xs leading-relaxed text-neutral-400 ${className}`}>
      {shown}
      {!done && !reducedMotion ? (
        <span className="terminal-cursor terminal-glow" aria-hidden>█</span>
      ) : null}
    </p>
  );
}
