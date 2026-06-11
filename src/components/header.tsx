"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clinicName, mainNav, serviceNav } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/clinic/logo.png"
            alt="Pure Life Homeopathy Logo"
            width={64}
            height={64}
            className="brand-logo"
            priority
          />

          <span className="brand-copy">
            <strong>{clinicName}</strong>
            <small>Holistic Healing, Personalized Care</small>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`nav-dropdown ${servicesOpen ? "is-open" : ""}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`nav-dropdown-trigger ${isServicesActive ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>

            <div className="nav-dropdown-menu">
             {serviceNav.map((item, index) => (
               <Link
  key={item.href}
  href={item.href}
  className={index === 0 ? "featured-service" : ""}
                  onClick={() => {
                    setMenuOpen(false);
                    setServicesOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact-us#appointment"
            className="button button-primary"
          >
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
