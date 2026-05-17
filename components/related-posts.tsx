import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const borderColors: Record<string, string> = {
  electricidad: "border-l-blue-500",
  plomeria: "border-l-emerald-500",
  gas: "border-l-orange-500",
  electrodomesticos: "border-l-slate-400",
};

const linkColors: Record<string, string> = {
  electricidad: "text-blue-600 hover:text-blue-700",
  plomeria: "text-emerald-600 hover:text-emerald-700",
  gas: "text-orange-600 hover:text-orange-700",
  electrodomesticos: "text-slate-500 hover:text-slate-700",
};

export function RelatedPosts({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const allPosts = getAllPosts();
  const sameCategory = allPosts.filter((p) => p.category === currentCategory && p.slug !== currentSlug);
  const others = allPosts.filter((p) => p.category !== currentCategory && p.slug !== currentSlug);
  const related = [...sameCategory, ...others].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 bg-zinc-50 py-12 -mx-6 px-6 sm:-mx-0 sm:px-0 sm:rounded-none">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">
          También te puede interesar
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => {
            const border = borderColors[p.category] ?? "border-l-amber-400";
            const linkColor = linkColors[p.category] ?? "text-amber-600 hover:text-amber-700";
            return (
              <article
                key={p.slug}
                className={`flex flex-col rounded-lg border border-zinc-200 border-l-4 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${border}`}
              >
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs text-zinc-400">{p.date}</time>
                  <h3 className="mt-1.5 text-base font-bold leading-snug text-zinc-900">
                    <Link href={`/blog/${p.slug}`} className="hover:underline decoration-from-font">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                    {p.description}
                  </p>
                  <div className="mt-auto pt-3">
                    <Link
                      href={`/blog/${p.slug}`}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${linkColor}`}
                    >
                      Leer
                      <span className="text-base leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
