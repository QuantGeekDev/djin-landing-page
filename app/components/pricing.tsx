"use client";

import PreorderButton from "./preorder-button";
import { trackEvent } from "@/app/lib/analytics";

const tiers = [
  {
    name: "HoloBox",
    price: "$299",
    originalPrice: "$449",
    period: "device",
    sub: "Early backer price — $150 off retail",
    desc: "The full Jinn experience. Everything included.",
    features: [
      "Smart display hardware",
      "Pre-installed Jinn agent",
      "Voice wake word (on-device)",
      "WiFi + USB-C",
      "Telegram, Calendar, Smart Home",
      "Twilio voice calls",
      "Browser automation",
      "Multi-agent orchestration",
      "Free OTA updates",
      "Community support",
    ],
    highlight: true,
  },
  {
    name: "Jinn Cloud",
    price: "$9/mo",
    originalPrice: null,
    period: "subscription",
    sub: "Optional — or bring your own API keys for free",
    desc: "Don\u2019t want to manage API keys? We\u2019ll handle the AI infrastructure for you.",
    features: [
      "Managed AI — no API keys needed",
      "Access your Jinn from anywhere",
      "Cloud-synced conversations",
      "Remote monitoring",
      "Automatic backups",
      "99.9% uptime SLA",
      "Cancel anytime",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="label text-foreground-tertiary text-center mb-4 sm:mb-6">Pricing</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
          Own the device. Choose how you run it.
        </h2>
        <p className="text-center text-foreground-secondary text-[14px] sm:text-[15px] mb-12 sm:mb-20">
          Bring your own API keys, or let Jinn Cloud handle everything. The hardware is yours either way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {tiers.map((t) => (
            <div key={t.name} className={`p-6 md:p-8 flex flex-col ${t.highlight ? "bg-accent-warm/[0.03]" : "bg-background"}`}>
              {t.highlight && <div className="label text-accent-warm mb-4">Pre-Order &mdash; Save $150</div>}

              <h3 className="text-[15px] font-normal">{t.name}</h3>
              <p className="text-[13px] text-foreground-tertiary mt-1 mb-3">{t.desc}</p>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-extralight tracking-tight">{t.price}</p>
                {t.originalPrice && (
                  <p className="text-lg font-extralight text-foreground-muted line-through">{t.originalPrice}</p>
                )}
              </div>
              <p className="text-[13px] text-foreground-tertiary mt-1 mb-6">{t.sub}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="text-[14px] text-foreground-secondary font-normal flex items-start gap-2">
                    <span className={`mt-1 ${t.highlight ? "text-accent-warm-dim" : "text-foreground-muted"}`}>&mdash;</span>
                    {f}
                  </li>
                ))}
              </ul>

              {t.highlight ? (
                <PreorderButton
                  batch="batch_2"
                  source="pricing"
                  className="w-full py-3 sm:py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 bg-foreground text-background hover:bg-accent-warm hover:text-white"
                >
                  Pre-Order &mdash; $49 Deposit
                </PreorderButton>
              ) : (
                <button
                  onClick={() =>
                    trackEvent("waitlist_signup", { location: "pricing", tier: t.name })
                  }
                  className="w-full py-3 sm:py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 border border-border text-foreground-tertiary hover:text-foreground hover:border-foreground/20"
                >
                  Join Waitlist
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-accent-warm/20 bg-accent-warm/[0.02] p-6 sm:p-8 text-center">
          <h3 className="text-[15px] font-normal mb-3">60-Day Money-Back Guarantee</h3>
          <p className="text-[14px] text-foreground-secondary leading-relaxed font-normal max-w-lg mx-auto">
            Try Jinn for 60 days. If it doesn&apos;t become part of your daily routine,
            send it back for a full refund. We&apos;ll even cover return shipping.
          </p>
        </div>

        <p className="text-center label text-foreground-muted mt-8">
          Free worldwide shipping &middot; Secure Stripe checkout &middot; Full refund guarantee
        </p>
      </div>
    </section>
  );
}
