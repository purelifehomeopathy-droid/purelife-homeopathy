import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogs";
import { clinicName } from "@/data/site";
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
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.image],
      type: "article"
    }
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: clinicName
    },
    publisher: {
      "@type": "Organization",
      name: clinicName
    }
  };

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blogs",
      item: "/blogs"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: post.title
    }
  ]
};

  return (
  <>
    <main className="inner-page">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema)
      }}
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />

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
            <Image
  src={post.image}
  alt={`${post.title} | Pure Life Homeopathy Vadodara`}
  width={1000}
  height={620}
/>
          </div>
          <div className="article-prose">
            {post.content.map((section) => (
              <section key={section.heading} className="article-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.subSections?.map((subSection) => (
                  <div key={subSection.heading} className="article-subsection">
                    <h3>{subSection.heading}</h3>
                    {subSection.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {subSection.bullets ? (
                      <ul>
                        {subSection.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </article>
      </section>
       </main>
  </>
);
}
