import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getHeadings } from "@/lib/posts";
import { Markdown } from "@/components/markdown";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { HelpfulButtons } from "@/components/helpful-buttons";
import { RelatedPosts } from "@/components/related-posts";

const siteUrl = "https://blog.reparacionessimplesdelhogar.com.ar";

type Props = {
  params: Promise<{ slug: string }>;
};

const catImg: Record<string, string> = {
  electricidad: "https://picsum.photos/seed/electricidad/1200/600",
  plomeria: "https://picsum.photos/seed/plomeria/1200/600",
  gas: "https://picsum.photos/seed/gas/1200/600",
  electrodomesticos: "https://picsum.photos/seed/electrodomesticos/1200/600",
  humedad: "https://picsum.photos/seed/humedad/1200/600",
};

const catLabel: Record<string, string> = {
  electricidad: "GUÍA DE ELECTRICIDAD",
  plomeria: "GUÍA DE PLOMERÍA",
  gas: "GUÍA DE GAS",
  electrodomesticos: "GUÍA DE ELECTRODOMÉSTICOS",
  humedad: "GUÍA DE HUMEDAD",
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

  const headings = getHeadings(post.content);
  const imgUrl = catImg[post.category] ?? "https://picsum.photos/seed/hogar/1200/600";
  const label = catLabel[post.category] ?? "GUÍA PRÁCTICA";

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

      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        <img
          src={imgUrl}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-1/2 w-full max-w-6xl -translate-x-1/2 px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-[#f97316] px-3 py-1 text-xs font-semibold text-white">
                  {label}
                </span>
                <time className="text-gray-400">{post.date}</time>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">{post.readingTime}</span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-gray-600">
                {post.description}
              </p>
            </header>

            <div className="my-6">
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

            <div className="mx-auto mt-8 max-w-[700px]">
              <HelpfulButtons />
            </div>

            <div className="mx-auto mt-8 max-w-[700px]">
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

        <RelatedPosts currentSlug={post.slug} currentCategory={post.category} />
      </div>
    </>
  );
}
