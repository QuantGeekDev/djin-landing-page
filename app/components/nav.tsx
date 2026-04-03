"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="frost rounded-full px-6 h-12 flex items-center justify-between">
          <Link href="/" className="label text-foreground tracking-[0.15em]">
            jinn
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Specs", "Pricing", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-[13px] text-muted hover:text-foreground transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/blog"
              className="text-[13px] text-muted hover:text-foreground transition-colors duration-200"
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:block">
            <a
              href="#preorder"
              className="text-[13px] font-medium text-background bg-foreground hover:bg-accent-warm hover:text-white px-5 py-2 rounded-full transition-all duration-200"
            >
              Pre-Order
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2.5 -mr-2 text-muted hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden frost rounded-2xl mt-2 p-6 space-y-4">
            {["Features", "How It Works", "Specs", "Pricing", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setOpen(false)}
                className="block text-sm text-muted hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="block text-sm text-muted hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <a
              href="#preorder"
              onClick={() => setOpen(false)}
              className="block text-center text-sm font-medium text-background bg-foreground px-5 py-2.5 rounded-full"
            >
              Pre-Order
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
