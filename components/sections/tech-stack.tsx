// components/sections/tech-stack.tsx
// Technology logos: grey by default, brand colour on hover/focus, name in a tooltip.

import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { techStack } from "@/data/tech";

export function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-title" className="section-y relative">
      <div className="container-page">
        <SectionHeader
          id="tech-title"
          pill="Technologies"
          title={
            <>
              Built with modern, <span className="text-primary-ink">reliable technology</span>
            </>
          }
          description="The frameworks and tools behind every site and system we ship — battle‑tested, well‑supported, and chosen for a reason."
        />

        <RevealGroup
          as="ul"
          stagger={0.04}
          className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-4"
        >
          {techStack.map(({ name, icon: Icon, color }) => (
            <RevealItem as="li" key={name} className="w-[calc((100%-1.5rem)/3)] sm:w-32 lg:w-36">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    tabIndex={0}
                    role="img"
                    aria-label={name}
                    style={{ "--brand": color } as React.CSSProperties}
                    className="group card-surface flex h-24 flex-col items-center justify-center gap-2 transition-[border-color,transform] duration-300 outline-none hover:-translate-y-1 hover:border-primary/50 focus-visible:border-primary-light sm:h-28"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-8 text-text-dim transition-colors duration-300 group-hover:text-(--brand) group-focus-visible:text-(--brand) sm:size-9"
                    />
                    <span aria-hidden="true" className="text-xs text-text-muted sm:hidden">
                      {name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>{name}</TooltipContent>
              </Tooltip>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
