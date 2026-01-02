import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm prose-a:underline flex gap-3",
  {
    variants: {
      variant: {
        default: "bg-primary-200 border-primary-300 text-primary-700",
        danger: "bg-red-100 border-red-300 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertVariantsProps = VariantProps<typeof alertVariants>;
