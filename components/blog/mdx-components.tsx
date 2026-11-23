// components/blog/mdx-components.tsx
// Styles for elements inside MDX blog posts.

import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 text-2xl sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-xl sm:text-2xl" {...props} />,
  p: (props) => <p className="my-5 text-[1.05rem] leading-[1.8]" {...props} />,
  a: ({ href = "", ...props }) => {
    const className =
      "font-medium text-primary-light underline decoration-primary-light/40 underline-offset-4 transition-colors hover:text-text hover:decoration-text";
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-[1.05rem] marker:text-primary-light" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-[1.05rem] marker:text-primary-light" {...props} />
  ),
  li: (props) => <li className="pl-1 leading-[1.75]" {...props} />,
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-2 border-primary bg-primary/10 py-1 pr-5 pl-5 text-text [&_p]:my-3"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
  code: (props) => (
    <code className="rounded-md bg-card px-1.5 py-0.5 font-mono text-[0.9em] text-text" {...props} />
  ),
};
