import { Section, SectionHeader, CardGrid, CardGridItem } from "@/app/components/ui";

const cases = [
  { cat: "Personal", items: ["Morning briefing \u2014 weather, calendar, news", "Grocery lists by voice", "Hands-free reminders and timers", "Habit and routine tracking"] },
  { cat: "Smart Home", items: ["Control lights, thermostat, locks", "Complex automations by voice", "Security camera monitoring", "\u201CHey Jinn, I\u2019m going to bed\u201D"] },
  { cat: "Productivity", items: ["Calendar and meeting management", "Dictate and send messages", "Email summaries and draft replies", "Meeting notes from across the room"] },
  { cat: "Developer", items: ["Monitor deployments and CI/CD", "Natural language database queries", "GitHub issues and PRs by voice", "Scheduled scripts and automations"] },
];

export default function UseCases() {
  return (
    <Section>
      <SectionHeader
        label="Use cases"
        heading="What will you ask Jinn first?"
      />

      <CardGrid columns={4}>
        {cases.map((c) => (
          <CardGridItem key={c.cat}>
            <h3 className="label text-accent-warm mb-5">{c.cat}</h3>
            <ul className="space-y-3">
              {c.items.map((item) => (
                <li key={item} className="text-[14px] text-foreground-secondary leading-relaxed font-normal">{item}</li>
              ))}
            </ul>
          </CardGridItem>
        ))}
      </CardGrid>
    </Section>
  );
}
