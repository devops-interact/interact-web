import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";

const LOGO_WIDTH = 938;
const LOGO_HEIGHT = 149;

/** Logo height for footer and default */
export const BRAND_LOGO_HEIGHT = 24;

/** Header nav logo — 25% smaller than BRAND_LOGO_HEIGHT */
export const NAV_LOGO_HEIGHT = 18;

type BrandLogoProps = {
  variant?: "onDark" | "onLight";
  className?: string;
  height?: number;
};

export function BrandLogo({
  variant = "onLight",
  className = "",
  height = BRAND_LOGO_HEIGHT,
}: BrandLogoProps) {
  const { brand, logo } = getSite();
  const src = logo ?? "/interact-logo.png";
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  return (
    <Link
      href="/"
      className={`inline-block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      <Image
        src={src}
        alt={brand}
        width={width}
        height={height}
        className={
          variant === "onDark"
            ? "h-auto w-auto brightness-0 invert"
            : "h-auto w-auto"
        }
        style={{ maxHeight: height, width: "auto" }}
        priority
      />
    </Link>
  );
}
