"use client";

import { useEffect, useRef, useState } from "react";

export function NumberCounter({
  value,
  formatter = (next) => `${Math.round(next)}`,
  duration = 900
}: {
  value: number;
  formatter?: (value: number) => string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const from = previousValueRef.current;
    const diff = value - from;

    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextValue = from + diff * eased;
      setDisplay(nextValue);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        previousValueRef.current = value;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return <>{formatter(display)}</>;
}
