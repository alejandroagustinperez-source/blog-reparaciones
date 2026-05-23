import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#1e3a5f] text-gray-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              Reparaciones Simples
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Guías prácticas y tutoriales de reparaciones del hogar en Argentina.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Secciones</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="https://www.reparacionessimplesdelhogar.com.ar" className="text-sm text-gray-400 hover:text-white transition-colors">Inicio</a></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><a href="https://www.reparacionessimplesdelhogar.com.ar/herramientas" className="text-sm text-gray-400 hover:text-white transition-colors">Herramientas</a></li>
              <li><a href="https://www.reparacionessimplesdelhogar.com.ar/ebook" className="text-sm text-gray-400 hover:text-white transition-colors">Ebook</a></li>
              <li><a href="https://www.reparacionessimplesdelhogar.com.ar/contacto" className="text-sm text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Categorías</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/blog?categoria=electricidad" className="text-sm text-gray-400 hover:text-white transition-colors">Electricidad</Link></li>
              <li><Link href="/blog?categoria=plomeria" className="text-sm text-gray-400 hover:text-white transition-colors">Plomería</Link></li>
              <li><Link href="/blog?categoria=gas" className="text-sm text-gray-400 hover:text-white transition-colors">Gas</Link></li>
              <li><Link href="/blog?categoria=electrodomesticos" className="text-sm text-gray-400 hover:text-white transition-colors">Electrodomésticos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Redes</h4>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com/reparacionessimplesdelhogar" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/reparacionessimplesdelhogar" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <div className="mt-6">
              <a
                href="https://www.reparacionessimplesdelhogar.com.ar/asistente-ia"
                className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#ea580c]"
              >
                Probar asistente IA
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Reparaciones Simples del Hogar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
