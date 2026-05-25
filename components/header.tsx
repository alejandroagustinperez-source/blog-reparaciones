import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e3a5f]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <span className="hidden sm:block text-sm font-semibold leading-tight">
            <span className="text-[#1e3a5f]">Reparaciones Simples del</span>{" "}
            <span className="text-[#f97316]">Hogar</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
          <a href="https://reparacionessimplesdelhogar.com.ar" className="hover:text-[#f97316] transition-colors">Inicio</a>
          <Link href="/blog" className="text-[#f97316] transition-colors">Blog</Link>
          <a href="https://reparacionessimplesdelhogar.com.ar/herramientas" className="hover:text-[#f97316] transition-colors">Herramientas</a>
          <a href="https://reparacionessimplesdelhogar.com.ar/ebook" className="hover:text-[#f97316] transition-colors">Ebook</a>
          <a href="https://reparacionessimplesdelhogar.com.ar/contacto" className="hover:text-[#f97316] transition-colors">Contacto</a>
          <a href="https://reparacionessimplesdelhogar.com.ar/profesionales" className="hover:text-[#f97316] transition-colors">Planes para Profesionales</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://facebook.com/reparacionessimplesdelhogar" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-500 hover:text-[#1e3a5f] transition-colors" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://instagram.com/reparacionessimplesdelhogar" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-gray-500 hover:text-[#1e3a5f] transition-colors" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a
            href="https://reparacionessimplesdelhogar.com.ar/asistente-ia"
            className="rounded-lg bg-[#f97316] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c]"
          >
            Probar asistente IA
          </a>
        </div>
      </div>
    </header>
  );
}
