const tiers = [
  {
    name: "HoloBox",
    price: "$299",
    desc: "The device. Everything you need.",
    features: ["Smart display hardware", "Pre-installed Jinn agent", "Voice wake word (on-device)", "WiFi + USB-C", "Telegram, Calendar, Smart Home", "Free OTA updates", "Community support"],
    highlight: false,
  },
  {
    name: "HoloBox Pro",
    price: "$449",
    desc: "For power users.",
    features: ["Everything in HoloBox", "8 GB RAM upgrade", "Priority support (1 year)", "Twilio voice calls", "Browser automation", "Multi-agent orchestration", "Early access to features"],
    highlight: true,
  },
  {
    name: "Jinn Cloud",
    price: "$9/mo",
    desc: "Optional. Cloud sync.",
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
          Buy once. Use forever.
        </h2>
        <p className="text-center text-muted text-[14px] sm:text-[15px] mb-12 sm:mb-20">Cloud is optional.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {tiers.map((t) => (
            <div key={t.name} className={`p-6 md:p-8 flex flex-col ${t.highlight ? "bg-accent-warm/[0.03]" : "bg-background"}`}>
              {t.highlight && <div className="label text-accent-warm text-[9px] mb-4">Most Popular</div>}

              <h3 className="text-[15px] font-normal">{t.name}</h3>
              <p className="text-[12px] text-muted/50 mt-1 mb-5">{t.desc}</p>

              <p className="text-3xl font-extralight tracking-tight mb-6">{t.price}</p>

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

        <p className="text-center label text-muted/30 mt-8">
          Free worldwide shipping &middot; Full refund if we don&apos;t ship
        </p>
      </div>
    </section>
  );
}
