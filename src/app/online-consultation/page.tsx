import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
export const metadata: Metadata = {
  title: "Online Consultation",
  description: "Book an online consultation"
};

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
      title="Why Choose Online Consultation?"
      description="Professional homeopathic care from the comfort of your home."
    />

    <div className="process-grid">
      <article className="process-card fade-in">
        <span>✓</span>
        <h3>Video Consultation</h3>
      </article>

      <article className="process-card fade-in">
        <span>✓</span>
        <h3>Phone Consultation</h3>
      </article>

      <article className="process-card fade-in">
        <span>✓</span>
        <h3>Personalized Treatment</h3>
      </article>

      <article className="process-card fade-in">
        <span>✓</span>
        <h3>Follow-up Support</h3>
      </article>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <SectionHeading
      centered
      title="How Online Consultation Works"
      description="Simple and convenient process to get started."
    />

    <div className="process-grid">
      <article className="process-card fade-in">
        <span>1</span>
        <h3>Submit Your Request</h3>
        <p>
          Share your details, health concern and preferred consultation date.
        </p>
      </article>

      <article className="process-card fade-in">
        <span>2</span>
        <h3>Consultation Confirmation</h3>
        <p>
          Our team will contact you and confirm the appointment schedule.
        </p>
      </article>

      <article className="process-card fade-in">
        <span>3</span>
        <h3>Video or Phone Consultation</h3>
        <p>
          Discuss your symptoms, medical history and health goals directly with
          Dr. Jay Ratnani.
        </p>
      </article>

      <article className="process-card fade-in">
        <span>4</span>
        <h3>Personalized Treatment Plan</h3>
        <p>
          Receive individualized guidance and homeopathic treatment
          recommendations.
        </p>
      </article>
    </div>
  </div>
</section>

<section className="section section-accent">
  <div className="container">
    <SectionHeading
      centered
      title="Online Consultation Package"
      description="Transparent pricing with no hidden charges."
    />

    <div className="contact-grid">
      <div className="info-card">
        <h3>₹1000 Consultation Package</h3>

        <p>
          Includes detailed consultation, case evaluation and 30 days medicine.
        </p>

        <ul>
          <li>✓ Detailed Case Analysis</li>
          <li>✓ Personalized Homeopathic Consultation</li>
          <li>✓ 30 Days Medicine Included</li>
          <li>✓ Treatment Guidance</li>
          <li>✓ Follow-up Support</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>Available Across India</h3>

        <ul>
          <li>✓ Video Consultation</li>
          <li>✓ Phone Consultation</li>
          <li>✓ Flexible Scheduling</li>
          <li>✓ Convenient Follow-ups</li>
          <li>✓ Secure & Private Consultation</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <SectionHeading
      centered
      title="Book Your Online Consultation"
      description="Complete the form below and our team will contact you shortly."
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
          <span>WhatsApp Number</span>
          <input type="tel" name="whatsapp" />
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
          <span>Consultation Type</span>
          <select>
            <option>Video Consultation</option>
            <option>Phone Consultation</option>
          </select>
        </label>

        <label className="field">
          <span>Health Concern</span>
          <select>
            <option>Piles / Fissure / Fistula</option>
            <option>Kidney Stones</option>
            <option>Migraine</option>
            <option>Hair Fall</option>
            <option>Skin Disease</option>
            <option>Digestive Disorder</option>
            <option>Respiratory Disorder</option>
            <option>Other</option>
          </select>
        </label>

        <label className="field">
          <span>Preferred Date</span>
          <input type="date" />
        </label>

        <label className="field field-full">
          <span>Additional Notes</span>
          <textarea rows={5} />
        </label>
      </div>

      <a
        href="https://wa.me/919023806955"
        target="_blank"
        rel="noopener noreferrer"
        className="button button-primary"
      >
        Book Online Consultation
      </a>
    </form>
  </div>
</section>
<section className="section section-soft">
  <div className="container">
    <SectionHeading
      centered
      title="Conditions Commonly Consulted Online"
      description="Patients across India consult us for a wide range of chronic and recurring health concerns."
    />

    <div className="process-grid">
      <article className="process-card fade-in">
        <h3>Piles, Fissure & Fistula</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Kidney Stones</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Migraine & Headaches</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Hair Fall & Scalp Disorders</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Skin Diseases & Allergies</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Digestive Disorders</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Respiratory Disorders</h3>
      </article>

      <article className="process-card fade-in">
        <h3>Children's Health Concerns</h3>
      </article>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <SectionHeading
      centered
      title="Frequently Asked Questions"
      description="Common questions about online homeopathy consultation."
    />

    <div className="contact-grid">
      <div className="info-card">
        <h3>How does online consultation work?</h3>
        <p>
          After submitting your request, our team contacts you to confirm
          the appointment. Consultation can be conducted via phone or video call.
        </p>
      </div>

      <div className="info-card">
        <h3>Do I need to visit the clinic?</h3>
        <p>
          No. Online consultation allows you to consult from anywhere in India.
        </p>
      </div>

      <div className="info-card">
        <h3>Are medicines included?</h3>
        <p>
          Yes. The ₹1000 consultation package includes 30 days medicine.
        </p>
      </div>

      <div className="info-card">
        <h3>Can I share reports?</h3>
        <p>
          Yes. Previous reports, prescriptions and investigations can be shared
          during the consultation process.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="section section-accent">
  <div className="container">
    <SectionHeading
      centered
      title="Online Homeopathy Consultation Across India"
      description="Professional homeopathic guidance from the comfort of your home."
    />

    <p style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto 24px" }}>
      Pure Life Homeopathy offers online homeopathy consultation for patients
      across India. Whether you are seeking guidance for piles, fissure,
      fistula, kidney stones, migraine, hair fall, allergies, skin diseases,
      digestive disorders or respiratory conditions, you can consult
      Dr. Jay Ratnani from the comfort of your home.
    </p>

    <p style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto 32px" }}>
      Online consultations are available through video and phone appointments.
      Patients can discuss symptoms, share reports, receive personalized
      guidance and continue follow-up care remotely.
    </p>

    <div style={{ textAlign: "center" }}>
      <a
        href="https://wa.me/919023806955"
        target="_blank"
        rel="noopener noreferrer"
        className="button button-primary"
      >
        Book Consultation on WhatsApp
      </a>
    </div>
  </div>
</section>
    </main>
  );
}