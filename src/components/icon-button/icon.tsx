import type { Icon, IconProps } from "@phosphor-icons/react";

type ButtonIconProps = {
  icon: Icon | undefined;
  weight?: IconProps["weight"];
};

export function IconButtonIcon({ icon: I, weight = "bold" }: ButtonIconProps) {
  if (!I) return null;

  return (
    <I
      weight={weight}
      className="group-data-[size=sm]:size-4 group-data-[size=md]:size-5"
    />
  );
}
