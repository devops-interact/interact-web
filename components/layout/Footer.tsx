import Link from "next/link";
import { BrandLogo, BRAND_LOGO_HEIGHT } from "@/components/layout/BrandLogo";
import { getSite } from "@/lib/content";

export function Footer() {
  const { contact, footer, nav } = getSite();

  return (
    <footer className="surface-panel border-t border-[var(--border-panel)]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid gap-12 border border-[var(--border-panel)] md:grid-cols-2 lg:grid-cols-3">
          <div className="border-b border-[var(--border-panel)] p-6 md:border-b-0 md:border-r">
            <p className="font-mono text-[10px] tracking-widest text-muted-panel">PAGES</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-panel hover:text-[var(--text-on-panel)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-[var(--border-panel)] p-6 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] tracking-widest text-muted-panel">
              GET IN TOUCH
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-panel">
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              {contact.location && <li>{contact.location}</li>}
            </ul>
          </div>
          <div className="p-6">
            <BrandLogo variant="onLight" height={BRAND_LOGO_HEIGHT} />
            <p className="mt-4 text-sm text-muted-panel">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
