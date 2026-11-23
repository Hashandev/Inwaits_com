// data/process.ts
// "How We Work" timeline steps.

import type { LucideIcon } from "lucide-react";
import { Code2, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We meet, listen and understand your business, your goals and your needs.",
    icon: Search,
  },
  {
    title: "Design",
    description: "We plan the UI/UX and share a prototype so you can see it before we build.",
    icon: PenTool,
  },
  {
    title: "Build",
    description: "We develop your website or system and test it carefully on every device.",
    icon: Code2,
  },
  {
    title: "Launch",
    description: "We deploy it, connect your domain and make sure everything goes live smoothly.",
    icon: Rocket,
  },
  {
    title: "Support",
    description: "We stay with you for maintenance, updates and help whenever you need it.",
    icon: LifeBuoy,
  },
];
