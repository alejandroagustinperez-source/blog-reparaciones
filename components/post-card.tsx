import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

const categoryConfig: Record<string, { label: string; icon: string; img: string }> = {
  electricidad: { label: "Electricidad", icon: "⚡", img: "https://picsum.photos/seed/electricidad/800/400" },
  plomeria: { label: "Plomería", icon: "🔧", img: "https://picsum.photos/seed/plomeria/800/400" },
  gas: { label: "Gas", icon: "🔥", img: "https://picsum.photos/seed/gas/800/400" },
  electrodomesticos: { label: "Electrodomésticos", icon: "🏠", img: "https://picsum.photos/seed/electrodomesticos/800/400" },
};

export function PostCard({ slug, title, description, date, category }: PostCardProps) {
  const config = categoryConfig[category] ?? { label: "General", icon: "📝", img: "https://picsum.photos/seed/hogar/800/400" };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${slug}`} className="relative block h-40 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src={config.img}
          alt={config.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg">{config.icon}</span>
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
