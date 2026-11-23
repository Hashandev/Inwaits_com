// components/sections/about.tsx
// "About our company": headline on the left, text and button on the right,
// then the key points in a row between thin lines.
// Content lives in data/about.ts.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { about } from "@/data/about";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section aria-labelledby="about-title" className="relative pt-20 pb-16 md:pt-24 md:pb-24">
      <div className="container-page">
        {/* Headline left, text + button right */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <Pill>{about.pill}</Pill>
            <h2
              id="about-title"
              className="mt-4 text-[2.25rem] leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]"
            >
              {about.title.before}
              {about.title.highlight}
              {about.title.after}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:pb-1">
            <p className="max-w-[36rem] text-base leading-relaxed sm:text-lg">{about.description}</p>
            <Button asChild size="xl" variant="outline" className="mt-8">
              <Link href={about.cta.href}>
                {about.cta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-150 ease-out group-hover/button:translate-x-0.5"
                />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Key points */}
        <RevealGroup as="ul" className="mt-16 grid border-y border-border sm:grid-cols-2 lg:mt-20">
          {about.features.map(({ title, description, icon: Icon }, i) => (
            <RevealItem
              as="li"
              key={title}
              className={cn(
                "py-8 sm:py-10",
                i === 0 ? "sm:pr-10" : "border-t border-border sm:border-t-0 sm:border-l sm:pl-10",
              )}
            >
              <Icon aria-hidden="true" className="size-5 text-text-dim" strokeWidth={1.5} />
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-2 max-w-md leading-relaxed">{description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
