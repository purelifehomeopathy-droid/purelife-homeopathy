import Image from "next/image";
import type { Metadata } from "next";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore clinic visuals, treatment highlights, and practice imagery."
};

export default function GalleryPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <h1>Gallery</h1>
        </div>
      </section>
      <section className="section">
        <div className="container masonry-grid">
          {galleryImages.map((image) => (
            <figure key={image.src} className="gallery-card fade-in">
              <Image src={image.src} alt={image.alt} width={800} height={600} />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
