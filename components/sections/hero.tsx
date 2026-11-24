// components/sections/hero.tsx
// Home page hero with blue ambient glow and 3D perspective square grid with etechamila mouse deflection & zoom.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { PerspectiveGridWave } from "@/components/ui/perspective-grid-wave";
import { hero } from "@/data/hero";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[92svh] items-center pt-28 pb-36 md:pt-36 md:pb-44 overflow-hidden"
    >
      {/* Background Glow & 3D Interactive Grid Squares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft radial blue ambient glow */}
        <div className="absolute -top-32 left-1/2 -z-10 h-[850px] w-full max-w-[95rem] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,rgba(21,48,255,0.48)_0%,rgba(21,48,255,0.15)_50%,transparent_80%)]" />

        {/* 3D Perspective Grid with Mouse Hover Zoom & Wave */}
        <PerspectiveGridWave />

        {/* Bottom smooth fade to merge hero into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <div className="animate-fade-up">
          <Pill>{hero.pill}</Pill>
        </div>

        <h1
          id="hero-title"
          className="mt-6 max-w-5xl animate-fade-up text-[2.75rem] leading-[1.04] tracking-[-0.03em] [animation-delay:40ms] sm:text-6xl lg:text-[4.75rem]"
        >
          {hero.title.before}
          <span className="text-primary-ink">{hero.title.highlight}</span>
          {hero.title.after}
        </h1>

        <p className="mt-6 max-w-[36rem] animate-fade-up text-lg leading-[1.6] text-balance [animation-delay:80ms] text-text-muted sm:text-xl">
          {hero.description}
        </p>

        <div className="mt-10 flex w-full animate-fade-up flex-col justify-center gap-3 [animation-delay:120ms] sm:w-auto sm:flex-row">
          <Button asChild size="xl">
            <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-150 ease-out group-hover/button:translate-x-0.5"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
