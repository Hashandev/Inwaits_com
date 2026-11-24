"use client";

// components/sections/testimonials.tsx
// Sleek Infinite Marquee Carousel for testimonials:
// Modern, minimalist cards continuously gliding horizontally across the screen,
// with subtle dark-glass surfaces, pause-on-hover, and fade-out gradient edges.

import { CheckCircle2, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials, type Testimonial } from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group card-surface relative flex h-[260px] w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card sm:h-[270px] sm:w-[400px] sm:p-8">
      <div>
        <div className="flex items-center justify-between">
          <Quote className="size-6 text-primary-light/40 transition-colors duration-300 group-hover:text-primary-light" />
          <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-accent">
            <CheckCircle2 className="size-3.5" />
            Verified
          </span>
        </div>

        <p className="mt-4 line-clamp-4 text-[14.5px] leading-relaxed text-text-muted transition-colors duration-200 group-hover:text-text sm:text-[15px]">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3.5 border-t border-border/50 pt-4">
        <div className="grid size-9 place-items-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary-light ring-1 ring-primary/20 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
          {initials(t.name)}
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-text">{t.name}</span>
          {t.role && (
            <span className="block truncate font-mono text-[11px] text-text-dim">{t.role}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-y relative overflow-hidden bg-bg-soft/50"
    >
      <div className="container-page mb-12 sm:mb-16">
        <SectionHeader
          id="testimonials-title"
          pill="Client Stories"
          title={
            <>
              Trusted by businesses, <span className="text-primary-ink">proven by results</span>
            </>
          }
          description="What founders and business leaders say about working with Inwaits."
        />
      </div>

      {/* Infinite gliding marquee with soft edge fades */}
      <div className="group/track relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div
          style={{ "--marquee-duration": "32s" } as React.CSSProperties}
          className="flex w-max gap-5 py-3 animate-marquee group-hover/track:[animation-play-state:paused]"
        >
          <ul className="flex shrink-0 items-center gap-5">
            {testimonials.map((t) => (
              <li key={t.name}>
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
          {/* Seamless duplicate copy for infinite glide */}
          <ul aria-hidden="true" className="flex shrink-0 items-center gap-5">
            {testimonials.map((t) => (
              <li key={`${t.name}-dup`}>
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
