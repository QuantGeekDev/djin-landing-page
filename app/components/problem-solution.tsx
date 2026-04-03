export default function ProblemSolution() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">The problem</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-5xl text-center mb-6 max-w-3xl mx-auto">
          Everyone wants an AI assistant.
          <br />
          <span className="text-muted">Nobody wants another subscription.</span>
        </h2>
        <div className="divider max-w-16 sm:max-w-24 mx-auto my-10 sm:my-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div>
            <div className="label text-muted/50 mb-4 sm:mb-6">The status quo</div>
            <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] text-muted leading-relaxed">
              <p>Pay $20/mo for a chatbot that forgets you exist.</p>
              <p>Message a WhatsApp bot for reminders &mdash; and nothing else.</p>
              <p>Self-host an AI framework &mdash; if you know Docker.</p>
              <p>Buy a smart speaker that can&apos;t think past one sentence.</p>
              <p>Get a cute robot that does tricks but can&apos;t do work.</p>
              <p>Pay for cloud hosting. $20&ndash;80/mo. Forever.</p>
              <p className="text-accent-warm/80 pt-2">
                Nothing combines real AI with a device you actually own.
              </p>
            </div>
          </div>

          <div>
            <div className="label text-accent-warm/70 mb-4 sm:mb-6">With Jinn</div>
            <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] leading-relaxed">
              <p>Plug it in. It turns on. Say &ldquo;Hey Jinn.&rdquo;</p>
              <p>A real agent that reasons, plans, and takes action.</p>
              <p>5-inch display. Always-on wake word. Real-time voice.</p>
              <p>Calendar, messages, smart home &mdash; connected via plugins.</p>
              <p>Runs on your network. Open-source brain. Your data stays home.</p>
              <p>Buy it once. No subscription. Ever.</p>
              <p className="text-foreground font-normal pt-2">
                The AI assistant that finally exists in the real world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
