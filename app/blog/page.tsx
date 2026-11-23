// app/blog/page.tsx
// All blog posts.

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { PostCard } from "@/components/blog/post-card";
import { CtaBand } from "@/components/sections/cta-contact";
import { getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and tips on websites, online classes, LMS platforms and software for Sri Lankan businesses and educators.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        pill="Blog"
        title={
          <>
            Ideas, guides & <span className="text-primary-ink">updates</span>
          </>
        }
        description="Practical tips on websites, online classes and software for Sri Lankan businesses and educators."
      />

      <section aria-labelledby="posts-title" className="pb-24 md:pb-32">
        <h2 id="posts-title" className="sr-only">
          All articles
        </h2>
        <div className="container-page">
          {posts.length > 0 ? (
            <RevealGroup
              className={cn(
                "mx-auto grid max-w-md gap-5",
                // Keep cards centred when there are fewer than 3 posts
                posts.length === 2 && "sm:max-w-4xl sm:grid-cols-2",
                posts.length >= 3 && "sm:max-w-none sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {posts.map((post) => (
                <RevealItem key={post.slug}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="text-center">New articles are coming soon.</p>
          )}
        </div>
      </section>

      <section aria-label="Start a project" className="pb-24 md:pb-32">
        <div className="container-page">
          <CtaBand quoteHref="/#quote" />
        </div>
      </section>
    </>
  );
}
