import Link from "next/link";
import { address, clinicName, email, mainNav, phone, serviceNav } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
  <div className="footer-logo">
    <img
      src="/images/clinic/logo.png"
      alt="Pure Life Homeopathy"
    />
  </div>

  <h3>{clinicName}</h3>

  <p className="footer-doctor">
    Dr. Jay Ratnani (BHMS)
    <br />
    Homeopathic Physician
  </p>

  <p>
    Personalized homeopathic care focused on long-term healing, patient
    comfort, and natural wellness.
  </p>
</div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {serviceNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>{address}</li>
            <li>
              <a href={`tel:${phone}`}>{phone}</a>
            </li>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {clinicName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
