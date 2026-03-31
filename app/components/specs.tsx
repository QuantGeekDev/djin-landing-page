const specs = [
  { l: "Display", v: '5" IPS Touchscreen' },
  { l: "Resolution", v: "720 \u00d7 1280" },
  { l: "Processor", v: "Quad-core ARM (RK3566)" },
  { l: "GPU", v: "Mali-G52 (Panfrost)" },
  { l: "RAM", v: "4 GB" },
  { l: "Storage", v: "32 GB eMMC" },
  { l: "WiFi", v: "802.11ac (5 GHz)" },
  { l: "Microphones", v: "3\u00d7 MEMS Array (ES7202)" },
  { l: "Speaker", v: "Built-in (RK809 codec)" },
  { l: "Wake Word", v: "On-device NPU" },
  { l: "Power", v: "USB-C + Internal Battery" },
  { l: "OS", v: "Linux (Armbian)" },
];

export default function Specs() {
  return (
    <section id="specs" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">Hardware</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
          Built to sit on your counter
        </h2>
        <p className="text-center text-muted text-[14px] sm:text-[15px] mb-12 sm:mb-20">Real hardware. Real specs. Not a rebranded tablet.</p>

        <div className="rounded-2xl border border-border overflow-hidden">
          {specs.map((s, i) => (
            <div key={s.l} className={`flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 gap-4 ${i < specs.length - 1 ? "border-b border-border" : ""}`}>
              <span className="text-[12px] sm:text-[13px] text-muted/60 font-light shrink-0">{s.l}</span>
              <span className="text-[12px] sm:text-[13px] font-mono text-right">{s.v}</span>
            </div>
          ))}
        </div>

        <p className="text-center label text-muted/30 mt-8">
          Final specifications may vary
        </p>
      </div>
    </section>
  );
}
