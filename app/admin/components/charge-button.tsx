"use client";

import { chargeRemainingBalance } from "@/app/lib/admin-actions";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChargeButton({
  preorderId,
  remainingCents,
  disabled,
}: {
  preorderId: number;
  remainingCents: number;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    error?: string;
    status?: string;
  } | null>(null);
  const router = useRouter();

  function handleCharge() {
    const amount = (remainingCents / 100).toFixed(2);
    if (!confirm(`Charge $${amount} to this customer?`)) return;

    startTransition(async () => {
      const res = await chargeRemainingBalance(preorderId);
      setResult(res);
      if (!res.error) {
        router.refresh();
      }
    });
  }

  if (disabled) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleCharge}
        disabled={isPending}
        className="px-3 py-1.5 rounded-md bg-accent-warm/10 text-accent-warm text-[12px] font-medium hover:bg-accent-warm/20 transition-colors disabled:opacity-50"
      >
        {isPending
          ? "Charging..."
          : `Charge $${(remainingCents / 100).toFixed(2)}`}
      </button>
      {result?.error && (
        <span className="text-red-400 text-[11px]">{result.error}</span>
      )}
      {result?.status === "succeeded" && (
        <span className="text-green-400 text-[11px]">Charged</span>
      )}
    </div>
  );
}
