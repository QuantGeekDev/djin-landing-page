"use client";

import type { PreorderTotals, BatchStat } from "@/app/lib/admin-actions";

interface StatsProps {
  totals: PreorderTotals;
  batchStats: BatchStat[];
}

export default function StatsCards({ totals, batchStats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <Card
        label="Total Backers"
        value={String(totals.total_orders)}
      />
      <Card
        label="Deposits Collected"
        value={`$${(totals.total_deposits / 100).toLocaleString()}`}
        accent
      />
      <Card
        label="Pending Charges"
        value={String(totals.pending_remaining)}
      />
      <Card
        label="Fully Paid"
        value={String(totals.fully_paid)}
        success
      />
      <Card
        label="Failed Charges"
        value={String(totals.failed_charges)}
        danger={totals.failed_charges > 0}
      />

      {batchStats.map((b) => (
        <Card
          key={b.batch}
          label={b.batch.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          value={`${b.count} orders`}
          sub={`$${(b.deposits / 100).toLocaleString()} in deposits`}
        />
      ))}
    </div>
  );
}

function Card({
  label,
  value,
  sub,
  accent,
  success,
  danger,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  success?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-[11px] uppercase tracking-wider text-foreground-muted mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-extralight ${
          accent
            ? "text-accent-warm"
            : success
            ? "text-green-400"
            : danger
            ? "text-red-400"
            : ""
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-foreground-muted mt-1">{sub}</p>}
    </div>
  );
}
