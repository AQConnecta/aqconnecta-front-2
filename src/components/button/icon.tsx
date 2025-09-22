import type { Icon, IconProps } from "@phosphor-icons/react";
import clsx from "clsx";

type ButtonIconProps = {
  icon: Icon | undefined;
  weight?: IconProps["weight"];
};

export function ButtonIcon({ icon: I, weight = "fill" }: ButtonIconProps) {
  if (!I) return null;

  return (
    <I
      weight={weight}
      className={clsx(
        "medium-width:group-data-[size=md]:size-6 max-medium-width:group-data[size=md]:size-4",
        "group-data-[size=sm]:size-4",
        "group-data-[variant=primary]:text-primary-300",
        [
          "group-data-[variant=ghost-primary]:text-primary-600/70",
          "group-data-[variant=ghost-primary]:group-hover:text-primary-700/70",
          "group-data-[variant=ghost-primary]:group-active:text-primary-700",
        ],
      )}
    />
  );
}
