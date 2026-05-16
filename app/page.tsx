import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Reparaciones Simples del Hogar
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 max-w-lg">
          Guías prácticas y tutoriales para reparar tu casa en Argentina.
          Electricidad, plomería, gas y electrodomésticos.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-base font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Ver artículos
        </Link>
      </main>
    </div>
  );
}
