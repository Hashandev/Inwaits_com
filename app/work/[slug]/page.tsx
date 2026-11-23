// app/work/[slug]/page.tsx
// Case study page: client, problem, solution, tech, screenshots, results, testimonial.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/sections/project-card";
import { CtaBand } from "@/components/sections/cta-contact";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} – Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section
        aria-labelledby="page-title"
        className="relative isolate overflow-x-clip pt-28 pb-12 md:pt-36 md:pb-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-[-24rem] left-1/2 h-[42rem] w-[min(72rem,140vw)] -translate-x-1/2 bg-glow opacity-70" />
        </div>

        <div className="container-page">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 rounded-md text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            All projects
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
            <div className="animate-fade-up">
              <Pill>{project.category} case study</Pill>
              <h1
                id="page-title"
                className="mt-5 text-[2.2rem] leading-[1.1] font-extrabold tracking-[-0.03em] sm:text-5xl md:text-[3.25rem]"
              >
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
                {project.summary}
              </p>
            </div>

            <dl className="grid animate-fade-up grid-cols-2 gap-4 [animation-delay:120ms] lg:justify-self-end">
              <div className="card-surface p-4">
                <dt className="text-xs text-text-muted">Client</dt>
                <dd className="mt-1 font-medium text-text">{project.client}</dd>
              </div>
              <div className="card-surface p-4">
                <dt className="text-xs text-text-muted">Category</dt>
                <dd className="mt-1 font-medium text-text">{project.category}</dd>
              </div>
              {project.liveUrl && (
                <div className="col-span-2">
                  <Button asChild size="lg" className="w-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit live site
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Main screenshot */}
      <div className="container-page">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-[#070a22] p-1.5 shadow-[0_0_0_1px_rgb(21_48_255/0.12),0_40px_120px_-40px_rgb(21_48_255/0.6)]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1200}
              height={750}
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </Reveal>
      </div>

      {/* Story */}
      <section aria-label="Case study details" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">The problem</h2>
              <p className="mt-4 text-base leading-relaxed sm:text-lg">{project.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Our solution</h2>
              <p className="mt-4 text-base leading-relaxed sm:text-lg">{project.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">The result</h2>
              <ul className="mt-5 space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3 text-text">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/15">
                      <Check aria-hidden="true" strokeWidth={3} className="size-3.5 text-accent" />
                    </span>
                    {result}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="card-surface p-6">
              <h2 className="font-sans text-sm font-semibold tracking-normal text-text">
                Tech used
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-sm text-text"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="card-surface relative isolate overflow-hidden p-6" delay={0.05}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 -z-10 size-60 bg-glow"
              />
              <h2 className="font-sans text-base font-semibold tracking-normal text-text">
                Want something similar?
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Tell us about your project and we&apos;ll send you a free quote.
              </p>
              <Button asChild className="mt-5 w-full" size="lg">
                <Link href="/#quote">Get a Free Quote</Link>
              </Button>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Screenshots */}
      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="screens-title" className="pb-24 md:pb-32">
          <div className="container-page">
            <h2 id="screens-title" className="text-2xl sm:text-3xl">
              Screenshots
            </h2>
            <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
              {project.gallery.map((src, i) => (
                <RevealItem key={src}>
                  <div className="rounded-2xl border border-white/10 bg-[#070a22] p-1.5">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 2}`}
                      width={1200}
                      height={750}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full rounded-xl"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section aria-label="Client testimonial" className="pb-24 md:pb-32">
          <div className="container-page">
            <Reveal>
              <figure className="card-surface relative mx-auto max-w-4xl overflow-hidden p-8 sm:p-12">
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 grid size-20 place-items-center rounded-bl-[2rem] bg-primary"
                >
                  <Quote className="size-8 fill-white text-white" />
                </span>
                <blockquote className="pr-10 text-lg leading-relaxed text-text sm:text-2xl sm:leading-relaxed">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="block font-semibold text-text">{project.testimonial.name}</span>
                  {project.testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* More projects */}
      <section aria-labelledby="more-title" className="border-t border-border bg-bg-soft section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="more-title" className="text-2xl sm:text-3xl">
              More projects
            </h2>
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary-light hover:text-text"
            >
              View all projects
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-label="Start a project" className="section-y">
        <div className="container-page">
          <CtaBand quoteHref="/#quote" />
        </div>
      </section>
    </>
  );
}
