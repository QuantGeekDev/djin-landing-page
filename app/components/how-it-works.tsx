const steps = [
  { num: "01", title: "Unbox & plug in", desc: "Take it out, plug in USB-C. It powers on and connects to WiFi." },
  { num: "02", title: "Say hello", desc: "Say \u201CHey Djin\u201D and introduce yourself. It learns your name and routines." },
  { num: "03", title: "Connect your world", desc: "Link calendar, messaging, smart home \u2014 voice or touchscreen setup." },
  { num: "04", title: "Let it work", desc: "Runs 24/7 on your counter. Manages your day. Gets smarter over time." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Setup</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
          30 seconds. Literally.
        </h2>
        <p className="text-center text-muted text-[14px] sm:text-[15px] mb-12 sm:mb-20">No accounts. No apps. No developer tools.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-3 left-full w-full h-px bg-border -translate-x-4" />
              )}
              <div className="font-mono text-accent-warm/30 text-sm mb-4">{s.num}</div>
              <h3 className="text-[15px] font-normal mb-2">{s.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
