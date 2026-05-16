import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
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
      <div className="min-h-screen bg-zinc-50 font-sans">
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <Link
              href="/blog"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              ← Volver al blog
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-12">
          <article>
            <header>
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                {post.title}
              </h1>
            </header>

            <div className="my-8">
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
                  __html:
                    "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>

            <div className="prose prose-zinc max-w-none">
              <Markdown content={post.content} />
            </div>

            <div className="mt-12">
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
                  __html:
                    "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
