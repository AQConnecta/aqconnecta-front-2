import { cva, type VariantProps } from "class-variance-authority";

export const defaultVariants = {
  variant: "default",
  size: "md",
} as const;

export const iconButtonVariants = cva("transition-all duration-100 w-fit", {
  variants: {
    variant: {
      default: "bg-transparent hover:bg-black/5 active:bg-black/15 text-black",
      danger:
        "bg-red-100/40 hover:bg-red-100/75 active:bg-red-100 text-red-700",
    },
    size: {
      sm: "rounded-[10px] px-1.5 py-1",
      md: "rounded-xl px-2 py-1",
    },
  },
  defaultVariants,
});

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
