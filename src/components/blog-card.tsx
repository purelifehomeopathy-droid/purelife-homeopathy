import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card fade-in">
      <div className="blog-card-image">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="blog-card-body">
        <span className="tag">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-card-meta">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <Link href={`/blogs/${post.slug}`}>Read Article</Link>
        </div>
      </div>
    </article>
  );
}
