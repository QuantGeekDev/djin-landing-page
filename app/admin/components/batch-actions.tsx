"use client";

import { chargeEntireBatch } from "@/app/lib/admin-actions";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

export default function BatchActions({
  batches,
}: {
  batches: { batch: string; pendingCount: number; remainingPerUnit: number }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [activeBatch, setActiveBatch] = useState<string | null>(null);
  const [result, setResult] = useState<{
    total: number;
    succeeded: number;
    failed: number;
  } | null>(null);
  const router = useRouter();

  function handleChargeAll(batch: string, count: number, perUnit: number) {
    const total = ((count * perUnit) / 100).toLocaleString();
    if (
      !confirm(
        `This will charge ${count} customers for a total of $${total}. Continue?`
      )
    )
      return;

    setActiveBatch(batch);
    setResult(null);

    startTransition(async () => {
      const res = await chargeEntireBatch(batch);
      setResult(res);
      setActiveBatch(null);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {batches.map((b) => (
        <div key={b.batch} className="flex items-center gap-3">
          <button
            onClick={() =>
              handleChargeAll(b.batch, b.pendingCount, b.remainingPerUnit)
            }
            disabled={isPending || b.pendingCount === 0}
            className="px-4 py-2 rounded-lg bg-accent-warm/10 text-accent-warm text-[13px] font-medium hover:bg-accent-warm/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isPending && activeBatch === b.batch
              ? "Charging..."
              : `Charge All ${b.batch.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())} ($${(b.remainingPerUnit / 100).toFixed(0)} × ${b.pendingCount})`}
          </button>
        </div>
      ))}

      {result && (
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-green-400">{result.succeeded} succeeded</span>
          {result.failed > 0 && (
            <span className="text-red-400">{result.failed} failed</span>
          )}
        </div>
      )}
    </div>
  );
}
