const cases = [
  { cat: "Personal", items: ["Morning briefing \u2014 weather, calendar, news", "Grocery lists by voice", "Hands-free reminders and timers", "Habit and routine tracking"] },
  { cat: "Smart Home", items: ["Control lights, thermostat, locks", "Complex automations by voice", "Security camera monitoring", "\u201CHey Djin, I\u2019m going to bed\u201D"] },
  { cat: "Productivity", items: ["Calendar and meeting management", "Dictate and send messages", "Email summaries and draft replies", "Meeting notes from across the room"] },
  { cat: "Developer", items: ["Monitor deployments and CI/CD", "Natural language database queries", "GitHub issues and PRs by voice", "Scheduled scripts and automations"] },
];

export default function UseCases() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Use cases</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          What can Djin do?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {cases.map((c) => (
            <div key={c.cat} className="bg-background p-5 sm:p-6 md:p-8">
              <h3 className="label text-accent-warm/60 mb-5">{c.cat}</h3>
              <ul className="space-y-3">
                {c.items.map((item) => (
                  <li key={item} className="text-[13px] text-muted leading-relaxed font-light">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
