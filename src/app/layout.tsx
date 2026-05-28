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
  title: {
    default: `${clinicName} Clinic Vadodara | Natural Care`,
    template: `%s | ${clinicName}`
  },
  description:
    "Expert homeopathic care in Vadodara by Dr. Jay Ratnani. Personalized, natural treatments for skin, hair, piles, kidney stones, migraines, and chronic conditions.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoCondensed.variable}`}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
