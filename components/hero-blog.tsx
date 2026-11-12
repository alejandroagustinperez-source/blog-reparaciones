"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Droplets, Zap, Flame, Plug, Search } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import type { Post } from "@/lib/posts";

const categories = [
  { key: "", label: "Todos" },
  { key: "electricidad", label: "Electricidad" },
  { key: "plomeria", label: "Plomería" },
  { key: "gas", label: "Gas" },
  { key: "electrodomesticos", label: "Electrodomésticos" },
  { key: "humedad", label: "Humedad" },
];

const ejemplos = [
  "canilla que gotea",
  "lavarropas no centrifuga",
  "salta la térmica",
  "heladera no enfría",
  "humedad en la pared",
];

const wi = (i: number) => ({ ["--i"]: i } as React.CSSProperties);
const dv = (d: number) => ({ ["--d"]: d } as React.CSSProperties);

export function HeroBlog({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [phText, setPhText] = useState("");
  const [phActive, setPhActive] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && categories.some((c) => c.key === cat)) {
      setCategory(cat);
    }
  }, [searchParams]);

  // Placeholder que escribe ejemplos mientras el buscador está vacío y sin foco
  useEffect(() => {
    if (!phActive || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ei = 0;
    let ci = 0;
    let del = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = ejemplos[ei];
      ci += del ? -1 : 1;
      setPhText(w.slice(0, ci));
      let d = del ? 28 : 55;
      if (!del && ci === w.length) { del = true; d = 1500; }
      else if (del && ci === 0) { del = false; ei = (ei + 1) % ejemplos.length; d = 350; }
      timer = setTimeout(tick, d);
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [phActive]);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    heroRef.current.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { "": posts.length };
    posts.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, [posts]);

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
      <section
        ref={heroRef}
        onPointerMove={handleMove}
        className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e]"
      >
        <div className="blob blob-a" aria-hidden="true" />
        <div className="blob blob-b" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div aria-hidden="true">
          <span className="fl fl-1" style={dv(22)}><Droplets size={24} /></span>
          <span className="fl fl-2" style={dv(-30)}><Zap size={24} /></span>
          <span className="fl fl-3" style={dv(-18)}><Flame size={24} /></span>
          <span className="fl fl-4" style={dv(28)}><Plug size={24} /></span>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="fade-down shine inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              📝 Blog
            </span>
            <h1
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.1]"
              aria-label="Guías y soluciones para tu hogar"
            >
              <span className="word" style={wi(0)}>Guías</span>{" "}
              <span className="word" style={wi(1)}>y</span>{" "}
              <span className="word" style={wi(2)}>soluciones</span>{" "}
              <span className="word" style={wi(3)}>para</span>{" "}
              <span className="word hl" style={wi(4)}>tu hogar</span>
            </h1>
            <p className="fade-up mt-4 text-lg text-white/80" style={{ ["--delay"]: "0.55s" } as React.CSSProperties}>
              Aprendé a reparar tu casa con tutoriales paso a paso en español argentino
            </p>

            <div
              className="fade-up mt-8 flex gap-2"
              style={{ ["--delay"]: "0.75s" } as React.CSSProperties}
            >
              <div className="search-glow relative flex-1 rounded-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={phActive && phText ? `Buscar: ${phText}` : "Buscar artículos..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setPhActive(false)}
                  onBlur={() => { if (!query) setPhActive(true); }}
                  aria-label="Buscar artículos"
                  className="w-full rounded-lg border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none"
                />
              </div>
              <button
                onClick={() => {}}
                className="shine rounded-lg bg-[#f97316] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ea580c] hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
              >
                Buscar
              </button>
            </div>

            <div
              className="fade-up mt-6 flex flex-wrap justify-center gap-2"
              style={{ ["--delay"]: "0.95s" } as React.CSSProperties}
            >
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  aria-pressed={category === key}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5 ${
                    category === key
                      ? "pill-active border-[#f97316] bg-[#f97316] text-white shadow-lg shadow-orange-500/30"
                      : "border-white/30 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {label}
                  <span className="ml-1.5 opacity-70">{counts[key] ?? 0}</span>
                </button>
              ))}
            </div>

            <div
              className="fade-up mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90"
              style={{ ["--delay"]: "1.1s" } as React.CSSProperties}
            >
              <span className="live-dot" />
              {posts.length} guías publicadas, con una nueva por día
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <p className="mb-6 text-sm text-gray-500" aria-live="polite">
            {query || category
              ? `${filtered.length} ${filtered.length === 1 ? "guía encontrada" : "guías encontradas"}`
              : "Todas las guías"}
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} index={i} className="flex">
                  <PostCard
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    category={post.category}
                    readingTime={post.readingTime}
                    image={post.image}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="fade-up rounded-xl border border-gray-200 bg-white py-16 text-center">
              <span className="float-slow inline-block text-4xl">🔍</span>
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
