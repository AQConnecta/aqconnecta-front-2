import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}>;

export function Heading({
  level = 1,
  as: Element = "h1",
  className,
  children,
}: Props) {
  return (
    <Element
      className={clsx(
        "text-foreground max-xs-width:text-sm wrap-break-word",
        level === 1 && "text-xl font-bold",
        level === 2 && "text-xl font-semibold",
        level === 3 && "text-lg font-semibold",
        level === 4 && "text-base font-semibold",
        level === 5 && "text-base font-medium",
        level === 6 && "text-base",
        className && className,
      )}
    >
      {children}
    </Element>
  );
}
