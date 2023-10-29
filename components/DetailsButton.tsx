import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-lg justify-center rounded-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-200 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800",
        primary:
          "bg-[#e50914] outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-1",
        secondary: "bg-[#2B2B2D] hover:bg-[#2B2B2D]/70  hover:text-white/70",
        outline: "border text-white hover:bg-white/30 dark:hover:bg-white/30",
      },
      size: {
        default: "px-6 py-2",
        sm: "px-4 py-2",
        lg: "px-8 py-2",
        rounded: "rounded-full px-6 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface DetailsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const DetailsButton = React.forwardRef<HTMLButtonElement, DetailsButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
DetailsButton.displayName = "DetailsButton";

export { DetailsButton, buttonVariants };
