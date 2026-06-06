import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { clinicName } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://purelifehomeopathy.in"),

 title: {
  default: "Homeopathic Clinic in Vadodara | Dr. Jay Ratnani",
  template: "%s | Pure Life Homeopathy"
},

description:
  "Homeopathic clinic in Vadodara led by Dr. Jay Ratnani. Treatment for piles, fissure, fistula, migraine, kidney stones, skin diseases and hair fall.",

keywords: [
  "Homeopathy Clinic Vadodara",
  "Homeopathic Doctor Vadodara",
  "Dr Jay Ratnani",
  "Piles Treatment Vadodara",
  "Fissure Treatment Vadodara",
  "Fistula Treatment Vadodara",
  "Kidney Stone Treatment Vadodara",
  "Migraine Treatment Vadodara",
  "Hair Fall Treatment Vadodara",
  "Skin Disease Treatment Vadodara",
  "Homeopathy Vadodara"
],

 metadataBase: new URL("https://purelifehomeopathy.in"),
alternates: {
  canonical: "/"
},

  openGraph: {
    title:
      "Pure Life Homeopathy | Homeopathic Clinic in Vadodara | Dr. Jay Ratnani",
    description:
      "Specialized homeopathic treatment for Piles, Fissure, Fistula, Kidney Stones, Migraine, Hair Fall and chronic diseases in Vadodara.",
    url: "https://purelifehomeopathy.in",
    siteName: "Pure Life Homeopathy",
    locale: "en_IN",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Pure Life Homeopathy | Homeopathic Clinic in Vadodara",
    description:
      "Specialized homeopathic treatment for Piles, Fissure, Fistula, Kidney Stones, Migraine and chronic diseases."
  },

 icons: {
  icon: "/favicon.png",
  apple: "/apple-touch-icon.png"
}
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        name: "Pure Life Homeopathy",
        url: "https://purelifehomeopathy.in",
        telephone: "+91-9023806955",
        email: "purelifehomeopathy@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "FF/3, Rutushree Complex, Makarpura Road, Opp. Kabir Plaza",
          addressLocality: "Vadodara",
          addressRegion: "Gujarat",
          postalCode: "390010",
          addressCountry: "IN"
        }
      },
      {
        "@type": "Physician",
        name: "Dr. Jay Ratnani",
        medicalSpecialty: "Homeopathy",
        worksFor: {
          "@type": "MedicalClinic",
          name: "Pure Life Homeopathy"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoCondensed.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}