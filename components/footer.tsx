import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-zinc-900 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm">
          © {new Date().getFullYear()} Reparaciones Simples del Hogar
        </p>
        <a
          href="https://reparacionessimplesdelhogar.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          reparacionessimplesdelhogar.com.ar
        </a>
      </div>
    </footer>
  );
}
