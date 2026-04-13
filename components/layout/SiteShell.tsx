import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/sections/SiteFooter";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian text-[var(--text-primary)]">
      <SiteNavbar />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
