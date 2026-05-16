import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

const categoryConfig: Record<string, { label: string; icon: string; bg: string }> = {
  electricidad: { label: "Electricidad", icon: "🔌", bg: "bg-blue-50" },
  plomeria: { label: "Plomería", icon: "🚿", bg: "bg-emerald-50" },
  gas: { label: "Gas", icon: "🔥", bg: "bg-orange-50" },
  electrodomesticos: { label: "Electrodomésticos", icon: "🏠", bg: "bg-zinc-100" },
};

export function PostCard({ slug, title, description, date, category }: PostCardProps) {
  const config = categoryConfig[category] ?? { label: "General", icon: "📝", bg: "bg-zinc-100" };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      <div className={`flex items-center gap-3 ${config.bg} px-5 pt-5 pb-3`}>
        <span className="text-2xl">{config.icon}</span>
        <span className="text-sm font-medium text-zinc-600">{config.label}</span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <time className="text-xs text-zinc-400">{date}</time>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-zinc-900 group-hover:text-primary transition-colors">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            Leer más
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
