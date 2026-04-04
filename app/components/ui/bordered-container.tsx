import { cn } from "@/app/lib/cn";

interface BorderedContainerProps {
  children: React.ReactNode;
  divided?: boolean;
  className?: string;
}

export function BorderedContainer({
  children,
  divided = false,
  className,
}: BorderedContainerProps) {
  return (
    <div
      className={cn(
        "rounded-container overflow-hidden border border-border",
        divided && "space-y-px",
        className
      )}
    >
      {children}
    </div>
  );
}
