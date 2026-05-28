import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="hero-meta">{formatDate(post.publishedAt)}</p>
        </div>
      </section>
      <section className="section">
        <article className="container article-layout">
          <div className="article-media">
            <Image src={post.image} alt={post.title} width={1000} height={620} />
          </div>
          <div className="article-prose">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
