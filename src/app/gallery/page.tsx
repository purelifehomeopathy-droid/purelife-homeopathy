"use client";

import Image from "next/image";
import type { Metadata } from "next";
import { useEffect, useState } from "react";

const images = [
  "/images/gallery/Clinic-1.jpeg",
  "/images/gallery/Clinic-2.jpeg",
  "/images/gallery/Clinic-3.jpeg",
  "/images/gallery/Clinic-4.jpeg",
  "/images/gallery/Clinic-5.jpeg",
  "/images/gallery/Clinic-6.jpeg"
];

export default function GalleryPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

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
            position: "relative"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "650px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
          >
            <Image
              src={images[current]}
              alt={`Clinic Photo ${current + 1}`}
              fill
              priority
              style={{
                objectFit: "contain",
                background: "#f5f5f5"
              }}
            />
          </div>

          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              border: "none",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "22px"
            }}
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              border: "none",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "22px"
            }}
          >
            ›
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px"
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
                    current === index ? "#1f7c7a" : "rgba(0,0,0,0.25)"
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}