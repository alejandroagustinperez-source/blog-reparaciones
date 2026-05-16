import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

const categoryConfig: Record<string, { label: string; icon: string; bg: string }> = {
  electricidad: { label: "Electricidad", icon: "⚡", bg: "from-blue-600 to-blue-700" },
  plomeria: { label: "Plomería", icon: "🔧", bg: "from-cyan-600 to-cyan-700" },
  gas: { label: "Gas", icon: "🔥", bg: "from-orange-600 to-orange-700" },
  electrodomesticos: { label: "Electrodomésticos", icon: "🏠", bg: "from-purple-600 to-purple-700" },
};

export function PostCard({ slug, title, description, date, category }: PostCardProps) {
  const config = categoryConfig[category] ?? { label: "General", icon: "📝", bg: "from-zinc-500 to-zinc-600" };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${slug}`} className="block">
        <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${config.bg}`}>
          <span className="text-5xl">{config.icon}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="rounded-full bg-muted px-2.5 py-1 text-zinc-600">
            {config.label}
          </span>
          <time className="text-zinc-400">{date}</time>
        </div>
        <h2 className="mt-3 text-lg font-semibold leading-snug text-zinc-900 group-hover:text-primary transition-colors">
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
