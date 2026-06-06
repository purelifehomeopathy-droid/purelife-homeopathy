import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/forms";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { featuredServices, services } from "@/data/services";
import { address, phone } from "@/data/site";

const features = [
  {
    title: "Holistic Approach",
    text: "Treats root causes, not just symptoms, for lasting health benefits."
  },
  {
    title: "Personalized Care",
    text: "Customized treatments tailored to individual skin, hair, and health needs."
  },
  {
    title: "Advanced Technology",
    text: "Uses modern clinical methods for safe, effective, and thoughtful care."
  },
  {
    title: "Natural & Safe Solutions",
    text: "Gentle treatment plans designed for long-term relief and recovery."
  }
];

const processSteps = [
  {
    title: "Schedule an Appointment",
    text: "Easily book your visit online or by phone to secure a convenient time."
  },
  {
    title: "Conduct an Evaluation",
    text: "Receive a detailed review of symptoms, health history, and current concerns."
  },
  {
    title: "Administer Treatment",
    text: "Get a personalized plan tailored to your condition, lifestyle, and recovery goals."
  },
  {
    title: "Process Payment",
    text: "Finish the visit smoothly with clear next steps, follow-up guidance, and support."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/doctors/dr-jay-ratnani.jpg"
            alt="Dr. Jay Ratnani - Homeopathic Doctor in Vadodara"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
        </div>

        <div className="container hero-content">
          <div className="hero-copy fade-in">
            <span className="eyebrow">Pure Life Homeopathy • Vadodara</span>

            <h1>
  Best Homeopathic Treatment for Piles, Fissure & Fistula in Vadodara
</h1>

            <p>
  Pure Life Homeopathy offers specialized homeopathic treatment for
  Piles (Hemorrhoids), Anal Fissure and Fistula in Vadodara under the
  guidance of Dr. Jay Ratnani (BHMS). Our approach focuses on treating
  the root cause of disease, helping patients achieve long-term relief
  without surgery whenever possible. We also provide personalized
  treatment for Kidney Stones, Migraine, Hair Fall, Skin Diseases,
  Allergies and other chronic health conditions.
</p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
                marginBottom: "24px"
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "8px 14px",
                  borderRadius: "999px"
                }}
              >
                ✓ Piles Specialist
              </span>

              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "8px 14px",
                  borderRadius: "999px"
                }}
              >
                ✓ Fissure Specialist
              </span>

              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "8px 14px",
                  borderRadius: "999px"
                }}
              >
                ✓ Fistula Specialist
              </span>
            </div>

            <div className="hero-actions">
              <Link
                href="/contact-us#appointment"
                className="button button-primary"
              >
                Book Appointment
              </Link>

              <a href={`tel:${phone}`} className="button button-secondary">
                Call Us Now
              </a>
            </div>
          </div>

          <div className="hero-form fade-in">
            <InquiryForm formType="appointment" />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            title="Our Services"
            description="Specialized homeopathic treatments designed to address chronic and recurring health conditions through personalized, root-cause-focused care."
          />

          <div className="service-grid">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <div className="image-stack fade-in">
            <div className="stack-main">
              <Image
                src="/images/clinic/clinic-interior.jpg"
                alt="Clinic interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="stack-card">
              <Image
                src="/images/clinic/logo.png"
                alt="Clinic logo"
                fill
                sizes="(max-width: 768px) 180px, 240px"
              />
            </div>
          </div>

          <div className="split-copy fade-in">
            <span className="eyebrow">Welcome to Pure Life Homeopathy</span>

<h2>
  Trusted Homeopathic Clinic in Vadodara for Piles, Fissure,
  Fistula & Chronic Diseases
</h2>

<p>
  Pure Life Homeopathy is a patient-focused homeopathic clinic in
  Vadodara led by Dr. Jay Ratnani (BHMS). The clinic is dedicated
  to providing evidence-informed, individualized homeopathic care
  designed to address the root cause of illness rather than merely
  suppressing symptoms.
</p>

<p>
  Over the years, many patients have consulted us for chronic and
  recurring health conditions including piles, fissure, fistula,
  kidney stones, migraine, hair fall, psoriasis, eczema, allergic
  disorders and digestive complaints. Every treatment plan is
  personalized after understanding the patient's medical history,
  lifestyle, symptoms and overall health condition.
</p>

<p>
  We are particularly known for our focused approach towards
  anorectal disorders such as piles, fissure and fistula. Many
  patients seek homeopathic treatment to avoid repeated discomfort,
  dependency on temporary measures and invasive procedures whenever
  suitable. Our goal is to provide safe, natural and long-term
  management through individualized homeopathic medicines and
  lifestyle guidance.
</p>

<p>
  At Pure Life Homeopathy, we believe that every patient deserves
  dedicated attention, honest guidance and a treatment plan tailored
  to their unique needs. Our mission is to help patients achieve
  lasting wellness through compassionate care and a holistic healing
  approach.
</p>

            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="mini-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-accent">
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            title="Count on us to provide support and restore your well-being"
            description="Efficient, patient-centered processes that combine expertise, compassionate care, and practical guidance."
            centered
          />

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="process-card fade-in">
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
<section className="section section-soft">
  <div className="container">
    <SectionHeading
      centered
      title="Why Patients Choose Pure Life Homeopathy"
      description="A trusted destination for personalized homeopathic care in Vadodara."
    />

    <div className="prose-block">
      <p>
        Patients from Vadodara and nearby areas choose Pure Life
        Homeopathy because of our individualized approach, detailed
        case evaluation and commitment to long-term health outcomes.
      </p>

      <p>
        We specialize in homeopathic treatment for piles, fissure,
        fistula, kidney stones, migraine, hair fall and skin diseases.
        Every case is evaluated thoroughly to understand the root
        cause and create a treatment plan tailored to the patient.
      </p>

      <p>
        Our objective is not simply temporary symptom relief but
        helping patients improve overall health and quality of life
        through safe, natural and personalized homeopathic care.
      </p>
    </div>
  </div>
</section>

      <section className="section">
        <div className="container callout">
          <div>
            <span className="eyebrow">Visit the Clinic</span>
            <h2>Personalized consultation and long-term wellness support</h2>
            <p>{address}</p>
          </div>

          <div className="callout-actions">
            <Link href="/contact-us" className="button button-primary">
              Contact Us
            </Link>

            <Link
              href={`/services/${services[0].slug}`}
              className="button button-secondary"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}