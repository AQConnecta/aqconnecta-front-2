import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  ForwardedRef,
  PropsWithChildren,
} from "react";
import {
  defaultVariants,
  type IconButtonVariantsProps,
  iconButtonVariants,
} from "./variants";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  IconButtonVariantsProps &
  PropsWithChildren<{
    asChild?: boolean;
    className?: string;
    ref?: ForwardedRef<HTMLButtonElement>;
  }>;

export function IconButtonRoot({
  asChild = false,
  children,
  size,
  variant,
  className,
  ref,
  ...props
}: Props) {
  const Element = asChild ? Slot : "button";
  return (
    <Element
      {...props}
      ref={ref}
      data-size={size ?? defaultVariants.size}
      data-variant={variant ?? defaultVariants.variant}
      className={clsx(
        "group",
        iconButtonVariants({ size, variant }),
        className && className,
      )}
    >
      {children}
    </Element>
  );
}
