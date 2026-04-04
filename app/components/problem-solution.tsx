export default function ProblemSolution() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-foreground-tertiary text-center mb-4 sm:mb-6">The problem</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-5xl text-center mb-6 max-w-3xl mx-auto">
          AI is everywhere.
          <br />
          <span className="text-foreground-tertiary">But it doesn&apos;t live anywhere.</span>
        </h2>

        <p className="text-center text-foreground-secondary text-[14px] sm:text-[15px] max-w-xl mx-auto mb-10 sm:mb-14 leading-relaxed">
          It&apos;s trapped in chat windows, phone apps, and cloud dashboards.
          You open a tab, type a prompt, copy the answer, close the tab. Repeat.
          There&apos;s no presence, no continuity, no device that just handles things for you.
        </p>

        <div className="divider max-w-16 sm:max-w-24 mx-auto my-10 sm:my-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div>
            <div className="label text-foreground-tertiary mb-4 sm:mb-6">The status quo</div>
            <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed font-normal">
              <p>Pay $20/mo for a chatbot that forgets you exist.</p>
              <p>Buy a smart speaker that can&apos;t think past one sentence.</p>
              <p>Get a cute robot that does tricks but can&apos;t do work.</p>
              <p>Self-host an AI framework &mdash; if you know Docker.</p>
              <p>Pay for cloud hosting. Forever. And hope they don&apos;t shut down.</p>
              <p className="text-accent-warm pt-2">
                AI has no home. Until now.
              </p>
            </div>
          </div>

          <div>
            <div className="label text-accent-warm mb-4 sm:mb-6">With Jinn</div>
            <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] leading-relaxed">
              <p>Plug it in. It turns on. Say &ldquo;Hey Jinn.&rdquo;</p>
              <p>A real agent that reasons, plans, and takes action.</p>
              <p>5-inch display. Always-on wake word. Real-time voice.</p>
              <p>Calendar, messages, smart home &mdash; connected via plugins.</p>
              <p>Your hardware, your network. Bring your own API keys, or let Jinn Cloud handle it.</p>
              <p>$299 pre-order. $449 retail. The device is yours forever.</p>
              <p className="text-foreground font-normal pt-2">
                The AI assistant that finally exists in the real world.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 sm:mt-16">
          <a
            href="#preorder"
            className="text-[13px] font-medium text-accent-warm hover:text-foreground transition-colors duration-200 flex items-center gap-2"
          >
            See pricing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
