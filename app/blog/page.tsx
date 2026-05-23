import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { HeroBlog } from "@/components/hero-blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutoriales y guías de reparaciones del hogar en Argentina. Electricidad, plomería, gas y electrodomésticos.",
  alternates: {
    canonical: "https://blog.reparacionessimplesdelhogar.com.ar/blog",
  },
};

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
      Cargando artículos...
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<Loading />}>
      <HeroBlog posts={posts} />
    </Suspense>
  );
}
