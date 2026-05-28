import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Meet Dr. Jay Ratnani, BHMS, and learn more about the clinic's personalized homeopathic approach."
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
              src="/images/clinic/doctor-profile.jpg"
              alt="Dr. Jay Ratnani"
              width={520}
              height={720}
            />
          </div>
          <div className="doctor-copy fade-in">
            <span className="eyebrow">Our Doctors</span>
            <h2>Dr. Jay Ratnani</h2>
            <p className="doctor-degree">BHMS</p>
            <p>
              Dr. Jay Ratnani is a dedicated and experienced homeopathic physician
              with six years of clinical expertise. He has successfully treated
              numerous patients with chronic and acute conditions and is known for
              his patient-centered, holistic approach.
            </p>
            <p>
              He specializes in treating skin diseases, hair disorders, piles,
              kidney stones, and migraines, offering natural and long-lasting
              relief without side effects.
            </p>
            <p>
              His work focuses on identifying the root cause of ailments and
              tailoring treatment plans to each patient’s needs with compassion,
              clarity, and attention to long-term results.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
