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
            src="/images/clinic/doctor-profile.jpg"
            alt="Pure Life Homeopathy clinic"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy fade-in">
            <span className="eyebrow">Welcome to Pure Life Homeopathy</span>
            <h1>Homeopathy for Holistic Healing, Personalized Care, Anytime, Anywhere</h1>
            <p>
              Natural treatment plans for skin conditions, hair concerns, kidney
              stones, migraines, respiratory problems, digestive issues, and more.
            </p>
            <div className="hero-actions">
              <Link href="/contact-us#appointment" className="button button-primary">
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
            description="Carefully designed treatments that mirror the reference experience while remaining fully editable and independent."
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
            <h2>Root-cause-focused homeopathic care in Vadodara</h2>
            <p>
              Pure Life Homeopathy is a leading homeopathic clinic in Vadodara,
              founded by Dr. Jay Ratnani, a highly skilled homeopathic physician
              with six years of experience.
            </p>
            <p>
              The clinic specializes in treating skin diseases, hair disorders,
              piles, kidney stones, and migraines using safe and natural
              homeopathic remedies tailored to each patient.
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
            <Link href={`/services/${services[0].slug}`} className="button button-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
