// data/projects.ts
// Case studies for the home page, /work and /work/[slug].
// Images live in /public/projects/. Replace the placeholder .svg files with real
// screenshots (any format next/image supports) and update the paths below.

import { testimonials, type Testimonial } from "@/data/testimonials";

export const projectCategories = ["Web", "LMS", "Software", "Design"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  /** Main screenshot (16:10 works best) */
  image: string;
  /** One-line result shown on cards */
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  results: string[];
  /** Extra screenshots for the case study page */
  gallery?: string[];
  liveUrl?: string;
  testimonial?: Testimonial;
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "learnwell-lms",
    title: "LearnWell.lk learning platform",
    client: "Learn Well",
    category: "LMS",
    image: "/projects/learnwell.svg",
    summary: "An online learning platform where students join classes, watch lessons and pay fees online.",
    problem:
      "Learn Well needed a single place for students to join classes, watch lessons and access study material. Managing registrations, class links and payments by hand took too much time.",
    solution:
      "We designed and built LearnWell.lk, a learning platform with student accounts, video lessons, class links and an admin area, so the team can manage everything from one dashboard.",
    // TODO: confirm the tech stack used for LearnWell.lk
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    results: [
      "Students can register, log in and learn from any device",
      "Lessons, class links and tutes are all in one place",
      "Strong after-service and support from the Inwaits team",
    ],
    gallery: ["/lms/student-view.svg", "/lms/teacher-view.svg"],
    liveUrl: "https://learnwell.lk",
    testimonial: testimonials.find((t) => t.name === "Isuru Gayashan"),
  },
  // TODO: placeholder project. Replace with real Business Master project details.
  {
    slug: "business-master",
    title: "Business Master website",
    client: "Business Master",
    category: "Web",
    image: "/projects/business-master.svg",
    summary: "A fast, modern website that presents the business clearly and brings in new enquiries.",
    problem:
      "Placeholder text. Describe the client's problem here: for example, an outdated website that was slow and hard to use on phones.",
    solution:
      "Placeholder text. Describe what Inwaits built: for example, a new responsive website with clear service pages and an enquiry form.",
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    results: ["Placeholder result 1", "Placeholder result 2", "Placeholder result 3"],
  },
  // TODO: placeholder project. Replace with a real project.
  {
    slug: "learning-management-portal",
    title: "Digital Learning & Training Portal",
    client: "EduTech Academy",
    category: "LMS",
    image: "/projects/tuition-lms.svg",
    summary: "Interactive video course delivery, student tracking and secure subscription management.",
    problem: "The client needed a streamlined, self-hosted portal to distribute digital courses, manage student access, and automate monthly renewals.",
    solution: "We engineered an intuitive web portal with role-based access, automated payment hooks, and secure streaming.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    results: ["100% automated subscription billing", "Zero downtime during peak course access"],
  },
  // TODO: placeholder project. Replace with a real project.
  {
    slug: "inventory-billing-system",
    title: "Inventory & billing system",
    client: "Placeholder Retail Store",
    category: "Software",
    image: "/projects/billing-system.svg",
    summary: "A custom system for stock, billing and daily sales reports.",
    problem: "Placeholder text. Describe the client's problem here.",
    solution: "Placeholder text. Describe the solution Inwaits delivered.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    results: ["Placeholder result 1", "Placeholder result 2"],
  },
  // TODO: placeholder project. Replace with a real project.
  {
    slug: "restaurant-branding",
    title: "Restaurant brand identity",
    client: "Placeholder Restaurant",
    category: "Design",
    image: "/projects/restaurant-branding.svg",
    summary: "Logo, colours and social media templates for a new restaurant.",
    problem: "Placeholder text. Describe the client's problem here.",
    solution: "Placeholder text. Describe the solution Inwaits delivered.",
    techStack: ["Figma", "Illustrator"],
    results: ["Placeholder result 1", "Placeholder result 2"],
  },
  // TODO: placeholder project. Replace with a real project.
  {
    slug: "gem-exporter-website",
    title: "Gem exporter website",
    client: "Placeholder Gem Company",
    category: "Web",
    image: "/projects/gem-exporter.svg",
    summary: "A product showcase website for a Ratnapura gem exporter with enquiry forms.",
    problem: "Placeholder text. Describe the client's problem here.",
    solution: "Placeholder text. Describe the solution Inwaits delivered.",
    techStack: ["Next.js", "Tailwind CSS", "Firebase"],
    results: ["Placeholder result 1", "Placeholder result 2"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
