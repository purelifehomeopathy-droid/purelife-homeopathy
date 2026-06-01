import { address } from "@/data/site";

export function MapCard() {
return ( <section className="map-card fade-in"> <div> <span className="eyebrow">Google Maps</span> <h3>Find the Clinic Easily</h3> <p>{address}</p>

    <a
      href="https://maps.app.goo.gl/cTW9rAiJEqatFQ9Z8"
      target="_blank"
      rel="noreferrer"
      className="button button-secondary"
    >
      Open in Google Maps
    </a>
  </div>

  <div className="map-visual">
    <iframe
      src="https://www.google.com/maps?q=Pure%20Life%20Homeopathy%20Vadodara&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Pure Life Homeopathy Location"
    />
  </div>
</section>

);
}
