import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader showScrollCue={false} />
      <main className="surface-panel flex flex-1 flex-col items-center justify-center px-6 py-32">
        <p className="font-mono text-[11px] text-muted-panel">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <Link
          href="/"
          className="mt-8 font-mono text-xs tracking-widest underline-offset-4 hover:underline"
        >
          BACK HOME →
        </Link>
      </main>
    </>
  );
}
