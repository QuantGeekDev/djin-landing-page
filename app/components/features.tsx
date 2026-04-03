const features = [
  { title: "Voice-first", desc: "Say \u201CHey Jinn\u201D and just talk. It listens, understands context, and responds in real time \u2014 like a conversation, not a command." },
  { title: "Smart display", desc: "Glance at your calendar, check the weather, read a message \u2014 all on the 5-inch display. Or just ask out loud." },
  { title: "Plugin ecosystem", desc: "Telegram, Twilio, smart home, calendar \u2014 all connected out of the box. Build your own plugins or install community ones." },
  { title: "Private by design", desc: "Your data stays on your network. Wake word runs on-device. Only what you choose leaves your home." },
  { title: "Always on", desc: "Walk into the room and it\u2019s ready. No boot screen, no loading. Your AI is always one sentence away." },
  { title: "Multi-agent", desc: "Hand off complex tasks to sub-agents that research, plan, and execute in parallel \u2014 while you do something else." },
  { title: "Proactive", desc: "It doesn\u2019t wait for you to ask. Reminders, alerts, and scheduled actions happen on your terms." },
  { title: "Open source", desc: "Swap LLM providers, write plugins, modify the system prompt. You see every line of code that runs on your device." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Capabilities</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          One device. Everything handled.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f) => (
            <div key={f.title} className="bg-background p-5 sm:p-6 md:p-8 group">
              <h3 className="text-[14px] font-normal mb-3 group-hover:text-accent-warm transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-[14px] text-muted leading-relaxed font-normal">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
