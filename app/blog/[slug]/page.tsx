import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getHeadings } from "@/lib/posts";
import { Markdown } from "@/components/markdown";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { HelpfulButtons } from "@/components/helpful-buttons";

const siteUrl = "https://blog.reparacionessimplesdelhogar.com.ar";

type Props = {
  params: Promise<{ slug: string }>;
};

const categoryColors: Record<string, { label: string; bg: string; text: string }> = {
  electricidad: { label: "Electricidad", bg: "bg-blue-100", text: "text-blue-700" },
  plomeria: { label: "Plomería", bg: "bg-emerald-100", text: "text-emerald-700" },
  gas: { label: "Gas", bg: "bg-orange-100", text: "text-orange-700" },
  electrodomesticos: { label: "Electrodomésticos", bg: "bg-zinc-200", text: "text-zinc-700" },
  general: { label: "Mantenimiento", bg: "bg-amber-100", text: "text-amber-700" },
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = categoryColors[post.category] ?? categoryColors.general;
  const headings = getHeadings(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Reparaciones Simples del Hogar",
    },
    publisher: {
      "@type": "Organization",
      name: "Reparaciones Simples del Hogar",
    },
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-600 transition-colors"
        >
          ← Volver al blog
        </Link>

        <div className="mt-6 lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className={`rounded-full px-3 py-1 font-medium ${cat.bg} ${cat.text}`}>
                  {cat.label}
                </span>
                <time className="text-zinc-400">{post.date}</time>
                <span className="text-zinc-300">·</span>
                <span className="text-zinc-400">{post.readingTime}</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-zinc-600">
                {post.description}
              </p>
            </header>

            <div className="my-10">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3023638239005262"
                data-ad-slot="AD_SLOT_1"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>

            <div className="article-content mx-auto max-w-[700px]">
              <Markdown content={post.content} />
            </div>

            <div className="mx-auto mt-12 max-w-[700px]">
              <HelpfulButtons />
            </div>

            <div className="mx-auto mt-12 max-w-[700px]">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3023638239005262"
                data-ad-slot="AD_SLOT_2"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>
          </article>

          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
