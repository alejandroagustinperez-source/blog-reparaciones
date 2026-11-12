import Link from "next/link";
import {
  Droplets, Zap, Flame, Plug, Cloud, Hammer, ArrowRight, BookOpen, Wrench,
  ShieldCheck, Clock, MapPin, Search, ListChecks, CheckCircle2,
} from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";

const wi = (i: number) => ({ ["--i"]: i } as React.CSSProperties);
const dl = (s: string) => ({ ["--delay"]: s } as React.CSSProperties);

const cats = [
  { key: "plomeria", label: "Plomería", Icon: Droplets, tone: "from-[#2d5a8e]" },
  { key: "electricidad", label: "Electricidad", Icon: Zap, tone: "from-[#1e3a5f]" },
  { key: "gas", label: "Gas", Icon: Flame, tone: "from-[#ea580c]" },
  { key: "electrodomesticos", label: "Electrodomésticos", Icon: Plug, tone: "from-[#16a34a]" },
  { key: "humedad", label: "Humedad", Icon: Cloud, tone: "from-[#0ea5e9]" },
  { key: "carpinteria", label: "Carpintería", Icon: Hammer, tone: "from-[#92400e]" },
];

const problemas = [
  "Canilla que gotea", "Lavarropas que no centrifuga", "Salta la térmica", "Inodoro que pierde agua",
  "Humedad en la pared", "Puerta que no cierra", "Parpadean las luces", "Desagüe tapado",
  "Cerradura trabada", "Gotera en el techo",
];

const pasos = [
  { Icon: Search, t: "Buscá tu problema", d: "Usá el buscador o elegí una categoría. Todo está escrito en español argentino." },
  { Icon: ListChecks, t: "Seguí el paso a paso", d: "Materiales, herramientas y pasos claros, con las causas más comunes primero." },
  { Icon: CheckCircle2, t: "Resolvelo vos", d: "Y si es riesgoso (gas, electricidad), te avisamos cuándo llamar a un matriculado." },
];

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 6);
  const total = posts.length;

  const info = cats.map((c) => {
    const list = posts.filter((p) => p.category === c.key);
    return { ...c, count: list.length, image: list.find((p) => p.image)?.image };
  }).filter((c) => c.count > 0);

  const stats = [
    { n: total, l: "guías publicadas" },
    { n: info.length, l: "categorías" },
    { n: 1, l: "guía nueva por día" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e]">
        <div className="blob blob-a" aria-hidden="true" />
        <div className="blob blob-b" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div aria-hidden="true">
          <span className="fl fl-1"><Droplets size={24} /></span>
          <span className="fl fl-2"><Zap size={24} /></span>
          <span className="fl fl-3"><Flame size={24} /></span>
          <span className="fl fl-4"><Plug size={24} /></span>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <span className="fade-down shine inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <span className="live-dot" />
            Guías nuevas todos los días
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.08]" aria-label="Arreglá tu casa vos mismo, paso a paso">
            <span className="word" style={wi(0)}>Arreglá</span>{" "}
            <span className="word" style={wi(1)}>tu</span>{" "}
            <span className="word" style={wi(2)}>casa</span>{" "}
            <span className="word hl" style={wi(3)}>vos mismo</span>
          </h1>
          <p className="fade-up mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80" style={dl("0.6s")}>
            Guías prácticas y tutoriales para reparar tu hogar en Argentina. Electricidad, plomería, gas y
            electrodomésticos explicados paso a paso, sin vueltas.
          </p>
          <div className="fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={dl("0.8s")}>
            <Link
              href="/blog"
              className="shine inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-8 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-[#ea580c] hover:shadow-xl hover:shadow-orange-500/40"
            >
              Ver artículos <ArrowRight size={18} />
            </Link>
            <a
              href="https://reparacionessimplesdelhogar.com.ar"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-8 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Ir al sitio principal
            </a>
          </div>

          <div className="fade-up mx-auto mt-14 grid max-w-xl grid-cols-3 gap-3" style={dl("1s")}>
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/15 bg-white/10 px-2 py-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white sm:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs text-white/70 sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CINTA DE PROBLEMAS */}
      <div className="overflow-hidden border-y border-gray-200 bg-white py-4" aria-hidden="true">
        <div className="marquee">
          {[...problemas, ...problemas].map((p, i) => (
            <span key={i} className="mx-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f8f9fa] px-4 py-1.5 text-sm font-medium text-[#1e3a5f]">
              <Wrench size={14} className="text-[#f97316]" /> {p}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORÍAS */}
      <section className="bg-[#f8f9fa] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#f97316]">Categorías</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl">¿Qué necesitás arreglar?</h2>
              <p className="mt-3 text-gray-600">Elegí el área y encontrá la guía que resuelve tu problema.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {info.map(({ key, label, Icon, tone, count, image }, i) => (
              <Reveal key={key} index={i}>
                <Link
                  href={`/blog?categoria=${key}`}
                  className="cat-card group relative block h-44 rounded-2xl bg-[#1e3a5f] shadow-md transition-shadow hover:shadow-xl sm:h-56"
                >
                  {image && <img src={image} alt={label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                  <div className={`absolute inset-0 bg-gradient-to-t ${tone} via-black/30 to-transparent opacity-90`} />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                    <Icon size={20} />
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
                    <div>
                      <div className="text-[15px] font-bold leading-tight sm:text-xl">{label}</div>
                      <div className="text-xs text-white/80">{count} {count === 1 ? "guía" : "guías"}</div>
                    </div>
                    <ArrowRight size={20} className="cat-arrow" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMAS GUÍAS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#f97316]">Lo último</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl">Últimas guías</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1 font-semibold text-[#f97316] transition-colors hover:text-[#ea580c]">
                Ver las {total} guías <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.slug} index={i}>
                <PostCard
                  slug={p.slug}
                  title={p.title}
                  description={p.description}
                  date={p.date}
                  category={p.category}
                  readingTime={p.readingTime}
                  image={p.image}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-[#f8f9fa] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#f97316]">Cómo funciona</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl">De problema a solución en 3 pasos</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pasos.map(({ Icon, t, d }, i) => (
              <Reveal key={t} index={i}>
                <div className="tilt-card relative h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                  <span className="num-pop absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
                    {i + 1}
                  </span>
                  <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e3a5f] text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#1e3a5f]">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-3">
          {[
            { Icon: MapPin, t: "Pensado para Argentina", d: "Materiales, marcas y normas que realmente conseguís acá." },
            { Icon: ShieldCheck, t: "Seguridad primero", d: "Te marcamos cuándo es mejor llamar a un profesional matriculado." },
            { Icon: Clock, t: "Siempre actualizado", d: "Sumamos una guía nueva por día con lo que más se busca." },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} index={i}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f97316]">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e3a5f]">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e]">
        <div className="blob blob-a" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <Reveal>
          <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
            <div className="float-slow mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <BookOpen size={26} />
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿No encontrás tu problema?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Buscalo entre todas las guías o consultale a Remi, el asistente del sitio principal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="shine inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-8 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-[#ea580c]"
              >
                Buscar en el blog <ArrowRight size={18} />
              </Link>
              <a
                href="https://reparacionessimplesdelhogar.com.ar"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-8 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Consultar a Remi
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
