import { ButtonLink } from "@/app/components/ui";

export default function PreorderCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground-muted"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className="heading-lg text-2xl sm:text-3xl mb-3">
          Pre-order not completed
        </h1>
        <p className="text-foreground-secondary text-[15px] mb-8 font-light">
          No worries &mdash; your card was not charged. You can come back
          anytime to reserve your Jinn HoloBox.
        </p>
        <ButtonLink href="/#preorder" className="transition-emphasis">
          Back to Pre-Order
        </ButtonLink>
      </div>
    </div>
  );
}
