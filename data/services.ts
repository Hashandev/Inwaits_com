// data/services.ts
// "Our Services" section on the home page (also listed in the footer).

import type { LucideIcon } from "lucide-react";
import { CloudDownload, CodeXml, Layers, MonitorSmartphone } from "lucide-react";

export type Service = {
  /** Unique key */
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const servicesSection = {
  pill: "Our services",
  title: {
    before: "Core capabilities ",
    /** Shown as gradient text */
    highlight: "we deliver",
    after: " for your business",
  },
  /** Link shown on every service */
  cta: { label: "Discuss your project", href: "/#quote" },
};

export const services: Service[] = [
  {
    slug: "web",
    title: "Websites & Web Apps",
    description:
      "Modern corporate websites, landing pages and interactive web applications designed for speed, mobile responsiveness and conversion.",
    icon: MonitorSmartphone,
  },
  {
    slug: "software",
    title: "Custom Software & Platforms",
    description:
      "Internal tools, management systems, booking portals and workflow automation built around your specific operations.",
    icon: CodeXml,
  },
  {
    slug: "design",
    title: "Brand & Interface Design",
    description:
      "Distinctive visual identity, logos, graphic assets and UI design that establish clear authority and trust for your brand.",
    icon: Layers,
  },
  {
    slug: "hosting",
    title: "Cloud & Domain Management",
    description:
      "Dependable cloud hosting, domain registration, SSL certificates and proactive maintenance to keep your systems online 24/7.",
    icon: CloudDownload,
  },
];
