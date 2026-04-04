// TODO: Replace with real testimonials — names, photos, specific results.
// Generic attributions hurt credibility for a $299 product.
// Remove this section entirely if real testimonials aren't available yet.

import { Section, SectionHeader, CardGrid, CardGridItem } from "@/app/components/ui";

const quotes = [
  { text: "I replaced my Echo and Google Home with one device. It actually understands what I mean, not just what I say.", who: "Smart Home User" },
  { text: "Connected Telegram, smart lights, and calendar in under 5 minutes. The plugin system is the real deal.", who: "Developer" },
  { text: "I just talk to it while cooking. No app to open, no screen to stare at. That\u2019s the whole point.", who: "Beta Tester" },
  { text: "My kids ask it for homework help and bedtime stories. Worth every penny of the subscription.", who: "Parent" },
  { text: "Open source means I can see exactly what\u2019s running. Added my own tools in an afternoon.", who: "Full-Stack Dev" },
  { text: "Finally, someone built the thing I\u2019ve been trying to self-host for years. Except this one just works.", who: "Early Backer" },
];

export default function Testimonials() {
  return (
    <Section>
      <SectionHeader
        label="Early users"
        heading={<>Don&apos;t take our word for it</>}
      />

      <CardGrid columns={3}>
        {quotes.map((q, i) => (
          <CardGridItem key={i}>
            <p className="text-[14px] leading-relaxed font-light mb-6">&ldquo;{q.text}&rdquo;</p>
            <p className="label text-foreground-muted">{q.who}</p>
          </CardGridItem>
        ))}
      </CardGrid>
    </Section>
  );
}
