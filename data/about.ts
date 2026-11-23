// data/about.ts
// "About Our Company" section (second section on the home page).

import type { LucideIcon } from "lucide-react";
import { Code2, Server } from "lucide-react";

export type AboutFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type AboutContent = {
  pill: string;
  title: {
    before: string;
    highlight: string;
    after: string;
  };
  description: string;
  features: AboutFeature[];
  cta: { label: string; href: string };
};

export const about: AboutContent = {
  pill: "About Our Company",
  title: {
    before: "Your Trusted Partner in ",
    highlight: "Digital Solutions",
    after: "",
  },
  description:
    "At Inwaits, we specialize in delivering high-performance websites, custom web applications and business software platforms that streamline operations and elevate your brand presence.",
  features: [
    {
      title: "Expert developers",
      description: "Bringing creativity and technical precision to every website and software system.",
      icon: Code2,
    },
    {
      title: "Reliable hosting & domains",
      description: "Secure, high-performance cloud hosting and domain setup handled for you.",
      icon: Server,
    },
  ],
  cta: { label: "Contact us", href: "/#quote" },
};
