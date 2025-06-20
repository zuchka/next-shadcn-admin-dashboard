import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const bannerVariants = cva("flex items-start gap-3 rounded border p-3 transition-all", {
  variants: {
    variant: {
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
      "info-neutral":
        "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
      error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      warning:
        "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
    },
    layout: {
      inline: "items-center",
      block: "items-start flex-col gap-2 sm:flex-row sm:gap-3",
    },
  },
  defaultVariants: {
    variant: "info",
    layout: "block",
  },
});

// Info icon component
const InfoIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
    <g clipPath="url(#clip0_info)">
      <path
        d="M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 7.20979 15.0388 5.4929 13.773 4.22703C12.5071 2.96116 10.7902 2.25 9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 6.75H9.0075" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_info">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Error icon component
const ErrorIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
    <g clipPath="url(#clip0_error)">
      <path
        d="M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C8.11358 2.25 7.23583 2.42459 6.41689 2.76381C5.59794 3.10303 4.85382 3.60023 4.22703 4.22703C3.60023 4.85382 3.10303 5.59794 2.76381 6.41689C2.42459 7.23583 2.25 8.11358 2.25 9Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 6.75V9.75" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12V12.0075" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_error">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Warning icon component
const WarningIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
    <path
      d="M1 15.25L9 2.25L17 15.25H1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 6.75L9 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12.75V12.7575" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Success icon component
const SuccessIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
    <g clipPath="url(#clip0_success)">
      <path
        d="M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C8.11358 2.25 7.23583 2.42459 6.41689 2.76381C5.59794 3.10303 4.85382 3.60023 4.22703 4.22703C3.60023 4.85382 3.10303 5.59794 2.76381 6.41689C2.42459 7.23583 2.25 8.11358 2.25 9Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_success">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const iconVariants = cva("flex-shrink-0", {
  variants: {
    variant: {
      info: "text-[#1A73EB]",
      "info-neutral": "text-[#1A73EB]",
      error: "text-[#C70000]",
      warning: "text-[#A3600E]",
      success: "text-[#007700]",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const getIcon = (variant: string) => {
  switch (variant) {
    case "info":
    case "info-neutral":
      return InfoIcon;
    case "error":
      return ErrorIcon;
    case "warning":
      return WarningIcon;
    case "success":
      return SuccessIcon;
    default:
      return InfoIcon;
  }
};

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  heading?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  showDismiss?: boolean;
  showIcon?: boolean;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "info",
      layout = "block",
      heading,
      children,
      onDismiss,
      primaryAction,
      secondaryAction,
      showDismiss = true,
      showIcon = true,
      ...props
    },
    ref,
  ) => {
    const IconComponent = getIcon(variant || "info");

    return (
      <div ref={ref} className={cn(bannerVariants({ variant, layout }), className)} role="alert" {...props}>
        {showIcon && <IconComponent className={cn(iconVariants({ variant }), "w-[18px] h-[18px] flex-shrink-0")} />}

        {layout === "inline" ? (
          <div className="flex flex-1 items-center gap-3 min-w-0">
            <div className="text-sm leading-5 flex-1 text-[#333333]">{children}</div>
            {primaryAction && (
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={primaryAction.onClick}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium leading-4 border border-[#5C5C5C] rounded text-[#333333] hover:bg-gray-50 transition-colors"
                >
                  {primaryAction.label}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              {heading && (
                <h4 className="text-sm font-semibold leading-5 text-[#333333]">{heading}</h4>
              )}

              <div className="text-sm leading-5 text-[#333333]">{children}</div>

              {(primaryAction || secondaryAction) && (
                <div className="flex items-start gap-3">
                  {primaryAction && (
                    <button
                      onClick={primaryAction.onClick}
                      className="flex items-center justify-center gap-1 px-2 py-1.5 text-sm font-medium leading-5 border border-[#5C5C5C] rounded text-[#333333] hover:bg-gray-50 transition-colors"
                    >
                      {primaryAction.label}
                    </button>
                  )}

                  {secondaryAction && (
                    <button
                      onClick={secondaryAction.onClick}
                      className="flex items-center justify-center gap-1 px-2 py-1.5 text-sm font-medium leading-5 rounded text-[#1A73EB] hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {secondaryAction.label}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {showDismiss && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              "flex-shrink-0 rounded p-1 hover:bg-black/5 dark:hover:bg-white/10",
              layout === "inline" ? "w-6 h-6" : "w-8 h-8"
            )}
            aria-label="Dismiss"
          >
            <X className={cn(
              "text-[#5C5C5C]",
              layout === "inline" ? "w-4 h-4" : "w-5 h-5"
            )} />
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = "Banner";

export { Banner, bannerVariants };
