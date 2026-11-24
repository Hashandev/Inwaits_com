// components/sections/tech-stack.tsx
// Technology logos in a dual-row marquee ticker with pause-on-hover and tooltips.

import { SectionHeader } from "@/components/ui/section-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { techStack, type Tech } from "@/data/tech";

function TechCard({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          tabIndex={0}
          role="img"
          aria-label={tech.name}
          style={{ "--brand": tech.color } as React.CSSProperties}
          className="group card-surface flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl transition-[border-color,transform] duration-300 outline-none hover:-translate-y-1 hover:border-primary/50 focus-visible:border-primary-light sm:h-28 sm:w-36"
        >
          <Icon
            aria-hidden="true"
            className="size-8 text-text-dim transition-colors duration-300 group-hover:text-(--brand) group-focus-visible:text-(--brand) sm:size-9"
          />
          <span
            aria-hidden="true"
            className="text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text"
          >
            {tech.name}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>{tech.name}</TooltipContent>
    </Tooltip>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = "35s",
}: {
  items: Tech[];
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className="group/row relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div
        style={{ "--marquee-duration": duration } as React.CSSProperties}
        className={`flex w-max gap-4 py-2 group-hover/row:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <ul className="flex shrink-0 items-center gap-4">
          {items.map((tech) => (
            <li key={tech.name}>
              <TechCard tech={tech} />
            </li>
          ))}
        </ul>
        {/* Seamless duplicate */}
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-4">
          {items.map((tech) => (
            <li key={`${tech.name}-dup`}>
              <TechCard tech={tech} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TechStack() {
  const row1 = techStack.slice(0, 7);
  const row2 = techStack.slice(7);

  return (
    <section id="tech" aria-labelledby="tech-title" className="section-y relative overflow-hidden">
      <div className="container-page mb-12">
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
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} duration="35s" />
        <MarqueeRow items={row2} reverse duration="38s" />
      </div>
    </section>
  );
}
