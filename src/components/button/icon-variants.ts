import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonVariantsProps } from "./variants";

type AvailableColors = NonNullable<ButtonVariantsProps["color"]>;
type AvailableVariants = NonNullable<ButtonVariantsProps["variant"]>;
type AvailableSizes = NonNullable<ButtonVariantsProps["size"]>;

const buttonIconVariants = cva("transition-all duration-200 ease-in", {
  variants: {
    color: {
      primary: undefined,
      destructive: undefined,
    } satisfies Record<AvailableColors, unknown>,
    variant: {
      default: undefined,
      ghost: undefined,
      outline: undefined,
    } satisfies Record<AvailableVariants, unknown>,
    size: {
      md: "size-4",
    } satisfies Record<AvailableSizes, unknown>,
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "default",
      class:
        "text-primary-300 group-hover:text-primary-200 group-active:primary-200",
    },
    {
      color: "destructive",
      variant: "default",
      class: "text-red-50 group-hover:text-red-100 group-active:text-red-100",
    },
    {
      color: "primary",
      variant: ["ghost", "outline"],
      class:
        "text-primary-600/70 group-hover:text-primary-700/70 group-active:text-primary-700/70",
    },
    {
      color: "destructive",
      variant: ["ghost", "outline"],
      class:
        "text-red-600 group-hover:text-red-700/70 group-active:text-red-700/70",
    },
  ],
});

export type ButtonIconVariantProps = VariantProps<typeof buttonIconVariants>;

export default {
  get: buttonIconVariants,
};
