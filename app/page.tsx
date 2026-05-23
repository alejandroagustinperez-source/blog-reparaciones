import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a5f] shadow-lg shadow-[#1e3a5f]/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[#1e3a5f] sm:text-5xl">
          Reparaciones Simples del Hogar
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
          Guías prácticas y tutoriales para reparar tu casa en Argentina.
          Electricidad, plomería, gas y electrodomésticos explicados paso a paso.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-8 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c]"
          >
            Ver artículos
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
