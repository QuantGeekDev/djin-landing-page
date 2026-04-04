import type { Metadata } from "next";
import Link from "next/link";
import { posts, categories } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, comparisons, and insights about AI agents, smart home automation, and the Jinn HoloBox smart display.",
  alternates: {
    canonical: "https://get.jinn.today/blog",
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="label text-foreground-tertiary hover:text-foreground transition-colors mb-8 inline-block">
          &larr; Back to Jinn
        </Link>

        <h1 className="heading-lg text-3xl sm:text-4xl md:text-5xl mb-4">Blog</h1>
        <p className="text-foreground-secondary text-[15px] font-light mb-12 sm:mb-16 max-w-xl">
          Guides, comparisons, and insights about AI agents, smart home automation, and the future of personal AI.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <span
              key={cat.slug}
              className="px-3 py-1.5 rounded-full border border-border text-[12px] text-foreground-tertiary font-light"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-px rounded-2xl overflow-hidden border border-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-surface hover:bg-surface-2 transition-colors duration-200 p-6 sm:p-8 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label text-accent-warm-dim">{post.category}</span>
                    <span className="text-foreground-faint">&middot;</span>
                    <span className="label text-foreground-muted">{post.readingTime}</span>
                  </div>
                  <h2 className="text-[15px] sm:text-[16px] font-normal mb-2 group-hover:text-accent-warm transition-colors duration-200 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-foreground-secondary leading-relaxed font-normal line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <time className="text-[12px] text-foreground-muted font-mono shrink-0 sm:mt-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
