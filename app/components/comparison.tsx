const categories = [
  { name: "Smart Speakers", sub: "Voice assistants in a speaker", v: [1,0,0,0,0,0,1] },
  { name: "Chat Apps", sub: "AI chatbots via messaging", v: [0,0,0,1,0,0,0] },
  { name: "Cloud Hosting", sub: "Managed AI in the cloud", v: [0,0,1,1,0,0,0] },
  { name: "Desktop Bots", sub: "Hardware that automates your PC", v: [0,0,1,0,1,0,0] },
  { name: "Companion Robots", sub: "Animated pet robots", v: [1,0,0,0,0,0,1] },
  { name: "Jinn HoloBox", sub: "AI agent in a smart display", v: [1,1,1,1,1,1,1] },
];

const cols = ["Voice", "Display", "AI Agent", "Plugins", "Local", "Open Source", "No Sub"];

function Check() {
  return <span className="text-accent-warm text-sm">&#10003;</span>;
}
function Dash() {
  return <span className="text-muted/20 text-sm">&mdash;</span>;
}

export default function Comparison() {
  return (
    <section className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Comparison</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          How Jinn compares
        </h2>

        <div className="hidden md:block overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 font-light text-muted/60 text-xs w-52" />
                {cols.map(c => (
                  <th key={c} className="px-3 py-4 label text-muted/40 text-center text-[10px]">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const isJinn = cat.name === "Jinn HoloBox";
                return (
                  <tr key={cat.name} className={`border-b border-border last:border-0 ${isJinn ? "bg-accent-warm/[0.03]" : ""}`}>
                    <td className="px-6 py-5">
                      <p className={`text-[14px] ${isJinn ? "text-accent-warm font-normal" : "font-light"}`}>{cat.name}</p>
                      <p className="text-[11px] text-muted/40 mt-0.5">{cat.sub}</p>
                    </td>
                    {cat.v.map((val, i) => (
                      <td key={i} className="px-3 py-5 text-center">{val ? <Check /> : <Dash />}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3">
          {categories.map((cat) => {
            const isJinn = cat.name === "Jinn HoloBox";
            const count = cat.v.filter(Boolean).length;
            return (
              <div key={cat.name} className={`rounded-xl border p-4 ${isJinn ? "border-accent-warm/30 bg-accent-warm/[0.03]" : "border-border"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${isJinn ? "text-accent-warm" : ""}`}>{cat.name}</p>
                    <p className="text-[11px] text-muted/40">{cat.sub}</p>
                  </div>
                  <span className={`font-mono text-sm ${isJinn ? "text-accent-warm" : "text-muted/40"}`}>{count}/7</span>
                </div>
                <div className="flex gap-1 mt-3">
                  {cat.v.map((val, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${val ? (isJinn ? "bg-accent-warm/60" : "bg-foreground/20") : "bg-border"}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
