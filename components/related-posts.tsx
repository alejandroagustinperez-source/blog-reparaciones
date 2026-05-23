import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { CategoryIcon, CategoryBadge } from "@/components/category-icon";

export function RelatedPosts({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const allPosts = getAllPosts();
  const sameCategory = allPosts.filter((p) => p.category === currentCategory && p.slug !== currentSlug);
  const others = allPosts.filter((p) => p.category !== currentCategory && p.slug !== currentSlug);
  const related = [...sameCategory, ...others].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 py-12">
      <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">
        También te puede interesar
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link href={`/blog/${p.slug}`} className="relative block h-40 overflow-hidden">
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <CategoryIcon category={p.category} className="h-full w-full" />
              )}
              <span className="absolute top-3 left-3">
                <CategoryBadge category={p.category} />
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <time className="text-xs text-gray-400">{p.date}</time>
              <h3 className="mt-1 text-sm font-bold leading-snug text-[#1e3a5f]">
                <Link href={`/blog/${p.slug}`} className="hover:text-[#f97316] transition-colors">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                {p.description}
              </p>
              <div className="mt-auto pt-3">
                <Link
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#f97316] hover:text-[#ea580c] transition-colors"
                >
                  Leer más <span className="text-sm leading-none">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
