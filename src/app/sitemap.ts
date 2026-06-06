import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://purelifehomeopathy.in";

  const staticPages = [
    "",
    "/doctors",
    "/blogs",
    "/gallery",
    "/contact-us"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date()
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt)
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}