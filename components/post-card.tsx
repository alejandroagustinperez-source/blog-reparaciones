import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
};

const borderColors: Record<string, string> = {
  electricidad: "border-l-[#1a3a6b]",
  plomeria: "border-l-emerald-600",
  gas: "border-l-[#f07020]",
  electrodomesticos: "border-l-zinc-400",
};

const linkColors: Record<string, string> = {
  electricidad: "text-[#1a3a6b] hover:text-[#f07020]",
  plomeria: "text-emerald-600 hover:text-emerald-700",
  gas: "text-[#f07020] hover:text-[#d95f15]",
  electrodomesticos: "text-zinc-500 hover:text-zinc-700",
};

export function PostCard({ slug, title, description, date, category, readingTime }: PostCardProps) {
  const border = borderColors[category] ?? "border-l-amber-500";
  const linkColor = linkColors[category] ?? "text-amber-600 hover:text-amber-700";

  return (
    <article
      className={`flex flex-col rounded-xl border border-zinc-200 border-l-4 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${border}`}
    >
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs text-zinc-400">{date}</time>
        <h2 className="mt-1.5 text-lg font-bold leading-snug text-zinc-900">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-zinc-400">{readingTime}</span>
          <Link
            href={`/blog/${slug}`}
            className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${linkColor}`}
          >
            Leer artículo
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
