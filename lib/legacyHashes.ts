/** Old numbered anchors → current semantic section ids */
export const LEGACY_HASH_MAP: Record<string, string> = {
  "section-01": "home",
  "section-02": "services",
  "section-05": "process",
  "section-08": "clients",
  "section-09": "engagement",
  "section-11": "studio",
};

export function resolveLegacyHash(hash: string): string | null {
  const id = hash.replace(/^#/, "");
  return LEGACY_HASH_MAP[id] ?? null;
}
