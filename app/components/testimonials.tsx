const quotes = [
  { text: "I\u2019ve been waiting for someone to put an AI agent in a physical device that just works.", who: "Early Backer" },
  { text: "Finally, an AI assistant I don\u2019t have to open an app for. I just talk to it while cooking.", who: "Beta Tester" },
  { text: "Connected Telegram, smart lights, and calendar in under 5 minutes.", who: "Developer" },
  { text: "My kids talk to it for homework help and bedtime stories. Worth every penny.", who: "Parent" },
  { text: "Replaced my Echo and Google Home. The difference is night and day \u2014 it actually understands context.", who: "Smart Home User" },
  { text: "Open source brain means I can customize it. Added my own tools in an afternoon.", who: "Full-Stack Dev" },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Testimonials</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          People are talking
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
