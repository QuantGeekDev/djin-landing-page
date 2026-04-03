const items = [
  {
    title: "Not a chatbot",
    alt: "Chat apps give you a text box. You type, it replies, you copy-paste. That\u2019s autocomplete with extra steps.",
    jinn: "Jinn reasons, plans, uses tools, and takes real actions across your apps and devices.",
  },
  {
    title: "Not a cloud service",
    alt: "Cloud-hosted AI costs $20\u201380/mo for a VM you don\u2019t own. They can change pricing or shut down anytime.",
    jinn: "Runs on hardware you own, on your network. No hosting fees. No vendor lock-in. If we disappear, your device still works.",
  },
  {
    title: "Not a smart speaker",
    alt: "Voice assistants can set timers and play music. Ask anything complex and they fall apart.",
    jinn: "Handles multi-step tasks, remembers context, browses the web, drafts messages, and orchestrates sub-agents.",
  },
  {
    title: "Not a desk toy",
    alt: "Companion robots are adorable. They react to touch. But they can\u2019t manage a calendar or control your lights.",
    jinn: "An animated avatar on a 5-inch display, backed by the same AI that powers enterprise automation.",
  },
  {
    title: "Not a developer tool",
    alt: "Open-source agent frameworks are powerful \u2014 if you can manage Docker, Python, and a VPS.",
    jinn: "Same power, consumer packaging. Plug in, connect WiFi, start talking.",
  },
];

export default function WhyJinn() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Why Jinn</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
          We looked at every alternative.
        </h2>
        <p className="text-center text-muted text-[14px] sm:text-[15px] mb-12 sm:mb-20">None of them are what we wanted. So we built it.</p>

        <div className="space-y-px rounded-2xl overflow-hidden border border-border">
          {items.map((item) => (
            <div key={item.title} className="bg-surface">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-[15px] font-normal">{item.title}</h3>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
                  <div className="label text-muted/30 mb-2">Alternative</div>
                  <p className="text-[14px] text-muted leading-relaxed font-light">{item.alt}</p>
                </div>
                <div className="px-6 py-5">
                  <div className="label text-accent-warm/50 mb-2">Jinn</div>
                  <p className="text-[14px] leading-relaxed font-light">{item.jinn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
