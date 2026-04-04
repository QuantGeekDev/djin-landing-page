import { cn } from "@/app/lib/cn";

const styles = {
  base: "font-medium transition-interactive inline-flex items-center justify-center",
  variant: {
    primary:
      "bg-foreground text-background hover:bg-accent-warm hover:text-white",
    secondary:
      "border border-border text-foreground-tertiary hover:text-foreground hover:border-foreground/20",
  },
  shape: {
    pill: "px-8 py-3.5 rounded-button text-[15px]",
    rect: "py-3 sm:py-2.5 rounded-button-rect text-[13px]",
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  shape?: "pill" | "rect";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  shape = "pill",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.base,
        styles.variant[variant],
        styles.shape[shape],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  shape?: "pill" | "rect";
  fullWidth?: boolean;
}

export function ButtonLink({
  variant = "primary",
  shape = "pill",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        styles.base,
        styles.variant[variant],
        styles.shape[shape],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
