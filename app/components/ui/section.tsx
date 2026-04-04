import { cn } from "@/app/lib/cn";

type MaxWidth = "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  maxWidth?: MaxWidth;
  className?: string;
}

const maxWidthMap: Record<MaxWidth, string> = {
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export function Section({
  children,
  id,
  maxWidth = "5xl",
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className={cn(maxWidthMap[maxWidth], "mx-auto")}>{children}</div>
    </section>
  );
}
