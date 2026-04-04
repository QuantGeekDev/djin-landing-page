import { Section, SectionHeader, CardGrid, CardGridItem } from "@/app/components/ui";

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
    <Section id="features">
      <SectionHeader
        label="Capabilities"
        heading="One device. Everything handled."
      />

      <CardGrid columns={4}>
        {features.map((f) => (
          <CardGridItem key={f.title} className="group">
            <h3 className="text-[14px] font-normal mb-3 group-hover:text-accent-warm transition-colors duration-300">
              {f.title}
            </h3>
            <p className="text-[14px] text-foreground-secondary leading-relaxed font-normal">{f.desc}</p>
          </CardGridItem>
        ))}
      </CardGrid>
    </Section>
  );
}
