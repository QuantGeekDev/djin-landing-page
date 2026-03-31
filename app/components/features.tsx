const features = [
  { title: "Voice-first", desc: "Wake word detection, natural conversation, real-time speech. Talk to it like a person." },
  { title: "Smart display", desc: "5-inch touchscreen. Calendar, weather, messages, and an avatar that talks back." },
  { title: "Plugin ecosystem", desc: "Telegram, Twilio, smart home, calendar. Open plugin system for anything." },
  { title: "Private by design", desc: "Runs locally on your network. Your data stays home unless you say otherwise." },
  { title: "Always on", desc: "Always listening for your wake word. No boot time. It\u2019s just there." },
  { title: "Multi-agent", desc: "Spawn sub-agents for complex tasks. Research, plan, and execute in parallel." },
  { title: "Proactive", desc: "Reminds you, alerts you, takes action on schedules you define." },
  { title: "Open source brain", desc: "Swap LLM providers, customize behavior, extend everything. You own the stack." },
];

export default function Features() {
  return (
    <section id="features" className="py-32 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-6">Capabilities</div>
        <h2 className="heading-lg text-3xl md:text-4xl text-center mb-20">
          Everything you need. Nothing you don&apos;t.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f) => (
            <div key={f.title} className="bg-background p-6 md:p-8 group">
              <h3 className="text-[14px] font-normal mb-3 group-hover:text-accent-warm transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
