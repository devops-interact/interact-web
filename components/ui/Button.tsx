import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "primaryOnPanel" | "outlineOnGrid";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--surface-grid)] border border-[var(--accent)] hover:bg-neutral-200",
  primaryOnPanel:
    "bg-[var(--text-on-panel)] text-[var(--surface-panel)] border border-[var(--text-on-panel)] hover:opacity-90",
  secondary:
    "bg-transparent text-[var(--text-on-panel)] border border-[var(--border-panel-strong)] hover:bg-neutral-100",
  outlineOnGrid:
    "bg-[var(--surface-panel)] text-[var(--text-on-panel)] border border-[var(--border-panel-strong)]",
  ghost: "bg-transparent text-[var(--text-muted-panel)] hover:text-[var(--text-on-panel)]",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showIcon?: boolean;
};

export function Button({
  href,
  children,
  variant = "primaryOnPanel",
  className = "",
  showIcon = true,
}: ButtonProps) {
  const iconBg =
    variant === "primary" || variant === "primaryOnPanel"
      ? "bg-[var(--surface-panel)]"
      : "bg-[var(--text-on-panel)]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 px-5 py-3 text-[10px] font-medium tracking-widest uppercase transition-colors ${styles[variant]} ${className}`}
    >
      {showIcon && (
        <span
          className={`inline-block h-2.5 w-2.5 shrink-0 ${iconBg}`}
          aria-hidden
        />
      )}
      {children}
    </Link>
  );
}
