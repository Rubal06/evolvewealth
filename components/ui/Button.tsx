import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const baseClassName =
  "btn-shimmer inline-flex items-center justify-center rounded-full bg-[var(--cobalt)] px-6 py-3 text-sm font-medium text-white shadow-glow transition duration-300 ease-luxe hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(27,111,255,0.6)]";

export function Button({ href, children, className, onClick, type = "button", disabled = false }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(baseClassName, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(baseClassName, disabled && "cursor-not-allowed opacity-60", className)}>
      {children}
    </button>
  );
}
