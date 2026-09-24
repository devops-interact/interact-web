"use client";

import { useEffect } from "react";
import { resolveLegacyHash } from "@/lib/legacyHashes";

export function LegacyHashRedirect() {
  useEffect(() => {
    const target = resolveLegacyHash(window.location.hash);
    if (!target) return;

    window.history.replaceState(null, "", `/#${target}`);
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView();
    });
  }, []);

  return null;
}
