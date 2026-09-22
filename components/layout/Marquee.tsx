import { getSite } from "@/lib/content";

export function Marquee() {
  const { marqueeTags } = getSite();
  const items = [...marqueeTags, ...marqueeTags, ...marqueeTags];

  return (
    <div className="overflow-hidden border-t border-white/10 bg-black py-4">
      <div className="flex w-max animate-marquee gap-12 font-mono text-xs uppercase tracking-widest text-white/50">
        {items.map((tag, i) => (
          <span key={`${tag}-${i}`} className="flex shrink-0 items-center gap-3">
            <span>//</span>
            <span>[{tag}]</span>
            <span>&amp;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
