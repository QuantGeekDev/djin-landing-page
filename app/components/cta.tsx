"use client";

import dynamic from "next/dynamic";
import LazyCanvas from "./lazy-canvas";
import PreorderButton from "./preorder-button";

const Particles = dynamic(() => import("./particles"), { ssr: false });

export default function CTA() {
  return (
    <section className="py-20 sm:py-32 md:py-48 px-5 sm:px-6 relative overflow-hidden">
      <LazyCanvas className="absolute inset-0">
        <Particles />
      </LazyCanvas>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="heading-xl text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8">
          Your AI assistant
          <br />
          is waiting.
        </h2>
        <p className="text-foreground-secondary text-[15px] mb-4 font-light">
          $299 total &mdash; $49 deposit now, $250 when it ships.
        </p>
        <p className="text-foreground-tertiary text-[13px] mb-12 font-light">
          60-day money-back guarantee. Bring your own API keys or add Jinn Cloud ($9/mo).
        </p>
        <PreorderButton
          batch="batch_2"
          source="cta"
          className="inline-block px-10 py-3.5 rounded-full bg-foreground text-background font-medium text-[15px] hover:bg-accent-warm hover:text-white transition-all duration-300"
        >
          Pre-Order Now
        </PreorderButton>
        <p className="label text-foreground-muted mt-10">
          Ships summer 2026 &middot; Free worldwide shipping
        </p>
      </div>
    </section>
  );
}
