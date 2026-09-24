/** Numbered sections on the home one-pager (in scroll order). */
export const HOME_SECTION_COUNT = 9;

export function formatSectionLabel(
  index: number,
  label: string,
  total: number = HOME_SECTION_COUNT,
): string {
  const n = String(index).padStart(2, "0");
  const t = String(total).padStart(2, "0");
  return `[N. ${n} / ${t}] — > ${label}`;
}
