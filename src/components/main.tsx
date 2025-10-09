import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Main({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={clsx(
        "max-w-main-area w-full-with-margins mx-auto",
        className && className,
      )}
      {...props}
    />
  );
}
