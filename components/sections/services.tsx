// components/sections/services.tsx
// "Our Services": centred heading, then the services in a clean grid separated
// by thin lines (4 across on desktop, 2 on tablet, 1 on mobile).
// Content lives in data/services.ts.

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/animated-section";
import { services, servicesSection } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.94,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: EASE,
    },
  }),
};

export function Services() {
  const { pill, title, cta } = servicesSection;

  return (
    <section aria-labelledby="services-title" className="section-y relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Pill>{pill}</Pill>
          <h2
            id="services-title"
            className="mt-4 text-[2rem] leading-[1.12] tracking-[-0.02em] sm:text-4xl md:text-5xl md:leading-[1.08]"
          >
            {title.before}
            {title.highlight}
            {title.after}
          </h2>
        </Reveal>

        {/* gap-px on a border-coloured background draws the thin lines between services */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-border lg:mt-16">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ slug, title: name, description, icon: Icon }, i) => (
              <motion.li
                key={slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="group relative flex flex-col bg-bg p-6 transition-colors duration-200 ease-out hover:bg-card/90 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl border border-border bg-card text-primary-light transition-all duration-200 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight text-text group-hover:text-white transition-colors">{name}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">{description}</p>
                <Link
                  href={cta.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-md pt-8 text-sm font-medium text-text-muted transition-colors duration-150 ease-out after:absolute after:inset-0 group-hover:text-primary-light"
                >
                  {cta.label}
                  <span className="sr-only">: {name}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
