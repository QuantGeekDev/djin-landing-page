const tiers = [
  {
    name: "HoloBox",
    price: "$299",
    period: "device",
    sub: "+ $9/mo Essential plan",
    desc: "Everything you need to get started.",
    features: ["Smart display hardware", "Pre-installed Jinn agent", "Voice wake word (on-device)", "WiFi + USB-C", "Telegram, Calendar, Smart Home", "Free OTA updates", "Community support"],
    highlight: false,
  },
  {
    name: "HoloBox Pro",
    price: "$449",
    period: "device",
    sub: "+ $15/mo Pro plan",
    desc: "For power users who want it all.",
    features: ["Everything in HoloBox", "8 GB RAM upgrade", "Priority support (1 year)", "Twilio voice calls", "Browser automation", "Multi-agent orchestration", "Early access to features"],
    highlight: true,
  },
  {
    name: "Jinn Cloud",
    price: "$9/mo",
    period: "add-on",
    sub: "optional",
    desc: "Access your Jinn from anywhere.",
    features: ["Cloud-hosted instance", "Access from anywhere", "Syncs with HoloBox", "Remote monitoring", "Automatic backups", "99.9% uptime SLA", "Cancel anytime"],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Pricing</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
          Own the device. Choose your plan.
        </h2>
        <p className="text-center text-muted text-[14px] sm:text-[15px] mb-12 sm:mb-20">
          The hardware is yours forever. Cancel the plan anytime &mdash; the device still works.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {tiers.map((t) => (
            <div key={t.name} className={`p-6 md:p-8 flex flex-col ${t.highlight ? "bg-accent-warm/[0.03]" : "bg-background"}`}>
              {t.highlight && <div className="label text-accent-warm text-[9px] mb-4">Most Popular</div>}

              <h3 className="text-[15px] font-normal">{t.name}</h3>
              <p className="text-[12px] text-muted/50 mt-1 mb-3">{t.desc}</p>

              <p className="text-3xl font-extralight tracking-tight">{t.price}</p>
              <p className="text-[12px] text-muted/50 mt-1 mb-6">{t.sub}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="text-[13px] text-muted font-light flex items-start gap-2">
                    <span className={`mt-1 ${t.highlight ? "text-accent-warm/50" : "text-muted/30"}`}>&mdash;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 sm:py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                t.highlight
                  ? "bg-foreground text-background hover:bg-accent-warm hover:text-white"
                  : "border border-border text-muted hover:text-foreground hover:border-foreground/20"
              }`}>
                {t.name === "Jinn Cloud" ? "Join Waitlist" : "Pre-Order"}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-accent-warm/20 bg-accent-warm/[0.02] p-6 sm:p-8 text-center">
          <h3 className="text-[15px] font-normal mb-3">60-Day Money-Back Guarantee</h3>
          <p className="text-[13px] text-muted leading-relaxed font-light max-w-lg mx-auto">
            Try Jinn for 60 days. If it doesn&apos;t become part of your daily routine,
            send it back for a full refund. We&apos;ll even cover return shipping.
          </p>
        </div>

        <p className="text-center label text-muted/30 mt-8">
          Free worldwide shipping &middot; Secure Stripe checkout &middot; Full refund guarantee
        </p>
      </div>
    </section>
  );
}
