import { getSite } from "@/lib/content";

export function PartnerStrip() {
  const { partners } = getSite().hero;

  return (
    <div className="grid grid-cols-2 border-t border-[var(--border-panel)] sm:grid-cols-4">
      {partners.map((name) => (
        <div
          key={name}
          className="flex items-center justify-center border-r border-[var(--border-panel)] py-8 last:border-r-0 font-mono text-xs tracking-widest text-muted-panel uppercase"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
