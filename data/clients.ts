// data/clients.ts
// Client logos for the "Trusted by" marquee.
// Add `logo` (a file in /public/logos/) to show an image instead of the text wordmark.

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  Gem,
  GraduationCap,
  Leaf,
  ShoppingBag,
  Stethoscope,
  Utensils,
} from "lucide-react";

export type Client = {
  name: string;
  /** Optional logo image, e.g. "/logos/learnwell.svg". Shown in grayscale, colour on hover. */
  logo?: string;
  /** Icon used for the text wordmark when there is no logo image */
  mark: LucideIcon;
  url?: string;
};

export const clients: Client[] = [
  { name: "LearnWell.lk", mark: GraduationCap, url: "https://learnwell.lk" },
  { name: "Business Master", mark: Briefcase },
  // TODO: placeholder clients. Replace with real client names and logos.
  { name: "Ceylon Tutors", mark: BookOpen },
  { name: "Ratna Gems", mark: Gem },
  { name: "Green Leaf Tea", mark: Leaf },
  { name: "City Mart", mark: ShoppingBag },
  { name: "Care Clinic", mark: Stethoscope },
  { name: "Spice Garden", mark: Utensils },
];
