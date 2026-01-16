import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const defaultVariants = {
  size: "md",
  variant: "default",
  color: "primary",
} as const;

const buttonVariants = cva(
  clsx(
    "group inline-flex items-center justify-center",
    "transition-all duration-100 cursor-default disabled:pointer-events-none",
    "outline-none ring-0 focus-visible:ring-4 leading-tight",
  ),
  {
    variants: {
      variant: {
        default: undefined,
        ghost: undefined,
        outline: undefined,
      },
      color: {
        primary: undefined,
        destructive: undefined,
      },
      size: {
        md: "px-2.5 py-2 rounded-lg gap-2 font-semibold text-sm",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        class: [
          "bg-primary-700/90 text-primary-200 hover:bg-primary-700",
          "active:bg-primary-800 ring-primary-300",
        ],
      },
      {
        variant: "default",
        color: "destructive",
        class:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 ring-red-100",
      },
      {
        variant: "ghost",
        color: "primary",
        class: [
          "bg-black/5 text-foreground hover:bg-black/10 active:bg-black/20",
          "ring-primary-300",
        ],
      },
      {
        variant: "ghost",
        color: "destructive",
        class:
          "bg-red-100 hover:bg-red-200 active:bg-red-300 ring-red-100 text-red-600",
      },
      {
        variant: "outline",
        color: "primary",
        class: [
          "border border-black/10 bg-transparent text-foreground ring-primary-300",
          "hover:bg-black/5 active:bg-black/10",
        ],
      },
      {
        variant: "outline",
        color: "destructive",
        class: [
          "bg-transparent border border-red-500/25 ring-red-100 text-red-600",
          "hover:bg-red-100 active:bg-red-200",
        ],
      },
    ],
    defaultVariants,
  },
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export default {
  get: buttonVariants,
  defaults: defaultVariants,
};
