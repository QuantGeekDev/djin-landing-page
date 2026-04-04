import { Section, SectionHeader } from "@/app/components/ui";

const steps = [
  { num: "01", title: "Unbox & plug in", desc: "Take it out, plug in USB-C. It powers on and connects to your WiFi." },
  { num: "02", title: "Say hello", desc: "Say \u201CHey Jinn\u201D and introduce yourself. Your first conversation starts in seconds." },
  { num: "03", title: "Connect your world", desc: "Link calendar, messaging, smart home \u2014 voice or touchscreen. Add integrations whenever you\u2019re ready." },
  { num: "04", title: "Let it work", desc: "Runs 24/7 on your counter. Manages your day. Gets better the more you use it." },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" maxWidth="4xl">
      <SectionHeader
        label="Setup"
        heading={<>Unbox to &ldquo;Hey Jinn&rdquo; in 30 seconds</>}
        subtitle="No accounts. No apps. No developer tools."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-8">
        {steps.map((s, i) => (
          <div key={s.num} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-3 left-full w-full h-px bg-border -translate-x-4" />
            )}
            <div className="font-mono text-accent-warm-dim text-sm mb-4">{s.num}</div>
            <h3 className="text-[15px] font-normal mb-2">{s.title}</h3>
            <p className="text-[14px] text-foreground-secondary leading-relaxed font-normal">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
