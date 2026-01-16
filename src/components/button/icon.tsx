"use client";

import type { Icon, IconProps } from "@phosphor-icons/react";
import { useContext } from "react";
import { ButtonContext } from "./context";
import iconVariants from "./icon-variants";

type ButtonIconProps = {
  icon: Icon | undefined;
  weight?: IconProps["weight"];
};

export function ButtonIcon({ icon: I, weight = "fill" }: ButtonIconProps) {
  const { color, size, variant } = useContext(ButtonContext);

  if (!I) return null;

  return (
    <I weight={weight} className={iconVariants.get({ color, size, variant })} />
  );
}
