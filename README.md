# Pure Life Homeopathy Standalone Website

Independent Next.js website recreation with editable content files, reusable components, SEO routes, and SMTP-backed forms.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content editing

- Update services in `src/data/services.ts`
- Update blog posts in `src/data/blogs.ts`
- Update gallery items in `src/data/gallery.ts`
- Update clinic details in `src/data/site.ts`

## Forms

Set the variables from `.env.example` to enable email delivery for the contact and appointment forms.
