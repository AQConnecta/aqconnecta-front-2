import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function IconButtonLabel({ children }: Props) {
  return <span className="sr-only">{children}</span>;
}
