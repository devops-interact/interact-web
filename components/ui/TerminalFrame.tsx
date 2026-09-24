import { type ReactNode, type Ref } from "react";

type TerminalFrameProps = {
  title: string;
  children: ReactNode;
  status?: string;
  className?: string;
  bodyRef?: Ref<HTMLDivElement>;
  shellProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function TerminalFrame({
  title,
  children,
  status = "● LIVE",
  className = "",
  bodyRef,
  shellProps,
}: TerminalFrameProps) {
  const { className: shellClassName, ...restShell } = shellProps ?? {};

  return (
    <div
      className={`overflow-hidden border border-[#2a2a2a] bg-[#0c0c0c] text-white shadow-[inset_0_0_0_1px_#1f1f1f] ${className}`}
      {...restShell}
    >
      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span className="h-2 w-2 rounded-full bg-[#eab308]" />
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          </span>
          <span className="truncate font-mono text-[10px] tracking-widest text-neutral-500">
            {title}
          </span>
        </div>
        <span className="shrink-0 font-mono text-[9px] tracking-widest text-neutral-500">
          <span className="text-[#a3e635]">{status.charAt(0)}</span>
          {status.slice(1)}
        </span>
      </div>
      <div ref={bodyRef} className={shellClassName} {...restShell}>
        {children}
      </div>
    </div>
  );
}
