"use client";

import dynamic from "next/dynamic";
import LazyCanvas from "./lazy-canvas";
import PreorderButton from "./preorder-button";
import { Section } from "@/app/components/ui";

const Particles = dynamic(() => import("./particles"), { ssr: false });

export default function CTA() {
  return (
    <Section maxWidth="xl" className="sm:py-32 md:py-48 relative overflow-hidden">
      <LazyCanvas className="absolute inset-0">
        <Particles />
      </LazyCanvas>

      <div className="relative z-10 text-center">
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
          className="inline-block px-10 py-3.5 rounded-button bg-foreground text-background font-medium text-[15px] hover:bg-accent-warm hover:text-white transition-emphasis"
        >
          Pre-Order Now
        </PreorderButton>
        <p className="label text-foreground-muted mt-10">
          Ships winter 2026 &middot; Worldwide shipping
        </p>
      </div>
    </Section>
  );
}
