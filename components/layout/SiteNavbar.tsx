"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/simulator", label: "Simulator" },
  { href: "/shield", label: "Shield" },
  { href: "/milestones", label: "Milestones" },
  { href: "/privacy", label: "Privacy" }
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-6 md:px-8">
      <nav className="mx-auto max-w-7xl rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-extrabold tracking-[-0.08em]">
            EvolveWealth
          </Link>
          <div className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <Button href="/login">Open Vault</Button>
          </div>
          <button
            aria-label="Open navigation menu"
            className="rounded-full border border-[rgba(255,255,255,0.08)] p-2 md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1.5 block h-0.5 w-5 bg-white" />
          </button>
        </div>
        {open && (
          <div className="mt-4 grid gap-3 border-t border-[rgba(255,255,255,0.08)] pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-[var(--text-secondary)]">
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="/login" className="w-full justify-center">
                Open Vault
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
