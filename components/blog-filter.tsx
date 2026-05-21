"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

const categories = [
  { key: "", label: "Todos" },
  { key: "electricidad", label: "Electricidad" },
  { key: "plomeria", label: "Plomería" },
  { key: "gas", label: "Gas" },
  { key: "electrodomesticos", label: "Electrodomésticos" },
];

const catButton: Record<string, string> = {
  electricidad: "data-[active=true]:bg-[#1a3a6b]/10 data-[active=true]:text-[#1a3a6b] data-[active=true]:border-[#1a3a6b]/30",
  plomeria: "data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-700 data-[active=true]:border-emerald-200",
  gas: "data-[active=true]:bg-[#f07020]/10 data-[active=true]:text-[#f07020] data-[active=true]:border-[#f07020]/30",
  electrodomesticos: "data-[active=true]:bg-zinc-200 data-[active=true]:text-zinc-700 data-[active=true]:border-zinc-300",
};

export function BlogFilter({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [query, category, posts]);

  return (
    <>
      <div className="mb-8 space-y-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-base text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all focus:border-[#f07020] focus:outline-none focus:ring-2 focus:ring-[#f07020]/10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              data-active={category === key}
              onClick={() => setCategory(key)}
              className={`rounded-xl border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 transition-all hover:border-zinc-300 hover:bg-zinc-100 ${
                key === "" && category === ""
                  ? "bg-[#1a3a6b] text-white border-[#1a3a6b]"
                  : ""
              } ${catButton[key] ?? ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              category={post.category}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white py-16 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-4 text-lg font-medium text-zinc-900">
            No encontramos artículos para tu búsqueda
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Probá con otro término o filtrá por otra categoría
          </p>
        </div>
      )}
    </>
  );
}
