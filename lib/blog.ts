// lib/blog.ts
// Reads MDX blog posts from /content/blog. Each file needs frontmatter:
//   title, description, date (YYYY-MM-DD), author, category
// The file name (without .mdx) becomes the URL: /blog/<file-name>

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    // gray-matter may parse dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    author: String(data.author ?? "Inwaits Team"),
    category: String(data.category ?? "News"),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return toMeta(file.replace(/\.mdx$/, ""), data, content);
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { ...toMeta(slug, data, content), content };
  } catch {
    return null;
  }
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
