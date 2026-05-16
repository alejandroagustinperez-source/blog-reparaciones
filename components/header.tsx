import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground hover:text-primary transition-colors">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm text-white">
            🛠️
          </span>
          Reparaciones Simples
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <a href="https://www.reparacionessimplesdelhogar.com.ar" className="hover:text-primary transition-colors">
            Inicio
          </a>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
