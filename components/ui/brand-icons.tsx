// components/ui/brand-icons.tsx
// Brand logos (lucide-react no longer ships brand icons).
// Kept in one place so the rest of the app imports from here.

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { SocialPlatform } from "@/data/site";

export const WhatsAppIcon = FaWhatsapp;

export const socialIcons: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};
