import { whatsapp } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
