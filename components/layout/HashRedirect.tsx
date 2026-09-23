"use client";

import { useEffect } from "react";

export function HashRedirect({ hash }: { hash: string }) {
  useEffect(() => {
    const id = hash.replace(/^#/, "");
    window.location.replace(`/#${id}`);
  }, [hash]);

  return null;
}
