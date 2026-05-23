"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

const categories = [
  { key: "", label: "Todos" },
  { key: "electricidad", label: "Electricidad" },
  { key: "plomeria", label: "Plomería" },
  { key: "gas", label: "Gas" },
  { key: "electrodomesticos", label: "Electrodomésticos" },
  { key: "humedad", label: "Humedad" },
];

export function HeroBlog({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && categories.some((c) => c.key === cat)) {
      setCategory(cat);
    }
  }, [searchParams]);

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
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              📝 Blog
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Guías y soluciones para tu hogar
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Aprendé a reparar tu casa con tutoriales paso a paso en español argentino
            </p>

            <div className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                />
              </div>
              <button
                onClick={() => {}}
                className="rounded-lg bg-[#f97316] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#ea580c] shadow-sm"
              >
                Buscar
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    category === key
                      ? "bg-[#f97316] border-[#f97316] text-white"
                      : "border-white/30 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
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
                  image={post.image}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
              <span className="text-4xl">🔍</span>
              <p className="mt-4 text-lg font-medium text-gray-900">
                No encontramos artículos para tu búsqueda
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Probá con otro término o filtrá por otra categoría
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
