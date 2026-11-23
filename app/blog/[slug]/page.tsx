// app/blog/[slug]/page.tsx
// A single MDX blog post.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { PostCard } from "@/components/blog/post-card";
import { mdxComponents } from "@/components/blog/mdx-components";
import { CtaBand } from "@/components/sections/cta-contact";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const more = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-x-clip pt-28 pb-10 md:pt-36 md:pb-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid" />
            <div className="absolute top-[-24rem] left-1/2 h-[42rem] w-[min(72rem,140vw)] -translate-x-1/2 bg-glow opacity-70" />
          </div>
          <div className="container-page max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 rounded-md text-sm text-text-muted transition-colors hover:text-text"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-0.5"
              />
              All articles
            </Link>
            <div className="mt-8 animate-fade-up">
              <Pill>{post.category}</Pill>
              <h1 className="mt-5 text-[2.1rem] leading-[1.12] font-extrabold tracking-[-0.03em] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed sm:text-lg">{post.description}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
                <span className="font-medium text-text">{post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </p>
            </div>
          </div>
        </header>

        <div className="container-page max-w-3xl border-t border-border pt-4 pb-20 md:pb-28">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>

      <section aria-label="Start a project" className="pb-24 md:pb-32">
        <div className="container-page">
          <CtaBand quoteHref="/#quote" />
        </div>
      </section>

      {more.length > 0 && (
        <section aria-labelledby="more-posts-title" className="section-y border-t border-border bg-bg-soft">
          <div className="container-page">
            <h2 id="more-posts-title" className="text-2xl sm:text-3xl">
              More articles
            </h2>
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <RevealItem key={p.slug}>
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
