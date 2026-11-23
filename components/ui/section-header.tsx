// components/ui/section-header.tsx
// Pill + h2 + optional description used at the top of every home page section.

import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** id for the h2, so the <section> can use aria-labelledby */
  id: string;
  pill: string;
  pillDot?: "primary" | "accent";
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  id,
  pill,
  pillDot,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <Pill dot={pillDot}>{pill}</Pill>
      <h2
        id={id}
        className="mt-4 text-[2rem] leading-[1.12] tracking-[-0.02em] sm:text-4xl md:text-5xl md:leading-[1.08]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
