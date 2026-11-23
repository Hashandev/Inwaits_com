// components/ui/page-header.tsx
// Top section for inner pages (/services, /work, /about …): pill, h1, description
// and optional buttons, on the same grid + glow background as the home hero.

import { Pill } from "@/components/ui/pill";

type PageHeaderProps = {
  pill: string;
  pillDot?: "primary" | "accent";
  /** Pass a node to highlight words, e.g. <>Our <span className="text-primary-ink">work</span></> */
  title: React.ReactNode;
  description?: string;
  /** Optional buttons shown under the description */
  children?: React.ReactNode;
};

export function PageHeader({
  pill,
  pillDot = "primary",
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-x-clip pt-32 pb-16 md:pt-44 md:pb-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-[-24rem] left-1/2 h-[42rem] w-[min(72rem,140vw)] -translate-x-1/2 bg-glow opacity-70" />
      </div>

      <div className="container-page text-center">
        <div className="animate-fade-up">
          <Pill dot={pillDot}>{pill}</Pill>
        </div>
        <h1
          id="page-title"
          className="mx-auto mt-6 max-w-4xl animate-fade-up text-[2.3rem] leading-[1.1] font-extrabold tracking-[-0.03em] [animation-delay:60ms] sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed [animation-delay:140ms] sm:text-lg">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-9 flex animate-fade-up flex-col justify-center gap-3 [animation-delay:220ms] sm:flex-row">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
