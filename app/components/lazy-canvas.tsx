"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

/**
 * Mounts children only when the container enters the viewport.
 * Unmounts when it leaves (with optional margin to keep alive a bit longer).
 */
export default function LazyCanvas({
  children,
  className = "",
  rootMargin = "200px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
