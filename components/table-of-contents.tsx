"use client";

import { useEffect, useState } from "react";

type TOCItem = { text: string; id: string };

export function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        En este artículo
      </h3>
      <ul className="space-y-2">
        {headings.map(({ text, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-sm leading-snug transition-colors ${
                activeId === id
                  ? "font-medium text-blue-600"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
