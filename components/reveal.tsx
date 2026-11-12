"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Aparición escalonada al entrar en pantalla. El contenido es visible por defecto:
 * sólo se oculta (desde JS) si el elemento está debajo del primer pantallazo.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top <= window.innerHeight) return;

    el.classList.add("reveal-pre");
    el.style.setProperty("--rd", `${(index % 3) * 80}ms`);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-run");
        el.classList.remove("reveal-pre");
        io.disconnect();
        window.setTimeout(() => el.classList.remove("reveal-run"), 1200);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
