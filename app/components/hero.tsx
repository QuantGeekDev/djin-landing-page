"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("./aurora"), { ssr: false });
const Orb = dynamic(() => import("./orb"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <Aurora className="opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="label text-accent-warm mb-8 sm:mb-12 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse-soft" />
          Now accepting pre-orders
        </div>

        <h1 className="heading-xl text-[2.5rem] sm:text-5xl md:text-[5.5rem] lg:text-[6.5rem] mb-6 sm:mb-8 max-w-4xl mx-auto">
          An AI agent you can
          <br />
          <span className="gradient-text">buy at the store</span>
        </h1>

        <p className="body-lg text-muted text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 sm:mb-14">
          A personal AI in a smart display. Plug it in, talk to it,
          let it handle the rest.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-14 sm:mb-20 px-4 sm:px-0">
          <a
            href="#preorder"
            className="px-8 py-3.5 rounded-full bg-foreground text-background font-medium text-[15px] hover:bg-accent-warm hover:text-white transition-all duration-300 text-center"
          >
            Pre-Order &mdash; $299
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-full border border-border text-muted hover:text-foreground hover:border-foreground/20 font-light text-[15px] transition-all duration-300 text-center"
          >
            See How It Works
          </a>
        </div>

        {/* Device mockup with orb */}
        <div className="relative mx-auto max-w-[260px] sm:max-w-[320px]">
          <div className="aspect-[3/4.5] rounded-[2rem] bg-surface border border-border overflow-hidden glow-warm">
            <div className="h-full flex flex-col p-5">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted/60 mb-6 sm:mb-8">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  <span className="text-green-500/80">online</span>
                </div>
              </div>

              {/* Living orb instead of static avatar */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
                  <Orb className="absolute inset-0" />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-2.5 mt-auto">
                <div className="frost-light rounded-xl rounded-bl-sm px-3 sm:px-3.5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-light max-w-[90%] sm:max-w-[85%] leading-relaxed">
                  Your 10am was moved to 2pm. Reschedule lunch?
                </div>
                <div className="bg-accent-warm/15 rounded-xl rounded-br-sm px-3 sm:px-3.5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-light max-w-[65%] ml-auto text-right leading-relaxed">
                  Yes, push it to 12:30
                </div>
                <div className="frost-light rounded-xl rounded-bl-sm px-3 sm:px-3.5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-light max-w-[55%] leading-relaxed">
                  Done. Updated.
                </div>
              </div>

              <div className="flex justify-center mt-5 mb-1">
                <div className="w-8 h-8 rounded-full bg-accent-warm/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-accent-warm/60 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.7">
                      <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="label text-muted/50 mt-12">
          Ships summer 2026 &middot; Free worldwide shipping
        </p>
      </div>
    </section>
  );
}
