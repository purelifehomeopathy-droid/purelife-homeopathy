import type { LinkItem } from "@/types";

export const clinicName = "Pure Life Homeopathy";
export const siteUrl = "https://example.com";

export const phone = "+91-9023806955";
export const email = "purelifehomeopathy@gmail.com";
export const whatsapp = "919023806955";
export const address =
  "FF/3, Rutushree complex, Makarpura road, Opp. Kabir plaza, Manjalpur, Vadodara, Gujarat 390010";

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://studio.youtube.com/" },
  { label: "Map", href: "https://maps.app.goo.gl/" }
];

export const serviceNav: LinkItem[] = [
  { label: "Digestive Disorders", href: "/services/digestive-disorders" },
  { label: "Respiratory Disorders", href: "/services/respiratory-disorders" },
  { label: "Migraine & Headaches", href: "/services/migraine-headaches" },
  {
    label: "Joint & Musculoskeletal Problems",
    href: "/services/joint-musculoskeletal-problems"
  },
  { label: "Kidney Stones", href: "/services/kidney-stones" },
  { label: "Hair & Scalp Disorders", href: "/services/hair-scalp-disorders" },
  { label: "Skin Diseases", href: "/services/skin-diseases" },
  { label: "Piles & Fissures", href: "/services/piles-fissures" }
];

export const mainNav: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" }
];
