import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>{service.title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container service-detail">
          <div className="service-detail-media fade-in">
            <Image
              src={service.heroImage}
              alt={service.title}
              width={740}
              height={490}
              priority
            />
          </div>
          <div className="service-detail-copy fade-in">
            <span className="eyebrow">{service.title}</span>
            <h2>{service.summary}</h2>
            <p>{service.intro}</p>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container prose-layout">
          {service.sections.map((section) => (
            <article key={section.heading} className="prose-block fade-in">
              <h3>{section.heading}</h3>
              {section.body ? <p>{section.body}</p> : null}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.checklist ? (
                <ul className="checklist">
                  {section.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
