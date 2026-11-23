// components/sections/project-card.tsx
// Case study card used on the home page and /work. The image zooms on hover.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-soft">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-[#c9ceff]">
          {project.category}
        </span>
        <h3 className="mt-4 text-lg leading-snug">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{project.summary}</p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md pt-5 text-sm font-medium text-primary-light transition-colors after:absolute after:inset-0 after:rounded-2xl hover:text-text"
        >
          View case study
          <span className="sr-only">: {project.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
