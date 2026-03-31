"use client";

import dynamic from "next/dynamic";
import LazyCanvas from "./lazy-canvas";

const Particles = dynamic(() => import("./particles"), { ssr: false });

export default function CTA() {
  return (
    <section className="py-20 sm:py-32 md:py-48 px-5 sm:px-6 relative overflow-hidden">
      <LazyCanvas className="absolute inset-0">
        <Particles />
      </LazyCanvas>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="heading-xl text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8">
          Your AI agent
          <br />
          is waiting.
        </h2>
        <p className="text-muted text-[15px] mb-12 font-light">
          Be one of the first to own a personal AI agent.
        </p>
        <a
          href="#preorder"
          className="inline-block px-10 py-3.5 rounded-full bg-foreground text-background font-medium text-[15px] hover:bg-accent-warm hover:text-white transition-all duration-300"
        >
          Pre-Order Now
        </a>
        <p className="label text-muted/30 mt-10">
          Ships summer 2026 &middot; Free worldwide shipping
        </p>
      </div>
    </section>
  );
}
