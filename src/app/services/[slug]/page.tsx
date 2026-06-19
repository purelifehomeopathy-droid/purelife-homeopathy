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

  <div
    style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "24px"
    }}
  >
    <a
      href="https://wa.me/919023806955"
      target="_blank"
      rel="noopener noreferrer"
      className="button button-primary"
    >
      WhatsApp Now
    </a>

    <a
      href="/consultation"
      className="button button-secondary"
    >
      Book Consultation
    </a>

    <a
      href="tel:+919023806955"
      className="button button-secondary"
    >
      Call Now
    </a>
  </div>
</div>
        </div>
      </section>
<section className="section">
  <div className="container">

    <div className="prose-block fade-in">

      <h2>Are You Experiencing Any Of These Symptoms?</h2>

      <ul className="checklist">
        <li>Bleeding during stool</li>
        <li>Pain while passing stool</li>
        <li>Burning sensation after stool</li>
        <li>Itching around the anal region</li>
        <li>Swelling or lump near the anus</li>
        <li>Discharge from a fistula opening</li>
        <li>Recurring anorectal discomfort</li>
      </ul>

      <p>
        Early consultation may help prevent complications and improve quality of life.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        <a
          href="https://wa.me/919023806955"
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          WhatsApp Now
        </a>

        <a
          href="/consultation"
          className="button button-secondary"
        >
          Book Consultation
        </a>
      </div>

    </div>

  </div>
</section>
<section className="section">
  <div className="container">

    <div className="service-detail">

      <div className="service-detail-media fade-in">
<Image
  src="/images/doctors/dr-jay-ratnani.jpg"
  alt="Dr Jay Ratnani"
  width={500}
  height={600}
  style={{
    borderRadius: "20px",
    width: "100%",
    height: "auto"
  }}
/>      </div>

      <div className="service-detail-copy fade-in">

        <span className="eyebrow">
          Meet Your Doctor
        </span>

        <h2>
          Dr. Jay Ratnani (BHMS)
        </h2>

        <p>
          Founder of Pure Life Homeopathy, Vadodara.
        </p>

        <p>
          Dr. Jay Ratnani provides personalized homeopathic care with special interest in:
        </p>

        <ul className="checklist">
          <li>Piles</li>
          <li>Fissure</li>
          <li>Fistula</li>
          <li>Migraine</li>
        </ul>

        <p>
          📍 Manjalpur, Vadodara
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px"
          }}
        >
          <a
            href="/consultation"
            className="button button-primary"
          >
            Book Consultation
          </a>

          <a
            href="https://wa.me/919023806955"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            WhatsApp Now
          </a>
        </div>

      </div>

    </div>

  </div>
</section>
<section className="section section-soft">
  <div className="container">

    <div className="prose-block fade-in" style={{ textAlign: "center" }}>

      <span className="eyebrow">
        Why Patients Choose Us
      </span>

      <h2>
        Why Choose Pure Life Homeopathy?
      </h2>

      <p>
        We focus on personalized care, detailed case evaluation and long-term health management tailored to individual patient needs.
      </p>

      <ul
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          textAlign: "left",
          lineHeight: "2"
        }}
      >
        <li>✓ Detailed case evaluation</li>
        <li>✓ Personalized homeopathic treatment plans</li>
        <li>✓ Lifestyle and dietary guidance</li>
        <li>✓ Convenient appointment scheduling</li>
        <li>✓ Online consultation available across India</li>
        <li>✓ Follow-up support and monitoring</li>
        <li>✓ Focus on chronic and recurring health concerns</li>
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        <a
          href="https://wa.me/919023806955"
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          WhatsApp Now
        </a>

        <a
          href="/consultation"
          className="button button-secondary"
        >
          Book Consultation
        </a>

        <a
          href="tel:+919023806955"
          className="button button-secondary"
        >
          Call Now
        </a>
      </div>

    </div>

  </div>
</section>
<section className="section">
  <div className="container">

    <div className="prose-block fade-in">

      <span className="eyebrow">
        Frequently Asked Questions
      </span>

      <h2>
        Common Questions About Piles, Fissure & Fistula
      </h2>

      <div style={{ marginTop: "30px" }}>

        <h3>Can piles be treated without surgery?</h3>
        <p>
          Treatment options depend on the severity of the condition and individual circumstances. A consultation helps determine the most appropriate treatment approach.
        </p>

        <h3>Can anal fissure recur after treatment?</h3>
        <p>
          Recurrence can occur in some cases. Proper management, dietary measures and lifestyle modifications may help reduce the chances of recurrence.
        </p>

        <h3>Can fistula heal on its own?</h3>
        <p>
          Anal fistula is a condition that requires proper medical evaluation. Treatment recommendations depend on the nature and extent of the problem.
        </p>

        <h3>Is online consultation available?</h3>
        <p>
          Yes. Patients from across India can consult through video or phone consultation and share reports online.
        </p>

        <h3>How long does treatment take?</h3>
        <p>
          The duration varies depending on the condition, severity, medical history and individual response to treatment.
        </p>

        <h3>When should I seek medical advice?</h3>
        <p>
          You should consult a healthcare professional if you experience persistent bleeding, severe pain, recurring fissure, recurrent fistula discharge or symptoms affecting your daily activities.
        </p>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >
        <a
          href="https://wa.me/919023806955"
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          WhatsApp Now
        </a>

        <a
          href="/consultation"
          className="button button-secondary"
        >
          Book Consultation
        </a>

        <a
          href="tel:+919023806955"
          className="button button-secondary"
        >
          Call Now
        </a>
      </div>

    </div>

  </div>
</section>
<section className="section section-accent">
  <div className="container" style={{ textAlign: "center" }}>

    <h2>
      Suffering From Piles, Fissure or Fistula?
    </h2>

    <p style={{ maxWidth: "800px", margin: "20px auto" }}>
      Don't ignore symptoms such as pain, bleeding, burning, itching or discharge.
      Schedule a consultation with Dr. Jay Ratnani today.
    </p>

    <p>
      📍 Pure Life Homeopathy, Manjalpur, Vadodara
    </p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
        marginTop: "25px"
      }}
    >
      <a
        href="https://wa.me/919023806955"
        target="_blank"
        rel="noopener noreferrer"
        className="button button-primary"
      >
        WhatsApp Now
      </a>

      <a
        href="/consultation"
        className="button button-secondary"
      >
        Book Consultation
      </a>

      <a
        href="tel:+919023806955"
        className="button button-secondary"
      >
        Call Now
      </a>
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
