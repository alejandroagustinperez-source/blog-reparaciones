import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getCategory } from "@/lib/posts";
import { Markdown } from "@/components/markdown";

const siteUrl = "https://blog.reparacionessimplesdelhogar.com.ar";

type Props = {
  params: Promise<{ slug: string }>;
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

  const category = getCategory(slug);

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
      <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-primary transition-colors"
        >
          ← Volver al blog
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-zinc-600">
              {category === "electricidad" && "⚡ Electricidad"}
              {category === "plomeria" && "🔧 Plomería"}
              {category === "gas" && "🔥 Gas"}
              {category === "electrodomesticos" && "🏠 Electrodomésticos"}
            </span>
            <time className="text-zinc-400">{post.date}</time>
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

        <div className="article-content">
          <Markdown content={post.content} />
        </div>

        <div className="mt-16">
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
    </>
  );
}
