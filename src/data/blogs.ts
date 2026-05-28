import type { BlogPost } from "@/types";

const blogTitles = [
  "Edema and Fluid Retention in Cancer: Homeopathic Approach Explained",
  "Adenoid Enlargement: Causes, Symptoms, and How Homeopathy Can Help",
  "Homeopathic Remedies for Stress, Anxiety & Sleep Issues in Today’s Fast-Paced World",
  "Seasonal Home-Care with Homeopathy",
  "Healing Eczema from Within: How Homeopathy Targets the Root Cause",
  "Recurrent UTIs: When It Could be a Chronic UTI",
  "A Closer Look at Chronic Urinary Tract Infection (UTI)",
  "Kidney Stones: A Painful Reminder from Within",
  "Coping with Kidney Stones: Causes, Symptoms, and Treatment",
  "Exploring Female Infertility and the Role of Homeopathy in Restoring Fertility",
  "Say Goodbye to Headaches: Homeopathic Relief for Migraine & Chronic Pain",
  "Effective Homeopathy Solutions for Obesity: A Holistic Approach",
  "Holistic Healing for PCOS: How Homeopathy Can Help",
  "Say Goodbye to Allergic Rhinitis with Homeopathy: Safe, Effective, and Long-Lasting Relief",
  "10 Effective Homeopathic Medicines for Hair Fall: A Comprehensive Guide",
  "Homeopathic Treatment for Osteoarthritis: A Natural Approach",
  "Understanding Gastroenteritis (Stomach Flu)",
  "Asthma: Symptoms, Causes, Treatment and More",
  "Simple Exercises to Alleviate Migraines Naturally",
  "Understanding Homeopathy’s Role in Managing Diabetes",
  "Surviving the Stomach Fury: Unraveling the Secrets of the Dreaded Stomach Flu",
  "10 Easy Home Remedies for Migraine Relief",
  "Breathing Easy: Understanding and Managing Chronic Obstructive Pulmonary Disease (COPD)",
  "Chronic Kidney Disease and Homeopathy",
  "Thyroid Problems and Homeopathic Solutions",
  "Living with Psoriasis: Coping Strategies and Support Resources",
  "Psoriasis and Homeopathic Care",
  "Managing Migraine with Homeopathy: A Gentle Approach to Relief"
];

const categories = [
  "Cancer Support",
  "ENT Care",
  "Mental Wellness",
  "Seasonal Care",
  "Skin Care",
  "Urinary Health",
  "Urinary Health",
  "Kidney Care",
  "Kidney Care",
  "Women’s Health",
  "Migraine Care",
  "Weight Management",
  "Women’s Health",
  "Respiratory Care",
  "Hair Care",
  "Joint Care",
  "Digestive Health",
  "Respiratory Care",
  "Migraine Care",
  "Lifestyle Care",
  "Digestive Health",
  "Migraine Care",
  "Respiratory Care",
  "Kidney Care",
  "Hormonal Health",
  "Skin Care",
  "Skin Care",
  "Migraine Care"
];

const images = [
  "/images/services/skin-diseases.webp",
  "/images/clinic/clinic-reception.jpg",
  "/images/clinic/clinic-interior.jpg",
  "/images/clinic/doctor-profile.jpg",
  "/images/services/hair-scalp-disorders.webp",
  "/images/services/kidney-stones.webp",
  "/images/services/respiratory-disorders.webp",
  "/images/services/migraine-headaches.webp"
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const blogPosts: BlogPost[] = blogTitles.map((title, index) => {
  const category = categories[index];
  const image = images[index % images.length];
  const date = new Date(2025, 2 + Math.floor(index / 8), 4 + (index % 8) * 2)
    .toISOString()
    .slice(0, 10);

  return {
    slug: slugify(title),
    title,
    category,
    publishedAt: date,
    image,
    excerpt: `${title} explores practical homeopathic thinking, symptom patterns, and supportive lifestyle guidance in an easy-to-read format.`,
    content: [
      `${title} is one of the health topics frequently discussed with patients seeking a natural and individualized approach. At Pure Life Homeopathy, care is centered on understanding the complete symptom picture rather than treating only one isolated complaint.`,
      `This article-style page is designed to be easy to update later. You can expand it with clinical notes, prevention guidance, remedy discussion, FAQs, or patient education material while preserving the same layout and navigation structure.`,
      `For readers who want a personalized plan, the clinic encourages booking a consultation so treatment can be tailored to age, symptom triggers, medical history, and recovery goals.`
    ]
  };
});
