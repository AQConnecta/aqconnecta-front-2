import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function NavbarItemLabel({ children }: Props) {
  return (
    <span
      className={clsx(
        "text-balance font-bold text-gray-700",
        "max-medium-width:text-xs max-medium-width:text-center",
      )}
    >
      {children}
    </span>
  );
}
