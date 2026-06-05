"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/Gallery/Clinic-1.jpeg",
  "/images/Gallery/Clinic-2.jpeg",
  "/images/Gallery/Clinic-3.jpeg",
  "/images/Gallery/Clinic-4.jpeg",
  "/images/Gallery/Clinic-5.jpeg",
  "/images/Gallery/Clinic-6.jpeg",
];

export default function GalleryPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Clinic Gallery</h1>
          <p>
            Take a look inside Pure Life Homeopathy and explore our clinic
            environment.
          </p>
        </div>
      </section>

      <section className="section">
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "650px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              background: "#ffffff",
            }}
          >
            <Image
              src={images[current]}
              alt={`Clinic Photo ${current + 1}`}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                setCurrent(
                  (current - 1 + images.length) % images.length
                )
              }
              className="button button-secondary"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrent(
                  (current + 1) % images.length
                )
              }
              className="button button-primary"
            >
              Next
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background:
                    current === index
                      ? "#1f7c7a"
                      : "rgba(0,0,0,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}