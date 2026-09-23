"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getSite } from "@/lib/content";
import { BrandLogo } from "./BrandLogo";
import { InteractiveGrid } from "./InteractiveGrid";

function navMatch(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ showScrollCue = true }: { showScrollCue?: boolean }) {
  const { version, nav } = getSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative surface-grid text-white">
      <div className="relative min-h-[320px] md:min-h-[380px]">
        <InteractiveGrid />
        <div className="relative z-10 flex flex-col gap-8 p-4 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <nav
              className="flex flex-wrap items-stretch border border-white/20"
              aria-label="Main"
            >
              {nav.map((item) => {
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
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-white/30 bg-white px-4 py-2 font-mono text-[10px] tracking-widest text-black"
            >
              <span aria-hidden>↗</span> CONTACT US
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BrandLogo variant="onDark" height={32} />
              <span className="border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white/50">
                {version}
              </span>
            </div>
            {showScrollCue && (
              <p className="hidden font-mono text-[9px] tracking-[0.25em] text-white/40 md:block">
                SCROLL FOR MORE ↓
              </p>
            )}
            <button
              type="button"
              className="font-mono text-xs md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="relative z-20 border-t border-white/10 bg-black p-6 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 font-mono text-sm"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
