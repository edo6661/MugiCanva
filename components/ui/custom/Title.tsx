import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const headerVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "font-semibold text-2xl",
      sm: "font-medium text-xl",
      lg: "font-bold text-4xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, size, as = "h3", ...props }, ref) => {
    const Comp = as || "h3";
    return (
      <Comp
        className={cn(headerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Title.displayName = "Title";

export { Title, headerVariants };
