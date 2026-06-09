export type LinkItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle?: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  summary: string;
  intro: string;
  sections: {
    heading: string;
    body?: string;
    bullets?: string[];
    checklist?: string[];
  }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  image: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  content: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    subSections?: {
      heading: string;
      paragraphs?: string[];
      bullets?: string[];
    }[];
  }[];
};
