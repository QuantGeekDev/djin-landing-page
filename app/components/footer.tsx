export default function Footer() {
  return (
    <footer className="border-t border-border py-12 sm:py-16 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          <div>
            <p className="label text-foreground tracking-[0.15em] mb-4">jinn</p>
            <p className="text-[13px] text-foreground-tertiary leading-relaxed font-light">
              An AI assistant that lives in your home.
            </p>
          </div>

          {[
            { title: "Product", links: [["Features", "#features"], ["How It Works", "#how-it-works"], ["Specs", "#specs"], ["Pricing", "#pricing"]] },
            { title: "Resources", links: [["Blog", "/blog"], ["FAQ", "#faq"], ["GitHub", "#"], ["Discord", "#"], ["Contact", "mailto:hello@get.jinn.today"]] },
            { title: "Legal", links: [["Terms", "/terms"], ["Privacy", "/privacy"], ["Refund", "/refund"]] },
          ].map((col) => (
            <div key={col.title}>
              <p className="label text-foreground-muted mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} className="text-[13px] text-foreground-tertiary hover:text-foreground transition-colors duration-200 font-light">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="label text-foreground-faint">&copy; 2026 Jinn</p>
          <p className="label text-foreground-faint">Made for a world beyond screens</p>
        </div>
      </div>
    </footer>
  );
}
