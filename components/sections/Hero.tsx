"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SphereMount } from "@/components/three/SphereMount";
import { GlassCard } from "@/components/ui/GlassCard";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const target = event.currentTarget.querySelector("[data-sphere-layer]") as HTMLDivElement | null;
    if (!target) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -14;
    target.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  return (
    <section aria-label="Hero" className="grain-overlay relative isolate min-h-[calc(100vh-96px)] overflow-hidden px-4 pb-16 pt-12 md:px-8 md:pt-14">
      <iframe
        src="https://my.spline.design/backlightbgeffect-281jiWt3z8zF0Qvqr3iLZKIl/"
        frameBorder={0}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          border: "none",
        }}
      />
      <div className="hero-grid-lines absolute inset-0 z-10" />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.12 }}
        className="relative z-10 mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.2fr_0.8fr] md:items-center"
      >
        <div className="relative z-10">
          <motion.div variants={heroVariants} transition={{ duration: 0.6 }} className="relative z-10 mb-6 inline-flex items-center gap-3 rounded-full border border-[rgba(0,245,160,0.3)] bg-[rgba(0,245,160,0.06)] px-4 py-2 text-sm text-[var(--mint)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--mint)]" style={{ animation: "pulseMint 1.8s infinite" }} />
            Finvasia Innovation 2026
          </motion.div>
          <motion.h1 variants={heroVariants} transition={{ duration: 0.65 }} className="relative z-10 font-display text-[40px] font-extrabold leading-[0.95] tracking-[-0.12em] md:text-[64px]">
            Stop Collecting
            <br />
            <span className="text-[var(--cobalt)]">Pennies.</span>
            <br />
            Start Building
            <br />
            <span className="text-[var(--mint)]">Empires.</span>
          </motion.h1>
          <motion.p variants={heroVariants} transition={{ duration: 0.7 }} className="relative z-10 mt-6 max-w-xl text-base font-light leading-8 text-[var(--text-secondary)] md:text-[17px]">
            Replacing addictive cashback with automated micro-investing and real financial empowerment. Built for the generation that deserves better than {"\u20B9"}50 rewards.
          </motion.p>
          <motion.div variants={heroVariants} transition={{ duration: 0.7 }} className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/register">Join the Wealth Revolution {"\u2192"}</Button>
            <a href="/privacy" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--cobalt)]">
              {"\u25B6"} Watch 60-sec Demo
            </a>
          </motion.div>
          <motion.div variants={heroVariants} transition={{ duration: 0.75 }} className="relative z-10 mt-8 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <div className="relative z-10 flex -space-x-3">
              {["AM", "RK", "ZN"].map((initials) => (
                <span key={initials} className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[var(--obsidian-3)] text-xs font-medium text-[var(--text-primary)]">
                  {initials}
                </span>
              ))}
            </div>
            <span>18,400+ Gen-Z investors on the waitlist</span>
          </motion.div>
          <motion.div variants={heroVariants} transition={{ duration: 0.8 }} className="relative z-10 mt-10 grid gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6 sm:grid-cols-3">
            {[
              [`${"\u20B9"}2.4L+`, "avg 10-year return"],
              ["94%", "reduced impulse spending"],
              ["47 days", "avg streak"]
            ].map(([value, label], index) => (
              <div key={label} className={`relative z-10 ${index !== 2 ? "metric-divider" : ""}`}>
                <div className="relative z-10 font-display text-2xl font-extrabold tracking-[-0.08em]">{value}</div>
                <div className="relative z-10 mt-1 text-sm text-[var(--text-secondary)]">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={heroVariants} transition={{ duration: 0.8 }} onMouseMove={handleMove} className="relative z-10 min-h-[540px]">
          <SphereMount />
          <div id="hero-3d-mount" data-scene="wealth-sphere" className="absolute inset-0 z-10 flex items-center justify-center">
            <div data-sphere-layer className="relative z-10 flex h-[420px] w-[420px] items-center justify-center transition-transform duration-300 ease-out">
              <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite]">
                <defs>
                  <radialGradient id="heroSphereGradient">
                    <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#1B6FFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0d1630" stopOpacity="0.95" />
                  </radialGradient>
                  <clipPath id="heroSphereClip">
                    <circle cx="210" cy="210" r="150" />
                  </clipPath>
                </defs>
                <circle cx="210" cy="210" r="150" fill="url(#heroSphereGradient)" />
                <g clipPath="url(#heroSphereClip)" opacity="0.35" stroke="rgba(255,255,255,0.45)" fill="none">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ellipse key={`lat-${index}`} cx="210" cy="210" rx="150" ry={20 + index * 15} />
                  ))}
                  {Array.from({ length: 7 }).map((_, index) => (
                    <ellipse key={`lng-${index}`} cx="210" cy="210" rx={20 + index * 18} ry="150" />
                  ))}
                </g>
              </svg>
              <div className="relative z-10 orbit">
                <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-2)] px-3 py-1 text-xs text-[var(--text-primary)]">{"\u20B9"}50</span>
              </div>
              <div className="relative z-10 orbit delay">
                <span className="absolute bottom-10 left-16 rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-2)] px-3 py-1 text-xs text-[var(--text-primary)]">{"\u20B9"}120</span>
              </div>
              <div className="relative z-10 orbit slow">
                <span className="absolute right-10 top-24 rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-2)] px-3 py-1 text-xs text-[var(--text-primary)]">{"\u20B9"}240</span>
              </div>
            </div>
          </div>
          <GlassCard className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full px-5 py-4">
            <div className="relative z-10 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.04)]">{"\u{1FA99}"}</span>
              <div className="relative z-10">
                <div className="text-sm text-[var(--text-secondary)]">{"\u20B9"}50 cashback</div>
                <div className="font-display text-xl font-extrabold tracking-[-0.08em]">{"\u20B9"}24,600 invested over 10 yrs</div>
              </div>
            </div>
            <span className="text-2xl">{"\u{1F333}"}</span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
