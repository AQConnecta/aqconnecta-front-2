import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function NavbarItemLabel({ children }: Props) {
  return <span className="font-bold text-gray-700">{children}</span>;
}
