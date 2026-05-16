import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutoriales y guías de reparaciones del hogar en Argentina. Electricidad, plomería, gas y electrodomésticos.",
  alternates: {
    canonical: "https://blog.reparacionessimplesdelhogar.com.ar/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
            ← Inicio
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
            Blog de Reparaciones
          </h1>
          <p className="mt-2 text-zinc-600">
            Guías prácticas para reparar tu hogar en Argentina
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-zinc-200 pb-8">
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-zinc-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-zinc-600">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                Leer más →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
