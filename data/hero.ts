// data/hero.ts
// Text for the home page hero section.

export type HeroContent = {
  pill: string;
  title: {
    before: string;
    /** Shown in the brand blue */
    highlight: string;
    after: string;
  };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const hero: HeroContent = {
  // Small label above the headline
  pill: "Complete IT Solutions in Sri Lanka",
  // Main headline: the company slogan
  title: {
    before: "World in ",
    highlight: "Your Palm",
    after: "",
  },
  description: "Empowering your business with modern websites, custom software & apps",
  primaryCta: { label: "Get a Free Quote", href: "/#quote" },
  secondaryCta: { label: "Our Services", href: "/#services" },
};
