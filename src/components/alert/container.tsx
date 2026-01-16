import type { VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { alertVariants } from "./variants";

type Props = VariantProps<typeof alertVariants> &
  PropsWithChildren<{ className?: string }>;

export function AlertContainer({ children, className, variant }: Props) {
  return (
    <div role="alert" className={clsx(alertVariants({ variant }), className)}>
      {children}
    </div>
  );
}
