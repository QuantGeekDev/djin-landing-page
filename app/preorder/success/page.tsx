import { stripe } from "@/app/lib/stripe";
import Link from "next/link";
import { BorderedContainer, ButtonLink } from "@/app/components/ui";

export default async function PreorderSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="heading-lg text-2xl mb-4">Invalid session</h1>
          <p className="text-foreground-secondary text-[15px] mb-8">
            We couldn&apos;t find your order details.
          </p>
          <ButtonLink href="/">Back to Home</ButtonLink>
        </div>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["customer"],
  });

  const customer = session.customer as import("stripe").Stripe.Customer | null;
  const batch = session.metadata?.batch || "batch_2";
  const depositCents = parseInt(session.metadata?.deposit_cents || "4900");
  const remainingCents = parseInt(session.metadata?.remaining_cents || "25000");
  const totalCents = parseInt(session.metadata?.total_cents || "29900");
  const batchLabel = batch === "batch_3" ? "Batch 3" : "Batch 2";

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-20">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-accent-warm/20 flex items-center justify-center mx-auto mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent-warm"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="heading-lg text-2xl sm:text-3xl mb-3">
            You&apos;re in!
          </h1>
          <p className="text-foreground-secondary text-[15px]">
            Your Jinn HoloBox pre-order is confirmed.
          </p>
        </div>

        <BorderedContainer className="p-6 mb-6">
          <h2 className="text-[15px] font-normal mb-4">Order Details</h2>
          <div className="space-y-3 text-[13px]">
            {customer && "name" in customer && customer.name && (
              <div className="flex justify-between">
                <span className="text-foreground-tertiary">Name</span>
                <span>{customer.name}</span>
              </div>
            )}
            {customer && "email" in customer && customer.email && (
              <div className="flex justify-between">
                <span className="text-foreground-tertiary">Email</span>
                <span>{customer.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-foreground-tertiary">Batch</span>
              <span>{batchLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-tertiary">Deposit paid</span>
              <span className="text-accent-warm">
                ${(depositCents / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-tertiary">Remaining balance</span>
              <span>${(remainingCents / 100).toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span>${(totalCents / 100).toFixed(2)}</span>
            </div>
          </div>
        </BorderedContainer>

        <div className="rounded-container border border-accent-warm/20 bg-accent-warm/[0.03] p-6 mb-8">
          <h2 className="text-[15px] font-normal mb-3">What happens next</h2>
          <ul className="space-y-2 text-[13px] text-foreground-secondary font-light">
            <li className="flex gap-2">
              <span className="text-accent-warm-dim mt-0.5">&mdash;</span>
              Your card is saved securely. We&apos;ll charge the remaining $
              {(remainingCents / 100).toFixed(2)} when your device is ready to
              ship.
            </li>
            <li className="flex gap-2">
              <span className="text-accent-warm-dim mt-0.5">&mdash;</span>
              You&apos;ll receive a confirmation email shortly.
            </li>
            <li className="flex gap-2">
              <span className="text-accent-warm-dim mt-0.5">&mdash;</span>
              Expected shipping: Winter 2026. We&apos;ll keep you updated.
            </li>
            <li className="flex gap-2">
              <span className="text-accent-warm-dim mt-0.5">&mdash;</span>
              60-day money-back guarantee from delivery.
            </li>
          </ul>
        </div>

        <div className="text-center">
          <ButtonLink href="/" className="transition-emphasis">
            Back to Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
