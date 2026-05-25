"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "https://reparacionessimplesdelhogar.com.ar", external: true },
  { label: "Blog", href: "/blog", external: false },
  { label: "Herramientas", href: "https://reparacionessimplesdelhogar.com.ar/herramientas", external: true },
  { label: "Ebook", href: "https://reparacionessimplesdelhogar.com.ar/ebook", external: true },
  { label: "Contacto", href: "https://reparacionessimplesdelhogar.com.ar/contacto", external: true },
  { label: "Planes para Profesionales", href: "https://reparacionessimplesdelhogar.com.ar/profesionales", external: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-auto min-h-16 max-w-6xl items-center justify-between px-4 py-2 sm:h-16 sm:py-0">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#1e3a5f] flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-semibold leading-tight flex flex-col">
            <span className="text-[#1e3a5f]">Reparaciones Simples</span>
            <span className="text-[#f97316]">del Hogar</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} className={`hover:text-[#f97316] transition-colors ${link.label === "Blog" ? "text-[#f97316]" : ""}`}>{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className="text-[#f97316] transition-colors">{link.label}</Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://reparacionessimplesdelhogar.com.ar/asistente-ia"
            className="hidden sm:inline-flex rounded-lg bg-[#f97316] px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c]"
          >
            ✨ Asistente IA
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center gap-1 w-10 h-10 bg-transparent border-none cursor-pointer"
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} className="py-2.5 text-sm font-medium text-gray-700 hover:text-[#f97316] border-b border-gray-100 last:border-0" onClick={() => setMenuOpen(false)}>{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className="py-2.5 text-sm font-medium text-[#f97316] border-b border-gray-100 last:border-0" onClick={() => setMenuOpen(false)}>{link.label}</Link>
            )
          )}
          <a
            href="https://reparacionessimplesdelhogar.com.ar/asistente-ia"
            className="mt-2 rounded-lg bg-[#f97316] px-4 py-3 text-sm font-semibold text-white text-center hover:bg-[#ea580c]"
            onClick={() => setMenuOpen(false)}
          >
            ✨ Probar asistente IA
          </a>
        </div>
      )}
    </header>
  );
}
