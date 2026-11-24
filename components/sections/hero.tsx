"use client";

// components/sections/hero.tsx
// Home page hero with premium 3D holographic grid floor, blue ambient glow,
// and interactive mouse hover effects.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { PerspectiveCurveGrid } from "@/components/ui/perspective-curve-grid";
import { hero } from "@/data/hero";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* ── Background layers ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Top radial glow — rich blue ambiance */}
        <div className="absolute -top-24 left-1/2 h-[800px] w-full max-w-[100rem] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(21,48,255,0.38)_0%,rgba(21,48,255,0.10)_50%,transparent_80%)]" />

        {/* Secondary subtle glow for more depth */}
        <div className="absolute top-1/3 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(21,48,255,0.08)_0%,transparent_70%)]" />

        {/* 3D Perspective Grid Floor */}
        <PerspectiveCurveGrid />

        {/* Bottom dark fade */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="container-page relative z-10 flex flex-col items-center pt-24 pb-32 text-center md:pt-28 md:pb-40">
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
