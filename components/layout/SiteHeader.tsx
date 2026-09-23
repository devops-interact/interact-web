"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getContactMailto, getSite } from "@/lib/content";
import { BrandLogo } from "./BrandLogo";
import { InteractiveGrid } from "./InteractiveGrid";

function navMatch(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
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

  const navItems = nav.filter((item) => item.label !== "CONTACT");

  return (
    <>
      <header className="sticky top-0 z-50 surface-grid border-b border-white/20 text-white">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 p-4 md:px-8">
          <div className="flex items-center gap-3">
            <BrandLogo variant="onDark" height={28} />
            <span className="hidden border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white/50 sm:inline">
              {version}
            </span>
          </div>

          <nav
            className="hidden flex-wrap items-stretch border border-white/20 md:flex"
            aria-label="Main"
          >
            {navItems.map((item) => {
              const active = navMatch(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-r border-white/20 px-3 py-2 font-mono text-[10px] tracking-widest last:border-r-0 md:px-4 ${
                    active
                      ? "bg-white text-black"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item.label === "HOME" ? `<${item.label}>` : item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={getContactMailto()}
              className="hidden items-center gap-2 border border-white/30 bg-white px-4 py-2 font-mono text-[10px] tracking-widest text-black md:flex"
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 font-mono text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
