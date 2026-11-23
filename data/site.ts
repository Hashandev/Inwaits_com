// data/site.ts
// Global site settings: brand, contact details, navigation and social links.
// Edit the values here; components read everything from this file.

export type NavLink = {
  label: string;
  /** Anchor on the home page, e.g. "/#services" */
  href: string;
  /** id of the home page section this link scrolls to (also used to highlight it) */
  section: string;
  /** Optional standalone page that should also highlight this link, e.g. "/work" */
  page?: string;
};

export type SocialPlatform = "facebook" | "x" | "instagram" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type WorkingHours = {
  days: string;
  hours: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  tagline: string;
  description: string;
  keywords: string[];
  locale: string;
  contact: {
    phone: string;
    /** Phone in international format for tel: links, no spaces */
    phoneHref: string;
    email: string;
    whatsappDisplay: string;
    /** WhatsApp number for wa.me links: country code + number, digits only */
    whatsappNumber: string;
    whatsappMessage: string;
    address: {
      street: string;
      city: string;
      country: string;
      countryCode: string;
      full: string;
    };
    mapEmbedUrl: string;
    hours: WorkingHours[];
  };
  nav: NavLink[];
  cta: { label: string; href: string };
  social: SocialLink[];
};

export const site: SiteConfig = {
  name: "Inwaits",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inwaits.com",
  tagline: "Websites, custom software & digital platforms for Sri Lankan businesses",
  description:
    "Inwaits is a Sri Lankan software engineering studio based in Ratnapura. We design, build and host modern websites, custom business software and web platforms for growing businesses.",
  keywords: [
    "web development Sri Lanka",
    "website design Sri Lanka",
    "custom software Sri Lanka",
    "web application development",
    "software company Ratnapura",
    "custom software development Sri Lanka",
    "graphic design Ratnapura",
    "web hosting Sri Lanka",
    "Inwaits",
  ],
  locale: "en_LK",
  contact: {
    phone: "072 867 7570",
    phoneHref: "+94728677570",
    email: "hello@inwaits.com",
    whatsappDisplay: "+94 72 867 7570",
    whatsappNumber: "94728677570",
    whatsappMessage:
      "Hi Inwaits! I found you on your website and I'd like to talk about a project.",
    address: {
      street: "149/12 Bandaranayaka Mawatha",
      city: "Ratnapura",
      country: "Sri Lanka",
      countryCode: "LK",
      full: "149/12 Bandaranayaka Mawatha, Ratnapura, Sri Lanka",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?q=149%2F12+Bandaranayaka+Mawatha,+Ratnapura,+Sri+Lanka&output=embed",
    // TODO: confirm your real working hours
    hours: [
      { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 1:00 PM" },
      { days: "Sunday & Poya days", hours: "Closed" },
    ],
  },
  // The home page is one long page. Each link scrolls to its section, in this order.
  nav: [
    { label: "Home", href: "/#home", section: "home" },
    { label: "About", href: "/#about", section: "about" },
    { label: "Services", href: "/#services", section: "services" },
    { label: "Contact", href: "/#contact", section: "contact" },
  ],
  cta: { label: "Get a Quote", href: "/#quote" },
  // TODO: add your real social profile URLs
  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/" },
    { platform: "x", label: "X (Twitter)", href: "https://x.com/" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

/** Builds a wa.me link with a pre-filled message. */
export function whatsappUrl(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
