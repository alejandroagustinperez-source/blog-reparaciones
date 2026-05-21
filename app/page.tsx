import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a3a6b] shadow-lg shadow-[#1a3a6b]/20">
          <span className="text-3xl">🔧</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Reparaciones Simples del Hogar
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-600">
          Guías prácticas y tutoriales para reparar tu casa en Argentina.
          Electricidad, plomería, gas y electrodomésticos explicados paso a paso.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f07020] px-8 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#d95f15]"
          >
            Ver artículos
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
