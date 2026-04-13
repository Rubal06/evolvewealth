import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
