import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, AlertCircle, AlertTriangle, CheckCircle2, X, Plus } from "lucide-react";

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

const iconVariants = cva("flex-shrink-0", {
  variants: {
    variant: {
      info: "text-blue-600 dark:text-blue-400",
      "info-neutral": "text-blue-600 dark:text-blue-400",
      error: "text-red-600 dark:text-red-400",
      warning: "text-amber-600 dark:text-amber-400",
      success: "text-green-600 dark:text-green-400",
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
      return Info;
    case "error":
      return AlertCircle;
    case "warning":
      return AlertTriangle;
    case "success":
      return CheckCircle2;
    default:
      return Info;
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
        {showIcon && <IconComponent className={cn(iconVariants({ variant }), "size-4 mt-0.5")} />}

        <div className="flex-1 min-w-0">
          {layout === "block" && heading && (
            <div className="mb-1">
              <h4 className="text-sm font-semibold leading-5">{heading}</h4>
            </div>
          )}

          <div className={cn("text-sm leading-5", layout === "inline" ? "flex-1" : "space-y-3")}>
            {children}

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap items-start gap-3">
                {primaryAction && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={primaryAction.onClick}
                    className={cn(
                      "h-8 border-gray-300 bg-transparent px-3 py-1.5 text-xs hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
                      variant === "info" &&
                        "border-blue-300 hover:bg-blue-100 dark:border-blue-600 dark:hover:bg-blue-800",
                      variant === "error" &&
                        "border-red-300 hover:bg-red-100 dark:border-red-600 dark:hover:bg-red-800",
                      variant === "warning" &&
                        "border-amber-300 hover:bg-amber-100 dark:border-amber-600 dark:hover:bg-amber-800",
                      variant === "success" &&
                        "border-green-300 hover:bg-green-100 dark:border-green-600 dark:hover:bg-green-800",
                    )}
                  >
                    {primaryAction.label}
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={secondaryAction.onClick}
                    className={cn(
                      "h-8 px-3 py-1.5 text-xs hover:bg-transparent",
                      variant === "info" &&
                        "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
                      variant === "info-neutral" &&
                        "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
                      variant === "error" &&
                        "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
                      variant === "warning" &&
                        "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
                      variant === "success" &&
                        "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300",
                    )}
                  >
                    <Plus className="mr-1 size-3" />
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {showDismiss && onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto flex-shrink-0 rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="size-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = "Banner";

export { Banner, bannerVariants };
