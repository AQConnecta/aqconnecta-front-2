import { cva, type VariantProps } from "class-variance-authority";

export const defaultVariants = {
  variant: "ghost",
  size: "md",
  color: "default",
} as const;

export const iconButtonVariants = cva(
  "transition-all duration-100 w-fit outline-none ring-0 focus-visible:ring-4 ring-primary-600/40",
  {
    variants: {
      variant: {
        ghost: "",
      },
      color: {
        default: "",
        danger: "",
        foreground: "",
      },
      size: {
        xs: "rounded-lg px-1 py-0.5",
        sm: "rounded-[10px] px-1.5 py-1",
        md: "rounded-xl px-2 py-1",
      },
    },
    defaultVariants,
    compoundVariants: [
      {
        color: "default",
        variant: "ghost",
        className:
          "bg-transparent hover:bg-black/5 active:bg-black/15 text-black",
      },
      {
        variant: "ghost",
        color: "foreground",
        className: "bg-black/5 hover:bg-black/10 active:bg-black/15 text-black",
      },
      {
        variant: "ghost",
        color: "danger",
        className:
          "bg-red-100/40 hover:bg-red-100/75 active:bg-red-100 text-red-700 ring-red-500/40",
      },
    ],
  },
);

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
