import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-900 text-zinc-400">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-white">
              <span>🔧</span>
              Reparaciones Simples del Hogar
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Guías prácticas y tutoriales de reparaciones del hogar en Argentina.
              Electricidad, plomería, gas y electrodomésticos.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Secciones
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Categorías
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog?categoria=electricidad" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Electricidad
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=plomeria" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Plomería
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=gas" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Gas
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=electrodomesticos" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Electrodomésticos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} Reparaciones Simples del Hogar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
