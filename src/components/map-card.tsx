import { address } from "@/data/site";

export function MapCard() {
  return (
    <section className="map-card fade-in">
      <div>
        <span className="eyebrow">Google Maps</span>
        <h3>Find the Clinic Easily</h3>
        <p>{address}</p>
        <a
          href="https://maps.app.goo.gl/"
          target="_blank"
          rel="noreferrer"
          className="button button-secondary"
        >
          Open in Google Maps
        </a>
      </div>
      <div className="map-visual" aria-hidden="true">
        <div className="map-pin" />
      </div>
    </section>
  );
}
