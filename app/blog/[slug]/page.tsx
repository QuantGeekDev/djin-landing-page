import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";
import { ButtonLink } from "@/app/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://get.jinn.today/blog/${post.slug}`,
    },
  };
}

function ArticleSchema({ post }: { post: (typeof posts)[0] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://get.jinn.today",
    },
    publisher: {
      "@type": "Organization",
      name: "Jinn",
      url: "https://get.jinn.today",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://get.jinn.today/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function renderMarkdown(content: string) {
  // Simple markdown-to-JSX renderer for blog posts
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableRows: string[][] = [];
  let inTable = false;
  let headerRow = false;

  while (i < lines.length) {
    const line = lines[i];

    // Table handling
    if (line.startsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
        headerRow = true;
      }
      if (line.match(/^\|[\s-|]+$/)) {
        // Separator row, skip
        i++;
        continue;
      }
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      tableRows.push(cells);
      if (headerRow) headerRow = false;

      // Check if next line is not a table
      if (i + 1 >= lines.length || !lines[i + 1].startsWith("|")) {
        // Render the table
        const header = tableRows[0];
        const body = tableRows.slice(1);
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {header.map((cell, ci) => (
                    <th
                      key={ci}
                      className="px-4 py-3 text-left text-[13px] font-normal text-foreground-tertiary"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri} className="border-b border-border last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-[14px] font-normal text-foreground-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
      }
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl sm:text-2xl font-normal mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg font-normal mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Checklist items
    if (line.startsWith("- [ ] ")) {
      elements.push(
        <div key={`check-${i}`} className="flex items-start gap-2 text-[14px] text-foreground-secondary leading-relaxed font-normal ml-1 my-1">
          <span className="text-foreground-muted mt-0.5">&#9744;</span>
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(6)) }} />
        </div>
      );
      i++;
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      elements.push(
        <div
          key={`li-${i}`}
          className="flex items-start gap-2 text-[14px] text-foreground-secondary leading-relaxed font-normal ml-1 my-1"
        >
          <span className="text-accent-warm-dim mt-1">&mdash;</span>
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }} />
        </div>
      );
      i++;
      continue;
    }

    // Numbered list items
    const numMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numMatch) {
      elements.push(
        <div
          key={`ol-${i}`}
          className="flex items-start gap-3 text-[14px] text-foreground-secondary leading-relaxed font-normal ml-1 my-1"
        >
          <span className="text-accent-warm-dim font-mono text-[12px] mt-0.5 shrink-0">
            {numMatch[1]}.
          </span>
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(numMatch[2]) }} />
        </div>
      );
      i++;
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed font-normal my-4"
        dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
      />
    );
    i++;
  }

  return elements;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-normal">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="text-accent-warm bg-surface px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>')
    .replace(/\u2014/g, "&mdash;")
    .replace(/\u2192/g, "&rarr;");
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <ArticleSchema post={post} />
      <article className="min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="label text-foreground-tertiary hover:text-foreground transition-colors mb-8 inline-block"
          >
            &larr; All posts
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="label text-accent-warm-dim">
              {post.category}
            </span>
            <span className="text-foreground-faint">&middot;</span>
            <span className="label text-foreground-muted">
              {post.readingTime}
            </span>
            <span className="text-foreground-faint">&middot;</span>
            <time className="label text-foreground-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="heading-lg text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-foreground-secondary text-[15px] font-light mb-10 sm:mb-12 leading-relaxed">
            {post.description}
          </p>

          <div className="divider mb-10 sm:mb-12" />

          <div className="prose-custom">{renderMarkdown(post.content)}</div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border text-[11px] text-foreground-muted font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-container border border-accent-warm/20 bg-accent-warm/[0.02] p-6 sm:p-8 text-center">
            <h3 className="text-[15px] font-normal mb-2">
              Want an AI agent on your counter?
            </h3>
            <p className="text-[14px] text-foreground-secondary font-normal mb-4">
              Jinn HoloBox is available for pre-order at $299 ($150 off retail).
            </p>
            <ButtonLink
              href="/#pricing"
              className="px-6 py-2.5 text-[13px]"
            >
              Pre-Order Now
            </ButtonLink>
          </div>
        </div>
      </article>
    </>
  );
}
