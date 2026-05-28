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
  excerpt: string;
  category: string;
  publishedAt: string;
  image: string;
  content: string[];
};
