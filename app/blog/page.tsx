import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogFilter } from "@/components/blog-filter";

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
    <div className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Blog de Reparaciones
          </h1>
          <p className="mt-2 text-lg text-zinc-600">
            Todas nuestras guías para reparar tu hogar
          </p>
        </div>
        <BlogFilter posts={posts} />
      </div>
    </div>
  );
}
