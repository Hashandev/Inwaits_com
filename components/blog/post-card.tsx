// components/blog/post-card.tsx
// Blog post card with a generated cover (no image needed).

import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Globe, GraduationCap, Newspaper, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";

const categoryIcons: Record<string, LucideIcon> = {
  LMS: GraduationCap,
  Web: Globe,
  Software: Code2,
  Design: Palette,
  Guides: BookOpen,
};

export function PostCard({ post }: { post: PostMeta }) {
  const Icon = categoryIcons[post.category] ?? Newspaper;

  return (
    <article className="card-surface card-hover group relative flex h-full flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="relative flex aspect-[16/8] items-center justify-center overflow-hidden border-b border-border bg-linear-to-br from-[#1530ff]/40 via-[#0e1335] to-[#0a0e2a]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
        <span className="relative grid size-16 place-items-center rounded-2xl bg-primary/25 ring-1 ring-primary/50 shadow-[0_0_40px_-6px_var(--primary-glow)] transition-transform duration-500 group-hover:scale-110">
          <Icon className="size-8 text-white" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-medium text-[#c9ceff]">
            {post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="mt-4 text-lg leading-snug">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{post.description}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md pt-5 text-sm font-medium text-primary-light transition-colors after:absolute after:inset-0 after:rounded-2xl hover:text-text"
        >
          Read article
          <span className="sr-only">: {post.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
