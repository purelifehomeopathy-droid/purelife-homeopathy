import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Online Consultation",
  description:
    "Book an online homeopathy consultation with Dr. Jay Ratnani from anywhere in India."
};

const benefits = [
  "Video Consultation",
  "Phone Consultation",
  "Personalized Homeopathic Care",
  "Follow-up Support"
];

const steps = [
  "Fill Form",
  "Upload Reports",
  "Complete Payment",
  "Receive Appointment Confirmation"
];

const conditions = [
  "Piles/Fissure/Fistula",
  "Kidney Stones",
  "Migraine",
  "Hair Fall",
  "Skin Disease",
  "Digestive Disorder",
  "Respiratory Disorder",
  "Other"
];

export default function OnlineConsultationPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Online Consultation</span>
          <h1>Online Homeopathy Consultation</h1>
          <p className="hero-meta">
            Consult Dr. Jay Ratnani from anywhere in India.
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            title="Consultation Benefits"
            description="Accessible and personalized care designed to make online consultation simple and convenient."
          />

          <div className="process-grid">
            {benefits.map((benefit) => (
              <article key={benefit} className="process-card fade-in">
                <span>✓</span>
                <h3>{benefit}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            title="Consultation Process"
            description="A simple step-by-step flow to get started with your online consultation."
          />

          <div className="process-grid">
            {steps.map((step, index) => (
              <article key={step} className="process-card fade-in">
                <span>{index + 1}</span>
                <h3>{`Step ${index + 1}`}</h3>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-accent">
        <div className="container contact-grid">
          <div className="fade-in">
            <SectionHeading
              eyebrow="Consultation Form"
              title="Book Your Online Consultation"
              description="Share your details and preferred consultation request. Our team can follow up with the next steps."
            />

            <form className="form-card">
              <div className="form-grid">
                <label className="field">
                  <span>Full Name</span>
                  <input type="text" name="fullName" />
                </label>

                <label className="field">
                  <span>Age</span>
                  <input type="number" name="age" />
                </label>

                <label className="field">
                  <span>Phone Number</span>
                  <input type="tel" name="phone" />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input type="email" name="email" />
                </label>

                <label className="field">
                  <span>City</span>
                  <input type="text" name="city" />
                </label>

                <label className="field">
                  <span>Select Condition</span>
                  <select name="condition" defaultValue="">
                    <option value="" disabled>
                      Select Condition
                    </option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Preferred Date</span>
                  <input type="date" name="preferredDate" />
                </label>

                <label className="field field-full">
                  <span>Additional Notes</span>
                  <textarea name="additionalNotes" rows={5} />
                </label>
              </div>

              <button type="submit" className="button button-primary online-cta">
                Book Online Consultation
              </button>
            </form>
          </div>

          <div className="contact-details fade-in">
            <div className="info-card">
              <h3>Online Consultation Options</h3>
              <p>Video consultation and phone consultation are available.</p>
            </div>

            <div className="info-card">
              <h3>Care Focus</h3>
              <p>
                Personalized homeopathic care for chronic and recurring health
                conditions.
              </p>
            </div>

            <div className="info-card">
              <h3>Follow-up Support</h3>
              <p>
                Continued support after consultation to help you stay on track
                with your treatment plan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
