import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export function CandidatureCardRoot({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "py-3 grid gap-3 [grid-template-areas:'avatar_content'] grid-cols-[auto_1fr]",
        className,
      )}
    >
      {children}
    </div>
  );
}
