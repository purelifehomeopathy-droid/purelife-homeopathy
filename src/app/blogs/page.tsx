import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Browse educational blog posts on homeopathy, chronic conditions, skin, hair, respiratory care, and wellness."
};

export default function BlogsPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Blogs</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Blog Articles"
            description="This section is fully editable. Add, remove, or update posts in one content file and the pages update automatically."
          />
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
