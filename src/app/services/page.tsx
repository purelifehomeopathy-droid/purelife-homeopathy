import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            title="Our Services"
            description="Explore all available treatment categories and visit each service page for more details."
          />

          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
