import React from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  /**
   * Optional text label for accessibility / screen readers.
   * If you don't want visible text, leave this empty.
   */
  label?: string;
};

const sizeClasses: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  label = "Loading...",
}) => {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span
        className={[
          "inline-block rounded-full",
          // use your custom animation from tailwind.config.ts
          "animate-spin-1.5",
          // use primary color from your theme
          "border-primary/30 border-t-primary",
          sizeClasses[size],
        ].join(" ")}
      />
      {label && (
        <span className="text-xs font-medium text-body dark:text-bodydark">
          {label}
        </span>
      )}
    </span>
  );
};

export default LoadingSpinner;
