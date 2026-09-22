"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  const reduce = useReducedMotion();
  return {
    reduce: !!reduce,
    fadeUp: reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.5 },
        },
    stagger: reduce ? 0 : 0.08,
  };
}
