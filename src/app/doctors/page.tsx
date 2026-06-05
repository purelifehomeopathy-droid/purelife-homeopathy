import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Meet Dr. Jay Ratnani, BHMS, specialist in homeopathic treatment for piles, fissure, fistula, kidney stones, skin diseases, hair disorders, and chronic health conditions."
};

export default function DoctorsPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Doctors</h1>
        </div>
      </section>

      <section className="section">
        <div className="container doctor-layout">
          <div className="doctor-image fade-in">
            <Image
              src="/images/doctors/dr-jay-ratnani.jpg"
              alt="Dr. Jay Ratnani"
              width={520}
              height={720}
              priority
            />
          </div>

          <div className="doctor-copy fade-in">
            <span className="eyebrow">Founder & Consulting Physician</span>

            <h2>Dr. Jay Ratnani</h2>

            <p className="doctor-degree">BHMS</p>

            <p>
              Dr. Jay Ratnani is a practicing homeopathic physician dedicated to
              providing personalized, patient-centered care through classical
              homeopathy. His approach focuses on understanding the root cause of
              disease rather than simply suppressing symptoms, helping patients
              achieve lasting relief and better overall health.
            </p>

            <p>
              Over the years, he has successfully managed a wide range of acute
              and chronic conditions including skin diseases, hair fall, kidney
              stones, migraines, digestive disorders, respiratory allergies,
              joint problems, and various lifestyle-related health concerns.
            </p>

            <p>
              His special area of interest is the non-surgical homeopathic
              management of anorectal disorders such as <strong>Piles
              (Hemorrhoids)</strong>, <strong>Anal Fissure</strong>, and{" "}
              <strong>Fistula-in-Ano</strong>. Many patients seek his
              consultation for these painful and recurring conditions when they
              are looking for a natural, holistic, and patient-friendly treatment
              option.
            </p>

            <p>
              Known for his detailed case-taking, compassionate approach, and
              commitment to patient education, Dr. Ratnani believes every patient
              deserves an individualized treatment plan tailored to their unique
              physical and emotional health profile.
            </p>

            <p>
              His mission at Pure Life Homeopathy is to help patients experience
              long-term wellness through safe, gentle, and effective homeopathic
              treatment while maintaining the highest standards of professional
              care.
            </p>

            <div className="info-card" style={{ marginTop: "24px" }}>
              <h3>Areas of Expertise</h3>

              <ul className="checklist">
                <li>Piles (Hemorrhoids)</li>
                <li>Anal Fissure</li>
                <li>Fistula-in-Ano</li>
                <li>Kidney Stones</li>
                <li>Migraine & Chronic Headaches</li>
                <li>Skin Diseases</li>
                <li>Hair Fall & Scalp Disorders</li>
                <li>Digestive Disorders</li>
                <li>Respiratory Allergies</li>
                <li>Joint & Musculoskeletal Problems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}