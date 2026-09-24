"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getContactMailto, getSite } from "@/lib/content";
import { BrandLogo, NAV_LOGO_HEIGHT } from "./BrandLogo";
import { InteractiveGrid } from "./InteractiveGrid";

function navMatch(href: string, pathname: string, hash: string) {
  if (href === "/") {
    return pathname === "/" && (hash === "" || hash === "home");
  }

  const section = href.startsWith("/#") ? href.slice(2) : null;
  if (section) {
    if (section === "work") {
      return pathname.startsWith("/work") || (pathname === "/" && hash === "work");
    }
    if (section === "about") {
      return pathname === "/about" || (pathname === "/" && hash === "about");
    }
    if (section === "services") {
      return pathname === "/services" || (pathname === "/" && hash === "services");
    }
    if (section === "studio") {
      return pathname === "/studio" || (pathname === "/" && hash === "studio");
    }
    return pathname === "/" && hash === section;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({
  showHeroBand = false,
  showScrollCue = true,
}: {
  showHeroBand?: boolean;
  showScrollCue?: boolean;
}) {
  const { version, nav } = getSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const navItems = nav.filter((item) => item.label !== "CONTACT");

  return (
    <>
      <header className="sticky top-0 z-50 surface-grid border-b border-white/20 text-white">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 md:px-8">
          <div className="flex items-center gap-2">
            <BrandLogo variant="onDark" height={NAV_LOGO_HEIGHT} />
            <span className="hidden border border-white/20 px-1.5 py-0 font-mono text-[8px] leading-6 text-white/50 sm:inline">
              {version}
            </span>
          </div>

          <nav
            className="hidden flex-wrap items-stretch border border-white/20 md:flex"
            aria-label="Main"
          >
            {navItems.map((item) => {
              const active = navMatch(item.href, pathname, hash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-r border-white/20 px-2.5 py-1 font-mono text-[9px] tracking-widest last:border-r-0 md:px-3 ${
                    active
                      ? "bg-white text-black"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item.label === "HOME" && active ? `<${item.label}>` : item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={getContactMailto()}
              className="hidden items-center gap-1.5 border border-white/30 bg-white px-3 py-1 font-mono text-[9px] tracking-widest text-black md:flex"
            >
              <span aria-hidden>↗</span> CONTACT US
            </Link>
            <button
              type="button"
              className="font-mono text-xs md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-black p-6 md:hidden">
            {navItems.map((item) => {
              const active = navMatch(item.href, pathname, hash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 font-mono text-sm ${
                    active ? "bg-white px-2 text-black" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label === "HOME" && active ? `<${item.label}>` : item.label}
                </Link>
              );
            })}
            <Link
              href={getContactMailto()}
              className="mt-4 inline-flex items-center gap-2 border border-white/30 bg-white px-4 py-2 font-mono text-[10px] tracking-widest text-black"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden>↗</span> CONTACT US
            </Link>
          </div>
        )}
      </header>

      {showHeroBand && (
        <div className="relative surface-grid text-white">
          <div className="relative min-h-[220px] md:min-h-[280px]">
            <InteractiveGrid />
            <div className="relative z-10 flex items-end justify-end p-4 md:p-8">
              {showScrollCue && (
                <p className="font-mono text-[9px] tracking-[0.25em] text-white/40">
                  SCROLL FOR MORE ↓
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
