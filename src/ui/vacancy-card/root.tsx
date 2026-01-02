import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function VacancyCardRoot({ children }: Props) {
  return <div className="card">{children}</div>;
}
