"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    }

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-[var(--cobalt)]"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] h-6 w-6 rounded-full border border-[rgba(27,111,255,0.3)] transition-transform duration-200 ease-out"
        style={{ transform: `translate(${position.x - 8}px, ${position.y - 8}px)` }}
      />
    </>
  );
}
