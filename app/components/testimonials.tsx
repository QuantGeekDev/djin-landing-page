// TODO: Replace with real testimonials — names, photos, specific results.
// Generic attributions hurt credibility for a $299 product.
// Remove this section entirely if real testimonials aren't available yet.

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
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Early users</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          Don&apos;t take our word for it
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {quotes.map((q, i) => (
            <div key={i} className="bg-background p-5 sm:p-6 md:p-8">
              <p className="text-[14px] leading-relaxed font-light mb-6">&ldquo;{q.text}&rdquo;</p>
              <p className="label text-muted/40">{q.who}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
