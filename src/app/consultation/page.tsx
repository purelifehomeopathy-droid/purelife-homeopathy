import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Book Consultation | Pure Life Homeopathy",
  description:
    "Book clinic visit or online consultation with Dr. Jay Ratnani."
};

export default function ConsultationPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Book Consultation</span>

          <h1>Clinic & Online Consultation</h1>

          <p className="hero-meta">
            Choose the consultation mode that suits you best.
          </p>
        </div>
      </section>

      <section className="section">
  <div className="container">

    <SectionHeading
      centered
      title="Consultation Charges"
      description="Choose the consultation mode that best suits your needs."
    />

    <div className="contact-grid">

      <div className="info-card">
        <h3>Clinic Consultation</h3>

        <p>
          Visit our Vadodara clinic for a face-to-face consultation.
        </p>

        <ul>
          <li>₹500 Consultation Fee</li>
          <li>Morning & Evening Slots</li>
          <li>Personalized Treatment</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>Online Consultation</h3>

        <p>
          Consult from anywhere in India through phone or video call.
        </p>

        <ul>
          <li>₹1000 Consultation Fee</li>
          <li>30 Days Medicine Included</li>
          <li>Video & Phone Consultation</li>
          <li>Follow-up Support</li>
        </ul>
      </div>

    </div>

  </div>
</section>

<section className="section section-soft">
  <div className="container">

    <SectionHeading
      centered
      title="Book Your Consultation"
      description="Fill out the form below and our team will contact you to confirm your appointment."
    />

    <InquiryForm formType="appointment" />

  </div>
</section>

    </main>
  );
}