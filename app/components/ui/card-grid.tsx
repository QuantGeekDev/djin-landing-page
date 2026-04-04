import { cn } from "@/app/lib/cn";

interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

const colMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-px bg-border rounded-container overflow-hidden border border-border",
        colMap[columns],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardGridItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-background p-5 sm:p-6 md:p-8", className)}>
      {children}
    </div>
  );
}
