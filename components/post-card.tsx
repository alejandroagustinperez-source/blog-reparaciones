import Link from "next/link";
import { CategoryIcon, CategoryBadge, getCategoryLabel } from "@/components/category-icon";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  image?: string;
};

export function PostCard({ slug, title, description, date, category, readingTime, image }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/blog/${slug}`} className="relative block h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={getCategoryLabel(category)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <CategoryIcon category={category} className="h-full w-full" />
        )}
        <span className="absolute top-3 left-3">
          <CategoryBadge category={category} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs text-gray-400">{date}</time>
        <h2 className="mt-2 text-lg font-bold leading-snug text-[#1e3a5f]">
          <Link href={`/blog/${slug}`} className="hover:text-[#f97316] transition-colors">
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-gray-400">{readingTime}</span>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#f97316] hover:text-[#ea580c] transition-colors"
          >
            Leer más
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
