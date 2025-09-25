import type { Icon } from "@phosphor-icons/react";

type NavbarItemIconProps = {
  icon: Icon;
};

export function NavbarItemIcon({ icon: I }: NavbarItemIconProps) {
  return <I weight="fill" size={32} className="text-primary-600/75" />;
}
