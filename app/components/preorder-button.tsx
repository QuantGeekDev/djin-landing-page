"use client";

import { createPreorderCheckout } from "@/app/lib/checkout";
import { trackEvent } from "@/app/lib/analytics";
import { useTransition } from "react";

export default function PreorderButton({
  batch,
  source,
  children,
  className,
}: {
  batch: string;
  source: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      className={className}
      onClick={() => {
        trackEvent("preorder_click", { location: source, batch });
        startTransition(async () => {
          await createPreorderCheckout(batch, source);
        });
      }}
    >
      {isPending ? "Redirecting to Stripe..." : children}
    </button>
  );
}
