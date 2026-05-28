import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms";
import { MapCard } from "@/components/map-card";
import { address, email, phone } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Pure Life Homeopathy for appointments, consultation queries, clinic directions, and patient support."
};

export default function ContactPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="fade-in">
            <span className="eyebrow">Reach Out to Us</span>
            <h2>We’re here to help with appointments and treatment queries</h2>
            <InquiryForm formType="contact" />
          </div>
          <div className="contact-details fade-in" id="appointment">
            <div className="info-card">
              <h3>Our Address</h3>
              <p>{address}</p>
            </div>
            <div className="info-card">
              <h3>Our Phone</h3>
              <p>{phone}</p>
            </div>
            <div className="info-card">
              <h3>Our Email</h3>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <MapCard />
        </div>
      </section>
    </main>
  );
}
