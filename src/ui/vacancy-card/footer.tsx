import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
};

export function VacancyCardFooter({ children, className }: Props) {
  return (
    <>
      <hr className="-mx-6 mb-6" />
      <div className={clsx("grid grid-flow-col items-center", className)}>
        {children}
      </div>
    </>
  );
}
