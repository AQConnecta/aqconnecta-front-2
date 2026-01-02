import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type * as React from "react";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg border px-2 py-0.5",
    "text-xs font-medium w-fit whitespace-nowrap shrink-0 focus-visible:border-ring",
    "focus-visible:ring-4 transition-[color,box-shadow] overflow-hidden",
    "[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default:
          "border-primary-300 bg-primary-200 text-primary-700 [a&]:hover:bg-primary-200/90",
        blue: "border-royal-blue-300 bg-royal-blue-100 text-royal-blue-700 [a&]:hover:bg-royal-blue-300/80",
        green:
          "border-jade-300 bg-jade-100 text-jade-500 [a&]:hover:bg-jade-300/90 focus-visible:ring-jade-500/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={clsx(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
