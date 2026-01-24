import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function NavbarItemLabel({ children }: Props) {
  return (
    <span
      className={clsx(
        "text-balance font-medium text-gray-700 text-base",
        "max-medium-width:text-sm max-medium-width:text-center",
      )}
    >
      {children}
    </span>
  );
}
