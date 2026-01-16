"use client";

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { ButtonContext } from "./context";
import type { ButtonVariantsProps } from "./variants";
import variants from "./variants";

type ButtonProps = {
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantsProps;

export function ButtonRoot({
  children,
  asChild,
  className,
  variant = variants.defaults.variant,
  size = variants.defaults.size,
  color = variants.defaults.color,
  ...props
}: ButtonProps) {
  const Element = asChild ? Slot : "button";

  return (
    <ButtonContext.Provider value={{ color, size, variant }}>
      <Element
        data-variant={variant}
        data-size={size}
        data-color={color}
        className={clsx(variants.get({ color, size, variant }), className)}
        {...props}
      >
        {children}
      </Element>
    </ButtonContext.Provider>
  );
}
