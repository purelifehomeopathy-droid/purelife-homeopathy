import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card fade-in">
      <div className="service-card-image">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="service-card-body">
        <h3>{service.shortTitle || service.title}</h3>
        <p>{service.summary}</p>
        <Link href={`/services/${service.slug}`} className="button button-secondary">
          Learn More
        </Link>
      </div>
    </article>
  );
}
