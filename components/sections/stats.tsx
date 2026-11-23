// components/sections/stats.tsx
// The numbers row: large tabular figures split by thin lines (no cards, no glow).
// Each figure counts up once when it scrolls into view. Values come from data/stats.ts;
// while a value is null, its placeholder (e.g. "[XX]+") is shown.

import { CountUp } from "@/components/ui/count-up";
import { RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section id="stats" aria-labelledby="stats-title" className="relative pb-24 md:pb-32">
      <h2 id="stats-title" className="sr-only">
        Inwaits in numbers
      </h2>
      <div className="container-page">
        {/* gap-px on a border-coloured background draws the thin lines between figures */}
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-px border-y border-border bg-border lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <RevealItem as="li" key={stat.label} className="bg-bg px-4 py-10 text-center sm:py-12">
              <p className="font-heading text-5xl leading-none font-semibold tracking-[-0.03em] text-text tabular-nums sm:text-6xl">
                {stat.value !== null ? (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                ) : (
                  <span className="text-text-muted">
                    [{stat.placeholder}]{stat.suffix}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-text-muted sm:text-[15px]">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
