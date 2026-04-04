import { Section, SectionHeader, BorderedContainer } from "@/app/components/ui";

const specs = [
  { l: "Display", v: '5" IPS Touchscreen' },
  { l: "Resolution", v: "720 \u00d7 1280" },
  { l: "Processor", v: "Quad-core ARM (RK3566)" },
  { l: "GPU", v: "Mali-G52 (Panfrost)" },
  { l: "RAM", v: "4 GB" },
  { l: "Storage", v: "32 GB eMMC" },
  { l: "WiFi", v: "802.11ac (5 GHz)" },
  { l: "Microphones", v: "3\u00d7 MEMS Array (ES7202)" },
  { l: "Speaker", v: "Built-in (RK809 codec)" },
  { l: "Wake Word", v: "On-device NPU" },
  { l: "Power", v: "USB-C + Internal Battery" },
  { l: "OS", v: "Linux (Armbian)" },
];

export default function Specs() {
  return (
    <Section id="specs" maxWidth="3xl">
      <SectionHeader
        label="Hardware"
        heading="Real hardware, not a rebranded tablet"
        subtitle="Built to sit on your counter and run 24/7."
      />

      <BorderedContainer>
        {specs.map((s, i) => (
          <div key={s.l} className={`flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 gap-4 ${i < specs.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-[13px] text-foreground-tertiary font-light shrink-0">{s.l}</span>
            <span className="text-[12px] sm:text-[13px] font-mono text-right">{s.v}</span>
          </div>
        ))}
      </BorderedContainer>

      <p className="text-center label text-foreground-muted mt-8">
        Final specifications may vary
      </p>
    </Section>
  );
}
