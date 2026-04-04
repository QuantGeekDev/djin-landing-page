import { cn } from "@/app/lib/cn";

interface SectionHeaderProps {
  label: string;
  heading: React.ReactNode;
  subtitle?: string;
  labelClassName?: string;
  headingClassName?: string;
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  subtitle,
  labelClassName,
  headingClassName,
  className,
}: SectionHeaderProps) {
  const hasSubtitle = !!subtitle;
  return (
    <div className={className}>
      <div
        className={cn(
          "label text-foreground-tertiary text-center mb-4 sm:mb-6",
          labelClassName
        )}
      >
        {label}
      </div>
      <h2
        className={cn(
          "heading-lg text-2xl sm:text-3xl md:text-4xl text-center",
          hasSubtitle ? "mb-4 sm:mb-6" : "mb-12 sm:mb-20",
          headingClassName
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p className="text-center text-foreground-secondary text-[14px] sm:text-[15px] mb-12 sm:mb-20">
          {subtitle}
        </p>
      )}
    </div>
  );
}
