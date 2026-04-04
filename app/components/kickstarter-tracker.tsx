"use client";

import PreorderButton from "./preorder-button";

const BATCHES = [
  { name: "Batch 1", total: 500, sold: 500, status: "sold-out" as const, price: "$249", label: "Early Bird" },
  { name: "Batch 2", total: 800, sold: 392, status: "active" as const, price: "$299", label: "Pre-Order" },
  { name: "Batch 3", total: 1500, sold: 0, status: "upcoming" as const, price: "$349", label: "Coming Soon" },
];

const TOTAL_RAISED = 500 * 249 + 392 * 299;
const GOAL = 200_000;

export default function KickstarterTracker() {
  const pctFunded = Math.round((TOTAL_RAISED / GOAL) * 100);

  return (
    <section id="preorder" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="label text-accent-warm text-center mb-6 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse-soft" />
          Campaign Live
        </div>
        <h2 className="heading-lg text-3xl md:text-4xl text-center mb-6">
          Fund the future of personal AI
        </h2>
        <p className="text-center text-foreground-secondary text-[15px] mb-16">Every pre-order gets us closer to production.</p>

        {/* Funding meter */}
        <div className="rounded-2xl border border-border p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-3xl md:text-4xl font-extralight tracking-tight">
                ${TOTAL_RAISED.toLocaleString()}
              </p>
              <p className="text-[13px] text-foreground-tertiary mt-1 font-light">
                of ${GOAL.toLocaleString()} goal
              </p>
            </div>
            <div className="flex gap-5 sm:gap-8">
              {[
                { val: `${pctFunded}%`, label: "funded", color: "text-accent-warm" },
                { val: "892", label: "backers", color: "" },
                { val: "47", label: "days left", color: "" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`text-lg sm:text-xl font-extralight ${s.color}`}>{s.val}</p>
                  <p className="label text-foreground-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-accent-warm/70 transition-all duration-1000"
              style={{ width: `${Math.min(pctFunded, 100)}%` }}
            />
          </div>
        </div>

        {/* Batch cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BATCHES.map((batch) => {
            const pct = batch.total > 0 ? Math.round((batch.sold / batch.total) * 100) : 0;
            const remaining = batch.total - batch.sold;
            const isSoldOut = batch.status === "sold-out";
            const isActive = batch.status === "active";

            return (
              <div
                key={batch.name}
                className={`rounded-xl p-5 ${
                  isActive
                    ? "border border-accent-warm/30 bg-accent-warm/[0.03]"
                    : isSoldOut
                    ? "border border-border opacity-50"
                    : "border border-border"
                }`}
              >
                {isActive && (
                  <div className="label text-accent-warm mb-3">Live Now</div>
                )}

                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-sm font-normal">{batch.name}</p>
                    <p className="label text-foreground-muted mt-0.5">{batch.label}</p>
                  </div>
                  <p className={`text-xl font-extralight ${isSoldOut ? "line-through text-foreground-muted" : ""}`}>
                    {batch.price}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between label text-foreground-muted mb-1.5">
                    <span>{batch.sold}</span>
                    <span>{batch.total}</span>
                  </div>
                  <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isActive ? "bg-accent-warm/60" : "bg-foreground-faint"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <p className={`text-[13px] mb-5 ${isActive ? "text-accent-warm-dim" : "text-foreground-muted"}`}>
                  {isSoldOut ? "Sold out" : isActive ? `${remaining} remaining` : "Opens after Batch 2"}
                </p>

                {isActive ? (
                  <PreorderButton
                    batch="batch_2"
                    source="batch_tracker"
                    className="w-full py-2.5 rounded-lg bg-foreground text-background text-[13px] font-medium hover:bg-accent-warm hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Reserve &mdash; $49 Deposit
                  </PreorderButton>
                ) : (
                  <button disabled className="w-full py-2.5 rounded-lg border border-border text-foreground-muted text-[13px] cursor-not-allowed">
                    {isSoldOut ? "Sold Out" : "Coming Soon"}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 label text-foreground-muted">
          <span>Pay $49 deposit now, remainder when it ships</span>
          <span>Full refund guarantee</span>
          <span>Free worldwide shipping</span>
        </div>
      </div>
    </section>
  );
}
